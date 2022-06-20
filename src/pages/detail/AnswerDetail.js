import routes from "../../utils/Routes";

export default function AnswerDetail({ datas, onChange, back, onSubmit, collection, onClickFileDel }) {
  const {
    title,
    content,
    creator,
    question,
    modifiedDate,
    pubDate,
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
        <label class="control-label col-md-3 col-sm-3 ">문의</label>
        <div class="col-md-4 col-sm-4 " style={{display: "flex", alignItems: "center"}}>
          <a href={routes.datasQuestionDetail(question)}>문의 보기</a>
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
  );
}