import axios from "axios";
import { useEffect, useState } from "react";
import CreateNotice from "../pages/create/CreateNotice";
import CreateGallery from "../pages/create/CreateGallery";
import CreateUser from "../pages/create/CreateUser";
import CreateSchedule from "../pages/create/CreateSchedule";
import CreateExecutive from "../pages/create/CreateExecutive";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import {
  NOTICE,
  GALLERY,
  SCHEDULE,
  USER,
  storage,
  COUNTER,
  EXECUTIVE,
} from "../utils/Firebase";
import routes from "../utils/Routes";

export default function DataCreateForm({ kinds }) {
  const { id } = useParams();
  const [inputs, setInputs] = useState({creator: "관리자"});
  const navigate = useNavigate();
  let HandleCreate = '';
  let title = '';
  let collection = '';
  let doing = false;

  // 모든 회원 기수 데이터 숫자에서 문자 +'기' 붙이게 바꾸기
  // useEffect(() => {
  //   if (kinds === 'user') {
  //     USER.get().then((res) => {
  //       res.forEach((doc) => {
  //         const data = doc.data();
  //         const intYear = parseInt(data.year);
  //         const year = intYear < 10 ? `0${intYear}기` : `${intYear}기`;
  //         console.log("year", year)
  //         console.log("id", doc.id)
  //         USER.doc(doc.id).update({year: year});
  //       });
  //     })
  //   }
  // }, [])

  if(kinds === "notice") {
    HandleCreate = CreateNotice;
    title = "공지사항";
    collection = NOTICE;
  } else if(kinds === "gallery") {
    HandleCreate = CreateGallery;
    title = "행사앨범";
    collection = GALLERY;
  } else if(kinds === "user") {
    HandleCreate = CreateUser;
    title = "회원";
    collection = USER;
  } else if(kinds === "schedule") {
    HandleCreate = CreateSchedule;
    title = "일정";
    collection = SCHEDULE;
  } else if(kinds === "executive") {
    HandleCreate = CreateExecutive;
    title = id.substring(2,);
    collection = EXECUTIVE.doc(id).collection('userList');
  } 

  const onClickBack = (e) => {
    e.preventDefault();
    navigate(-1);
  }

  const onChange = (e) => {
    const { name, value, files } = e.target;
    const date = new Date(+new Date() + 3240 * 10000).toISOString().split("T")[0]
    const time = new Date().toTimeString().split(" ")[0];
    let today = date + ' ' + time.substring(0,5);
    if (files){
      setInputs(() => ({
        ...inputs,
        uploadFiles: files,
        modifiedDate: today,
        pubDate: today,
      }));
    } else if (name === 'year'){
      setInputs(() => ({
        ...inputs,
        [name]: parseInt(value),
        modifiedDate: today,
        pubDate: today,
      }));
    } else {
      setInputs(() => ({
        ...inputs,
        [name]: value,
        modifiedDate: today,
        pubDate: today,
      }));
    }
    console.log('INPUTSSS', inputs);
  };
    
  const onSubmit = async (e) => {
    e.preventDefault();
    if (doing) {
      // console.log("doing");
      window.alert("한 번만 클릭해주세요");
      return
    }
    doing = true;
    
    const { uploadFiles: files } = inputs
    let udatas = {};
    if (inputs.num) {
      inputs.num = parseInt(inputs.num)
    }

    let field = '';
    if((kinds === 'gallery' && files) || (kinds === 'notice' && files)) {
      let filenames = [];
      const fileList = await Promise.all(
        files.map(async(file, i) => {
          const filename = `files/${kinds}/${uuidv4()}_${file.name}`;
          const storageUrl = storage.ref().child(filename)
          filenames.push(filename);
          try {
            await storageUrl.put(file)
            const downloadUrl = await storageUrl.getDownloadURL()
            // console.log("DOWNLAOTDURL", downloadUrl);
            return downloadUrl;
          } catch(err) {
            // console.log("ERROR", err);
          }
          
        }, [])
      );
      udatas = {
        ...inputs,
        files: inputs.files ? [...inputs.files, ...fileList] : fileList,
        filenames: inputs.filenames ? [...inputs.filenames, ...filenames] : filenames
      };
    } else if(files && files.length > 0){
      let filenames = [];
			
      const fileList = files && await Promise.all(
        Object.entries(files).map(async([key, file], i) => {
          const filename = `files/${kinds}/${uuidv4()}_${file.name}`;
          const storageUrl = storage.ref().child(filename)
          filenames.push(filename);
          try {
            await storageUrl.put(file)
            const downloadUrl = await storageUrl.getDownloadURL()
            // console.log("DOWNLAOTDURL", downloadUrl);
            return downloadUrl;
          } catch(err) {
            // console.log("ERROR", err);
          }
          
        }, [])
      );
      
      udatas = {
        ...inputs,
        // files: inputs.files ? [...inputs.files, ...fileList] : fileList,
        // filenames: inputs.filenames ? [...inputs.filenames, ...filenames] : filenames
				files: fileList[0],
        filenames: filenames[0]
      };
    } else {
      udatas = inputs;
    }
    // // console.log("FILELISTS", udatas.files);
    delete udatas.uploadFiles;
		
    try{
      // // console.log("SDFSFDATAS", udatas);
      const update = await collection.add(udatas).then((res) => {
        if (kinds === 'user' || kinds === 'notice'){
          console.log('uiddd', res.id)
          collection.doc(res.id).update({ uid: res.id }).catch((err) => {
            window.alert('uid저장 에러');
            // console.log("ERRRROR", err);
          });
        }
        if (kinds === 'notice' || kinds === 'schedule'){
          const title = kinds === 'notice' ? '공지사항' : '일정'
          const body = kinds === 'notice' ? '새로운 공지사항이 등록되었습니다.' : `${inputs.date.substr(0,4)}년 ${inputs.date.substr(5,2)}월 ${inputs.date.substr(8,2)}일 새로운 일정이 등록되었습니다.`
          const headers = {
            'Content-Type': 'application/json',
            'Authorization': process.env.REACT_APP_FIREBASE_MSG_KEY,
          }
          
          axios.post('https://fcm.googleapis.com/fcm/send', {
            "to" : "/topics/1",
            "priority" : "high",
            "notification": {
              title,
              body,
            }
          }, { headers }).then((res) => {
            // console.log("알림전송", res);
          }).catch(err => {
            window.alert("알림전송 에러 발생", err);
          })  
        }
        

        window.alert("데이터 생성 완료")
        
        // console.log("RES", res);
        // navigate(`/datas/${kinds}/${res.id}`);
        COUNTER.doc('counter').get().then((doc) => {
          switch (kinds) {
            case "notice": 
              COUNTER.doc('counter').update({ notice: parseInt(doc.data().notice) +1 }).then(window.location.href = `/datas/${kinds}`);
              break;
            case "gallery": 
              COUNTER.doc('counter').update({ gallery: parseInt(doc.data().gallery) +1 }).then(window.location.href = `/datas/${kinds}`);
              break;
            case "executive": 
              switch(id) {
                case '01회장단':
                COUNTER.doc('counter').update({ executive01: parseInt(doc.data().executive01) +1 }).then(window.location.href = `/datas/${kinds}/${id}`);
                break;
              case '02명예회장':
                COUNTER.doc('counter').update({ executive02: parseInt(doc.data().executive02) +1 }).then(window.location.href = `/datas/${kinds}/${id}`);
                break;
              case '03교수진':
                COUNTER.doc('counter').update({ executive03: parseInt(doc.data().executive03) +1 }).then(window.location.href = `/datas/${kinds}/${id}`);
                break;
              case '04집행부':
                COUNTER.doc('counter').update({ executive04: parseInt(doc.data().executive04) +1 }).then(window.location.href = `/datas/${kinds}/${id}`);
                break;
              case '05운영분과':
                COUNTER.doc('counter').update({ executive05: parseInt(doc.data().executive05) +1 }).then(window.location.href = `/datas/${kinds}/${id}`);
                break;
              case '06언론편집분과':
                COUNTER.doc('counter').update({ executive06: parseInt(doc.data().executive06) +1 }).then(window.location.href = `/datas/${kinds}/${id}`);
                break;
              case '07동호회':
                COUNTER.doc('counter').update({ executive07: parseInt(doc.data().executive07) +1 }).then(window.location.href = `/datas/${kinds}/${id}`);
                break;
              }
              break;
            case "user": 
              COUNTER.doc('counter').update({ user: parseInt(doc.data().user) +1 }).then(() => {
                // console.log("SSSSHREFTEST");
                window.location.href = `/datas/${kinds}`;
              });
              break;
            case "schedule": 
              COUNTER.doc('counter').update({ schedule: parseInt(doc.data().schedule) +1 }).then(window.location.href = `/datas/${kinds}`);
              break;
          }
        })
        
      });
    } catch(err) {
      window.alert("ERROR", err);
      // console.log('ERROR', err);
    }

  };
  if (!doing){
    return (
      <div>
        <div class="row">
          <div class="col-md-12 col-sm-12">
            <div class="x_panel">
              <div class="x_title">
                <h2>{title} 등록</h2>
                <div class="clearfix"></div>
              </div>
              <div class="x_content">
                <form
                  method="post"
                  onSubmit={onSubmit}
                  class="form-horizontal form-label-left"
                >
                  <HandleCreate setInputs={setInputs} onChange={onChange} inputs={inputs} id={id}/>
                  <div class="ln_solid">
                    <div class="form-group">
                      <div class="col-md-2" style={{ marginTop: "20px" }}>
                        <button type="submit" class="btn btn-success">
                          저장
                        </button>
                        <button class="btn btn-secondary" onClick={onClickBack}>
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
  } else if (doing) {
    <div>Loading</div>
  }
}