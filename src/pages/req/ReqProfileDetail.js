import { useEffect, useState } from "react";
import DataReqDetailForm from "../../components/DataReqDetail";
import { PROFILE, USER, COUNTER } from "../../utils/Firebase";
import { useParams, useNavigate } from "react-router-dom";
import routes from "../../utils/Routes";

export default function ReqProfileDetail() {
  const { id } = useParams();
  const [datas, setDatas] = useState({});
  const [userDatas, setUserDatas] = useState({});
  const [status, setStatus] = useState(0);
  const navigate = useNavigate();
  const COL = PROFILE;
  let doing = false;

  useEffect(() => {
    const data = COL.doc(id).get()
    .then((doc) => {
      if (doc.exists) {
        setDatas(doc.data());
        setStatus(1);
        const userid = doc.data().user;
        if (userid) {
          USER.doc(userid).get().then((doc) => {
            if (doc.exists) {
              setUserDatas(doc.data())
              
            }
          })
        }
      } else {
        setStatus(404);
      }
    });
    
  }, []);

  
  const {
    year,
    name,
    phoneNum,
    email,
    company,
    comPosition,
    comTel,
    comAdr,
    faxNum,
    sector,
    check,
    pubDate,
    modifiedDate,
    files,
    filenames,
    user,
  } = datas;

  const {
    year: Uyear,
    name: Uname,
    phoneNum: UphoneNum,
    email: Uemail,
    company: Ucompany,
    comPosition: UcomPosition,
    comTel: UcomTel,
    comAdr: UcomAdr,
    faxNum: UfaxNum,
    sector: Usector,
    check: Ucheck,
    pubDate: UpubDate,
    modifiedDate: UmodifiedDate,
    files: Ufiles,
    filenames: Ufilenames,
  } = userDatas;

  console.log("DATSAS", datas);
  // console.log("USER DATSAS", userDatas, Uname);

  const onSubmit = (e) => {
    e.preventDefault();
    if (doing) {
      window.alert("한 번만 클릭해주세요");
      return
    }
    doing = true

    if (datas.check === "O") {
      USER.doc(datas.user).update(datas).then(
        COUNTER.doc('counter').get().then(doc => {
          if (doc.exists) {
            // console.log("DOCCCCCCC", doc.data());
            COUNTER.doc('counter').update({ reqProfile: doc.data().reqProfile - 1}).then(() => {
              COL.doc(id).delete().then(navigate(-1));
              
            });
          }
        })
        
      )
    } else {
      COUNTER.doc('counter').get().then(doc => {
        if (doc.exists) {
          // console.log("DOCCCCCCC", doc.data());
          COUNTER.doc('counter').update({ reqProfile: doc.data().reqProfile - 1}).then(() => {
            COL.doc(id).delete().then(navigate(-1));
            
          });
        }
      })
    }

  };

  const clickN = () => {
    if (window.confirm('프로필 수정을 거부하시겠습니까?')) {
      const date = new Date(+new Date() + 3240 * 10000).toISOString().split("T")[0]
      const time = new Date().toTimeString().split(" ")[0];
      let today = date + ' ' + time.substring(0,5);
      setDatas((cur) => ({
        ...cur,
        check: "X",
        modifiedDate: today,
      }))
    }
  }
  const clickY = () => {
    if (window.confirm('프로필 수정을 승인하시겠습니까?')) {
      const date = new Date(+new Date() + 3240 * 10000).toISOString().split("T")[0]
      const time = new Date().toTimeString().split(" ")[0];
      let today = date + ' ' + time.substring(0,5);
      setDatas((cur) => ({
        ...cur,
        check: "O",
        modifiedDate: today,
      }))
    }
  }
  if (status === 1) {
    return (
      <DataReqDetailForm title={"프로필 수정 승인"} onSubmit={onSubmit} clickY={clickY} clickN={clickN}>
        <form
          method="post"
          onSubmit={onSubmit}
          class="form-horizontal form-label-left"
        >
          <div class="form-group row ">
            <label class="control-label col-md-2 col-sm-2 ">이름</label>
            <div class="col-md-3 col-sm-3 ">
              <input
                name="name"
                type="text"
                class="form-control"
                value={Uname}
                readOnly
              />
            </div>
            <div class="reqChangeArrow">▶</div> 
            <div class="col-md-3 col-sm-3 ">
              <input
                name="name"
                type="text"
                class="form-control"
                value={name}
                readOnly
              />
            </div>
          </div>
          <div class="form-group row ">
            <label class="control-label col-md-2 col-sm-2 ">기수</label>
            <div class="col-md-3 col-sm-3 ">
              <input
                name="year"
                type="text"
                class="form-control"
                value={Uyear}
                readOnly
              />
            </div>
            <div class="reqChangeArrow">▶</div> 
            <div class="col-md-3 col-sm-3 ">
              <input
                name="year"
                type="text"
                class="form-control"
                value={year}
                readOnly
              />
            </div>
          </div>
          <div class="form-group row ">
            <label class="control-label col-md-2 col-sm-2 ">전화번호</label>
            <div class="col-md-3 col-sm-3 ">
              <input
                name="phoneNum"
                type="text"
                class="form-control"
                value={UphoneNum}
                readOnly
              />
            </div>
            <div class="reqChangeArrow">▶</div> 
            <div class="col-md-3 col-sm-3 ">
              <input
                
                name="phoneNum"
                type="text"
                class="form-control"
                value={phoneNum}
                readOnly
              />
            </div>
          </div>
          <div class="form-group row ">
            <label class="control-label col-md-2 col-sm-2 ">이메일</label>
            <div class="col-md-3 col-sm-3 ">
              <input
                name="email"
                type="text"
                class="form-control"
                value={Uemail}
                readOnly
              />
            </div>
            <div class="reqChangeArrow">▶</div> 
            <div class="col-md-3 col-sm-3 ">
              <input
                
                name="email"
                type="text"
                class="form-control"
                value={email}
                readOnly
              />
            </div>
          </div>
          <div class="form-group row ">
            <label class="control-label col-md-2 col-sm-2 ">회사명</label>
            <div class="col-md-3 col-sm-3 ">
              <input
                name="company"
                type="text"
                class="form-control"
                value={Ucompany}
                readOnly
              />
            </div>
            <div class="reqChangeArrow">▶</div> 
            <div class="col-md-3 col-sm-3 ">
              <input
                
                name="company"
                type="text"
                class="form-control"
                value={company}
                readOnly
              />
            </div>
          </div>
          <div class="form-group row ">
            <label class="control-label col-md-2 col-sm-2 ">직위</label>
            <div class="col-md-3 col-sm-3 ">
              <input
                name="comPosition"
                type="text"
                class="form-control"
                value={UcomPosition}
                readOnly
              />
            </div>
            <div class="reqChangeArrow">▶</div> 
            <div class="col-md-3 col-sm-3 ">
              <input
                
                name="comPosition"
                type="text"
                class="form-control"
                value={comPosition}
                readOnly
              />
            </div>
          </div>
          <div class="form-group row ">
            <label class="control-label col-md-2 col-sm-2 ">근무처 전화</label>
            <div class="col-md-3 col-sm-3 ">
              <input
                name="comTel"
                type="text"
                class="form-control"
                value={UcomTel}
                readOnly
              />
            </div>
            <div class="reqChangeArrow">▶</div> 
            <div class="col-md-3 col-sm-3 ">
              <input
                
                name="comTel"
                type="text"
                class="form-control"
                value={comTel}
                readOnly
              />
            </div>
          </div>
          <div class="form-group row ">
            <label class="control-label col-md-2 col-sm-2 ">직장주소</label>
            <div class="col-md-3 col-sm-3 ">
              <input
                name="comAdr"
                type="text"
                class="form-control"
                value={UcomAdr}
                readOnly
              />
            </div>
            <div class="reqChangeArrow">▶</div> 
            <div class="col-md-3 col-sm-3 ">
              <input
                
                name="comAdr"
                type="text"
                class="form-control"
                value={comAdr}
                readOnly
              />
            </div>
          </div>
          <div class="form-group row ">
            <label class="control-label col-md-2 col-sm-2 ">팩스 번호</label>
            <div class="col-md-3 col-sm-3 ">
              <input
                name="faxNum"
                type="text"
                class="form-control"
                value={UfaxNum}
                readOnly
              />
            </div>
            <div class="reqChangeArrow">▶</div> 
            <div class="col-md-3 col-sm-3 ">
              <input
                
                name="faxNum"
                type="text"
                class="form-control"
                value={faxNum}
                readOnly
              />
            </div>
          </div>
          <div class="form-group row">
            <label class="control-label col-md-2 col-sm-2 ">프로필 사진</label>
            <div class="col-md-3 col-sm-3 " style={{display: "flex", alignItems: "center"}}>
              {Ufiles && 
                <a  href={Ufiles} target="_blank">{Ufilenames.slice(Ufilenames.indexOf("_") + 1)}</a>
              }
            </div>
            <div class="reqChangeArrow">▶</div> 
            <div class="col-md-3 col-sm-3 " style={{display: "flex", alignItems: "center"}}>
              {files && 
                <a href={files} target="_blank">{filenames.slice(filenames.indexOf("_") + 1)}</a>              
              }
            </div>
          </div>
          <div class="form-group row ">
            <label class="control-label col-md-2 col-sm-2 ">업종</label>
            <div class="col-md-3 col-sm-3 ">
              <input
                name="sector"
                type="text"
                class="form-control"
                value={Usector}
                readOnly
              />
            </div>
            <div class="reqChangeArrow">▶</div> 
            <div class="col-md-3 col-sm-3 ">
              <input
                name="sector"
                type="text"
                class="form-control"
                value={sector}
                readOnly
              />
            </div>
          </div>
        </form>
      </DataReqDetailForm>
    );
  } else if (status === 404) (
    <div>Loading</div>
  )
}