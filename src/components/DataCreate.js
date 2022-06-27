import readXlsxFile from 'read-excel-file';
import { useEffect, useState } from "react";
import CreateNotice from "../pages/create/CreateNotice";
import CreateUser from "../pages/create/CreateUser";
import CreateSchedule from "../pages/create/CreateSchedule";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import {
  NOTICE,
  SCHEDULE,
  USER,
  storage,
  COUNTER,
} from "../utils/Firebase";
import routes from "../utils/Routes";

export default function DataCreateForm({ kinds}) {
  const [inputs, setInputs] = useState({creator: "관리자"});
  const navigate = useNavigate();
  let HandleCreate = '';
  let title = '';
  let collection = '';

  if(kinds === "notice") {
    HandleCreate = CreateNotice;
    title = "공지사항";
    collection = NOTICE;
  } else if(kinds === "user") {
    HandleCreate = CreateUser;
    title = "회원";
    collection = USER;
  } else if(kinds === "schedule") {
    HandleCreate = CreateSchedule;
    title = "일정";
    collection = SCHEDULE;
  } 

  const onChange = (e) => {
    const { name, value, files } = e.target;
    let today = new Date();
    if (files){
      setInputs(() => ({
        ...inputs,
        uploadFiles: files,
        modifiedDate: today.toLocaleString(),
        pubDate: today.toLocaleString(),
      }));
    } else {
      setInputs(() => ({
        ...inputs,
        [name]: value,
        modifiedDate: today.toLocaleString(),
        pubDate: today.toLocaleString(),
      }));
    }
    console.log('INPUTSSS', inputs);
  };

  const onUploadFile = (e) => {
      readXlsxFile(e.target.files[0]).then((rows) => {
      console.log(rows);
    })};
    
  const onSubmit = async (e) => {
    e.preventDefault();
    const { uploadFiles: files } = inputs
    let udatas = {};
    let field = '';
    if(files){
      let filenames = [];
  
      const fileList = files && await Promise.all(
        Object.entries(files).map(async([key, file], i) => {
          const filename = `files/${kinds}/${uuidv4()}_${file.name}`;
          const storageUrl = storage.ref().child(filename)
          filenames.push(filename);
          try {
            await storageUrl.put(file)
            const downloadUrl = await storageUrl.getDownloadURL()
            console.log("DOWNLAOTDURL", downloadUrl);
            return downloadUrl;
          } catch(err) {
            console.log("ERROR", err);
          }
          
        }, [])
      );
      console.log("DATAAASSS", inputs);
      udatas = {
        ...inputs,
        files: inputs.files ? [...inputs.files, ...fileList] : fileList,
        filenames: inputs.filenames ? [...inputs.filenames, ...filenames] : filenames
      };
    } else {
      udatas = inputs;
    }
    // console.log("FILELISTS", udatas.files);
    delete udatas.uploadFiles;
    try{
      // console.log("SDFSFDATAS", udatas);
      const update = await collection.add(udatas).then((res) => {
        window.alert("데이터 생성 완료")
        console.log("RES", res);
        // navigate(`/datas/${kinds}/${res.id}`);
        COUNTER.doc('counter').get().then((doc) => {
          switch (kinds) {
            case "notice": 
              COUNTER.doc('counter').update({ notice: doc.data().notice +1 }).then(window.location.href = `/datas/${kinds}/${res.id}`);
              break;
            case "user": 
              COUNTER.doc('counter').update({ user: doc.data().user +1 }).then(() => {
                if (udatas.check === "X") {
                  COUNTER.doc('counter').update({ reqUser: doc.data().reqUser +1 }).then(window.location.href = `/datas/${kinds}/${res.id}`);
                } else {
                  console.log("SSSSHREFTEST");
                  window.location.href = `/datas/${kinds}/${res.id}`;
                }
              });
              break;
            case "schedule": 
              COUNTER.doc('counter').update({ schedule: doc.data().schedule +1 }).then(window.location.href = `/datas/${kinds}/${res.id}`);
              break;
          }
        })
      });
    } catch(err) {
      console.log('ERROR', err);
    }

  };

  return (
    <div>
      <div class="row">
        <div class="col-md-12 col-sm-12">
          <div class="x_panel">
            <div class="x_title">
              <h2>{title} 작성</h2>
              { kinds === 'user' && 
                <input
                  type="file"
                  class="navbar-right panel_toolbox btn btn-primary navbar-right"
                  onChange={onUploadFile}
                >
                </input>
              }

              <div class="clearfix"></div>
            </div>
            <div class="x_content">
              <form
                method="post"
                onSubmit={onSubmit}
                class="form-horizontal form-label-left"
              >
                  <HandleCreate onChange={onChange} inputs={inputs} />
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
  );
}