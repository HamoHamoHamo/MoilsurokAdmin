import { useState } from 'react';
import readXlsxFile from 'read-excel-file';
import { COUNTER, USER } from '../../utils/Firebase';
import { useNavigate } from "react-router-dom";
import routes from '../../utils/Routes';

export default function UploadUser() {
  const [datas, setDatas] = useState([]);
  const navigate = useNavigate();
  const onUploadFile = (e) => {
    readXlsxFile(e.target.files[0]).then((rows) => {
      console.log(rows);
      const data = rows.slice(6, rows.length);
      console.log("DATA", data);
      setDatas(data);

    })
  };

  // const onChange = (e, i) => {
  //   const { value, name } = e.target;
  //   const copy = [...datas];
  //   // copy[i][name] = value;
  //   // changeDatas[name] = value
  //   // console.log("changeeDatas", changeDatas, name, value);
  //   // copy.splice(i, 1, copy[i])
  //   datas[i][name] = value
  //   console.log('splice', )
  //   // copy[i] = changeDatas;
  //   setDatas((cur) => {
  //     cur.splice(i, 1, )
  //     return cur;
  //   });
  // }

  const onSubmit = async (e) => {
    e.preventDefault();
    const counter = await COUNTER.doc('counter').get();
    for(let dataList of datas) {
      let obj = {};
      await dataList.map((data, i) => {
        switch (i) {
          case 1:
            obj.year = data;
            break;
          case 2:
            obj.remark = data;
            break;
          case 3:
            obj.name = data;
            break;
          case 4:
            obj.birthdate = data;
            break;
          case 5:
            obj.phoneNum = data;
            break;
          case 6:
            obj.email = data;
            break;
          case 7:
            obj.company = data;
            break;
          case 8:
            obj.department = data;
            break;
          case 9:
            obj.comPosition = data;
            break;
          case 10:
            obj.comTel = data;
            break;
          case 11:
            obj.comAdr = data;
            break;
          case 12:
            obj.faxNum = data;
            break;
          case 13:
            obj.sector = data;
            break;
        }
        const date = new Date(+new Date() + 3240 * 10000).toISOString().split("T")[0]
        const time = new Date().toTimeString().split(" ")[0];
        let today = date + ' ' + time.substring(0,5);
        obj.modifiedDate = today;
        obj.pubDate = today;
        obj.check = "X";
      })
      console.log("INPUTSS", obj);
      await USER.add(obj)
      console.log("DOC>DATA", counter.data());
      
    };
    await COUNTER.doc('counter').update({ reqUser: counter.data().reqUser + datas.length });
    await COUNTER.doc('counter').update({ user: counter.data().user + datas.length });
    console.log("finish");
    navigate(routes.datasUser);
  }

  const dataDel = (e, i) => {
    e.preventDefault();
    let copy = [...datas];
    copy.splice(i, 1);
    console.log("asdfaf", copy);
    setDatas(copy);
    // const newDatas = datas.filter((data, i) => )
  }
  console.log("DATAS", datas);
  function DataTable() {
    return (
      <>
        {datas && datas.map((data, i) => {
          const year = data[1];
          const remark = data[2];
          const name = data[3];
          const birthdate = data[4];
          const phoneNum = data[5];
          const email = data[6];
          const company = data[7];
          const department = data[8];
          const comPosition = data[9];
          const comTel = data[10];
          const comAdr = data[11];
          const faxNum = data[12];
          const sector = data[13];

          return (
            <div key={i}>
              <div class="form-group row ">
                <label class="control-label col-md-3 col-sm-3 ">이름</label>
                <div class="col-md-4 col-sm-4 ">
                  <input
                    type="text"
                    value={name}
                    readOnly={true}
                    class="form-control"
                  />
                </div>
              </div>
              <div class="form-group row ">
                <label class="control-label col-md-3 col-sm-3 ">기수</label>
                <div class="col-md-4 col-sm-4 ">
                  <input
                    type="text"
                    value={year}
                    readOnly={true}
                    class="form-control"
                  />
                </div>
              </div>
              <div class="form-group row ">
                <label class="control-label col-md-3 col-sm-3 ">생년월일</label>
                <div class="col-md-4 col-sm-4 ">
                  <input
                    type="date"
                    value={birthdate}
                    readOnly={true}
                    class="form-control"
                  />
                </div>
              </div>
              <div class="form-group row ">
                <label class="control-label col-md-3 col-sm-3 ">전화번호</label>
                <div class="col-md-4 col-sm-4 ">
                  <input
                    type="text"
                    value={phoneNum}
                    readOnly={true}
                    class="form-control"

                  />
                </div>
              </div>
              <div class="form-group row ">
                <label class="control-label col-md-3 col-sm-3 ">이메일</label>
                <div class="col-md-4 col-sm-4 ">
                  <input
                    type="text"
                    value={email}
                    readOnly={true}
                    class="form-control"

                  />
                </div>
              </div>
              <div class="form-group row ">
                <label class="control-label col-md-3 col-sm-3 ">회사명</label>
                <div class="col-md-4 col-sm-4 ">
                  <input
                    type="text"
                    value={company}
                    readOnly={true}
                    class="form-control"

                  />
                </div>
              </div>
              <div class="form-group row ">
                <label class="control-label col-md-3 col-sm-3 ">부서</label>
                <div class="col-md-4 col-sm-4 ">
                  <input
                    type="text"
                    value={department}
                    readOnly={true}
                    class="form-control"

                  />
                </div>
              </div>
              <div class="form-group row ">
                <label class="control-label col-md-3 col-sm-3 ">직위</label>
                <div class="col-md-4 col-sm-4 ">
                  <input
                    type="text"
                    value={comPosition}
                    readOnly={true}
                    class="form-control"

                  />
                </div>
              </div>
              <div class="form-group row ">
                <label class="control-label col-md-3 col-sm-3 ">근무처 전화</label>
                <div class="col-md-4 col-sm-4 ">
                  <input
                    type="text"
                    value={comTel}
                    readOnly={true}
                    class="form-control"

                  />
                </div>
              </div>
              <div class="form-group row ">
                <label class="control-label col-md-3 col-sm-3 ">직장주소</label>
                <div class="col-md-4 col-sm-4 ">
                  <input
                    type="text"
                    value={comAdr}
                    readOnly={true}
                    class="form-control"

                  />
                </div>
              </div>
              <div class="form-group row ">
                <label class="control-label col-md-3 col-sm-3 ">팩스 번호</label>
                <div class="col-md-4 col-sm-4 ">
                  <input
                    type="text"
                    value={faxNum}
                    readOnly={true}
                    class="form-control"

                  />
                </div>
              </div>
              <div class="form-group row ">
                <label class="control-label col-md-3 col-sm-3 ">업종</label>
                <div class="col-md-4 col-sm-4 ">
                  <input
                    type="text"
                    value={sector}
                    readOnly={true}
                    class="form-control"
                  />
                </div>
              </div>
              <div class="form-group row ">
                <label class="control-label col-md-3 col-sm-3 ">비고</label>
                <div class="col-md-4 col-sm-4 ">
                  <input
                    type="text"
                    class="form-control"
                    value={remark}
                    readOnly={true}
                  />
                </div>
              </div>
              <button type="submit" class="btn btn-danger" onClick={(e) => dataDel(e, i)}>
                삭제
              </button>
              <div class="ln_solid"></div>
            </div>
          )
        })}
      </>


    )
  }

  return (
    <div>
      <div class="row">
        <div class="col-md-12 col-sm-12">
          <div class="x_panel">
            <div class="x_title" style={{ display: "flex", flexDirection: "column" }}>
              <h2>회원 업로드</h2>
              <input
                type="file"
                class="navbar-right panel_toolbox btn btn-primary"
                style={{ width: '20%' }}
                onChange={onUploadFile}
              />

              <div class="clearfix"></div>
            </div>
            <div class="x_content">
              <form
                method="post"
                onSubmit={onSubmit}
                class="form-horizontal form-label-left"
              >
                <DataTable />
                <div class="ln_solid">
                  <div class="form-group">
                    <div class="col-md-6" style={{ marginTop: "20px" }}>
                      <button type="submit" class="btn btn-success">
                        저장
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}