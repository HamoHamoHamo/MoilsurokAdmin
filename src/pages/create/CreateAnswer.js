import { useEffect, useState } from "react"
import { QUESTION } from "../../utils/Firebase"

export default function CreateAnswer({ onChange, inputs}) {
  const [qList, setQList] = useState([]);
  const [qIdList, setQIdList] = useState([]);

  useEffect(() => {
    let list = [];
    let id = [];
    QUESTION.orderBy("modifiedDate", "desc").get().then((docs) => {
      docs.forEach((doc) => {
        if(doc.exists){
          list.push(doc.data());
          id.push(doc.id);
        }
      });
    });
    console.log("LIST", list);
    setQList(list);
    setQIdList(id);
  }, [])

  console.log("AAAAA", qList);

  return (
    <>
      <div class="form-group row ">
        <label class="control-label col-md-3 col-sm-3 ">문의</label>
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
    </>
    
  )
}
