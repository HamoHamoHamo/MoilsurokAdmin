import react, { useState, useEffect, useRef } from "react";
import { Pagination, DataTable } from "../components/DataTable";
import { firestore, TEAM, USER } from "../utils/Firebase";
import readXlsxFile from 'read-excel-file';
import { Link, useLocation } from 'react-router-dom';
import routes from "../utils/Routes";


export default function DatasUser() {
  // const onUploadFile = (e) => {
  //   readXlsxFile(e.target.files[0]).then((rows) => {
  //   console.log(rows);
  // })};
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [idList, setIdList] = useState([]);
  const [dataList, setDataList] = useState([]);
  const search = decodeURI(location.search).split('=')[1];
  

  const header = [
    '이름',
    '기수',
    '생년월일',
    '전화번호',
    '이메일',
    '회사명',
    '승인여부',
    '수정시간'
  ]
  useEffect(() => {
    // 데이터 추가하기
    // USER.add({modifiedDate: "2022-02-11 10:10", year: "기수", name: "이름", birthdate: "20220505", phoneNum: "01012341234", email: "test@naver.com", company: "킹버스", department: "제품개발부서", comPosition: "직위", comTel: "022332323", comAdr: "수원시 매송고색로", faxNum: "1234213", picture: "사진링크", sector: "it", check: "y"})
    let list = []
    let id = []
    USER.orderBy("modifiedDate", "desc").get().then((docs) => {
      docs.forEach((doc) => {
        if(doc.exists){
          list.push(doc.data());
          id.push(doc.id);
        }
      });
      setLoading(true);
      setIdList(id);
      setDataList(list.map((data, idx) => {
        if(!search || Object.values(data).includes(search)){
          console.log("data")
          return(
            Object.entries(data).reduce((acc, [key, val], i) => {
              // console.log("KEY", key, "\nval", val, "\nacc", acc);
              if(key === 'year' || key === 'name' || key === 'phoneNum' || key === 'birthdate' || key === 'email' || key === 'company' || key === 'check' || key === 'modifiedDate') {
                acc = {
                  ...acc,
                  [key]: val
                }
              }
              return acc;
            }, {id: id[idx]})
          )  
        }
      }));
    });
  }, []);
  
  if(loading){
    console.log("table data", dataList);
  }
  const tableDatas = (dataList, checkList, checkEach) => (
    dataList.map((obj, i) => {
      if (obj) {
        const {
          year,
          name,
          phoneNum,
          birthdate,
          email,
          company,
          check,
          modifiedDate,
          id,
        } = obj
        console.log("IDDDD", id);
        return(
          <tr key={i}>
            <td>
              <input type="checkbox" onChange={(e) => checkEach(e, id)} checked={checkList.includes(id)}/>
            </td>
            <td><Link to={routes.datasUserDetail(id)}>{name}</Link></td>
            <td><Link to={routes.datasUserDetail(id)}>{year}</Link></td>
            <td><Link to={routes.datasUserDetail(id)}>{birthdate}</Link></td>
            <td><Link to={routes.datasUserDetail(id)}>{phoneNum}</Link></td>
            <td><Link to={routes.datasUserDetail(id)}>{email}</Link></td>
            <td><Link to={routes.datasUserDetail(id)}>{company}</Link></td>
            <td><Link to={routes.datasUserDetail(id)}>{check}</Link></td>
            <td><Link to={routes.datasUserDetail(id)}>{modifiedDate}</Link></td>
          </tr>
        )
      }
      
    })
  )
  
    

  return (
    <>
      {!loading && <div>Loading</div>}
      {loading && <DataTable title={"회원"} header={header} tableDatas={tableDatas} dataList={dataList} setDataList={setDataList} search={search}></DataTable>}
    </>
    );
}
