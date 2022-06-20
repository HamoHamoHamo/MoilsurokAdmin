import react, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import allLocales from "@fullcalendar/core/locales-all";
import { SCHEDULE } from "../utils/Firebase";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    let list = []
    let id = []
    SCHEDULE.orderBy("modifiedDate", "desc").get().then((docs) => {
      docs.forEach((doc) => {
        if(doc.exists){
          list.push(doc.data());
          id.push(doc.id);
        }
      });
      setLoading(true);
      setDataList(list.reduce((acc0, data, idx) => {
        
        const res = Object.entries(data).reduce((acc, [key, val], i) => {
          // console.log("KEY", key, "\nval", val, "\nacc", acc);
          if(key === 'title' || key === 'date') {
            acc = {
              ...acc,
              [key]: val
            }
          }
          return acc;
        }, {id: id[idx]})
        return acc0.concat(res);
      }, []));

    })
  }, []);
  console.log("DATALIST", dataList);
  return (
    <div class="">
      <div class="clearfix"></div>

      <div class="row">
        <div class="col-md-12">
          <div class="x_panel">
            <div class="x_content">
              <FullCalendar
                defaultView="dayGridMonth"
                title={"test"}
                plugins={[dayGridPlugin]}
                events={dataList.map((data) => ({
                  title: data.title,
                  date: data.date,
                  url: `/datas/schedule/${data.id}`,
                  className: "calendarFontSize",
                }))}
                locales={allLocales}
                locale="ko"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
