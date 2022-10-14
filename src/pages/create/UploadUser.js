import { useState } from 'react';
import readXlsxFile from 'read-excel-file';
import { COUNTER, USER, storage } from '../../utils/Firebase';
import { useNavigate } from "react-router-dom";
import routes from '../../utils/Routes';
import { v4 as uuidv4 } from 'uuid';

export default function UploadUser() {
  const [datas, setDatas] = useState([]);
  const [photos, setPhotos] = useState({});

  const navigate = useNavigate();
  const onUploadFile = (e) => {
    readXlsxFile(e.target.files[0]).then((rows) => {
      // console.log(rows);
      const data = rows.slice(1, rows.length);
      console.log("DATA", data);
      setDatas(data);

    })
  };

  const onUploadPhoto = (e) => {
    const { files } = e.target;
    setPhotos({});

    Object.entries(files).map(([key, file]) => {
      setPhotos((cur) => {
        const name = file.name.split('.')[0];
        return ({
          ...cur,
          [name]: file,
        })
      })
      
    })

    
  }
  console.log('photos', photos);

  // const onChange = (e, i) => {
  //   const { value, name } = e.target;
  //   const copy = [...datas];
  //   // copy[i][name] = value;
  //   // changeDatas[name] = value
  //   // // console.log("changeeDatas", changeDatas, name, value);
  //   // copy.splice(i, 1, copy[i])
  //   datas[i][name] = value
  //   // console.log('splice', )
  //   // copy[i] = changeDatas;
  //   setDatas((cur) => {
  //     cur.splice(i, 1, )
  //     return cur;
  //   });
  // }
  let saving = false;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!saving){
      saving = true;
      const counter = await COUNTER.doc('counter').get();
      for(let dataList of datas) {
        let obj = {};
        await dataList.map((data, i) => {
          switch (i) {
            case 1:
              obj.name = data;
              break;
            case 2:
              obj.company = data;
              break;
            case 3:
              obj.comPosition = data;
              break;
            case 4:
              obj.phoneNum = data;
              break;
            case 5:
              obj.comAdr = data;
              break;
            case 6:
              obj.comTel = data;
              break;
            case 7:
              obj.faxNum = data;
              break;
            case 8:
              obj.email = data;
              break;
            case 10:
              obj.year = data;
              break;
          }
        })
        const date = new Date(+new Date() + 3240 * 10000).toISOString().split("T")[0]
        const time = new Date().toTimeString().split(" ")[0];
        let today = date + ' ' + time.substring(0,5);

        obj.modifiedDate = today;
        obj.pubDate = today;
        obj.check = "O";

        if (photos[obj.name]) {
          const file = photos[obj.name];
          const filename = `files/user/${uuidv4()}_${file.name}`;
          const storageUrl = storage.ref().child(filename);
          try {
            await storageUrl.put(file)
            const downloadUrl = await storageUrl.getDownloadURL()
            // console.log("DOWNLAOTDURL", downloadUrl);
            obj.files = downloadUrl;
            obj.filenames = filename
          } catch(err) {
            console.log("ERROR", err);
          }
        }
        // console.log("INPUTSS", obj);
        await USER.add(obj).then((res) => {
          USER.doc(res.id).update({ uid: res.id }).catch((err) => {
            window.alert('uid저장 에러');
            // console.log("ERROR", err);
          })
        })
        // console.log("DOC>DATA", counter.data());
        
      };
      await COUNTER.doc('counter').update({ user: parseInt(counter.data().user) + datas.length });
      // console.log("finish");
      navigate(routes.datasUser);
    } else {
      window.alert('저장 중입니다.')
    }
  }

  const dataDel = (e, i) => {
    e.preventDefault();
    let copy = [...datas];
    copy.splice(i, 1);
    // console.log("asdfaf", copy);
    setDatas(copy);
    // const newDatas = datas.filter((data, i) => )
  }
  // console.log("DATAS", datas);

  function DataTable() {
    return (
      <>
        {datas && datas.map((data, i) => {
          const name = data[1]
          const company = data[2]
          const comPosition = data[3]
          const phoneNum = data[4]
          const comAdr = data[5]
          const comTel = data[6]
          const faxNum = data[7]
          const email = data[8]
          const year = data[10]
          

          const filename = photos[name] ? photos[name].name : '';
          // const name = data[2];
          // const birthdate = data[3];
          // const phoneNum = data[4];
          // const email = data[5];
          // const company = data[6];
          // const department = data[7];
          // const comPosition = data[8];
          // const comTel = data[9];
          // const comAdr = data[10];
          // const faxNum = data[11];

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
                <label class="control-label col-md-3 col-sm-3 ">프로필 사진</label>
                <div class="col-md-4 col-sm-4 ">
                  <input
                    type="text"
                    value={filename}
                    readOnly={true}
                    class="form-control"

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
              <div class='x_content'>
                <input
                  type="file"
                  class="btn btn-primary"
                  style={{ width: '20%' }}
                  onChange={onUploadFile}
                />
              
                <label htmlFor='inputPicture' class="btn btn-primary">사진선택</label>
                <input
                  type="file"
                  class="btn btn-primary"
                  style={{ width: '15%', visibility: 'hidden' }}
                  id="inputPicture"
                  multiple={true}
                  onChange={onUploadPhoto}
                />
              </div>
              <a style={{ width: '20%' }} class="btn btn-success" href="/동창회 데이터 양식.xlsx" download>데이터 양식 다운</a>
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