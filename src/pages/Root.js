import React from "react";
import AppLayout from "../components/AppLayout";
import DataTable from "../components/DataTable";
import { Route, Routes } from "react-router-dom";
import routes from "../utils/Routes";

import Home from "./Home";
import CreateNotice from "./CreateNotice";
import CreateSchedule from "./CreateSchedule";
import DatasAnswer from "./DatasAnswer";
import DatasNotice from "./DatasNotice";
import DatasQuestion from "./DatasQuestion";
import DatasSchedule from "./DatasSchedule";
import DatasProfile from "./DatasProfile";
import DatasUser from "./DatasUser";
import Question from "./Question";
import ReqProfile from "./ReqProfile";
import ReqUser from "./ReqUser";

function Root() {
  return (
    <AppLayout>
      <Routes>
        <Route path={routes.home} element={<Home />} />

        <Route path={routes.datasUser} element={<DatasUser />} />
        <Route path={routes.datasNotice} element={<DatasNotice />} />
        <Route path={routes.datasSchedule} element={<DatasSchedule />} />
        <Route path={routes.datasQuestion} element={<DatasQuestion />} />
        <Route path={routes.datasAnswer} element={<DatasAnswer />} />
        <Route path={routes.datasProfile} element={<DatasProfile />} />

        <Route path={routes.reqUser} element={<ReqUser />} />
        <Route path={routes.reqProfile} element={<ReqProfile />} />

        <Route path={routes.question} element={<Question />} />

        <Route path={routes.createNotice} element={<CreateNotice />} />
        <Route path={routes.createSchedule} element={<CreateSchedule />} />
      </Routes>
    </AppLayout>
  );
}

export default Root;
