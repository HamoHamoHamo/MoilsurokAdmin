import { useState, useEffect } from "react";
import { DataTable } from "../../components/DataTable";
import { NOTICE } from "../../utils/Firebase";
import { Link, useLocation } from 'react-router-dom';
import routes from "../../utils/Routes";

export function noticeDatas(list, id, setDataList) {
  const res = list.reduce((acc0, data, idx) => {
    const reduce = Object.entries(data).reduce((acc, [key, val], i) => {
      // // console.log("KEY", key, "\nval", val, "\nacc", acc);
      if(key === 'pubDate' || key === 'filenames' || key === 'title' || key === 'content' || key === 'creator' || key === 'modifiedDate') {
        acc = {
          ...acc,
          [key]: val
        }
      }
      return acc;
    }, { 'id': id[idx] })
    return acc0.concat(reduce);
  }, []);
  setDataList(cur => cur.concat([res]));
  return res;
}

export const noticeTableDatas = (dataList, checkList, checkEach) => (
  dataList.map((obj, i) => {
    if (obj) {
      const {
        id,
        title,
        content,
        creator,
        pubDate,
        modifiedDate,
        filenames,
      } = obj
      // console.log("IDDDD", id);
      return(
        <tr key={i}>
          <td style={{width: '2%'}}>
            <input type="checkbox" onChange={(e) => checkEach(e, id, filenames)} checked={checkList.includes(id)}/>
          </td>
          <td><Link to={routes.datasNoticeDetail(id)}>{title}</Link></td>
          <td style={{width: '20%'}}><Link to={routes.datasNoticeDetail(id)}>{content && content.length > 20 ? `${content.slice(0,20)}...` : content}</Link></td>
          <td><Link to={routes.datasNoticeDetail(id)}>{creator}</Link></td>
          <td><Link to={routes.datasNoticeDetail(id)}>{modifiedDate}</Link></td>
          <td><Link to={routes.datasNoticeDetail(id)}>{pubDate}</Link></td>
        </tr>
      )
    }
  })
)


// export default function DatasNotice() {
//   const location = useLocation();
//   const [loading, setLoading] = useState(false);
//   const [idList, setIdList] = useState([]);
//   const [dataList, setDataList] = useState([]);
//   const [search, setSearch] = useState('');

//   const header = [
//     '제목',
//     '내용',
//     '작성자',
//     '수정시간',
//     '등록시간',
//   ]
//   useEffect(() => {
//     // 데이터 추가하기
//     // const a = [1, 2, 3, 4, 5, 6, 7, 8, 1,];
//     // a.map(() => {NOTICE.add({pubDate: "202222", modifiedDate: "2022-02-11 10:10", title: "기수", creator: "이름", content: "내용ㅇㅇ"})});
//     let list = []
//     let id = []
//     NOTICE.orderBy("modifiedDate", "desc").get().then((docs) => {
//       docs.forEach((doc) => {
//         if(doc.exists){
//           list.push(doc.data());
//           id.push(doc.id);
//         }
//       });
//       setLoading(true);
//       setIdList(id);
//       setDataList(list.reduce((acc0, data, idx) => {
//         let c = false;
//         const res = Object.entries(data).reduce((acc, [key, val], i) => {
//           if(!search || val.includes(search)){
//             c = true;
//           }
//           // // console.log("KEY", key, "\nval", val, "\nacc", acc);
//           if(key === 'pubDate' || key === 'filenames' || key === 'title' || key === 'content' || key === 'creator' || key === 'modifiedDate') {
//             acc = {
//               ...acc,
//               [key]: val
//             }
//           }
//           return acc;
//         }, {id: id[idx]})
//         return c ? acc0.concat(res) : acc0;
//       }, []));
//     });
//   }, [search]);
  
//   if(loading){
//     // console.log("table data", dataList);
//   }
  
//   return (
//     <>
//       {!loading && <div>Loading</div>}
//       {loading && <DataTable title={"공지사항"}collection={NOTICE} header={header} tableDatas={tableDatas} dataList={dataList} search={search} setSearch={setSearch}></DataTable>}
//     </>
//     );
// }
