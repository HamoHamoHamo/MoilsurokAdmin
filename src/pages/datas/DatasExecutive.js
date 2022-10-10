import { useState, useEffect } from "react";
import { DataTable } from "../../components/DataTable";
import { NOTICE } from "../../utils/Firebase";
import { Link, useLocation } from 'react-router-dom';
import routes from "../../utils/Routes";

export function executiveDatas(list, id, setDataList) {
  const res = list.reduce((acc0, data, idx) => {
    const reduce = Object.entries(data).reduce((acc, [key, val], i) => {
      // // console.log("KEY", key, "\nval", val, "\nacc", acc);
      if(key === 'modifiedDate') {
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

export const executiveTableDatas = (dataList, checkList, checkEach) => (
  

  dataList.map((obj, i) => {
    console.log("DATALIST", dataList)
    if (obj) {
      const {
        id,
      } = obj

      return(
        <tr key={i}>
          
          <td style={{width: '15%'}}><a href={routes.datasExecutiveList(id)}>{id.substr(2,)}</a></td>
          
        </tr>
      )
    }
  })
)

