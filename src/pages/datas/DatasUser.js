import readXlsxFile from 'read-excel-file';
import { Link } from 'react-router-dom';
import routes from "../../utils/Routes";

export function userDatas(list, id, setDataList) {
  const res = list.reduce((acc0, data, idx) => {
    const reduce = Object.entries(data).reduce((acc, [key, val], i) => {
      // // console.log("KEY", key, "\nval", val, "\nacc", acc);
      if(key === 'filenames' || key === 'year' || key === 'name' || key === 'phoneNum' || key === 'birthdate' || key === 'email' || key === 'company' || key === 'check' || key === 'modifiedDate') {
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


// export function datasUser() {
//   // const onUploadFile = (e) => {
//   //   readXlsxFile(e.target.files[0]).then((rows) => {
//   //   // console.log(rows);
//   // })};

//   const [loading, setLoading] = useState(false);
//   const [dataList, setDataList] = useState([]);
//   const [search, setSearch] = useState('');
//   const [count, setCount] = useState(0);


//   const header = [
//     '이름',
//     '기수',
//     '생년월일',
//     '전화번호',
//     '이메일',
//     '회사명',
//     '승인완료',
//     '수정시간',
//     '등록시간',
//   ]
//   useEffect(() => {
//     // 데이터 추가하기
//     // const a = [1, 2, 3, 4, 5, 6, 7, 8, 1,];
//     // a.map(() => {
//     //   USER.add({
//     //     year: "기수",
//     //     name: "이름",
//     //     birthdate: "20220505", 
//     //     phoneNum: "01012341234", 
//     //     email: "test@naver.com", 
//     //     company: "킹버스", 
//     //     department: "제품개발부서", 
//     //     comPosition: "직위", 
//     //     comTel: "022332323", 
//     //     comAdr: "수원시 매송고색로", 
//     //     faxNum: "1234213", 
//     //     sector: "it", 
//     //     check: "O",
//     //     pubDate: "202222222",
//     //     modifiedDate: "2022-02-11 10:10",
//     //   })
//     // });
//     let list = []
//     let id = []
//     getCount(setCount);

//     USER.orderBy("modifiedDate", "desc").limit(15).get().then((docs) => {
//       docs.forEach((doc) => {
//         if (doc.exists) {
//           list.push(doc.data());
//           id.push(doc.id);
//         }
//       });

//       setLoading(true);
//       setDataList(list.reduce((acc0, data, idx) => {
//         let c = false;
//         const res = Object.entries(data).reduce((acc, [key, val], i) => {
//           if (!search || val.includes(search)) {
//             c = true;
//           }
//           // // console.log("KEY", key, "\nval", val, "\nacc", acc);
//           if(key === 'pubDate' || key === 'filenames' || key === 'year' || key === 'name' || key === 'phoneNum' || key === 'birthdate' || key === 'email' || key === 'company' || key === 'check' || key === 'modifiedDate') {
//             acc = {
//               ...acc,
//               [key]: val
//             }
//           }
//           return acc;
//         }, { 'id': id[idx] })
//         return c ? acc0.concat(res) : acc0;
//       }, []));
//     });
//   }, [search]);

//   // console.log("CCCDC", count);

  
//   return (
//     <>
//       {!loading && <div>Loading</div>}
//       {loading && <DataTable title={"회원"} header={header} tableDatas={tableDatas} dataList={dataList} search={search} setSearch={setSearch} collection={USER} count={count.user}></DataTable>}
//     </>
//   );
// }

export const userTableDatas = (dataList, checkList, checkEach) => (
  dataList.map((obj, i) => {
    if (obj) {
      const {
        id,
        filenames,
        year,
        name,
        phoneNum,
        birthdate,
        email,
        company,
        check,
        modifiedDate,
      } = obj
      // // console.log("IDDDD", id);
      return (
        <tr key={i}>
          <td style={{ width: '2%' }}>
            <input type="checkbox" onChange={(e) => checkEach(e, id, filenames)} checked={checkList.includes(id)} />
          </td>
          <td><Link to={routes.datasUserDetail(id)}>{name}</Link></td>
          <td><Link to={routes.datasUserDetail(id)}>{year}</Link></td>
          <td><Link to={routes.datasUserDetail(id)}>{birthdate}</Link></td>
          <td><Link to={routes.datasUserDetail(id)}>{phoneNum}</Link></td>
          <td><Link to={routes.datasUserDetail(id)}>{email}</Link></td>
          <td><Link to={routes.datasUserDetail(id)}>{company}</Link></td>
          <td style={{ width: '5%' }}><Link to={routes.datasUserDetail(id)}>{check}</Link></td>
          <td><Link to={routes.datasUserDetail(id)}>{modifiedDate}</Link></td>
        </tr>
      )
    }
  })
)