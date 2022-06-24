import React from "react";
import AppLayout from "../components/AppLayout";
import { Route, Routes } from "react-router-dom";
import DataDetail from "../components/DataDetail";
import routes from "../utils/Routes";

import Home from "./Home";
import DataCreateForm from "../components/DataCreate";
import ReqProfileDetail from "./req/ReqProfileDetail";
import ReqUserDetail from "./req/ReqUserDetail";
import AnswerQuestion from "./question/AnswerQuestion";
import Login from "./Login";
import { DataTable } from "../components/DataTable";

function Root() {
  return (
    <Routes>
      <Route path={routes.login} element={<Login />} />
      <Route element={<AppLayout/>}>
        <Route path={routes.home} element={<Home />} />
      
        <Route path={routes.datasUser} element={<DataTable kinds={"user"} />} />
        <Route path={routes.datasUserDetail()} element={<DataDetail kinds={"user"} />} />
        <Route path={routes.datasNotice} element={<DataTable kinds={"notice"} />} />
        <Route path={routes.datasNoticeDetail()} element={<DataDetail kinds={"notice"} />} />
        <Route path={routes.datasSchedule} element={<DataTable kinds={"schedule"} />} />
        <Route path={routes.datasScheduleDetail()} element={<DataDetail kinds={"schedule"} />} />
        <Route path={routes.datasQuestion} element={<DataTable kinds={"question"} />} />
        <Route path={routes.datasQuestionDetail()} element={<DataDetail kinds={"question"} />} />
        <Route path={routes.datasAnswer} element={<DataTable kinds={"answer"} />} />
        <Route path={routes.datasAnswerDetail()} element={<DataDetail kinds={"answer"} />} />
        <Route path={routes.datasProfile} element={<DataTable kinds={"profile"} />} />
        <Route path={routes.datasProfileDetail()} element={<DataDetail kinds={"profile"} />} />

        <Route path={routes.reqUser} element={<DataTable kinds={"reqUser"} />} />
        <Route path={routes.reqProfile} element={<DataTable kinds={"reqProfile"} />} />
        <Route path={routes.reqUserDetail()} element={<ReqUserDetail />} />
        <Route path={routes.reqProfileDetail()} element={<ReqProfileDetail />} />

        <Route path={routes.question} element={<DataTable kinds={'reqQuestion'} />} />
        <Route path={routes.answerQuestion()} element={<AnswerQuestion />} />

        <Route path={routes.createNotice} element={<DataCreateForm kinds={"notice"} />} />
        <Route path={routes.createSchedule} element={<DataCreateForm kinds={"schedule"} />} />
        <Route path={routes.createUser} element={<DataCreateForm kinds={"user"} />} />

      </Route>
    </Routes>
  );
}

export default Root;
