import { useState, useEffect, useRef } from "react";
import { storage } from "../utils/Firebase";

export function Pagination({ postsPerPage, totalPosts, paginate, currentPage }){
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  const lastPage = pageNumbers[pageNumbers.length-1];
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
        {pageNumbers.map((number) => {
          let classList = '';
          if(number === currentPage){
            classList = "curPage";
          }
          return(
            <li key={number} class="paginate_button">
            <a
              href="#"
              onClick={() => paginate(number)}
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

export function DataTable({ title, header, tableDatas, dataList, search, setSearch, collection }) {
  const [checkList, setCheckList] = useState([]);
  const [idList, setIdList] = useState([]);
  const [filenameList, setFilenameList] = useState([]);
  const [checkFilenameList, setCheckFilenameList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(15);
  const searchInput = useRef();
  const checkAllBtn = useRef();
  useEffect(() => {
    let list = [];
    let flist = [];
    console.log("DATALIST", dataList);
    
    currentDatas(dataList).map((a, i) => {
      list[i] = a ? a.id : null;
      flist[i] = a.filenames ? a.filenames : '';
    });
    
    setFilenameList(flist);
    setIdList(list);
  }, [currentPage]);
  
  // console.log("IDXLIST", idList)
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  
  function currentDatas(tmp) {
    let current = 0;
    current = tmp.slice(indexOfFirst, indexOfLast);
    return current;
  }
  const paginate = (page) => {
    checkAllBtn.current.checked = false;
    setCheckList([]);
    setCurrentPage(page)
  }
  const checkAll = (e) => {
    setCheckList(e.target.checked ? idList : []);
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
    if (checkList == ''){
      window.alert("삭제할 항목을 골라 주세요");
      return
    };
    if(window.confirm("삭제하시겠습니까?")){
      checkList.map((id, i) => {
        console.log("III", i);
        if(checkFilenameList[i]){
          console.log("CHEKCFILIST", checkFilenameList[i]);
          checkFilenameList[i].map((file) => {
            const ref = storage.ref().child(file);
            ref.delete();
          })
        }
        collection.doc(id).delete().then(() => {
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
                  <div class="col-sm-4" style={{left: '-40px'}}>
                    <input type="submit" class="btn btn-secondary" value="검색"/>
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
                        {dataList !== undefined && tableDatas(currentDatas(dataList), checkList, checkEach)}

                      </tbody>
                      
                    </table>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-5 ">
                  <div class="dataTables_info" id="datatable_info" role="status" aria-live="polite">Showing {dataList.length > 0 ? (currentPage-1) * postsPerPage + 1 : 0} to {currentPage * postsPerPage > dataList.length ? dataList.length : currentPage * postsPerPage} of {dataList.length} entries</div>
                </div>
                <div class="col-sm-7 ">
                  <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={dataList.length}
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
