import { useEffect, useState } from "react"
import { QUESTION } from "../../utils/Firebase"

export default function CreateUser({ onChange, inputs}) {
  return (
    <>
      <div class="form-group row ">
        <label class="control-label col-md-3 col-sm-3 ">기수</label>
        <div class="col-md-4 col-sm-4 ">
          <input
            onChange={onChange}
            name="year"
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
        <label class="control-label col-md-3 col-sm-3 ">생년월일</label>
        <div class="col-md-4 col-sm-4 ">
          <input
            onChange={onChange}
            name="birthdate"
            type="text"
            class="form-control"
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
            
          />
        </div>
      </div>
      <div class="form-group row ">
        <label class="control-label col-md-3 col-sm-3 ">자택 전화</label>
        <div class="col-md-4 col-sm-4 ">
          <input
            onChange={onChange}
            name="homeTel"
            type="text"
            class="form-control"
          />
        </div>
      </div>
      <div class="form-group row ">
        <label class="control-label col-md-3 col-sm-3 ">자택 주소</label>
        <div class="col-md-4 col-sm-4 ">
          <input
            onChange={onChange}
            name="homeAdr"
            type="text"
            class="form-control"
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
          />
        </div>
      </div>
      <div class="form-group row ">
        <label class="control-label col-md-3 col-sm-3 ">비고</label>
        <div class="col-md-4 col-sm-4 ">
          <input
            onChange={onChange}
            name="remark"
            type="text"
            class="form-control"
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

    </>
  )
}
