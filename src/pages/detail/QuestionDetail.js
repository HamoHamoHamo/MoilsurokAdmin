export default function QuestionDataDetail({ datas, onChange, back, onSubmit, collection, onClickFileDel }) {
  const {
    title,
    content,
    creator,
    files,
    filenames,
    check,
    date,
    modifiedDate,
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
        <label class="control-label col-md-3 col-sm-3 ">파일</label>
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
        <label class="control-label col-md-3 col-sm-3 ">답변완료</label>
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