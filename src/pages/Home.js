import react from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import allLocales from "@fullcalendar/core/locales-all";

export default function Home() {
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
                events={[
                  { title: "event 1", date: "2022-05-13" },
                  { title: "event 2", date: "2022-05-14" },
                ]}
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
