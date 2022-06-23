import { useState, useEffect, useRef } from "react";
import { USER, NOTICE, SCHEDULE, QUESTION, ANSWER, PROFILE, storage, COUNTER, firestore } from "../utils/Firebase";
import { userDatas, tableDatas } from "../pages/datas/DatasUser";

export function Pagination({ postsPerPage, totalPosts, paginate, currentPage }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  const last = (parseInt((currentPage-1)/5)+1) * 5;
  const first = last - 5;
  const curPageList = pageNumbers.slice(first, last);
  // console.log("LAST", last, "FIRST", first, "\nCURPAGELIST", curPageList, "pagenumber", pageNumbers);
  const lastPage = pageNumbers[pageNumbers.length - 1];

  return (
    <div
      class="dataTables_paginate paging_simple_numbers"
      id="datatable_paginate"
    >
      <ul class="pagination">
        <li class="paginate_button previous disabled" id="datatable_previous">
          <a
            href="#"
            aria-controls="datatable"
            data-dt-idx="0"
            tabIndex="0"
            onClick={() => {
              paginate(currentPage > 1 ? currentPage - 1 : currentPage);
            }}
          >
            {"<"}
          </a>
        </li>
        {curPageList.map((number) => {
          let classList = '';
          if (number === currentPage) {
            classList = "curPage";
          }
          return (
            <li key={number} class="paginate_button">
              <a
                href="#"
                onClick={() => {
                  paginate(number)
                }}
                aria-controls="datatable"
                data-dt-idx="1"
                tabIndex="0"
                class={classList}
              >
                {number}
              </a>
            </li>
          )
        })}

        <li class="paginate_button next" id="datatable_next">
          <a
            href="#"
            aria-controls="datatable"
            data-dt-idx="7"
            tabIndex="0"
            onClick={() => {
              paginate(currentPage < lastPage ? currentPage + 1 : currentPage);
            }}
          >
            {">"}
          </a>
        </li>
      </ul>
    </div>
  );
}

// export function DataTable({  header, tableDatas }) {
export function DataTable({ kinds }) {
  // 데이터 추가하기
  // const a = [1, 2, 3, 4, 5, 6, 7, 8, 1,];
  // a.map((d) => {
  //   USER.add({
  //     year: "기수",
  //     name: "이름",
  //     birthdate: "20220505", 
  //     phoneNum: "01012341234", 
  //     email: "test@naver.com", 
  //     company: "킹버스", 
  //     department: "제품개발부서", 
  //     comPosition: "직위", 
  //     comTel: "022332323", 
  //     comAdr: "수원시 매송고색로", 
  //     faxNum: "1234213", 
  //     sector: d, 
  //     check: "O",
  //     pubDate: "202222222",
  //     modifiedDate: "2022-02-11 10:10",
  //   })
  // });


  const [checkList, setCheckList] = useState([]);
  const [idList, setIdList] = useState([]);
  const [filenameList, setFilenameList] = useState([]);
  const [checkFilenameList, setCheckFilenameList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // const [postsPerPage, setPostsPerPage] = useState(15);
  let postsPerPage = 15;
  const searchInput = useRef();
  const checkAllBtn = useRef();

  const [lastDoc, setLastDoc] = useState('');
  const [dataList, setDataList] = useState([]);
  const [datas, setDatas] = useState([]);
  const [curDatas, setCurDatas] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState();

  let title = '';
  let collection = '';
  let header = [];
  let filterData = '';

  if (kinds === "user") {
    collection = USER;
    title = "회원";
    header = [
      '이름',
      '기수',
      '생년월일',
      '전화번호',
      '이메일',
      '회사명',
      '승인완료',
      '수정시간',
      '등록시간',
    ];
    filterData = userDatas;
  } else if (kinds === "notice") {
    collection = NOTICE;
    title = "공지사항"
    // filterData = ""
  } else if (kinds === "schedule") {
    collection = SCHEDULE;
    title = "일정"
    // filterData = 
  } else if (kinds === "question") {
    collection = QUESTION;
    title = "문의"
    // filterData = 
  } else if (kinds === "answer") {
    collection = ANSWER;
    title = "답변"
    // filterData = 
  } else if (kinds === "profile") {
    collection = PROFILE;
    title = "프로필 수정"
    // filterData = 
  }
  // 처음 데이터 15개 불러오기
  useEffect(() => {
    COUNTER.doc('counter').get().then((doc) => {
      if (doc.exists) {
        switch (kinds) {
          case 'user':
            setCount(doc.data().user)
            break;
          case 'notice':
            setCount(doc.data().notice)
            break;
          case 'answer':
            setCount(doc.data().answer)
            break;
          case 'profile':
            setCount(doc.data().profile)
            break;
          case 'question':
            setCount(doc.data().question)
            break;
          case 'schedule':
            setCount(doc.data().schedule)
            break;
        }
      }
    });

    let list = [];
    let id = [];
    collection.orderBy("modifiedDate", "desc").limit(75).get().then((docs) => {
      setLastDoc(docs.docs[docs.docs.length-1]);
      docs.forEach((doc) => {
        if (doc.exists) {
          list.push(doc.data());
          id.push(doc.id);
        }
      });
      setIdList(id);
      const res = filterData(list, id, setDataList);
      setDatas(res);
      setCurDatas(currentDatas(res));
    })
    setLoading(true);
  }, [])

  useEffect(() => {
    let currentPageList = '';
    let curDataList = '';
    console.log("LOAADING", loading);
    if (loading) {
      currentPageList = parseInt((currentPage-1)/5)
      curDataList = dataList[currentPageList];
      console.log("PAGELSIT", currentPageList, curDataList)
    
      // TODO 생성시 카운터 값 변경, 검색기능
      // 6페이지 11페이지 넘어갈떄
      if (curDataList == undefined) {
        let list = [];
        let id = [];
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");

        console.log("LASTDOC", lastDoc);
        // const q = query(collection, orderBy("modifiedDate", "desc"), startAfter(lastDoc), limit(75))

        collection.orderBy("modifiedDate", "desc").startAfter(lastDoc).limit(75).get().then((docs) => {
          setLastDoc(docs.docs[docs.docs.length-1]);
          docs.forEach((doc) => {
            if (doc.exists) {
              list.push(doc.data());
              id.push(doc.id);
            }
          });
          setIdList(id);
          console.log("LIST< ID", list, id);
          const res = filterData(list, id, setDataList)
          console.log("listss", res);
          setDatas(res);
          setCurDatas(currentDatas(res));
        })
      } else{
        setDatas(curDataList);
        setCurDatas(currentDatas(curDataList));
      }
    }
  }, [currentPage])
  console.log("DDATTA", datas);
  // console.log("CNTT", count);

  function currentDatas(tmp) {
    const indexOfLast = (((currentPage-1) % 5) + 1) * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;
    let current = 0;
    // console.log("LINDEXL", indexOfLast, "INDFIRST", indexOfFirst);
    current = tmp.slice(indexOfFirst, indexOfLast);
    return current;
  }
  const paginate = (page) => {
    console.log("PAGE", page)
    checkAllBtn.current.checked = false;
    setCheckList([]);
    setCurrentPage(page)
    
  }
  const checkAll = (e) => {
    setCheckList(e.target.checked ? currentDatas(idList) : []);
    setCheckFilenameList(e.target.checked ? filenameList : []);
  }

  const checkEach = (e, id, flist) => {
    console.log("CHECKLIST", checkList);
    if (e.target.checked) {
      setCheckList([...checkList, id]);
      setCheckFilenameList([...checkFilenameList, flist]);
    } else {
      setCheckList(checkList.filter((checkedId) => checkedId !== id));
      setCheckFilenameList(checkFilenameList.filter((cfList) => cfList !== flist));
    }
  }
  const onClickDel = (e) => {
    e.preventDefault();
    console.log("DELELELELTEL", checkList, "CHIFILE", checkFilenameList[0]);
    if (checkList == '') {
      window.alert("삭제할 항목을 골라 주세요");
      return
    };
    if (window.confirm("삭제하시겠습니까?")) {
      checkList.map((id, i) => {
        console.log("III", i);
        if (checkFilenameList[i]) {
          console.log("CHEKCFILIST", checkFilenameList[i]);
          checkFilenameList[i].map((file) => {
            const ref = storage.ref().child(file);
            ref.delete();
          })
        }
        collection.doc(id).delete().then(() => {
          const newCnt = count - checkList.length;
          console.log("NEWCNT", newCnt);
          switch(kinds) {
            case 'user':
              COUNTER.doc('counter').update({ user: newCnt });
              break;
            case 'schedule':
              COUNTER.doc('counter').update({ schedule: newCnt });
              break;
            case 'question':
              COUNTER.doc('counter').update({ question: newCnt });
              break;
            case 'profile':
              COUNTER.doc('counter').update({ profile: newCnt });
              break;
            case 'notice':
              COUNTER.doc('counter').update({ notice: newCnt });
              break;
            case 'answer':
              COUNTER.doc('counter').update({ answer: newCnt });
              break;
          }
          window.location.reload();
        });
      })
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    setSearch(searchInput.current.value);

  }

  return (
    <div class="">
      {/* <Posts posts={currentPosts(posts)}></Posts> */}
      <div class="row">
        <div class="col-md-12 col-sm-12 ">
          <div class="x_panel">
            <div class="x_title">
              <h2>
                {title} 목록
              </h2>
              <div class="clearfix"></div>
            </div>
            <div class="x_content">
              <form class="row" onSubmit={onSubmit}>
                {/* <div class="row"> */}
                <div class="col-sm-2">
                  <div id="datatable_filter" class="dataTables_filter">
                    <label>
                      <input ref={searchInput} name="search" type="search" class="form-control input-sm" placeholder="검색하기" aria-controls="datatable" />
                    </label>
                  </div>
                </div>
                <div class="col-sm-4" style={{ left: '-40px' }}>
                  <input type="submit" class="btn btn-secondary" value="검색" />
                </div>
                <div class="col-sm-6">
                  <button class="btn btn-danger pull-right" onClick={onClickDel}>삭제</button>
                </div>
                {/* </div> */}
              </form>
              <div class="row">
                <div class="col-sm-12">
                  <div class="card-box table-responsive">
                    <table
                      id="datatable-checkbox"
                      class="table table-striped table-bordered bulk_action"
                      style={{ width: "100%" }}
                    >
                      <thead>
                        <tr>
                          <th>
                            <input ref={checkAllBtn} onChange={checkAll} type="checkbox" id="check-all" />
                          </th>
                          {header && header.map((text, idx) => <th key={idx}>{text}</th>)}

                        </tr>
                      </thead>
                      <tbody>
                        {curDatas && tableDatas(curDatas, checkList, checkEach)}

                      </tbody>

                    </table>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-5 ">
                  <div class="dataTables_info" id="datatable_info" role="status" aria-live="polite">Showing {(currentPage - 1) * postsPerPage + 1} to {curDatas && postsPerPage > curDatas.length ? (currentPage - 1) * postsPerPage + curDatas.length : currentPage * postsPerPage} of {count} entries</div>
                </div>
                <div class="col-sm-7 ">
                  <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={count}
                    paginate={paginate}
                    currentPage={currentPage}
                  ></Pagination>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
