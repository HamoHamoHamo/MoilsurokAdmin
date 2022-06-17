import { useState, useEffect } from "react";
import AnswerDetail from "../pages/detail/AnswerDetail"
import NoticeDetail from "../pages/detail/NoticeDetail"
import ProfileDetail from "../pages/detail/ProfileDetail"
import QuestionDetail from "../pages/detail/QuestionDetail"
import ScheduleDetail from "../pages/detail/ScheduleDetail"
import UserDetail from "../pages/detail/UserDetail"
import {
  USER,
  NOTICE,
  SCHEDULE,
  QUESTION,
  ANSWER,
  PROFILE,
  storage,
} from "../utils/Firebase";
import { useParams, useNavigate } from "react-router-dom";
import {v4 as uuidv4} from 'uuid';


export default function DataDetail({ kinds }) {
  const { id } = useParams();
  const [datas, setDatas] = useState({});
  const [status, setStatus] = useState(0);
  const [collection, setCollection] = useState('');
  const navigate = useNavigate();
  let HandleDetail = "";
  let col = '';
  let title = '';

  useEffect(() => {
    if (kinds === "user") {
      col = USER;
    } else if (kinds === "notice") {
      col = NOTICE;
    } else if (kinds === "schedule") {
      col = SCHEDULE;
    } else if (kinds === "question") {
      col = QUESTION;
    } else if (kinds === "answer") {
      col = ANSWER;
    } else if (kinds === "profile") {
      col = PROFILE;
    }
    console.log("COCCLL", col);
    col
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
    setCollection(col);
  }, []);
  console.log("DATA", datas)

  if (kinds === "user") {
    HandleDetail = UserDetail;
    title = "회원 데이터"
  } else if (kinds === "notice") {
    HandleDetail = NoticeDetail;
    title = "공지사항 데이터"
  } else if (kinds === "schedule") {
    HandleDetail = ScheduleDetail;
    title = "일정 데이터"
  } else if (kinds === "question") {
    HandleDetail = QuestionDetail;
    title = "문의 데이터"
  } else if (kinds === "answer") {
    HandleDetail = AnswerDetail;
    title = "답변 데이터"
  } else if (kinds === "profile") {
    HandleDetail = ProfileDetail;
    title = "프로필 수정 데이터"
  }
  
  const back = () => {
    navigate(-1);
  };

  const onClickDel = () => {
    if (window.confirm("삭제하시겠습니까?")) {
      collection
        .doc(id)
        .delete()
        .then(() => {
          navigate(-1);
        })
        .catch((res) => alert("DELETE ERROR\n", res));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { uploadFiles: files } = datas
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
      console.log("DATAAASSS", datas);
      udatas = {
        ...datas,
        files: datas.files ? [...datas.files, ...fileList] : fileList,
        filenames: datas.filenames ? [...datas.filenames, ...filenames] : filenames
      };
    } else {
      udatas = datas;
    }
    // console.log("FILELISTS", udatas.files);
    delete udatas.uploadFiles;
    try{
      // console.log("SDFSFDATAS", udatas);
      const update = await collection.doc(id).update(udatas).then(navigate(-1));
    } catch(err) {
      console.log('ERROR', err);
    }

  };

  const onChange = (e) => {
    const { name, value, files } = e.target;
    let today = new Date();
    if (files){
      setDatas(() => ({
        ...datas,
        uploadFiles: files,
        modifiedDate: today.toLocaleString(),
      }));
    } else {
      setDatas(() => ({
        ...datas,
        [name]: value,
        modifiedDate: today.toLocaleString(),
      }));
    }
    console.log("DDDDDDDDDDD", datas);
  };

  const onClickFileDel = async (path, file, collection) => {
    console.log("SDF", file, path);
    if(window.confirm("파일을 삭제하시겠습니까>")){
      const ref = storage.ref().child(path);
      try {
        await ref.delete();
        const newFiles = datas.files.filter((f) => f !== file);
        const newFilenames = datas.filenames.filter((p) => p !== path);
        setDatas((cur) => ({
          ...cur,
          files: newFiles,
          filenames: newFilenames
        }));
        const udata = {
          ...datas,
          files: newFiles,
          filenames: newFilenames
        }
        console.log("UUUUJDATA", udata);
        collection.doc(id).update(udata);
      } catch(err) {
        console.log("ERR", err);
        alert("삭제 안됨", err);
      }
    }
  }
  if (status === 1) {
    return (
      <DataDetailForm title={title} onClickDel={onClickDel}>
        <HandleDetail datas={datas} onChange={onChange} back={back} onSubmit={onSubmit} collection={collection} onClickFileDel={onClickFileDel} />
      </DataDetailForm>
    );
  } else if (status === 404) {
    return <div>Data not Found</div>;
  } else {
    return <div>Loading</div>;
  }
}

function DataDetailForm({ children, title, onClickDel }) {
  return (
    <div>
      <div class="row">
        <div class="col-md-12 col-sm-12">
          <div class="x_panel">
            <div class="x_title">
              <h2>{title}</h2>

              <button
                type="reset"
                class="navbar-right panel_toolbox btn btn-primary navbar-right"
                onClick={onClickDel}
              >
                삭제
              </button>

              <div class="clearfix"></div>
            </div>
            <div class="x_content">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}