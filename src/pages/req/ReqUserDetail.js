import { useEffect, useState } from "react";
import DataReqDetailForm from "../../components/DataReqDetail";
import { COUNTER, USER } from "../../utils/Firebase";
import { useParams, useNavigate } from "react-router-dom";

export default function ReqUserDetail() {
  const { id } = useParams();
  const [datas, setDatas] = useState({});
  const [status, setStatus] = useState(0);
  const navigate = useNavigate();
  const COL = USER;

  useEffect(() => {
    COL
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setDatas(doc.data());
          setStatus(1);

        } else {
          setStatus(404);
        }
      });
  }, []);


  const {
    year,
    name,
    birthdate,
    phoneNum,
    email,
    company,
    department,
    comPosition,
    comTel,
    comAdr,
    faxNum,
    sector,
    check,
    remark,
    pubDate,
    modifiedDate,
    files,
    filenames
  } = datas;

  const onSubmit = (e) => {
    e.preventDefault();
    if (datas.check === "O"){
      COL.doc(id).update(datas).then(() => {
        COUNTER.doc('counter').get().then((doc) => {
          if (doc.exists) {
            const curCnt = doc.data().reqUser;
            console.log("CUR CNT", curCnt, curCnt - 1);
            COUNTER.doc('counter').update({ reqUser: curCnt - 1 }).then(navigate(-1))
          };
        });
      });
    } else {
      navigate(-1);
    }

  };

  const clickN = () => {
    const date = new Date(+new Date() + 3240 * 10000).toISOString().split("T")[0]
    const time = new Date().toTimeString().split(" ")[0];
    let today = date + ' ' + time.substring(0,5);
    setDatas((cur) => ({
      ...cur,
      check: "X",
      modifiedDate: today,
    }))
  }
  const clickY = async () => {
    const date = new Date(+new Date() + 3240 * 10000).toISOString().split("T")[0]
    const time = new Date().toTimeString().split(" ")[0];
    let today = date + ' ' + time.substring(0,5);
    setDatas((cur) => ({
      ...cur,
      check: "O",
      modifiedDate: today,
    }))
  }
  if(status === 1) {
    return (
      <DataReqDetailForm title={"회원 승인"} onSubmit={onSubmit} clickY={clickY} clickN={clickN}>
  
        <div class="form-group row ">
          <label class="control-label col-md-3 col-sm-3 ">이름</label>
          <div class="col-md-4 col-sm-4 ">
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
          <label class="control-label col-md-3 col-sm-3 ">기수</label>
          <div class="col-md-4 col-sm-4 ">
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
          <label class="control-label col-md-3 col-sm-3 ">생년월일</label>
          <div class="col-md-4 col-sm-4 ">
            <input
  
              name="birthdate"
              type="text"
              class="form-control"
              value={birthdate}
              readOnly
            />
          </div>
        </div>
        <div class="form-group row ">
          <label class="control-label col-md-3 col-sm-3 ">전화번호</label>
          <div class="col-md-4 col-sm-4 ">
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
          <label class="control-label col-md-3 col-sm-3 ">이메일</label>
          <div class="col-md-4 col-sm-4 ">
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
          <label class="control-label col-md-3 col-sm-3 ">회사명</label>
          <div class="col-md-4 col-sm-4 ">
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
          <label class="control-label col-md-3 col-sm-3 ">부서</label>
          <div class="col-md-4 col-sm-4 ">
            <input
  
              name="department"
              type="text"
              class="form-control"
              value={department}
              readOnly
            />
          </div>
        </div>
        <div class="form-group row ">
          <label class="control-label col-md-3 col-sm-3 ">직위</label>
          <div class="col-md-4 col-sm-4 ">
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
          <label class="control-label col-md-3 col-sm-3 ">근무처 전화</label>
          <div class="col-md-4 col-sm-4 ">
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
          <label class="control-label col-md-3 col-sm-3 ">직장주소</label>
          <div class="col-md-4 col-sm-4 ">
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
          <label class="control-label col-md-3 col-sm-3 ">팩스 번호</label>
          <div class="col-md-4 col-sm-4 ">
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
          <label class="control-label col-md-3 col-sm-3 ">프로필 사진</label>
          <div class="col-md-4 col-sm-4 " style={{ display: "flex", flexDirection: "column" }}>
            {files && files.map((img, i) => (
              <a href={img} target="_blank">{filenames[i].slice(filenames[i].indexOf("_") + 1)}</a>
            ))}
          </div>
        </div>
        <div class="form-group row ">
          <label class="control-label col-md-3 col-sm-3 ">업종</label>
          <div class="col-md-4 col-sm-4 ">
            <input
  
              name="sector"
              type="text"
              class="form-control"
              value={sector}
              readOnly
            />
          </div>
        </div>
        <div class="form-group row ">
          <label class="control-label col-md-3 col-sm-3 ">비고</label>
          <div class="col-md-4 col-sm-4 ">
            <input
  
              name="sector"
              type="text"
              class="form-control"
              value={remark}
              readOnly
            />
          </div>
        </div>
        <div class="form-group row ">
          <label class="control-label col-md-3 col-sm-3 ">수정시간</label>
          <div class="col-md-4 col-sm-4 ">
            <input
  
              name="modifiedDate"
              type="text"
              readOnly="readOnly"
              class="form-control"
              value={modifiedDate}
  
            />
          </div>
        </div>
        <div class="form-group row ">
          <label class="control-label col-md-3 col-sm-3 ">등록시간</label>
          <div class="col-md-4 col-sm-4 ">
            <input
  
              name="pubDate"
              type="text"
              readOnly="readOnly"
              class="form-control"
              value={pubDate}
  
            />
          </div>
        </div>
  
      </DataReqDetailForm>
    );
  } else if (status === 404) {
    return (
      <div>Loading</div>
    )
  }
  
}