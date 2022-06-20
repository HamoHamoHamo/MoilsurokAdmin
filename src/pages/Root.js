import React from "react";
import AppLayout from "../components/AppLayout";
import DataTable from "../components/DataTable";
import { Route, Routes } from "react-router-dom";
import DataDetail from "../components/DataDetail";
import routes from "../utils/Routes";

import Home from "./Home";
import DataCreateForm from "../components/DataCreate";
import DatasAnswer from "./datas/DatasAnswer";
import DatasNotice from "./datas/DatasNotice";
import DatasQuestion from "./datas/DatasQuestion";
import DatasSchedule from "./datas/DatasSchedule";
import DatasProfile from "./datas/DatasProfile";
import DatasUser from "./datas/DatasUser";
import Question from "./Question";
import ReqProfile from "./ReqProfile";
import ReqUser from "./ReqUser";


function Root() {
  return (
    <AppLayout>
      <Routes>
        <Route path={routes.home} element={<Home />} />

        <Route path={routes.datasUser} element={<DatasUser />} />
        <Route path={routes.datasUserDetail()} element={<DataDetail kinds={"user"} />} />
        <Route path={routes.datasNotice} element={<DatasNotice />} />
        <Route path={routes.datasNoticeDetail()} element={<DataDetail kinds={"notice"} />} />
        <Route path={routes.datasSchedule} element={<DatasSchedule />} />
        <Route path={routes.datasScheduleDetail()} element={<DataDetail kinds={"schedule"} />} />
        <Route path={routes.datasQuestion} element={<DatasQuestion />} />
        <Route path={routes.datasQuestionDetail()} element={<DataDetail kinds={"question"} />} />
        <Route path={routes.datasAnswer} element={<DatasAnswer />} />
        <Route path={routes.datasAnswerDetail()} element={<DataDetail kinds={"answer"} />} />
        <Route path={routes.datasProfile} element={<DatasProfile />} />
        <Route path={routes.datasProfileDetail()} element={<DataDetail kinds={"profile"} />} />

        <Route path={routes.reqUser} element={<ReqUser />} />
        <Route path={routes.reqProfile} element={<ReqProfile />} />

        <Route path={routes.question} element={<Question />} />

        <Route path={routes.createNotice} element={<DataCreateForm kinds={"notice"} />} />
        <Route path={routes.createSchedule} element={<DataCreateForm kinds={"schedule"} />} />
        <Route path={routes.createUser} element={<DataCreateForm kinds={"user"} />} />
      </Routes>
    </AppLayout>
  );
}

export default Root;
