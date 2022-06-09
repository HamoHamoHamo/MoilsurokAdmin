import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./pages/Root";
import { BrowserRouter } from "react-router-dom";

import "./vendors/bootstrap/dist/css/bootstrap.min.css";
import "./vendors/font-awesome/css/font-awesome.min.css";
import "./vendors/nprogress/nprogress.css";
import "./vendors/iCheck/skins/flat/green.css";
import "./vendors/bootstrap-progressbar/css/bootstrap-progressbar-3.3.4.min.css";
import "./vendors/jqvmap/dist/jqvmap.min.css";
import "./vendors/bootstrap-daterangepicker/daterangepicker.css";
import "./vendors/custom.min.css";

import "./vendors/datatables.net-bs/css/dataTables.bootstrap.min.css";
import "./vendors/datatables.net-buttons-bs/css/buttons.bootstrap.min.css";
import "./vendors/datatables.net-fixedheader-bs/css/fixedHeader.bootstrap.min.css";
import "./vendors/datatables.net-responsive-bs/css/responsive.bootstrap.min.css";
import "./vendors/datatables.net-scroller-bs/css/scroller.bootstrap.min.css";

import $ from "jquery";
window.jQuery = $;
window.$ = $;
global.jQuery = $;

const body = document.getElementById("root");
const root = ReactDOM.createRoot(body);

root.render(
  <BrowserRouter>
    <Root />
  </BrowserRouter>
);
