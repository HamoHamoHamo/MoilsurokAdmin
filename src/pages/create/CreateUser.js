import { useEffect, useState } from "react"
import { QUESTION } from "../../utils/Firebase"

export default function CreateUser({ onChange, inputs}) {
  return (
    <>
      <div class="form-group row ">
        <label class="control-label col-md-3 col-sm-3 ">증서번호</label>
        <div class="col-md-4 col-sm-4 ">
          <input
            onChange={onChange}
            name="num"
            type="text"
            class="form-control"
          />
        </div>
      </div>
      <div class="form-group row ">
        <label class="control-label col-md-3 col-sm-3 ">선정년도</label>
        <div class="col-md-4 col-sm-4 ">
          <input
            onChange={onChange}
            name="year"
            type="text"
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
        <label class="control-label col-md-3 col-sm-3 ">분야</label>
        <div class="col-md-4 col-sm-4 ">
          <input
            onChange={onChange}
            name="field"
            type="text"
            class="form-control"
          />
        </div>
      </div>
      <div class="form-group row ">
        <label class="control-label col-md-3 col-sm-3 ">직종</label>
        <div class="col-md-4 col-sm-4 ">
          <input
            onChange={onChange}
            name="occupation"
            type="text"
            class="form-control"
          />
        </div>
      </div>
      <div class="form-group row ">
        <label class="control-label col-md-3 col-sm-3 ">소속</label>
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
        <label class="control-label col-md-3 col-sm-3 ">연락처</label>
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

    </>
  )
}
