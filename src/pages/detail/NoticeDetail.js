import { useRef, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function NoticeDetail({ datas, onChange, back, onSubmit, collection, onClickFileDel }) {
  const {
    title,
    content,
    creator,
    files,
    filenames,
    modifiedDate,
    pubDate,
  } = datas;
  const [value, setValue] = useState('');

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

  const modules = {
    toolbar: {
      container: toolbarOptions,
    },
  };

  return (
    <>
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
            {/* <ReactQuill
            value={value || ""}
            theme="snow" 
            modules={modules}
            formats={formats}
            style={{hight: '700px'}}
            ></ReactQuill> */}
            <textarea
              onChange={onChange}
              name="content"
              type="text"
              class="form-control"
              value={content}
              style={{ height: '400px'}}
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
          <label class="control-label col-md-3 col-sm-3 ">수정시간</label>
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
        <div class="form-group row ">
          <label class="control-label col-md-3 col-sm-3 ">등록시간</label>
          <div class="col-md-4 col-sm-4 ">
            <input
              onChange={onChange}
              name="pubDate"
              type="text"
              readOnly="readOnly"
              class="form-control"
              value={pubDate}
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
    </>
  );
}