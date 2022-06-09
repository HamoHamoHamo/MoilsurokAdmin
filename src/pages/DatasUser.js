import react, { useState, useEffect } from "react";
import { Pagination, DataTable } from "../components/DataTable";
import { firestore } from "../utils/Firebase";

export default function DatasUser() {
  useEffect(() => {
    console.log(firestore);
    const teams = firestore.collection("teams");
    // console.log("docsss", teams.doc());

    // teams.doc("부산중앙고").get().then((doc) => {
    //   // document의 데이터를 가져옴
    //   console.log("DATA", doc.data());
    //   // document의 id를 가져옴
    //   console.log(doc.id);
    
    // 모든 document 가져오기
    teams.get().then((docs) => {
      console.log("DOCS", docs);
      // 반복문으로 docuemnt 하나씩 확인
      docs.forEach((doc) => {
        if(doc.exists){
          // document의 데이터
          console.log(doc.data());
          // document의 id
          console.log(doc.id);
        }
      });
    });
  });

  return <DataTable></DataTable>;
}
