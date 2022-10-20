import { useState, useEffect } from "react";
import { DataTable } from "../../components/DataTable";
import { GALLERY } from "../../utils/Firebase";
import { Link, useLocation } from 'react-router-dom';
import routes from "../../utils/Routes";

export function galleryDatas(list, id, setDataList) {
  const res = list.reduce((acc0, data, idx) => {
    const reduce = Object.entries(data).reduce((acc, [key, val], i) => {
      // // console.log("KEY", key, "\nval", val, "\nacc", acc);
      if(key === 'filenames' || key === 'title' || key === 'content' || key === 'creator' || key === 'modifiedDate') {
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

export const galleryTableDatas = (dataList, checkList, checkEach) => (
  dataList.map((obj, i) => {
    if (obj) {
      const {
        id,
        title,
        content,
        creator,
        modifiedDate,
        filenames,
      } = obj
      // console.log("IDDDD", id);
      return(
        <tr key={i}>
          <td style={{width: '2%'}}>
            <input type="checkbox" onChange={(e) => checkEach(e, id, filenames)} checked={checkList.includes(id)}/>
          </td>
          <td><Link to={routes.datasGalleryDetail(id)}>{title}</Link></td>
          <td style={{width: '20%'}}><Link to={routes.datasGalleryDetail(id)}>{content && content.length > 20 ? `${content.slice(0,20)}...` : content}</Link></td>
          <td><Link to={routes.datasGalleryDetail(id)}>{creator}</Link></td>
          <td><Link to={routes.datasGalleryDetail(id)}>{modifiedDate}</Link></td>
        </tr>
      )
    }
  })
)