const HOME = "/";
const LOGIN = "/login";
const DATAS_USER = "/datas/user";
const DATAS_USER_DETAIL = "/datas/user/:id";
const DATAS_NOTICE = "/datas/notice";
const DATAS_NOTICE_DETAIL = "/datas/notice/:id";
const DATAS_GALLERY = "/datas/gallery";
const DATAS_GALLERY_DETAIL = "/datas/gallery/:id";
const DATAS_SCHEDULE = "/datas/schedule";
const DATAS_SCHEDULE_DETAIL = "/datas/schedule/:id";

const DATAS_EXECUTIVE = "/datas/executive";
const DATAS_EXECUTIVE_LIST = "/datas/executive/:id";
const DATAS_EXECUTIVE_DETAIL = "/datas/executive/:id/:detail";
const DATAS_COMMITTEE = "/datas/committee";
const DATAS_COMMITTEE_DETAIL = "/datas/committee/:id";

const REQ_PROFILE = "/req/profile";
const REQ_PROFILE_DETAIL = "/req/profile/:id";

const QUESTION = "/question";
const ANSWER_QUESTION = "/question/:id";

const CREATE_USER = "/create/user";
const CREATE_NOTICE = "/create/notice";
const CREATE_GALLERY = "/create/gallery";
const CREATE_SCHEDULE = "/create/schedule";
const CREATE_ANSWER = "/create/answer";
const UPLOAD_USER = "/create/upload/user";
const CREATE_EXECUTIVE = "/create/executive/:id/create";

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
  datasGallery: DATAS_GALLERY,
  datasGalleryDetail : (id) => {
    if(id) {
      return `/datas/gallery/${id}`;
    } else {
      return DATAS_GALLERY_DETAIL;
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
  datasExecutive: DATAS_EXECUTIVE,
  datasExecutiveList : (id) => {
    if(id) {
      return `/datas/executive/${id}`;
    } else {
      return DATAS_EXECUTIVE_LIST;
    }
  },
  datasExecutiveDetail : (detail, id) => {
    if(detail && id) {
      return `/datas/executive/${detail}/${id}`;
    } else {
      return DATAS_EXECUTIVE_DETAIL;
    }
  },
  datasCommittee: DATAS_COMMITTEE,
  datasCommitteeDetail : (id) => {
    if(id) {
      return `/datas/committee/${id}`;
    } else {
      return DATAS_COMMITTEE_DETAIL;
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
  createGallery: CREATE_GALLERY,
  createSchedule: CREATE_SCHEDULE,
  createUser: CREATE_USER,
  createAnswer: CREATE_ANSWER,
  uploadUser: UPLOAD_USER,
  createExecutive : (id) => {
    if(id) {
      return `/create/executive/${id}/create`;
    } else {
      return CREATE_EXECUTIVE;
    }
  },

};

const date = new Date(+new Date() + 3240 * 10000).toISOString().split("T")[0]
const time = new Date().toTimeString().split(" ")[0];
let today = date + ' ' + time.substring(0,5);
export { today };

export default routes;
