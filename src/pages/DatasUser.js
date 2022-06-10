import react, { useState, useEffect, useRef } from "react";
import { Pagination, DataTable } from "../components/DataTable";
import { firestore, team } from "../utils/Firebase";
import readXlsxFile from 'read-excel-file'


export default function DatasUser() {
  // const onUploadFile = (e) => {
  //   readXlsxFile(e.target.files[0]).then((rows) => {
  //   console.log(rows);
  // })};
  
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(false);
  
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
    const user = team.collection('User');
    let list = []
    // 수정 날짜 기준 오름차순으로 정렬
    user.orderBy("modifiedDate", "asc").get().then((docs) => {
      // 반복문으로 docuemnt 하나씩 확인
      docs.forEach((doc) => {
        if(doc.exists){
          // document의 데이터
          console.log("DATA", doc.data());
          // document의 id
          // console.log("DOC", doc.id);
          list.push(doc.data());
        }
      });
      setLoading(true);
      setDataList(list);
    });
  }, []);
  let tableDataList = [];
  if(loading){
    console.log("DATALIST", dataList);
    tableDataList = dataList.map(data => Object.entries(data).reduce((acc, [key, val], i) => {
      // console.log("KEY", key, "\nval", val, "\nacc", acc);
      if(key === 'year' || key === 'name' || key === 'phoneNum' || key === 'birthdate' || key === 'email' || key === 'company' || key === 'check' ||key === 'modifiedDate') {
        acc = {
          ...acc,
          [key]: val
        }
      }
      return acc;
    }, []))
    console.log("table data", tableDataList);
  }
  const tableDatas = (tableDataList) => {
    return(
      tableDataList.map((obj) => {
        const {
          year,
          name,
          phoneNum,
          birthdate,
          email,
          company,
          check,
          modifiedDate,
        } = obj
        return(
          <tr>
            <td>
              <input type="checkbox" id="check-all" />
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
  }
    

  return (
    <>
      {!loading && <div>Loading</div>}
      {loading && <DataTable header={header} tableDatas={tableDatas} dataList={tableDataList}></DataTable>}
    </>
    );
}
