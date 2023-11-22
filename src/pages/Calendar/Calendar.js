import React, {useState, useEffect, useCallback, useContext} from 'react'
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
import CalendarInnerModal from './CalendarInnerModal'
import { ListContext } from "../Groovy/Groovy"
import confetti from 'canvas-confetti';

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
    const [showModal, setShowModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [eventModalOpen, setEventModalOpen] = useState(false);
    const [eventDetails, setEventDetails] = useState(null);
    const { dbList, refreshList } = useContext(ListContext);
  

    function handleEventClick(clickInfo) {
      const { extendedProps, classNames } = clickInfo.event;
      if (classNames.includes('birthday-event')) {
        startConfettiAnimation();
      } else if (extendedProps && extendedProps.seq) {
        setEventDetails(extendedProps);
        setEventModalOpen(true);
      }
    }

  // Function to start the confetti animation
  function startConfettiAnimation() {
    const duration = 60 * 60 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 500, ticks: 20, zIndex: 0 }; //startvelocity: 시작 속도, spread: 분포, ticks: 틱, zIndex: z축
 
    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 20 * (timeLeft / duration);
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0, 1), y: randomInRange(0, 1) }
        })
      );
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0, 1), y: randomInRange(0, 1) }
        })
      );
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0, 1), y: randomInRange(0, 1) }
        })
      );
    }, 250);

    // Stop the animation after 5 seconds
    setTimeout(() => clearInterval(interval), 10000);
  }

    function handleEventDrop(info) {
      const { event } = info;
      const startDate = new Date(event.start);
      startDate.setDate(startDate.getDate() + 1);
      const NewStart = startDate.toISOString().split('T')[0] ? startDate.toISOString().split('T')[0] : null;
      
      const endDate = event.end ? new Date(event.end) : null;
      if (endDate) {
        endDate.setDate(endDate.getDate());
      }
      const NewEnd = endDate ? endDate.toISOString().split('T')[0] : null;

      axios.put(`/api/calendar/${event.extendedProps.seq}`, { ...event.extendedProps, starttime: NewStart, endtime: NewEnd }).then((res) => {
        refreshList();
      });
    };

  
  useEffect(() => {
    const fetchDataForMonth = async (year, month) => {
      try {
        const params = {
          serviceKey: process.env.REACT_APP_API_KEY,
          solYear: year,
          solMonth: month
        };
        const response = await axios.get('http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo', { params });
        const transformedEvents = response.data.response.body.items.item.map(event => ({
          title: event.dateName,
          start: event.locdate.toString(),
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


  const handleCloseModal = () => {
    setEventModalOpen(false);
    setEventDetails(null);
  };
  const editableDbList = dbList.map(event => ({ ...event, editable: true }));
  const nonEditableEvents = events.map(event => ({ ...event, editable: false }));
  
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
                  events={[...editableDbList, ...nonEditableEvents]}
                  select={handleDateSelect}
                  selectable={true}
                  selectMirror={true}
                  dayMaxEvents={true}
                  eventClick={handleEventClick}
                  eventDrop={handleEventDrop}
                />
            </div>
      </div>
      <CalendarInnerModal isOpen={eventModalOpen} onClose={handleCloseModal} eventDetails={eventDetails} onEventAdded={refreshList}/>
      {showModal && (
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          selectedDate={selectedDate}
          onEventAdded={refreshList}
        />
      )}
    </>
  );
};


export default Calendar;