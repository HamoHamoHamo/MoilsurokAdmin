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
        let name = file.name.split('.')[0];
        
        name = name.replace(/[0-9]/g,""); // 숫자제거
        name = name.replace(/ /g,""); // 공백제거

        if (file.name.split('.').length > 2) {
          console.log("NAME", file.name);
        }
        return ({
          ...cur,
          [name]: file,
        })
      })
    })
  }

  let saving = false;
  console.log("photos", photos);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!saving){
      saving = true;
      const counter = await COUNTER.doc('counter').get();
      for(let dataList of datas) {
        let obj = {};
        await dataList.map((data, i) => {
          switch (i) {
            case 0:
              obj.num = `${data}`;
              break;
            case 1:
              obj.year = `${data}`;
              break;
            case 2:
              obj.name = data;
              break;
            case 3:
              obj.field = data;
              break;
            case 4:
              obj.occupation = data;
              break;
            case 5:
              obj.company = data;
              break;
            case 6:
              obj.phoneNum = [data];
              break;
            case 7:
              obj.email = data;
              break;
          }
        })
        const date = new Date(+new Date() + 3240 * 10000).toISOString().split("T")[0]
        const time = new Date().toTimeString().split(" ")[0];
        let today = date + ' ' + time.substring(0,5);
        obj.modifiedDate = today;
        obj.pubDate = today;
        
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
          const num = data[0];
          const year = data[1];
          const name = data[2];
          const field = data[3];
          const occupation = data[4];
          const company = data[5];
          const phoneNum = data[6];
          const email = data[7];

          const filename = photos[name] ? photos[name].name : '';

          return (
            <div key={i}>
              <div class="form-group row ">
                <label class="control-label col-md-3 col-sm-3 ">증서번호</label>
                <div class="col-md-4 col-sm-4 ">
                  <input
                    type="text"
                    value={num}
                    readOnly={true}
                    class="form-control"

                  />
                </div>
              </div>
              <div class="form-group row ">
                <label class="control-label col-md-3 col-sm-3 ">선정년도</label>
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
                <label class="control-label col-md-3 col-sm-3 ">분야</label>
                <div class="col-md-4 col-sm-4 ">
                  <input
                    type="text"
                    value={field}
                    readOnly={true}
                    class="form-control"
                  />
                </div>
              </div>
              <div class="form-group row ">
                <label class="control-label col-md-3 col-sm-3 ">직종</label>
                <div class="col-md-4 col-sm-4 ">
                  <input
                    type="text"
                    value={occupation}
                    readOnly={true}
                    class="form-control"
                  />
                </div>
              </div>
              <div class="form-group row ">
                <label class="control-label col-md-3 col-sm-3 ">소속</label>
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
                <label class="control-label col-md-3 col-sm-3 ">연락처</label>
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