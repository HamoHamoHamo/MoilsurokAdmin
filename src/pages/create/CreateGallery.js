import { useRef, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { today } from '../../utils/Routes';

export default function CreateGallery({ onChange, inputs, setInputs}) {
  const [cnt, setCnt] = useState(0);
  const [imgBase64, setImgBase64] = useState([]);
  const fileInput = useRef();
  
  // 사용하고 싶은 옵션, 나열 되었으면 하는 순서대로 나열
  const toolbarOptions = [
    ["link", "image", "video"],
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    ["blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
  ]; 


  // 옵션에 상응하는 포맷, 추가해주지 않으면 text editor에 적용된 스타일을 볼수 없음
  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "align",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "background",
    "color",
    "link",
    "image",
    "video",
    "width",
  ];
  // text editor
  const modules = {
    toolbar: {
      container: toolbarOptions,
    },
  };
  const onRemove = (i) => {
    setImgBase64(imgBase64.filter(cur => cur.count != i))
    
  }

  const addFile = (e) => {
    fileInput.current.value = "";
  }

  const onChangeFile = (e) => {
    const { name, files } = e.target;
    let reader = new FileReader();
    reader.onloadend = () => {
      // 2. 읽기가 완료되면 아래코드가 실행됩니다.
      const base64 = reader.result;
      if (base64) {
        setImgBase64(cur => [...cur, {count: parseInt(cnt) + 1, file: files[0], filename: files[0].name, src: base64.toString()}]); // 파일 base64 상태 업데이트
        setCnt(cnt+1)
      }      
    }
    reader.readAsDataURL(files[0])
    console.log("TODAY", today);
    setInputs((datas) => ({
      ...datas,
      uploadFiles: datas.uploadFiles ? [...datas.uploadFiles, files[0]] : [files[0]],
      modifiedDate: today,
    }))
  }
  return (
    <>
      <div class="form-group row ">
        <label class="control-label col-md-3 col-sm-3 ">제목</label>
        <div class="col-md-4 col-sm-4 ">
          <input
            onChange={onChange}
            name="title"
            type="text"
            class="form-control"
          />
        </div>
      </div>
      <div class="form-group row">
        <label class="control-label col-md-3 col-sm-3 ">사진</label>
          <div class="col-md-4 col-sm-4 ">
          <label style={{cursor: 'pointer'}} htmlFor='addFile' class="btn btn-primary">파일 추가</label>
          <input
            onChange={onChangeFile}
            name="files"
            type="file"
            class="form-control"
            id='addFile'
            ref={fileInput}
            style={{display: 'none'}}
          />
          </div>
      </div>
      {imgBase64 && imgBase64.map((data,i) => (
        <div class="form-group row" key={i}>
          <label class="control-label col-md-3 col-sm-3 "></label>
          <div class="col-md-6 col-sm-6 " style={{display: "flex", flexDirection: "column", height: '400px', marginBottom: '50px'}}>
            <img style={{border: '1px solid', objectFit: 'scale-down', height: '100%'}} src={data.src} />
            <div style={{fontSize: '16px'}}>
              <span>{data.filename}</span>
              <a onClick={() => onRemove(data.count)} style={{cursor: "pointer"}}><i style={{marginLeft: "20px"}} class="fa fa-close"></i></a>
            </div>
          </div>
        </div>
      ))}
      <div class="form-group row ">
        <label class="control-label col-md-3 col-sm-3 ">내용</label>
        <div class="col-md-6 col-sm-6 ">
          <textarea
            onChange={onChange}
            name="content"
            type="text"
            class="form-control"
            style={{ height: "400px" }}
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
            value={inputs.creator}
          />
        </div>
      </div>
    </>
    
  )
}
