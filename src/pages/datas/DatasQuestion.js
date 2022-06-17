import { useState, useEffect } from "react";
import { DataTable } from "../../components/DataTable";
import { QUESTION } from "../../utils/Firebase";
import { Link, useLocation } from 'react-router-dom';
import routes from "../../utils/Routes";

export default function DatasQuestion() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [idList, setIdList] = useState([]);
  const [dataList, setDataList] = useState([]);
  const [search, setSearch] = useState('');

  const header = [
    '제목',
    '내용',
    '작성자',
    '답변완료',
    '수정시간',
  ]
  useEffect(() => {
    // 데이터 추가하기
    // const a = [1,2,3,4,5,6,7,8,1,];
    // a.map(() => {QUESTION.add({date: "2022-02-11 10:10", modifiedDate: "2022-02-11 10:10", content: "내용ㅇㅇㅇ", title: "기수", creator: "이름", check: "y" }) });
    let list = []
    let id = []
    QUESTION.orderBy("modifiedDate", "desc").get().then((docs) => {
      docs.forEach((doc) => {
        if(doc.exists){
          list.push(doc.data());
          id.push(doc.id);
        }
      });
      setLoading(true);
      setIdList(id);
      setDataList(list.reduce((acc0, data, idx) => {
        let c = false;
        const res = Object.entries(data).reduce((acc, [key, val], i) => {
          if(!search || val.includes(search)){
            c = true;
          }
          // console.log("KEY", key, "\nval", val, "\nacc", acc);
          if(key === 'filenames' || key === 'title' || key === 'content' || key === 'creator' || key === 'check' || key === 'modifiedDate') {
            acc = {
              ...acc,
              [key]: val
            }
          }
          return acc;
        }, {'id': id[idx]})
        return c ? acc0.concat(res) : acc0;
      }, []));
    });
  }, [search]);
  
  if(loading){
    // console.log("table data", dataList);
    
  }
  const tableDatas = (dataList, checkList, checkEach) => (
    dataList.map((obj, i) => {
      if (obj) {
        const {
          id,
          title,
          content,
          creator,
          check,
          modifiedDate,
        } = obj
        // console.log("IDDDD", id);
        return(
          <tr key={i}>
            <td style={{width: '2%'}}>
              <input type="checkbox" onChange={(e) => checkEach(e, id)} checked={checkList.includes(id)}/>
            </td>
            <td><Link to={routes.datasQuestionDetail(id)}>{title}</Link></td>
            <td style={{width: '20%'}}><Link to={routes.datasQuestionDetail(id)}>{content && content.length > 20 ? `${content.slice(0,20)}...` : content}</Link></td>
            <td><Link to={routes.datasQuestionDetail(id)}>{creator}</Link></td>
            <td><Link to={routes.datasQuestionDetail(id)}>{check}</Link></td>
            <td><Link to={routes.datasQuestionDetail(id)}>{modifiedDate}</Link></td>
          </tr>
        )
      }
    })
  )
  return (
    <>
      {!loading && <div>Loading</div>}
      {loading && <DataTable title={"문의"} header={header} tableDatas={tableDatas} dataList={dataList} search={search} setSearch={setSearch} collection={QUESTION}></DataTable>}
    </>
  );
}
