import react, { useState, useEffect, useRef } from "react";
import { USER } from "../utils/Firebase";
import { useParams, useNavigate } from 'react-router-dom';

export function UserDataDetail() {
  const { id } = useParams();
  const [datas, setDatas] = useState({});
  const [status, setStatus] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    USER.doc(id).get().then((doc) => {
      if(doc.exists){
        console.log("DAATAA", doc.data())
        setDatas(doc.data());
        setStatus(1);
      } else {
        setStatus(404);
      }
    })
  }, []);

  const back = () => {
    navigate(-1);
  }

  const onClickDel = () => {
    if(window.confirm("삭제하시겠습니까?")){
      USER.doc(id).delete().then(() => {
        navigate(-1);
      }).catch(
        (res) => alert("DELETE ERROR\n", res)
      );
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    USER.doc(id).update(datas).then(navigate(-1));
  }

  const onChange = (e) => {
    const { name, value } = e.target;
    let today = new Date();
    setDatas(() => ({
      ...datas,
      [name]: value,
      modifiedDate: today.toLocaleString()
    }))
    // console.log("DDDDDDDDDDD", datas);
  }

  if(status === 1){
    const {
      birthdate,
      check,
      comPosition,
      comAdr,
      comTel,
      company,
      department,
      email,
      faxNum,
      modifiedDate,
      name,
      phoneNum,
      picture,
      sector,
      year,
    } = datas;
    return (
      <DataDetail title={"회원 데이터"} onClickDel={onClickDel}>
        <form method="post" onSubmit={onSubmit} class="form-horizontal form-label-left">
          <div class="form-group row ">
            <label class="control-label col-md-3 col-sm-3 ">
              기수
            </label>
            <div class="col-md-4 col-sm-4 ">
              <input
                onChange={onChange}
                name="year"
                type="text"
                class="form-control"
                value={year}
              />
            </div>
          </div>
          <div class="form-group row ">
            <label class="control-label col-md-3 col-sm-3 ">
              이름
            </label>
            <div class="col-md-4 col-sm-4 ">
              <input
                onChange={onChange}
                name="name"
                type="text"
                class="form-control"
                value={name}
              />
            </div>
          </div>
          <div class="form-group row ">
            <label class="control-label col-md-3 col-sm-3 ">
              생년월일
            </label>
            <div class="col-md-4 col-sm-4 ">
              <input
                onChange={onChange}
                name="birthdate"
                type="text"
                class="form-control"
                value={birthdate}
              />
            </div>
          </div>
          <div class="form-group row ">
            <label class="control-label col-md-3 col-sm-3 ">
              전화번호
            </label>
            <div class="col-md-4 col-sm-4 ">
              <input
                onChange={onChange}
                name="phoneNum"
                type="text"
                class="form-control"
                value={phoneNum}
              />
            </div>
          </div>
          <div class="form-group row ">
            <label class="control-label col-md-3 col-sm-3 ">
              이메일
            </label>
            <div class="col-md-4 col-sm-4 ">
              <input
                onChange={onChange}
                name="email"
                type="text"
                class="form-control"
                value={email}
              />
            </div>
          </div>
          <div class="form-group row ">
            <label class="control-label col-md-3 col-sm-3 ">
              회사명
            </label>
            <div class="col-md-4 col-sm-4 ">
              <input
                onChange={onChange}
                name="company"
                type="text"
                class="form-control"
                value={company}
              />
            </div>
          </div>
          <div class="form-group row ">
            <label class="control-label col-md-3 col-sm-3 ">
              부서
            </label>
            <div class="col-md-4 col-sm-4 ">
              <input
                onChange={onChange}
                name="department"
                type="text"
                class="form-control"
                value={department}
              />
            </div>
          </div>
          <div class="form-group row ">
            <label class="control-label col-md-3 col-sm-3 ">
              직위
            </label>
            <div class="col-md-4 col-sm-4 ">
              <input
                onChange={onChange}
                name="comPosition"
                type="text"
                class="form-control"
                value={comPosition}
              />
            </div>
          </div>
          <div class="form-group row ">
            <label class="control-label col-md-3 col-sm-3 ">
              근무처 전화
            </label>
            <div class="col-md-4 col-sm-4 ">
              <input
                onChange={onChange}
                name="comTel"
                type="text"
                class="form-control"
                value={comTel}
              />
            </div>
          </div>
          <div class="form-group row ">
            <label class="control-label col-md-3 col-sm-3 ">
              직장주소
            </label>
            <div class="col-md-4 col-sm-4 ">
              <input
                onChange={onChange}
                name="comAdr"
                type="text"
                class="form-control"
                value={comAdr}
              />
            </div>
          </div>
          <div class="form-group row ">
            <label class="control-label col-md-3 col-sm-3 ">
              팩스 번호
            </label>
            <div class="col-md-4 col-sm-4 ">
              <input
                onChange={onChange}
                name="faxNum"
                type="text"
                class="form-control"
                value={faxNum}
              />
            </div>
          </div>
          <div class="form-group row ">
            <label class="control-label col-md-3 col-sm-3 ">
              프로필 사진
            </label>
            <div class="col-md-4 col-sm-4 ">
              <input
                onChange={onChange}
                name="picture"
                type="text"
                class="form-control"
                value={picture}
              />
            </div>
          </div>
          <div class="form-group row ">
            <label class="control-label col-md-3 col-sm-3 ">
              업종
            </label>
            <div class="col-md-4 col-sm-4 ">
              <input
                onChange={onChange}
                name="sector"
                type="text"
                class="form-control"
                value={sector}
              />
            </div>
          </div>
          <div class="form-group row ">
            <label class="control-label col-md-3 col-sm-3 ">
              승인여부
            </label>
            <div class="col-md-4 col-sm-4 ">
              <div class="radio">
                <label>
                  <input onChange={onChange} name="check" type="radio" checked={check === "y"} value="y" id="optionsRadios1" /> O
                </label>
              </div>
              <div class="radio">
                <label>
                  <input onChange={onChange} name="check" type="radio" checked={check === "n"} value="n" id="optionsRadios2" /> X
                </label>
              </div>
            </div>
          </div>
          <div class="form-group row ">
            <label class="control-label col-md-3 col-sm-3 ">
              수정날짜
            </label>
            <div class="col-md-4 col-sm-4 ">
              <input
                onChange={onChange}
                name="modifiedDate"
                type="text"
                readonly="readonly"
                class="form-control"
                value={modifiedDate}
              />
            </div>
          </div>
          <div class="ln_solid">
            <div class="form-group">
                <div class="col-md-6" style={{marginTop: '20px'}}>
                    <button type='submit' class="btn btn-success">수정</button>
                    <button type='reset' class="btn btn-secondary" onClick={back}>취소</button>
                </div>
            </div>
          </div>
        </form>
      </DataDetail>
    )
  } else if (status === 404) {
    return (<div>Page not Found</div>)
  } else {
    return (<div>Loading</div>)
  }
}

export default function DataDetail({ children, title, onClickDel }) {
  return (
    <div>
      <div class="row">
        <div class="col-md-12 col-sm-12">
          <div class="x_panel">
            <div class="x_title">
              <h2>
                {title}
              </h2>
              
              <button type='reset' class="navbar-right panel_toolbox btn btn-primary navbar-right" onClick={onClickDel}>삭제</button>
              
              <div class="clearfix"></div>
            </div>
            <div class="x_content">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
