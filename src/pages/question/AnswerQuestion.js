import { useEffect, useState } from "react";
import DataReqDetailForm from "../../components/DataReqDetail";
import { ANSWER, COUNTER, QUESTION } from "../../utils/Firebase";
import { useParams, useNavigate } from "react-router-dom";

export default function AnswerQuestion() {
  const { id } = useParams();
  const [datas, setDatas] = useState({});
  const [answer, setAnswer] = useState({});
  const [curAnswerId, setCurAnswerId] = useState({});
  const [curAnswer, setCurAnswer] = useState('');
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
          ANSWER.where('question', '==', id).get().then((doc) => {
            if (doc.docs[0]){
              // console.log("TEST", doc);
              if (doc.docs[0].exists) {
                setCurAnswer(doc.docs[0].data());
                setCurAnswerId(doc.docs[0].id);
              }
            }
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
  console.log("DATAddS", answer);

  const delAnswer = (e) => {
    e.preventDefault();
    if(window.confirm("답변을 삭제하시겠습니까>")){      
      ANSWER.doc(curAnswerId).delete().then(() => {
        QUESTION.doc(id).update({ check: 'X' }).then(() => navigate(-1));
      })
      
    }
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    if (doing) {
      // console.log("doing");
      window.alert("한 번만 클릭해주세요");
      return
    }
    doing = true;

    const date = new Date(+new Date() + 3240 * 10000).toISOString().split("T")[0]
    const time = new Date().toTimeString().split(" ")[0];
    let today = date + ' ' + time.substring(0,5);

    const data = {
      ...answer,
      pubDate: today,
      // modifiedDate: today,
    }
    const qdata = {
      ...datas,
      check: "O",
    }
    await ANSWER.add(data)
    await QUESTION.doc(id).update(qdata)
    // console.log("finish");
    
    const counter = await COUNTER.doc('counter').get();
    // await COUNTER.doc('counter').update({ answer: counter.data().answer + 1 });
    // await COUNTER.doc('counter').update({ reqQuestion: counter.data().reqQuestion - 1 });
    
    navigate(-1);
  };

  // console.log("ANSWER", answer);
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
                        readOnly={true}
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
                        readOnly={true}
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
                        readOnly={true}
                      />
                    </div>
                  </div>
                  <div class="form-group row ">
                    <label class="control-label col-md-3 col-sm-3 ">수정시간</label>
                    <div class="col-md-4 col-sm-4 ">
                      <input
                        name="modifiedDate"
                        type="text"
                        readOnly={true}
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
                        readOnly={true}
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
                      {curAnswer.content &&
                        <textarea
                          style={{ height: "200px" }}
                          name="content"
                          type="text"
                          class="form-control"
                          onChange={onChange}
                          value={curAnswer.content}
                          readOnly={true}
                        />
                      }
                      {!curAnswer.content &&
                        <textarea
                          style={{ height: "200px" }}
                          name="content"
                          type="text"
                          class="form-control"
                          onChange={onChange}
                        />
                      }
                    </div>
                  </div>
                  <div class="form-group row ">
                    <label class="control-label col-md-3 col-sm-3 ">작성자</label>
                    <div class="col-md-4 col-sm-4 ">
                      {curAnswer.creator &&
                        <input
                          name="creator"
                          type="text"
                          class="form-control"
                          value={curAnswer.creator}
                          onChange={onChange}
                          readOnly={true}
                        />
                      }
                      {!curAnswer.creator &&
                        <input
                          name="creator"
                          type="text"
                          class="form-control"
                          value={answer.creator}
                          onChange={onChange}
                        />
                      }
                    </div>
                  </div>
                  {curAnswer.pubDate &&
                    <div class="form-group row ">
                      <label class="control-label col-md-3 col-sm-3 ">등록시간</label>
                      <div class="col-md-4 col-sm-4 ">
                          <input
                            name="pubDate"
                            type="text"
                            readOnly={true}
                            class="form-control"
                            value={curAnswer.pubDate}
                          />
                      </div>
                    </div>
                  }
                  <div class="ln_solid">
                    <div class="form-group">
                      <div class="col-md-6" style={{ marginTop: "20px" }}>
                        {!curAnswer &&
                          <button type="submit" class="btn btn-success">
                            작성
                          </button>
                        }
                        <button type="reset" class="btn btn-secondary" onClick={() => navigate(-1)}>
                          취소
                        </button>
                      </div>
                      {curAnswer.content &&
                        <div class="col-md-6" style={{ marginTop: "20px" }}>
                          <button class="btn btn-danger pull-right" onClick={delAnswer}>
                            답변삭제
                          </button>
                        </div>
                      }
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