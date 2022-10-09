import React, { useEffect, useRef, useState } from "react";
// import "../vendors/jquery/dist/jquery.min.js";
// import "../vendors/bootstrap/dist/js/bootstrap.min.js";
import styles from "./AppLayout.module.css";
import routes from "../utils/Routes";
// import { Link } from 'react-router-dom'; 사이드바 애니메이션 꼬여서 안씀
import { Outlet, useNavigate } from "react-router-dom";
import { auth } from "../utils/Firebase";

import $ from "jquery";
window.jQuery = $;
window.$ = $;
global.jQuery = $;

function AppLayout() {
  const pathname = window.location.pathname;
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (pathname === "/") {
      setTitle("일정");

    } else if (pathname.startsWith("/datas/")) {
      setTitle("데이터 목록");

    } else if (pathname.startsWith("/req/")) {
      setTitle("요청승인");

    } else if (pathname.startsWith("/question/")) {
      setTitle("문의답변");

    } else if (pathname.startsWith("/create/")) {
      setTitle("데이터 생성");
    }
    auth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
        // console.log("LOGGED IN");
      } else {
        setLoggedIn(false);
        // console.log("LOGGED OUT");
        alert("로그인 해주세요")
        navigate(routes.login);
      }
    })

    var CURRENT_URL = window.location.href.split("#")[0].split("?")[0],
      $BODY = $("body"),
      $MENU_TOGGLE = $("#menu_toggle"),
      $SIDEBAR_MENU = $("#sidebar-menu"),
      $SIDEBAR_FOOTER = $(".sidebar-footer"),
      $LEFT_COL = $(".left_col"),
      $RIGHT_COL = $(".right_col"),
      $NAV_MENU = $(".nav_menu"),
      $FOOTER = $("footer");
    function init_sidebar() {
      // TODO: This is some kind of easy fix, maybe we can improve this
      var setContentHeight = function () {
        // reset height
        // $RIGHT_COL.css("min-height", $(window).height());

        var bodyHeight = $BODY.outerHeight(),
          footerHeight = $BODY.hasClass("footer_fixed")
            ? -10
            : $FOOTER.height(),
          leftColHeight = $LEFT_COL.eq(1).height() + $SIDEBAR_FOOTER.height(),
          contentHeight =
            bodyHeight < leftColHeight ? leftColHeight : bodyHeight;

        // normalize content
        // contentHeight -= $NAV_MENU.height() + footerHeight;

        // $RIGHT_COL.css("min-height", contentHeight);
      };

      var openUpMenu = function () {
        $SIDEBAR_MENU.find("li").removeClass("active active-sm");
        $SIDEBAR_MENU.find("li ul").slideUp();
      };

      $SIDEBAR_MENU.find("a").on("click", function (ev) {
        var $li = $(this).parent();
        if ($li.is(".active")) {
          $li.removeClass("active active-sm");
          $("ul:first", $li).slideUp(function () {
            setContentHeight();
          });
        } else {
          // prevent closing menu if we are on child menu
          if (!$li.parent().is(".child_menu")) {
            openUpMenu();
          } else {
            if ($BODY.is("nav-sm")) {
              if (!$li.parent().is("child_menu")) {
                openUpMenu();
              }
            }
          }

          $li.addClass("active");

          $("ul:first", $li).slideDown(function () {
            setContentHeight();
          });
        }
      });

      // toggle small or large menu
      $MENU_TOGGLE.on("click", function () {
        if ($BODY.hasClass("nav-md")) {
          $SIDEBAR_MENU.find("li.active ul").hide();
          $SIDEBAR_MENU
            .find("li.active")
            .addClass("active-sm")
            .removeClass("active");
        } else {
          $SIDEBAR_MENU.find("li.active-sm ul").show();
          $SIDEBAR_MENU
            .find("li.active-sm")
            .addClass("active")
            .removeClass("active-sm");
        }

        $BODY.toggleClass("nav-md nav-sm");

        setContentHeight();

        $(".dataTable").each(function () {
          $(this).dataTable().fnDraw();
        });
      });

      // check active menu
      // $SIDEBAR_MENU
      //   .find('a[href="' + CURRENT_URL + '"]')
      //   .parent("li")
      //   .addClass("current-page");
      if (pathname === routes.home) {
        $SIDEBAR_MENU
          .find("a")
          .filter(function () {
            return this.href == CURRENT_URL;
          })
          .parent("li")
          .addClass("active");
      }
      else {
        $SIDEBAR_MENU
          .find("a")
          .filter(function () {
            return this.href == CURRENT_URL;
          })
          .parent("li")
          .addClass("current-page")
          .parents("ul")
          .slideDown(function () {
            setContentHeight();
          })
          .parent()
          .addClass("active");
      }


      // // recompute content when resizing
      // $(window).smartresize(function () {
      //   setContentHeight();
      // });

      setContentHeight();

      // fixed sidebar
      if ($.fn.mCustomScrollbar) {
        $(".menu_fixed").mCustomScrollbar({
          autoHideScrollbar: true,
          theme: "minimal",
          mouseWheel: { preventDefault: true },
        });
      }
    }
    init_sidebar();

  }, []);


  const [title, setTitle] = useState("");
  const sideHome = useRef();
  const sideDatas = useRef();
  const sideReq = useRef();
  const sideQst = useRef();
  const sideCreate = useRef();

  let navigate = useNavigate();
  const logout = () => {
    auth.signOut();
    navigate(routes.login);
  }
  return (
    <>
      <div class="container body">
        <div class="main_container">
          <div class="col-md-3 left_col">
            <div class="left_col scroll-view">
              <div class="navbar nav_title flex_center" style={{ border: 0 }}>
                <a href={routes.home} class="site_title" style={{ lineHeight: 'normal' }}>
                  {/* <img src="/images/title.png" /> */}
                  서울대 Sparc
                </a>
              </div>

              <div class="clearfix"></div>

              {/* <!-- menu profile quick info --> */}

              {/* <!-- /menu profile quick info --> */}

              <br />

              {/* <!-- sidebar menu --> */}
              <div
                id="sidebar-menu"
                class="main_menu_side hidden-print main_menu"
              >
                <div class="menu_section">
                  <ul class="nav side-menu">
                    <li ref={sideHome}>
                      <a href={routes.home}>일정</a>
                    </li>
                    <li ref={sideDatas}>
                      <a>
                        데이터 목록 <span class="fa fa-chevron-down"></span>
                      </a>
                      <ul class="nav child_menu">
                        <li>
                          <a href={routes.datasUser}>회원</a>
                        </li>
                        <li>
                          <a href={routes.datasExecutive}>임원단</a>
                        </li>
                        <li>
                          <a href={routes.datasCommittee}>운영위원회</a>
                        </li>
                        <li>
                          <a href={routes.datasNotice}>공지사항</a>
                        </li>
                        <li>
                          <a href={routes.datasSchedule}>일정</a>
                        </li>
                      </ul>
                    </li>
                    {/* <li ref={sideCreate}>
                      <a>
                        데이터 생성 <span class="fa fa-chevron-down"></span>
                      </a>
                      <ul class="nav child_menu">
                        <li>
                          <a href={routes.createUser}>회원</a>
                        </li>
                        <li>
                          <a href={routes.createNotice}>공지사항</a>
                        </li>
                        <li>
                          <a href={routes.createSchedule}>일정</a>
                        </li>
                        <li>
                          <a href={routes.uploadUser}>회원 업로드</a>
                        </li>
                      </ul>
                    </li> */}
                    <li ref={sideReq}>
                      <a href={routes.reqProfile}>프로필 수정 승인</a>
                    </li>
                    <li ref={sideQst}>
                      <a href={routes.question}>문의답변</a>
                    </li>

                    <li>
                      <a class="logout" href="#" onClick={logout}>
                        로그아웃
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              {/* <!-- /sidebar menu --> */}

              {/* <!-- /menu footer buttons --> */}

              {/* <!-- /menu footer buttons --> */}
            </div>
          </div>

          {/* <!-- top navigation --> */}
          <div class="top_nav">
            <div class="nav_menu">
              <div class="nav toggle">
                  <a id="menu_toggle"><i class="fa fa-bars"></i></a>
              </div>
              <div class="header_title">{title}</div>
              <div class="header_name">관리자 이름</div>
            </div>
          </div>
          {/* <!-- /top navigation --> */}

          {/* <!-- page content --> */}
          <div class="right_col" role="main" style={{minHeight: '100vh'}}>
            <Outlet />
          </div>
          {/* <!-- /page content --> */}

          {/* <!-- footer content --> */}
          {/* <footer>
            <div class="pull-right">footer</div>
            <div class="clearfix"></div>
          </footer> */}
          {/* <!-- /footer content --> */}
        </div>
      </div>
    </>
  );
}

export default AppLayout;

// require("../vendors/fastclick/lib/fastclick.js");
// require("../vendors/nprogress/nprogress.js");
// require("../vendors/gauge.js/dist/gauge.min.js");
// require("../vendors/bootstrap-progressbar/bootstrap-progressbar.min.js");
// require("../vendors/iCheck/icheck.min.js");
// require("../vendors/skycons/skycons.js");
// require("../vendors/DateJS/build/date.js");
// require("../vendors/jqvmap/dist/jquery.vmap.js");
// require("../vendors/jqvmap/dist/maps/jquery.vmap.world.js");
// require("../vendors/jqvmap/examples/js/jquery.vmap.sampledata.js");
// require("../vendors/moment/min/moment.min.js");
// require("../vendors/bootstrap-daterangepicker/daterangepicker.js");
// require("../vendors/custom.min.js");
