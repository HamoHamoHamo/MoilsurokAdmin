const HOME = "/";
const LOGIN = "/login";
const DATAS_USER = "/datas/user";
const DATAS_USER_DETAIL = "/datas/user/:id";
const DATAS_NOTICE = "/datas/notice";
const DATAS_NOTICE_DETAIL = "/datas/notice/:id";
const DATAS_SCHEDULE = "/datas/schedule";
const DATAS_SCHEDULE_DETAIL = "/datas/schedule/:id";
const DATAS_PROFILE = "/datas/profile";
const DATAS_PROFILE_DETAIL = "/datas/profile/:id";

const REQ_USER = "/req/user";
const REQ_PROFILE = "/req/profile";
const REQ_USER_DETAIL = "/req/user/:id";
const REQ_PROFILE_DETAIL = "/req/profile/:id";

const QUESTION = "/question";
const ANSWER_QUESTION = "/question/:id";

const CREATE_USER = "/create/user";
const CREATE_NOTICE = "/create/notice";
const CREATE_SCHEDULE = "/create/schedule";
const CREATE_ANSWER = "/create/answer";
const UPLOAD_USER = "/create/upload/user";

const routes = {
  home: HOME,
  login: LOGIN,
  datasUser: DATAS_USER,
  datasUserDetail : (id) => {
    if(id) {
      return `/datas/user/${id}`;
    } else {
      return DATAS_USER_DETAIL;
    }
  },
  datasNotice: DATAS_NOTICE,
  datasNoticeDetail : (id) => {
    if(id) {
      return `/datas/notice/${id}`;
    } else {
      return DATAS_NOTICE_DETAIL;
    }
  },
  datasSchedule: DATAS_SCHEDULE,
  datasScheduleDetail : (id) => {
    if(id) {
      return `/datas/schedule/${id}`;
    } else {
      return DATAS_SCHEDULE_DETAIL;
    }
  },

  datasProfile: DATAS_PROFILE,
  datasProfileDetail : (id) => {
    if(id) {
      return `/datas/profile/${id}`;
    } else {
      return DATAS_PROFILE_DETAIL;
    }
  },

  reqUser: REQ_USER,
  reqUserDetail : (id) => {
    if(id) {
      return `/req/user/${id}`;
    } else {
      return REQ_USER_DETAIL;
    }
  },
  reqProfile: REQ_PROFILE,
  reqProfileDetail : (id) => {
    if(id) {
      return `/req/profile/${id}`;
    } else {
      return REQ_PROFILE_DETAIL;
    }
  },

  question: QUESTION,
  answerQuestion : (id) => {
    if(id) {
      return `/question/${id}`;
    } else {
      return ANSWER_QUESTION;
    }
  },

  createNotice: CREATE_NOTICE,
  createSchedule: CREATE_SCHEDULE,
  createUser: CREATE_USER,
  createAnswer: CREATE_ANSWER,
  uploadUser: UPLOAD_USER,
};

export default routes;
