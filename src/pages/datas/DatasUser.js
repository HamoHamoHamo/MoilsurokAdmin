import readXlsxFile from 'read-excel-file';
import { Link } from 'react-router-dom';
import routes from "../../utils/Routes";

export function userDatas(list, id, setDataList) {
  const res = list.reduce((acc0, data, idx) => {
    const reduce = Object.entries(data).reduce((acc, [key, val], i) => {
      // // console.log("KEY", key, "\nval", val, "\nacc", acc);
      if(key === 'filenames' || key === 'year' || key === 'name' || key === 'phoneNum' || key === 'email' || key === 'company' || key === 'modifiedDate') {
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



export const userTableDatas = (dataList, checkList, checkEach) => (
  dataList.map((obj, i) => {
    if (obj) {
      const {
        id,
        filenames,
        year,
        name,
        phoneNum,
        email,
        company,
        modifiedDate,
      } = obj
      // // console.log("IDDDD", id);
      return (
        <tr key={i}>
          <td style={{ width: '2%' }}>
            <input type="checkbox" onChange={(e) => checkEach(e, id, filenames)} checked={checkList.includes(id)} />
          </td>
          <td><Link to={routes.datasUserDetail(id)}>{year}</Link></td>
          <td><Link to={routes.datasUserDetail(id)}>{name}</Link></td>
          <td><Link to={routes.datasUserDetail(id)}>{phoneNum}</Link></td>
          <td><Link to={routes.datasUserDetail(id)}>{email}</Link></td>
          <td><Link to={routes.datasUserDetail(id)}>{company}</Link></td>
          <td><Link to={routes.datasUserDetail(id)}>{modifiedDate}</Link></td>
        </tr>
      )
    }
  })
)