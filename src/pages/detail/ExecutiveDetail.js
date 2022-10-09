import { EXECUTIVE } from "../../utils/Firebase";
import routes from "../../utils/Routes";

export default function ExecutiveDetail({ datas, onChange, back, onSubmit, collection, onClickFileDel }) {
  const { userList } = datas;
  console.log("DATAS", datas)


  // 데이터 바꾸기
  // const acc = {};
  // const reduce = Object.entries(datas).map(([year, data], i) => {
  //   // const n = i+1 < 10 ? `0${i+1}` : i+1;
  //   const n = year.substring(0,2)
  //   acc[`year${n}`] = data;
  // })
  // if (acc) {
  //   // EXECUTIVE.doc('04부회장이사').update(acc)
  // }


  if (userList) {
    const {
      modifiedDate,
      pubDate
    } = datas;

    return (
      <form
        method="post"
        onSubmit={onSubmit}
        class="form-horizontal form-label-left"
      >
        {userList && userList.map((data, i) => {
          const {
            name,
            comPosition,
            filenames,
            files
          } = data;
          console.log('filenames', filenames)
          return(
            <>
              <div class="form-group row ">
                <label class="control-label col-md-3 col-sm-3 ">직책</label>
                <div class="col-md-4 col-sm-4 ">
                  <input
                    onChange={onChange}
                    name="comPosition"
                    type="text"
                    class={`${i} form-control`}
                    value={comPosition}
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
                    class={`${i} form-control`}
                    value={name}
                  />
                </div>
              </div>
              <div class="form-group row " style={{marginBottom: '40px'}}>
                <label class="control-label col-md-3 col-sm-3 ">사진</label>
                <div class="col-md-4 col-sm-4 ">
                <input
                    onChange={onChange}
                    name="files"
                    type="file"
                    class={`${i} form-control`}
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
            </>
          )
        })}
        
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
}