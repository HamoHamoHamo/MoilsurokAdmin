import { useEffect, useState } from "react";
import DataReqDetailForm from "../../components/DataReqDetail";
import { ANSWER, COUNTER, QUESTION } from "../../utils/Firebase";
import { useParams, useNavigate } from "react-router-dom";

export default function AnswerQuestion() {
  const { id } = useParams();
  const [datas, setDatas] = useState({});
  const [answer, setAnswer] = useState({});
  const [status, setStatus] = useState(0);
  const navigate = useNavigate();
  const COL = QUESTION;
  let doing = false;

  useEffect(() => {
    COL
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setDatas(doc.data());
          setStatus(1);
          setAnswer({
            creator: "관리자",
            title: doc.data().title,
            question: id
          })
        } else {
          setStatus(404);
        }
      });
  }, []);

  const {
    title,
    content,
    creator,
    files,
    filenames,
    check,
    modifiedDate,
    pubDate,
  } = datas;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (doing) {
      console.log("doing");
      window.alert("한 번만 클릭해주세요");
      return
    }
    doing = true;

    let today = new Date();
    const data = {
      ...answer,
      pubDate: today.toLocaleString(),
      modifiedDate: today.toLocaleString(),
    }
    const qdata = {
      ...datas,
      check: "O",
    }
    await ANSWER.add(data)
    await QUESTION.doc(id).update(qdata)
    console.log("finish");
    
    const counter = await COUNTER.doc('counter').get();
    await COUNTER.doc('counter').update({ answer: counter.data().answer + 1 });
    await COUNTER.doc('counter').update({ reqQuestion: counter.data().reqQuestion - 1 });
    
    navigate(-1);
  };

  console.log("ANSWER", answer);
  const onChange = (e) => {
    const { value, name } = e.target;
    setAnswer((cur) => ({
      ...cur,
      [name]: value
    }));
  }
  if (status === 1) {
    return (
      <div>
        <div class="row">
          <div class="col-md-12 col-sm-12">
            <div class="x_panel">
              <div class="x_title">
                <h2>문의 답변</h2>
                <div class="clearfix"></div>
              </div>
              <div class="x_content">
                <form
                  method="post"
                  onSubmit={onSubmit}
                  class="form-horizontal form-label-left"
                >
                  <div class="form-group row ">
                    <label class="control-label col-md-3 col-sm-3 ">제목</label>
                    <div class="col-md-4 col-sm-4 ">
                      <input
                        name="title"
                        type="text"
                        class="form-control"
                        value={title}
                        readOnly
                      />
                    </div>
                  </div>
                  <div class="form-group row ">
                    <label class="control-label col-md-3 col-sm-3 ">내용</label>
                    <div class="col-md-4 col-sm-4 ">
                      <textarea
                        name="content"
                        type="text"
                        class="form-control"
                        value={content}
                        readOnly
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label class="control-label col-md-3 col-sm-3 ">파일</label>
                    <div class="col-md-4 col-sm-4 " style={{ display: "flex", flexDirection: "column" }}>
                      {files && files.map((img, i) => (
                        <a href={img} target="_blank">{filenames[i].slice(filenames[i].indexOf("_") + 1)}</a>
                      ))}
                    </div>
                  </div>
                  <div class="form-group row ">
                    <label class="control-label col-md-3 col-sm-3 ">작성자</label>
                    <div class="col-md-4 col-sm-4 ">
                      <input
                        name="creator"
                        type="text"
                        class="form-control"
                        value={creator}
                        readOnly
                      />
                    </div>
                  </div>
                  <div class="form-group row ">
                    <label class="control-label col-md-3 col-sm-3 ">수정시간</label>
                    <div class="col-md-4 col-sm-4 ">
                      <input
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
                        name="pubDate"
                        type="text"
                        readOnly="readOnly"
                        class="form-control"
                        value={pubDate}
                      />
                    </div>
                  </div>


                  <div class="ln_solid">
                  </div>
                  <div class="form-group row ">
                    <label class="control-label col-md-3 col-sm-3 ">답변</label>
                    <div class="col-md-6 col-sm-6 ">
                      <textarea
                        style={{ height: "200px" }}
                        name="content"
                        type="text"
                        class="form-control"
                        onChange={onChange}
                      />
                    </div>
                  </div>
                  <div class="form-group row ">
                    <label class="control-label col-md-3 col-sm-3 ">작성자</label>
                    <div class="col-md-4 col-sm-4 ">
                      <input
                        name="creator"
                        type="text"
                        class="form-control"
                        value={answer.creator}
                        onChange={onChange}
                      />
                    </div>
                  </div>
                  <div class="ln_solid">
                    <div class="form-group">
                      <div class="col-md-6" style={{ marginTop: "20px" }}>
                        <button type="submit" class="btn btn-success">
                          작성
                        </button>
                        <button type="reset" class="btn btn-secondary" onClick={() => navigate(-1)}>
                          취소
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (status === 404) {
    return <div>Data not Found</div>;
  } else {
    return <div>Loading</div>;
  }
}