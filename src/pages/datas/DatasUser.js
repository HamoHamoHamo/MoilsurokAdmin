import readXlsxFile from 'read-excel-file';
import { Link } from 'react-router-dom';
import routes from "../../utils/Routes";

export function userDatas(list, id, setDataList) {
  const res = list.reduce((acc0, data, idx) => {
    const reduce = Object.entries(data).reduce((acc, [key, val], i) => {
      // // console.log("KEY", key, "\nval", val, "\nacc", acc);
      if(key === 'filenames' || key === 'num' || key === 'year' || key === 'name' || key === 'field' || key === 'occupation' || key === 'company' || key === 'modifiedDate') {
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
        num,
        year,
        name,
        field,
        occupation,
        company,
        modifiedDate,
      } = obj
      // // console.log("IDDDD", id);
      return (
        <tr key={i}>
          <td style={{ width: '2%' }}>
            <input type="checkbox" onChange={(e) => checkEach(e, id, filenames)} checked={checkList.includes(id)} />
          </td>
          <td style={{ width: '7%' }}><Link to={routes.datasUserDetail(id)}>{num}</Link></td>
          <td style={{ width: '7%' }}><Link to={routes.datasUserDetail(id)}>{year}</Link></td>
          <td><Link to={routes.datasUserDetail(id)}>{name}</Link></td>
          <td><Link to={routes.datasUserDetail(id)}>{field}</Link></td>
          <td><Link to={routes.datasUserDetail(id)}>{occupation}</Link></td>
          <td><Link to={routes.datasUserDetail(id)}>{company}</Link></td>
          <td><Link to={routes.datasUserDetail(id)}>{modifiedDate}</Link></td>
        </tr>
      )
    }
  })
)