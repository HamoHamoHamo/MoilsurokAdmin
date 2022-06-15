import react, { useState, useEffect, useRef } from "react";
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
    HandleDetail = UserDataDetail;
    title = "회원 데이터"
  } else if (kinds === "notice") {
    HandleDetail = NoticeDataDetail;
    title = "공지사항 데이터"
  } else if (kinds === "schedule") {
    HandleDetail = ScheduleDataDetail;
    title = "일정 데이터"
  } else if (kinds === "question") {
    HandleDetail = QuestionDataDetail;
    title = "문의 데이터"
  } else if (kinds === "answer") {
    HandleDetail = AnswerDataDetail;
    title = "답변 데이터"
  } else if (kinds === "profile") {
    HandleDetail = ProfileDataDetail;
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
    let filenames = [];

    const fileList = files && await Promise.all(
      Object.entries(files).map(async([key, file], i) => {
        const filename = `files/${kinds}/${file.name}`;
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
    console.log("FILELISTS", fileList.constructor);
    const udatas = {
      ...datas,
      files: fileList,
      filenames,
    };
    delete udatas.uploadFiles;
    try{
      console.log("SDFSFDATAS", udatas);
      const update = await collection.doc(id).update(udatas).then(navigate(-1));
      console.log("UPDATE RESULT", update);
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

export function DataDetailForm({ children, title, onClickDel }) {
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

function UserDataDetail({ datas, onChange, back, onSubmit, collection, onClickFileDel }) {
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
    sector,
    year,
    files,
    filenames
  } = datas;
  return (
    <form
      method="post"
      onSubmit={onSubmit}
      class="form-horizontal form-label-left"
    >
      <div class="form-group row ">
        <label class="control-label col-md-3 col-sm-3 ">기수</label>
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
        <label class="control-label col-md-3 col-sm-3 ">이름</label>
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
        <label class="control-label col-md-3 col-sm-3 ">생년월일</label>
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
        <label class="control-label col-md-3 col-sm-3 ">전화번호</label>
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
        <label class="control-label col-md-3 col-sm-3 ">이메일</label>
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
        <label class="control-label col-md-3 col-sm-3 ">회사명</label>
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
        <label class="control-label col-md-3 col-sm-3 ">부서</label>
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
        <label class="control-label col-md-3 col-sm-3 ">직위</label>
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
        <label class="control-label col-md-3 col-sm-3 ">근무처 전화</label>
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
        <label class="control-label col-md-3 col-sm-3 ">직장주소</label>
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
        <label class="control-label col-md-3 col-sm-3 ">팩스 번호</label>
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
        <label class="control-label col-md-3 col-sm-3 ">프로필 사진</label>
        <div class="col-md-4 col-sm-4 ">
        <input
            onChange={onChange}
            name="files"
            type="file"
            class="form-control"
            multiple
          />
        </div>
      </div>
      {files && files.map((img, i) => (
        <div class="form-group row" key={`files${i}`}>
          <label class="control-label col-md-3 col-sm-3 "></label>
          <div class="col-md-4 col-sm-4 ">
            <a href={img} target="_blank">{filenames[i]}</a>
            <a onClick={() => onClickFileDel(filenames[i], img, collection)} style={{cursor: "pointer"}}><i style={{marginLeft: "20px"}} class="fa fa-close"></i></a>
          </div>
        </div>
      ))}
      <div class="form-group row ">
        <label class="control-label col-md-3 col-sm-3 ">업종</label>
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
        <label class="control-label col-md-3 col-sm-3 ">승인여부</label>
        <div class="col-md-4 col-sm-4 ">
          <div class="radio">
            <label>
              <input
                onChange={onChange}
                name="check"
                type="radio"
                checked={check === "y"}
                value="y"
                id="optionsRadios1"
              />{" "}
              O
            </label>
          </div>
          <div class="radio">
            <label>
              <input
                onChange={onChange}
                name="check"
                type="radio"
                checked={check === "n"}
                value="n"
                id="optionsRadios2"
              />{" "}
              X
            </label>
          </div>
        </div>
      </div>
      <div class="form-group row ">
        <label class="control-label col-md-3 col-sm-3 ">수정날짜</label>
        <div class="col-md-4 col-sm-4 ">
          <input
            onChange={onChange}
            name="modifiedDate"
            type="text"
            readOnly="readOnly"
            class="form-control"
            value={modifiedDate}
          />
        </div>
      </div>
      <div class="ln_solid">
        <div class="form-group">
          <div class="col-md-6" style={{ marginTop: "20px" }}>
            <button type="submit" class="btn btn-success">
              수정
            </button>
            <button type="reset" class="btn btn-secondary" onClick={back}>
              취소
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

function NoticeDataDetail({ datas, onChange, back, onSubmit, collection, onClickFileDel }) {
  const {
    title,
    content,
    creator,
    files,
    modifiedDate,
    filenames,
  } = datas;
  return (
    <form
      method="post"
      onSubmit={onSubmit}
      class="form-horizontal form-label-left"
    >
      <div class="form-group row ">
        <label class="control-label col-md-3 col-sm-3 ">제목</label>
        <div class="col-md-4 col-sm-4 ">
          <input
            onChange={onChange}
            name="title"
            type="text"
            class="form-control"
            value={title}
          />
        </div>
      </div>
      <div class="form-group row ">
        <label class="control-label col-md-3 col-sm-3 ">내용</label>
        <div class="col-md-4 col-sm-4 ">
          <textarea
            onChange={onChange}
            name="content"
            type="text"
            class="form-control"
            value={content}
          />
        </div>
      </div>
      <div class="form-group row ">
        <label class="control-label col-md-3 col-sm-3 ">작성자</label>
        <div class="col-md-4 col-sm-4 ">
          <input
            onChange={onChange}
            name="creator"
            type="text"
            class="form-control"
            value={creator}
          />
        </div>
      </div>
      <div class="form-group row ">
        <label class="control-label col-md-3 col-sm-3 ">이미지</label>
        <div class="col-md-4 col-sm-4 ">
          <input
            onChange={onChange}
            name="files"
            type="file"
            class="form-control"
            multiple
          />
        </div>
      </div>
      {files && files.map((img, i) => (
        <div class="form-group row" key={`files${i}`}>
          <label class="control-label col-md-3 col-sm-3 "></label>
          <div class="col-md-4 col-sm-4 ">
            <a href={img} target="_blank">{filenames[i]}</a>
            <a onClick={() => onClickFileDel(filenames[i], img, collection)} style={{cursor: "pointer"}}><i style={{marginLeft: "20px"}} class="fa fa-close"></i></a>
          </div>
        </div>
      ))}
      <div class="form-group row ">
        <label class="control-label col-md-3 col-sm-3 ">수정날짜</label>
        <div class="col-md-4 col-sm-4 ">
          <input
            onChange={onChange}
            name="modifiedDate"
            type="text"
            readOnly="readOnly"
            class="form-control"
            value={modifiedDate}
          />
        </div>
      </div>
      <div class="ln_solid">
        <div class="form-group">
          <div class="col-md-6" style={{ marginTop: "20px" }}>
            <button type="submit" class="btn btn-success">
              수정
            </button>
            <button type="reset" class="btn btn-secondary" onClick={back}>
              취소
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

function ScheduleDataDetail({ datas, onChange, back, onSubmit, collection }) {
  const {
    date,
    title,
    content,
    creator,
    modifiedDate,
  } = datas;
  return (
    <form
      method="post"
      onSubmit={onSubmit}
      class="form-horizontal form-label-left"
    >
      <div class="form-group row ">
        <label class="control-label col-md-3 col-sm-3 ">날짜</label>
        <div class="col-md-4 col-sm-4 ">
          <input
            onChange={onChange}
            name="date"
            type="text"
            class="form-control"
            value={date}
          />
        </div>
      </div>
      <div class="form-group row ">
        <label class="control-label col-md-3 col-sm-3 ">제목</label>
        <div class="col-md-4 col-sm-4 ">
          <input
            onChange={onChange}
            name="title"
            type="text"
            class="form-control"
            value={title}
          />
        </div>
      </div>
      <div class="form-group row ">
        <label class="control-label col-md-3 col-sm-3 ">내용</label>
        <div class="col-md-4 col-sm-4 ">
          <textarea
            onChange={onChange}
            name="content"
            type="text"
            class="form-control"
            value={content}
          />
        </div>
      </div>
      <div class="form-group row ">
        <label class="control-label col-md-3 col-sm-3 ">작성자</label>
        <div class="col-md-4 col-sm-4 ">
          <input
            onChange={onChange}
            name="creator"
            type="text"
            class="form-control"
            value={creator}
          />
        </div>
      </div>
      <div class="form-group row ">
        <label class="control-label col-md-3 col-sm-3 ">수정날짜</label>
        <div class="col-md-4 col-sm-4 ">
          <input
            onChange={onChange}
            name="modifiedDate"
            type="text"
            readOnly="readOnly"
            class="form-control"
            value={modifiedDate}
          />
        </div>
      </div>
      <div class="ln_solid">
        <div class="form-group">
          <div class="col-md-6" style={{ marginTop: "20px" }}>
            <button type="submit" class="btn btn-success">
              수정
            </button>
            <button type="reset" class="btn btn-secondary" onClick={back}>
              취소
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

function QuestionDataDetail({ datas, onChange, back, onSubmit, collection }) {
  return <div></div>;
}

function AnswerDataDetail({ datas, onChange, back, onSubmit, collection }) {
  return <div></div>;
}

function ProfileDataDetail({ datas, onChange, back, onSubmit, collection }) {
  return <div></div>;
}
