import { useState, useEffect } from "react";
import { DataTable } from "../../components/DataTable";
import { NOTICE } from "../../utils/Firebase";
import { Link, useLocation } from 'react-router-dom';
import routes from "../../utils/Routes";

export function committeeDatas(list, id, setDataList) {
  const res = list.reduce((acc0, data, idx) => {
    const reduce = Object.entries(data).reduce((acc, [key, val], i) => {
      // // console.log("KEY", key, "\nval", val, "\nacc", acc);
      if(key === 'filenames' || key === 'name' || key === 'comPosition' || key === 'modifiedDate') {
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

export const committeeTableDatas = (dataList, checkList, checkEach) => (
  dataList.map((obj, i) => {
    if (obj) {
      const {
        id,
        name,
        comPosition,
        modifiedDate,
        filenames,
      } = obj

      console.log("IDDDD", name);
      return(
        <tr key={i}>
          <td style={{width: '2%'}}>
            <input type="checkbox" onChange={(e) => checkEach(e, id, filenames)} checked={checkList.includes(id)}/>
          </td>
          <td style={{width: '15%'}}><Link to={routes.datasCommitteeDetail(id)}>{comPosition}</Link></td>
          <td><Link to={routes.datasCommitteeDetail(id)}>{name}</Link></td>
          <td style={{width: '30%'}}><Link to={routes.datasCommitteeDetail(id)}>{modifiedDate}</Link></td>
        </tr>
      )
    }
  })
)

