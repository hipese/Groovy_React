import React, {useState, useEffect} from 'react'
import styles from './Calendar.module.css'
import "./Calendar.css"
import Modal from "../Main/components/SlideBar/SlideBar/Calendar/CalendarModal"
import koLocale from '@fullcalendar/core/locales/ko'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { CalendarUpPush, TeamBirthdays } from './CalendarEvent_utils'
import axios from 'axios'
import { formatISO, parseISO, addDays } from 'date-fns'

// 옵저버 설정
function applyStyles() {
    const centeredElements = document.querySelectorAll('.centered-event');
  centeredElements.forEach(element => {
    const grandGrandParent = element.parentElement.parentElement.parentElement.children[0];

    Array.from(grandGrandParent.children).forEach(child => {
      child.style.color = 'red';
    });
  });
}
const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    if (mutation.addedNodes.length || mutation.removedNodes.length) {
      applyStyles();
    }
  });
});
// 옵저버 설정
observer.observe(document.body, { childList: true, subtree: true });
// 초기 스타일 적용
applyStyles();


const Calendar = () => {
    const [weekendsVisible, setWeekendsVisible] = useState(true);
    const [events, setEvents] = useState([]);
    const [highlightDates, setHighlightDates] = useState([]);
    const [calendarData, setCalendarData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
  
  useEffect(() => {
    const fetchDataForMonth = async (year, month) => {
      try {
        const params = {
          serviceKey: 'KBtONbKUtoe336dp6ygLurqhbr7XvDzTKfIMXUHfgCA0VC/O2FFPLUlkJaRRYvSL+tHCVccZKj2+t3MNvYW+Og==',
          solYear: year,
          solMonth: month
        };
        const response = await axios.get('http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo', { params });
        const transformedEvents = response.data.response.body.items.item.map(event => ({
          title: event.dateName,
          start: event.locdate.toString(), // 'YYYYMMDD' 형식을 'YYYY-MM-DD'로 변환해야 할 수도 있습니다.
          color: "white",
          textColor: "red",
          borderColor: "red",
          allDay: true,
          classNames: ['centered-event']
        }));
        return transformedEvents;
      } catch (error) {
        return [];
      }
    };
    const MyData = async () => {
      try {
        const resp = await axios.get("/api/calendar");
        setCalendarData(resp.data);
        if (resp.data && resp.data.length > 0) {
          const transformedEvents = resp.data.map(event => ({
            title: event.title,
            start: event.starttime,
            end: formatISO(addDays(parseISO(event.endtime), 1)),
            color: "white",
            textColor: "black",
            borderColor: "black",
            allDay: true,
            classNames: ['myData-event']
          }));
          return transformedEvents;
        }
      } catch (error) {
        console.error("Error fetching MyData", error);
      }
      return [];
    };

    const fetchDataForYear = async (year) => {
      const requests = [];
      for (let month = 1; month <= 12; month++) {
        const monthString = month.toString().padStart(2, '0'); // 월을 2자리 숫자로 변환합니다.
        requests.push(fetchDataForMonth(year, monthString));
      }
      const results = await Promise.all(requests);
      return [].concat(...results); // 모든 이벤트를 병합합니다.
    };
    

    const initializeCalendar = async () => {
      const years = ['2023', '2024', '2025'];
      const eventPromises = years.map(fetchDataForYear);
      const eventsForAllYears = await Promise.all(eventPromises);
      const combinedEvents = [].concat(...eventsForAllYears);
      const MyDataEvent = await MyData();
      combinedEvents.push(...MyDataEvent);
      combinedEvents.push(...CalendarUpPush);
      combinedEvents.push(...TeamBirthdays);
      setEvents(combinedEvents);
      const eventDates = combinedEvents.map(event => event.start);
      setHighlightDates(eventDates);
    };
    initializeCalendar();
  }, []);

  const handleDateSelect = (selectInfo) => {
    const startDateStr = selectInfo.startStr;
    let endDateStr = selectInfo.endStr;

    if (!endDateStr || startDateStr === endDateStr) {
        const endDate = new Date(selectInfo.start);
        endDate.setDate(endDate.getDate() + 1);
        endDateStr = endDate.toISOString().split('T')[0];
    } else {
        const endDate = new Date(selectInfo.end);
        endDate.setDate(endDate.getDate());
        endDateStr = endDate.toISOString().split('T')[0];
    }

    setSelectedDate({ start: startDateStr, end: endDateStr });
    setShowModal(true);
  };
  
  return (
    <>
        <div className={styles.FullCalendar}>
            <div className={styles.FullCalendarMain}>
                <FullCalendar
                  schedulerLicenseKey="Groove"
                  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                  initialView="dayGridMonth"
                  headerToolbar={{ left: 'dayGridMonth,timeGridWeek,timeGridDay', center: 'title', right: 'today prev,next' }}
                  locale={koLocale}
                  weekends={weekendsVisible}
                  events={events}
                  select={handleDateSelect}
                  selectable={true}
                  selectMirror={true}
                  dayMaxEvents={true}
                  eventClick={function (arg) {
                    alert(arg.event.title);
                    // 이걸로 모달만 보여주면 끝?
                  }}
                />
            </div>
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal} selectedDate={selectedDate} calendarData={calendarData} setCalendarData={setCalendarData} />
    </>
  );
};


export default Calendar;