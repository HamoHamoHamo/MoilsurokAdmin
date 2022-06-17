export default function CreateNotice({ onChange, inputs}) {
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
      <div class="form-group row ">
        <label class="control-label col-md-3 col-sm-3 ">내용</label>
        <div class="col-md-4 col-sm-4 ">
          <textarea
            onChange={onChange}
            name="content"
            type="text"
            class="form-control"
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
      
      
    </>
    
  )
}
