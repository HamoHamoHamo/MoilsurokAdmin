import routes from "../../utils/Routes";

export default function ExecutiveDetail({ detail, datas, onChange, back, onSubmit, collection, onClickFileDel }) {
  const {
    comPosition,
    year,
    name,
    num,
    files,
    filenames,
    modifiedDate,
    pubDate,
  } = datas;
  let showYear = false;
  
  return (
    <form
      method="post"
      onSubmit={onSubmit}
      class="form-horizontal form-label-left"
    >
      <div class="form-group row ">
        <label class="control-label col-md-3 col-sm-3 ">직책</label>
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
        <label class="control-label col-md-3 col-sm-3 ">순서</label>
        <div class="col-md-4 col-sm-4 ">
          <input
            onChange={onChange}
            name="num"
            type="number"
            class="form-control"
            value={num}
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
        <label class="control-label col-md-3 col-sm-3 ">사진</label>
        <div class="col-md-4 col-sm-4 ">
        <input
            onChange={onChange}
            name="files"
            type="file"
            class="form-control"
          />
        </div>
      </div>
      {files &&
        <div class="form-group row">
          <label class="control-label col-md-3 col-sm-3 "></label>
          <div class="col-md-4 col-sm-4 ">
            <a href={files} target="_blank">{filenames.slice(filenames.indexOf("_") + 1)}</a>
            <a onClick={() => onClickFileDel(filenames, files, collection)} style={{cursor: "pointer"}}><i style={{marginLeft: "20px"}} class="fa fa-close"></i></a>
          </div>
        </div>
      }
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
  );
}