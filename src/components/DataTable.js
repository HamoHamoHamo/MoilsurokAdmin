import react, { useState, useEffect } from "react";

export function Pagination({
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
}) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
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
              paginate(currentPage > 1 ? currentPage - 1 : currentPage);
            }}
          >
            {">"}
          </a>
        </li>
      </ul>
    </div>
  );
}

export function DataTable() {

  const [posts, setPosts] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6,
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(15);

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  function currentPosts(tmp) {
    let currentPosts = 0;
    currentPosts = tmp.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  }

  return (
    <div class="">
      {/* <Posts posts={currentPosts(posts)}></Posts> */}
      <div class="row">
        <div class="col-md-12 col-sm-12 ">
          <div class="x_panel">
            <div class="x_title">
              <h2>
                Default Example <small>Users</small>
              </h2>
              <div class="clearfix"></div>
            </div>
            <div class="x_content">
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
                            <input type="checkbox" id="check-all" />
                          </th>
                          {/* 테이블 헤더 값 받아서 변할수 있게 해주기 */}
                          <th>Name</th>
                          <th>Position</th>
                          <th>Office</th>
                          <th>Age</th>
                          <th>Start date</th>
                          <th>Salary</th>
                          <th>Salary</th>
                          <th>Salary</th>
                          <th>Salary</th>
                          <th>Salary</th>
                        </tr>
                      </thead>

                      <tbody>
                        {currentPosts(posts).map((data) => (
                          <tr>
                            <td>
                              <input type="checkbox" id="check-all" />
                            </td>
                            <td>Tiger Nixon</td>
                            <td>System Architect</td>
                            <td>Edinburgh</td>
                            <td>61</td>
                            <td>2011/04/25</td>
                            <td>$320,800</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div class="row">
                <Pagination
                  postsPerPage={postsPerPage}
                  totalPosts={posts.length}
                  paginate={setCurrentPage}
                  currentPage={currentPage}
                ></Pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
