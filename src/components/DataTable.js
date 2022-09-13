import { useState, useEffect, useRef } from "react";
import { USER, NOTICE, SCHEDULE, QUESTION, ANSWER, PROFILE, storage, COUNTER } from "../utils/Firebase";
import { userDatas, userTableDatas } from "../pages/datas/DatasUser";
import { scheduleDatas, scheduleTableDatas } from "../pages/datas/DatasSchedule";
import { questionDatas, questionTableDatas } from "../pages/datas/DatasQuestion";
import { profileDatas, profileTableDatas } from "../pages/datas/DatasProfile";
import { noticeDatas, noticeTableDatas } from "../pages/datas/DatasNotice";
import { answerDatas, answerTableDatas } from "../pages/datas/DatasAnswer";

import { reqUserDatas, reqUserTableDatas } from "../pages/req/ReqUser";
import { reqProfileDatas, reqProfileTableDatas } from "../pages/req/ReqProfile";
import { reqQuestionDatas, reqQuestionTableDatas } from "../pages/question/Question";

import { Link } from 'react-router-dom';
import routes from "../utils/Routes";

export function Pagination({ postsPerPage, totalPosts, paginate, currentPage }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  const last = (parseInt((currentPage - 1) / 5) + 1) * 5;
  const first = last - 5;
  const curPageList = pageNumbers.slice(first, last);
  // // console.log("LAST", last, "FIRST", first, "\nCURPAGELIST", curPageList, "pagenumber", pageNumbers);
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

  const [checkList, setCheckList] = useState([]);
  const [idList, setIdList] = useState([]);
  const [filenameList, setFilenameList] = useState([]);
  const [checkFilenameList, setCheckFilenameList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // const [postsPerPage, setPostsPerPage] = useState(15);
  let postsPerPage = 15;

  const checkAllBtn = useRef();
  const searchType = useRef();
  const searchBtn = useRef();

  const [lastDoc, setLastDoc] = useState('');
  const [dataList, setDataList] = useState([]);
  const [datas, setDatas] = useState([]);
  const [curDatas, setCurDatas] = useState([]);
  const [search, setSearch] = useState({});
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState();
  const [onSearch, setOnSearch] = useState(0);

  let title = '';
  let collection = '';
  let header = [];
  let headerType = [];
  let filterData = '';
  let tableDatas = '';
  let req = false;
  let createLink = '';
  let uploadBtn = '';

  if (kinds === "user") {
    createLink = routes.createUser;
    uploadBtn = 'y'
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
    ];
    headerType = [
      'name',
      'year',
      'birthdate',
      'phoneNum',
      'email',
      'company',
      'check',
      'modifiedDate',
    ]
    filterData = userDatas;
    tableDatas = userTableDatas;
  } else if (kinds === "notice") {
    createLink = routes.createNotice;
    collection = NOTICE;
    title = "공지사항"
    header = [
      '제목',
      '내용',
      '작성자',
      '수정시간',
      '등록시간',
    ];
    headerType = [
      'title',
      'content',
      'creator',
      'modifiedDate',
      'pubDate',
    ];
    filterData = noticeDatas;
    tableDatas = noticeTableDatas;
  } else if (kinds === "schedule") {
    createLink = routes.createSchedule;
    collection = SCHEDULE;
    title = "일정"
    header = [
      '날짜',
      '제목',
      '작성자',
      '내용',
      '수정시간',
    ];
    headerType = [
      'date',
      'title',
      'creator',
      'content',
      'modifiedDate',
    ];
    filterData = scheduleDatas;
    tableDatas = scheduleTableDatas;
  } else if (kinds === "question") {
    collection = QUESTION;
    title = "문의"
    header = [
      '제목',
      '내용',
      '작성자',
      '답변완료',
      '수정시간',
      '등록시간',
    ]
    headerType = [
      'title',
      'content',
      'creator',
      'check',
      'modifiedDate',
      'pubDate',
    ]
    filterData = questionDatas;
    tableDatas = questionTableDatas;
  } else if (kinds === "answer") {
    collection = ANSWER;
    title = "답변"
    header = [
      '제목',
      '내용',
      '작성자',
      '수정시간',
      '등록시간',
    ];
    headerType = [
      'title',
      'content',
      'creator',
      'modifiedDate',
      'pubDate',
    ];
    filterData = answerDatas;
    tableDatas = answerTableDatas;
  } else if (kinds === "profile") {
    collection = PROFILE;
    title = "프로필 수정"
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
    headerType = [
      'name',
      'year',
      'birthdate',
      'phoneNum',
      'email',
      'company',
      'check',
      'modifiedDate',
      'pubDate',
    ]
    filterData = profileDatas;
    tableDatas = profileTableDatas;
  } else if (kinds === "reqUser") {
    req = true;
    collection = USER;
    title = "회원 승인"
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
    headerType = [
      'name',
      'year',
      'birthdate',
      'phoneNum',
      'email',
      'company',
      'check',
      'modifiedDate',
      'pubDate',
    ]
    filterData = reqUserDatas;
    tableDatas = reqUserTableDatas;
  } else if (kinds === "reqProfile") {
    req = true;
    collection = PROFILE;
    title = "프로필 수정 승인"
    header = [
      '이름',
      '기수',
      '생년월일',
      '전화번호',
      '이메일',
      '회사명',
      '수정승인완료',
      '수정시간',
      '등록시간',
    ];
    headerType = [
      'name',
      'year',
      'birthdate',
      'phoneNum',
      'email',
      'company',
      'check',
      'modifiedDate',
      'pubDate',
    ]
    filterData = reqProfileDatas;
    tableDatas = reqProfileTableDatas;
  } else if (kinds === "reqQuestion") {
    collection = QUESTION;
    title = "문의답변";
    header = [
      '제목',
      '내용',
      '작성자',
      '답변완료',
      '수정시간',
      '등록시간',
    ]
    headerType = [
      'title',
      'content',
      'creator',
      'check',
      'modifiedDate',
      'pubDate',
    ]
    filterData = reqQuestionDatas;
    tableDatas = reqQuestionTableDatas;
  }
  // 처음 데이터 15개 불러오기
  useEffect(() => {
    let list = [];
    let id = [];
    let getDocs = '';

    if (!search.input) {
      // console.log('search', search);
      setSearch({ title: headerType[0], text: header[0] });
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
            case 'reqUser':
              setCount(doc.data().reqUser)
              break;
            case 'reqProfile':
              setCount(doc.data().reqProfile)
              break;
            case 'reqQuestion':
              setCount(doc.data().question)
              break;
          };
        };
      });
      if (req) {
        getDocs = collection.orderBy("modifiedDate", "desc").where("check", "==", "X").limit(75).get()
      } else {
        getDocs = collection.orderBy("modifiedDate", "desc").limit(75).get()
      }

    } else {
      setDataList([]);
      if (req) {
        collection.orderBy('modifiedDate', 'desc').where("check", "==", "X").where(search.title, "==", search.input).get().then((docs) => {
          // console.log("COUNT", docs.docs.length);
          setCount(docs.size);
        })
        getDocs = collection.orderBy('modifiedDate', 'desc').where("check", "==", "X").where(search.title, "==", search.input).limit(75).get()
      } else {
        collection.orderBy('modifiedDate', 'desc').where(search.title, "==", search.input).get().then((docs) => {
          // console.log("COUNT", docs.docs.length);
          setCount(docs.size);
        })
        getDocs = collection.orderBy('modifiedDate', 'desc').where(search.title, "==", search.input).limit(75).get()
      }
    }

    getDocs.then((docs) => {
      // console.log("GETDOOOOOOOOOO", docs);
      // collection.orderBy("name", "asc").startAt("이름").limit(75).get().then((docs) => {
      // collection.orderBy("modifiedDate", "desc").limit(75).get().then((docs) => {
      setLastDoc(docs.docs[docs.size - 1]);
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
  }, [onSearch])

  useEffect(() => {
    let currentPageList = '';
    let curDataList = '';
    if (loading) {
      currentPageList = parseInt((currentPage - 1) / 5)
      curDataList = dataList[currentPageList];
      // console.log("PAGELSIT", currentPageList, curDataList)

      // TODO 생성시 카운터 값 변경, 검색기능 첫부분은 완료, 6페이지 넘어갈때 데이터 받아오는 부분 해야됨
      // 6페이지 11페이지 넘어갈떄
      if (curDataList == undefined) {

        let list = [];
        let id = [];
        let getDocs = '';
        // console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");

        // console.log("LASTDOC", lastDoc);
        // const q = query(collection, orderBy("modifiedDate", "desc"), startAfter(lastDoc), limit(75))

        if (!search.input) {
          if (req) {
            getDocs = collection.orderBy("modifiedDate", "desc").where("check", "==", "X").startAfter(lastDoc).limit(75).get()
          }
          getDocs = collection.orderBy("modifiedDate", "desc").startAfter(lastDoc).limit(75).get()
        } else {
          if (req) {
            getDocs = collection.orderBy("modifiedDate", "desc").where("check", "==", "X").where(search.title, "==", search.input).startAfter(lastDoc).limit(75).get()
          }
          getDocs = collection.orderBy("modifiedDate", "desc").where(search.title, "==", search.input).startAfter(lastDoc).limit(75).get()
        }
        getDocs.then((docs) => {
          setLastDoc(docs.docs[docs.docs.length - 1]);
          docs.forEach((doc) => {
            if (doc.exists) {
              list.push(doc.data());
              id.push(doc.id);
            }
          });
          setIdList(id);
          // console.log("LIST< ID", list, id);
          const res = filterData(list, id, setDataList)
          // console.log("listss", res);
          setDatas(res);
          setCurDatas(currentDatas(res));
        })
      } else {
        setDatas(curDataList);
        setCurDatas(currentDatas(curDataList));
      }
    }
  }, [currentPage])
  // console.log("DDATTA", dataList);
  // // console.log("CNTT", count);

  function currentDatas(tmp) {
    const indexOfLast = (((currentPage - 1) % 5) + 1) * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;
    let current = 0;
    // // console.log("LINDEXL", indexOfLast, "INDFIRST", indexOfFirst);
    current = tmp.slice(indexOfFirst, indexOfLast);
    return current;
  }
  const paginate = (page) => {
    // console.log("PAGE", page)
    checkAllBtn.current.checked = false;
    setCheckList([]);
    setCurrentPage(page)

  }
  const checkAll = (e) => {
    setCheckList(e.target.checked ? currentDatas(idList) : []);
    setCheckFilenameList(e.target.checked ? filenameList : []);
  }

  const checkEach = (e, id, flist) => {
    // console.log("CHECKLIST", checkList);
    if (e.target.checked) {
      setCheckList([...checkList, id]);
      setCheckFilenameList([...checkFilenameList, flist]);
    } else {
      setCheckList(checkList.filter((checkedId) => checkedId !== id));
      setCheckFilenameList(checkFilenameList.filter((cfList) => cfList !== flist));
    }
  }
  function CreateButton(){
    
    return(
      <Link to={createLink} class="btn btn-primary pull-right">생성</Link>
    )
  }
  const onClickDel = async (e) => {
    e.preventDefault();
    // console.log("DELELELELTEL", checkList, "CHIFILE", checkFilenameList[0]);
    if (checkList == '') {
      window.alert("삭제할 항목을 골라 주세요");
      return
    };
    if (window.confirm("삭제하시겠습니까?")) {
      // console.log("CHCCKLIST", checkList);
      const cntData = await COUNTER.doc('counter').get();
      const cnt = cntData.data();
      const newCnt = count - checkList.length;
      // console.log("NEWCNT", newCnt);
      switch (kinds) {
        case 'user':
          COUNTER.doc('counter').update({ user: newCnt });
          break;
        case 'schedule':
          COUNTER.doc('counter').update({ schedule: newCnt });
          break;
        case 'notice':
          COUNTER.doc('counter').update({ notice: newCnt });
          break;
        case 'answer':
          COUNTER.doc('counter').update({ answer: newCnt });
          break;
        case 'reqUser':
          COUNTER.doc('counter').update({ reqUser: newCnt });
          break;
        case 'reqProfile':
          COUNTER.doc('counter').update({ reqProfile: newCnt });
          break;
        case 'reqQuestion':
          COUNTER.doc('counter').update({ question: newCnt });
          break;
      }
      if (req) {
        
        switch (kinds) {
          case 'reqUser':
            COUNTER.doc('counter').update({ user: cnt.user - checkList.length });
            break;
          case 'reqProfile':
            COUNTER.doc('counter').update({ profile: cnt.profile - checkList.length });
            break;
        }
      }
      let reqCnt = '';
      switch (kinds) {
        case "user":
          reqCnt = cnt.reqUser;
          break;
      }

      const promises = checkList.map(async (id, i) => {
        // console.log("III", i);
        if (checkFilenameList[i]) {
          // console.log("CHEKCFILIST", checkFilenameList[i]);
          const ref = storage.ref().child(checkFilenameList[i]);
          ref.delete();

        }
        const doc = await collection.doc(id).get();
        // console.log("DOOCCCCC", doc);
        if(doc.exists) {
          // console.log("DOCOCOCC", doc.data());
          if (doc.data().check === "X") {
            switch (kinds) {
              case "user":
                COUNTER.doc('counter').update({ reqUser: reqCnt - 1 });
                break;
            }
            reqCnt = reqCnt - 1;
          }
        } else {
          console.log("there is no collection")
        }
        await collection.doc(id).delete()
        console.log("IDDD", id)
        if (kinds === 'reqQuestion'){
          ANSWER.where('question', '==', id).get().then(async(doc) => {
            if (doc.docs[0].exists) {
              console.log("IFFF", doc)
              await ANSWER.doc(doc.docs[0].id).delete()
            }
          })
        }

        return
      })
      await Promise.all(promises);
      window.location.reload();
      
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    setOnSearch(onSearch + 1);
  }
  const onClickSearchType = (e) => {
    const { innerText, title } = e.target;
    // // console.log("VALASUEL", e.target.title);
    searchType.current.classList.value = 'dropdown-menu';
    // searchBtn.current.innerText = innerText;
    setSearch({
      ...search,
      text: innerText,
      title: title
    })
  }

  const onClickSearchBtn = (e) => {
    let { classList } = searchType.current;

    if (classList.length === 1) {
      searchType.current.classList.value = 'dropdown-menu show';
    } else {
      searchType.current.classList.value = 'dropdown-menu';
    }
  }

  const onChangeSearch = (e) => {
    const { value } = e.target;
    setSearch((cur) => ({
      ...cur,
      input: value,
    }))
  }
  // console.log("Datas", datas);
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
                <div class="col-sm-1">
                  <button onClick={onClickSearchBtn} ref={searchBtn} type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {search.text}
                  </button>
                  <div ref={searchType} class="dropdown-menu" aria-labelledby="btnGroupDrop1" x-placement="bottom-start" style={{ position: "absolute", willChange: 'transform', top: '0px', left: '10px', transform: 'translate3d(0px, 38px, 0px)' }}>
                    {header && header.map((txt, i) => {
                      if (txt !== "수정시간") {
                        return <div key={i} onClick={onClickSearchType} title={headerType[i]} class="dropdown-item">{txt}</div>
                      }
                    })}
                  </div>
                </div>
                {/* <div class="row"> */}
                <div class="col-sm-2" style={{ marginLeft: "-10px" }}>
                  <div id="datatable_filter" class="dataTables_filter">
                    <label>
                      <input onChange={onChangeSearch} name="search" type="search" class="form-control input-sm" placeholder="검색하기" aria-controls="datatable" />
                    </label>
                  </div>
                </div>
                <div class="col-sm-4" style={{ left: '-40px' }}>
                  <input type="submit" class="btn btn-secondary" value="검색" />
                </div>
                {/* <div class="col-sm-5">
                  <button class="btn btn-primary pull-right" onClick={onClickCreate}>생성</button>
                </div> */}
                <div class="col-sm-5">
                  {uploadBtn && <Link to={routes.uploadUser} class="btn btn-success pull-right">유저 업로드</Link>}
                  {createLink && <CreateButton/>}
                </div>
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
                <div class="col ">
                  <div class="dataTables_info" id="datatable_info" role="status" aria-live="polite">Showing {datas.length === 0 ? 0 : (currentPage - 1) * postsPerPage + 1 } to {curDatas && postsPerPage > curDatas.length ? (currentPage - 1) * postsPerPage + curDatas.length : currentPage * postsPerPage} of {count} entries</div>
                </div>
                <div class="col" style={{display: "flex", justifyContent: "center"}}>
                  <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={count}
                    paginate={paginate}
                    currentPage={currentPage}
                  ></Pagination>
                </div>
                <div class="col">
                  <button class="btn btn-danger pull-right" onClick={onClickDel}>삭제</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
