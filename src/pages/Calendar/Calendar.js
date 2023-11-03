import React, {useState, useEffect} from 'react'
import styles from './Calendar.module.css'
import "./Calendar.css"
import { formatDate } from '@fullcalendar/core'
import koLocale from '@fullcalendar/core/locales/ko'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './CalendarEvent_utils'
import axios from 'axios'

const Calendar = () => {
    const [weekendsVisible, setWeekendsVisible] = useState(true);
    const [events, setEvents] = useState(INITIAL_EVENTS); // Adjust as needed
  const [highlightDates, setHighlightDates] = useState([]);
  
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
        }));
        return transformedEvents;
      } catch (error) {
        console.error('Error fetching events:', error);
        return [];
      }
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
      setEvents(combinedEvents);
      const eventDates = combinedEvents.map(event => event.start);
      setHighlightDates(eventDates);
    };
    initializeCalendar();
  }, []); 
  const handleDayCellDidMount = (arg) => {
        if (highlightDates.includes(arg.dateStr)) {
            const dayCellEl = arg.el;
            if (dayCellEl) {
                dayCellEl.classList.add('highlight-day-cell');
            }
        }
  };
  return (
        <div className={styles.FullCalendar}>
            <div className={styles.FullCalendarMain}>
                <FullCalendar
                    schedulerLicenseKey="Groove"
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    locale={koLocale}
                    weekends={weekendsVisible}
                    events={events}
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    }}
                    dayCellDidMount={handleDayCellDidMount}
                />
            </div>
        </div>
    );
};
export default Calendar;