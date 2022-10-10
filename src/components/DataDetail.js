import { useState, useEffect } from "react";
import AnswerDetail from "../pages/detail/AnswerDetail"
import NoticeDetail from "../pages/detail/NoticeDetail"
import ProfileDetail from "../pages/detail/ProfileDetail"
import QuestionDetail from "../pages/detail/QuestionDetail"
import ScheduleDetail from "../pages/detail/ScheduleDetail"
import UserDetail from "../pages/detail/UserDetail"
import ExecutiveDetail from "../pages/detail/ExecutiveDetail"
import CommitteeDetail from "../pages/detail/CommitteeDetail"
import {
  USER,
  NOTICE,
  SCHEDULE,
  QUESTION,
  ANSWER,
  PROFILE,
  storage,
  COUNTER,
  EXECUTIVE,
  COMMITTEE,
} from "../utils/Firebase";
import { useParams, useNavigate } from "react-router-dom";
import {v4 as uuidv4} from 'uuid';


export default function DataDetail({ kinds }) {
  const params = useParams();
  const id = params.detail ? params.detail : params.id;
  const detail = params.id;
  const [datas, setDatas] = useState({});
  const [status, setStatus] = useState(0);
  const [collection, setCollection] = useState('');
  const [curCheck, setCurCheck] = useState('');

  const navigate = useNavigate();
  let HandleDetail = "";
  let col = '';
  let title = '';
  let doing = false;

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
    } else if (kinds === "executive") {
      col = EXECUTIVE.doc(detail).collection('userList');
    } else if (kinds === "committee") {
      col = COMMITTEE;
    }
    // console.log("COCCLL", col);
    col.doc(id).get().then((doc) => {
      if (doc.exists) {
        setDatas(doc.data());
        setCurCheck(doc.data().check);
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
  } else if (kinds === "executive") {
    HandleDetail = ExecutiveDetail;
    title = "임원단 데이터"
  } else if (kinds === "committee") {
    HandleDetail = CommitteeDetail;
    title = "운영위원회 데이터"
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

  const onClickDel = async () => {
    if (window.confirm("삭제하시겠습니까?")) {
      const cntData = await COUNTER.doc('counter').get();
      const cnt = cntData.data();
      switch (kinds) {
        case 'user':
          COUNTER.doc('counter').update({ user: cnt.user - 1 });
          break;
        case 'schedule':
          COUNTER.doc('counter').update({ schedule: cnt.schedule - 1 });
          break;
        case 'profile':
          COUNTER.doc('counter').update({ profile: cnt.profile - 1 });
          break;
        case 'notice':
          COUNTER.doc('counter').update({ notice: cnt.notice - 1 });
          break;
        case 'reqUser':
          COUNTER.doc('counter').update({ reqUser: cnt.reqUser - 1 });
          break;
        case 'reqProfile':
          COUNTER.doc('counter').update({ reqProfile: cnt.reqProfile - 1 });
          break;
        case 'reqQuestion':
          COUNTER.doc('counter').update({ question: cnt.question - 1 });
          break;
        case 'committee':
          COUNTER.doc('counter').update({ committee: cnt.committee - 1 });
          break;
      }

      if (datas.filenames) {

        const ref = storage.ref().child(datas.filenames);
        // console.log("REFFF", ref);
        ref.delete();
        
      }
      if (curCheck === "X") {
        switch (kinds) {
          case "user":
            COUNTER.doc('counter').update({ reqUser: cnt.reqUser - 1 });
            break;
          case "profile":
            COUNTER.doc('counter').update({ reqProfile: cnt.reqProfile - 1 });
            break;
        }
      }
      collection
        .doc(id)
        .delete()
        .then(() => {
          navigate(-1);
          // // console.log("navigate");
        })
        .catch((res) => alert("DELETE ERROR\n", res));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (doing) {
      // console.log("doing");
      window.alert("한 번만 클릭해주세요");
      return
    }
    doing = true;

    const { uploadFiles: files } = datas
    let udatas = {};

    if (datas.num) {
      datas.num = parseInt(datas.num)
    }

    if(files && files.length > 0){
      let downloadUrl = '';
      const filename = `files/${kinds}/${uuidv4()}_${files[0].name}`;
      const storageUrl = await storage.ref().child(filename)
      
      if (datas.filenames) {

        const ref = await storage.ref().child(datas.filenames);
        // console.log("REFFF", ref);
        ref.delete();
        
      }
      try {
        await storageUrl.put(files[0])
        downloadUrl = await storageUrl.getDownloadURL()
        
      } catch(err) {
        // console.log("ERROR", err);
      }
    
      udatas = {
        ...datas,
        files: downloadUrl,
        filenames: filename
        // files: datas.files ? [...datas.files, ...fileList] : fileList,
        // filenames: datas.filenames ? [...datas.filenames, ...filenames] : filenames
      };
    } else {
      udatas = datas;
    }
    // console.log("FILELISTS", udatas.files);
    delete udatas.uploadFiles;
    try{
      console.log("SDFSFDATAS", udatas);
      const update = await collection.doc(id).update(udatas);
      if (curCheck && curCheck !== udatas.check) {
        const counter = await COUNTER.doc('counter').get();
        if (udatas.check === "X") {
          // console.log("XXXXXXXXXXXX")
          // console.log("COUNTER", counter.data());
          switch (kinds) {
            case 'profile':
              COUNTER.doc('counter').update({ reqProfile: counter.data().reqProfile + 1 });
              break;
          }
        } else if (udatas.check === "O") {
          // console.log("OOOOOOOOOOOOOOO")
          switch (kinds) {
            case 'profile':
              COUNTER.doc('counter').update({ reqProfile: counter.data().reqProfile - 1 });
              break;

          }
        }
      }
      // console.log("After update");
      navigate(-1);
    } catch(err) {
      window.alert('ERROR' + err);
    }

  };

  const onChange = (e) => {
    const { name, value, files, classList } = e.target;
    const date = new Date(+new Date() + 3240 * 10000).toISOString().split("T")[0]
    const time = new Date().toTimeString().split(" ")[0];
    let today = date + ' ' + time.substring(0,5);
    if (files){
      setDatas(() => ({
        ...datas,
        uploadFiles: files,
        modifiedDate: today,
      }));
    } else {
      setDatas(() => ({
        ...datas,
        [name]: value,
        modifiedDate: today,
      }));
    }
    console.log("DDDDDDDDDDD", datas);
  };

  const onClickFileDel = async (path, file, collection) => {
    // console.log("SDF", file, path);
    if(window.confirm("파일을 삭제하시겠습니까>")){
      const ref = storage.ref().child(path);
      try {
        
        // const newFiles = datas.files.filter((f) => f !== file);
        // const newFilenames = datas.filenames.filter((p) => p !== path);
        
        const newFiles = '';
        const newFilenames = '';
        
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
        // console.log("UUUUJDATA", udata);
        await ref.delete();
        await collection.doc(id).update(udata);
      } catch(err) {
        // console.log("ERR", err);
        alert("삭제 실패", err);
      }
    }
  }
  if (status === 1) {
    return (
      <DataDetailForm title={title} onClickDel={onClickDel}>
        <HandleDetail detail={detail} datas={datas} onChange={onChange} back={back} onSubmit={onSubmit} collection={collection} onClickFileDel={onClickFileDel} />
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
                class="navbar-right panel_toolbox btn btn-danger"
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