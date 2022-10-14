export default function UserDetail({ datas, onChange, back, onSubmit, collection, onClickFileDel }) {
  const {
    year,
    name,
    birthdate,
    phoneNum,
    email,
    company,
    department,
    comPosition,
    comTel,
    comAdr,
    faxNum,
    sector,
    remark,
    pubDate,
    modifiedDate,
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
        <label class="control-label col-md-3 col-sm-3 ">생년월일</label>
        <div class="col-md-4 col-sm-4 ">
          <input
            onChange={onChange}
            name="birthdate"
            type="date"
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
        <label class="control-label col-md-3 col-sm-3 ">프로필 사진</label>
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