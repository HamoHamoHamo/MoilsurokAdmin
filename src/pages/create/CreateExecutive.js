export default function CreateExecutive({ onChange, inputs, id}) {
  let showYear = false;
  if (id === '04부회장이사'){
    showYear = true;
  }
  return (
    <>
      <div class="form-group row ">
        <label class="control-label col-md-3 col-sm-3 ">직책</label>
        <div class="col-md-4 col-sm-4 ">
          <input
            onChange={onChange}
            name="comPosition"
            type="text"
            class="form-control"
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
      
    </>
    
  )
}
  