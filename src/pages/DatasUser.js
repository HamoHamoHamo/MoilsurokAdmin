import react, { useState, useEffect, useRef } from "react";
import { Pagination, DataTable } from "../components/DataTable";
import { firestore, TEAM, USER } from "../utils/Firebase";
import readXlsxFile from 'read-excel-file'


export default function DatasUser() {
  // const onUploadFile = (e) => {
  //   readXlsxFile(e.target.files[0]).then((rows) => {
  //   console.log(rows);
  // })};
  
  const [loading, setLoading] = useState(false);
  const [idList, setIdList] = useState([]);
  const [dataList, setDataList] = useState([]);
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
    
    // const test = [1,2,3,4,5,6,7,8,10];
    // test.map(() => {user.add({modifiedDate: "222222"})});
    let list = []
    let id = []
    // 수정 날짜 기준 오름차순으로 정렬
    USER.orderBy("modifiedDate", "asc").get().then((docs) => {
      // 반복문으로 docuemnt 하나씩 확인
      docs.forEach((doc) => {
        if(doc.exists){
          // document의 데이터
          // console.log("DATA", doc.data());
          // document의 id
          // console.log("DOC", doc.id);
          list.push(doc.data());
          id.push(doc.id);
        }
      });
      setLoading(true);
      setIdList(id);
      setDataList(list.map((data, idx) => Object.entries(data).reduce((acc, [key, val], i) => {
        // console.log("KEY", key, "\nval", val, "\nacc", acc);
        if(key === 'year' || key === 'name' || key === 'phoneNum' || key === 'birthdate' || key === 'email' || key === 'company' || key === 'check' || key === 'modifiedDate') {
          acc = {
            ...acc,
            [key]: val
          }
        }
        return acc;
      }, {id: id[idx]})
      ));
    });
  }, []);
  
  if(loading){
    console.log("table data", dataList);
  }
  const tableDatas = (dataList, checkList, checkEach) => (
    dataList.map((obj, i) => {
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
          <td>{name}</td>
          <td>{year}</td>
          <td>{birthdate}</td>
          <td>{phoneNum}</td>
          <td>{email}</td>
          <td>{company}</td>
          <td>{check}</td>
          <td>{modifiedDate}</td>
        </tr>
      )
    })
  )
  
    

  return (
    <>
      {!loading && <div>Loading</div>}
      {loading && <DataTable title={"회원"} header={header} tableDatas={tableDatas} dataList={dataList} setDataList={setDataList}></DataTable>}
    </>
    );
}
