import { useEffect, useState } from "react";
import CreateNotice from "../pages/create/CreateNotice";
import CreateAnswer from "../pages/create/CreateAnswer";
import CreateSchedule from "../pages/create/CreateSchedule";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import {
  NOTICE,
  SCHEDULE,
  ANSWER,
  storage,
} from "../utils/Firebase";
import routes from "../utils/Routes";

export default function DataCreateForm({ children, kinds}) {
  const [inputs, setInputs] = useState({creator: "관리자"});
  const navigate = useNavigate();
  let HandleCreate = '';
  let title = '';
  let collection = '';

  if(kinds === "notice") {
    HandleCreate = CreateNotice;
    title = "공지사항";
    collection = NOTICE;
  } else if(kinds === "answer") {
    HandleCreate = CreateAnswer;
    title = "답변";
    collection = ANSWER;
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

  const onSubmit = async (e) => {
    e.preventDefault();
    const { uploadFiles: files } = inputs
    let udatas = {};
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
        window.location.href = `/datas/${kinds}/${res.id}`;
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