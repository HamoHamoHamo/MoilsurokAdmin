import { useState, useEffect } from "react";
import { DataTable } from "../../components/DataTable";
import { NOTICE } from "../../utils/Firebase";
import { Link, useLocation } from 'react-router-dom';
import routes from "../../utils/Routes";

export function executiveListDatas(list, id, setDataList) {
  const res = list.reduce((acc0, data, idx) => {
    const reduce = Object.entries(data).reduce((acc, [key, val], i) => {
      // // console.log("KEY", key, "\nval", val, "\nacc", acc);
      if(key === 'filenames' || key === 'modifiedDate' || key === 'name' || key === 'year' || key === 'num' || key === 'comPosition' || key === 'modifiedDate') {
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

export const executiveListTableDatas2 = (dataList, checkList, checkEach, urlId) => (
  dataList.map((obj, i) => {    
    if (obj) {
      const {
        id,
        name,
        year,
        num,
        comPosition,
        modifiedDate,
        filenames,
      } = obj
      const YearTd = '';
      return(
        <tr key={i}>
          <td style={{width: '2%'}}>
            <input type="checkbox" onChange={(e) => checkEach(e, id, filenames)} checked={checkList.includes(id)}/>
          </td>
          <td><Link to={routes.datasExecutiveDetail(urlId, id)}>{year}</Link></td>
          <td><Link to={routes.datasExecutiveDetail(urlId, id)}>{comPosition}</Link></td>
          <td><Link to={routes.datasExecutiveDetail(urlId, id)}>{name}</Link></td>
          <td><Link to={routes.datasExecutiveDetail(urlId, id)}>{modifiedDate}</Link></td>
          
        </tr>
      )
    }
  })
)

export const executiveListTableDatas = (dataList, checkList, checkEach, urlId) => (
  dataList.map((obj, i) => {    
    if (obj) {
      const {
        id,
        name,
        year,
        num,
        comPosition,
        modifiedDate,
        filenames,
      } = obj
      const YearTd = '';
      
      return(
        <tr key={i}>
          <td style={{width: '2%'}}>
            <input type="checkbox" onChange={(e) => checkEach(e, id, filenames)} checked={checkList.includes(id)}/>
          </td>
          <td><Link to={routes.datasExecutiveDetail(urlId, id)}>{comPosition}</Link></td>
          <td><Link to={routes.datasExecutiveDetail(urlId, id)}>{name}</Link></td>
          <td><Link to={routes.datasExecutiveDetail(urlId, id)}>{modifiedDate}</Link></td>
          
        </tr>
      )
    }
  })
)

