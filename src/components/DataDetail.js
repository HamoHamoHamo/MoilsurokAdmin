import { useState, useEffect } from "react";
import AnswerDetail from "../pages/detail/AnswerDetail"
import NoticeDetail from "../pages/detail/NoticeDetail"
import GalleryDetail from "../pages/detail/GalleryDetail"
import QuestionDetail from "../pages/detail/QuestionDetail"
import ScheduleDetail from "../pages/detail/ScheduleDetail"
import UserDetail from "../pages/detail/UserDetail"
import ExecutiveDetail from "../pages/detail/ExecutiveDetail"
import {
  USER,
  NOTICE,
  GALLERY,
  SCHEDULE,
  QUESTION,
  ANSWER,
  PROFILE,
  storage,
  COUNTER,
  EXECUTIVE,
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
    } else if (kinds === "gallery") {
      col = GALLERY;
    } else if (kinds === "schedule") {
      col = SCHEDULE;
    } else if (kinds === "question") {
      col = QUESTION;
    } else if (kinds === "answer") {
      col = ANSWER;
    } else if (kinds === "executive") {
      col = EXECUTIVE.doc(detail).collection('userList');
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
  } else if (kinds === "notice") {
    HandleDetail = NoticeDetail;
    title = "공지사항 데이터"
  } else if (kinds === "gallery") {
    HandleDetail = GalleryDetail;
    title = "행사앨범 데이터"
  } else if (kinds === "schedule") {
    HandleDetail = ScheduleDetail;
    title = "일정 데이터"
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
        case 'notice':
          COUNTER.doc('counter').update({ notice: cnt.notice - 1 });
          break;
        case 'gallery':
          COUNTER.doc('counter').update({ gallery: cnt.gallery - 1 });
          break;
        case 'executive':
          switch(detail) {
            case '01회장단':
            COUNTER.doc('counter').update({ executive01: cnt.executive01 -1 });
            break;
          case '02명예회장':
            COUNTER.doc('counter').update({ executive02: cnt.executive02 -1 });
            break;
          case '03교수진':
            COUNTER.doc('counter').update({ executive03: cnt.executive03 -1 });
            break;
          case '04집행부':
            COUNTER.doc('counter').update({ executive04: cnt.executive04 -1 });
            break;
          case '05운영분과':
            COUNTER.doc('counter').update({ executive05: cnt.executive05 -1 });
            break;
          case '06언론편집분과':
            COUNTER.doc('counter').update({ executive06: cnt.executive06 -1 });
            break;
          case '07동호회':
            COUNTER.doc('counter').update({ executive07: cnt.executive07 -1 });
            break;
          }
          break;
      }

      if (datas.filenames) {
        // 배열로 저장된 파일 삭제
        if (kinds === 'gallery' || kinds === 'notice'){
          datas.filenames.map(async (file) => {
            const ref = storage.ref().child(file);
            ref.delete();
          })
        } else {
          const ref = storage.ref().child(datas.filenames);
          ref.delete();
        }
      }
      
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

    if((kinds === 'gallery' && files) || (kinds === 'notice' && files)) {
      let filenames = [];
      const fileList = await Promise.all(
        files.map(async(file, i) => {
          const filename = `files/${kinds}/${uuidv4()}_${file.name}`;
          const storageUrl = storage.ref().child(filename)
          filenames.push(filename);
          try {
            await storageUrl.put(file)
            const downloadUrl = await storageUrl.getDownloadURL()
            // console.log("DOWNLAOTDURL", downloadUrl);
            return downloadUrl;
          } catch(err) {
            // console.log("ERROR", err);
          }
          
        }, [])
      );
      udatas = {
        ...datas,
        files: datas.files ? [...datas.files, ...fileList] : fileList,
        filenames: datas.filenames ? [...datas.filenames, ...filenames] : filenames
      };

    } else if(files && files.length > 0){
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
      const update = await collection.doc(id).update(udatas);
      window.alert('수정 완료')
    } catch(err) {
      window.alert('수정 실패');
      console.log("err", err)
      console.log('datass', udatas);
    }
    navigate(-1);
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
    } else if (name === 'year'){
      setDatas(() => ({
        ...datas,
        [name]: parseInt(value),
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
        let newFiles = '';
        let newFilenames = '';

        if (kinds === 'gallery' || kinds === 'notice') {
          newFiles = datas.files.filter((f) => f !== file);
          newFilenames = datas.filenames.filter((p) => p !== path);
        }
        console.log("NEWFILES", newFiles)
        console.log("NEWFILESname", newFilenames)
        
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
        delete udata.uploadFiles;
        // console.log("UUUUJDATA", udata);
        await ref.delete();
        await collection.doc(id).update(udata);
      } catch(err) {
        console.log("ERR", err);
        alert("삭제 실패", err);
      }
    }
  }
  if (status === 1) {
    return (
      <DataDetailForm title={title} onClickDel={onClickDel}>
        <HandleDetail detail={detail} datas={datas} onChange={onChange} back={back} onSubmit={onSubmit} collection={collection} onClickFileDel={onClickFileDel} setDatas={setDatas} />
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