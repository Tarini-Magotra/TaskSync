document.addEventListener('DOMContentLoaded', () => {
  const calendar = document.querySelector('.calendar');
  const monthEl = document.querySelector('.date');
  const daysEl = document.querySelector('.days');
  const prevEl = document.querySelector('.prev');
  const nextEl = document.querySelector('.next');
  const gotoBtn = document.querySelector('.goto-btn');
  const dateInput = document.querySelector('.date-input');
  const todayBtn = document.querySelector('.today-btn');
  const eventDay = document.querySelector('.event-day');
  const eventDate = document.querySelector('.event-date');
  const eventsContainer = document.querySelector('.events');
  const addEventBtn = document.querySelector('.add-event');
  const addEventWrapper = document.querySelector('.add-event-wrapper');
  const addEventCloseBtn = document.querySelector('.close');
  const addEventName = document.querySelector('.event-name');
  const addEventFrom = document.querySelector('.event-time-from');
  const addEventTo = document.querySelector('.event-time-to');
  const addEventSubmit = document.querySelector('.add-event-btn');
  const homebutton=document.querySelector('.home');
  const todolisticon=document.querySelector('.to-do-icon');

  homebutton.addEventListener('click', () => {
    window.location.href = 'index.html'; // Replace with your target URL
});

  todolisticon.addEventListener('click', () => {
    window.location.href = 'index-todo.html'; // Replace with your target URL
});

  let today = new Date();
  let activeDay;
  let month = today.getMonth();
  let year = today.getFullYear();
  let eventsArr = [];

  const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const updateMonth = () => {
      monthEl.innerHTML = `${months[month]} ${year}`;
      generateCalendar();
  };

  const generateCalendar = () => {
      daysEl.innerHTML = '';
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const prevLastDay = new Date(year, month, 0);
      const prevDays = prevLastDay.getDate();
      const lastDate = lastDay.getDate();
      const day = firstDay.getDay();
      const nextDays = 7 - lastDay.getDay() - 1;

      for (let x = day; x > 0; x--) {
          daysEl.innerHTML += `<div class="day prev-date">${prevDays - x + 1}</div>`;
      }

      for (let i = 1; i <= lastDate; i++) {
          let hasEvent = false;
          eventsArr.forEach((event) => {
              if (event.day === i && event.month === month + 1 && event.year === year) {
                  hasEvent = true;
              }
          });

          const todayClass = i === today.getDate() && year === today.getFullYear() && month === today.getMonth() ? 'active-date' : '';

          if (hasEvent) {
              daysEl.innerHTML += `<div class="day event ${todayClass}">${i}</div>`;
          } else {
              daysEl.innerHTML += `<div class="day ${todayClass}">${i}</div>`;
          }
      }

      for (let j = 1; j <= nextDays; j++) {
          daysEl.innerHTML += `<div class="day next-date">${j}</div>`;
      }

      addDayClickListener();
  };

  const addDayClickListener = () => {
      const days = document.querySelectorAll('.day');
      days.forEach((day) => {
          day.addEventListener('click', (e) => {
              const target = e.target;
              if (target.classList.contains('prev-date')) {
                  prevMonth();
                  setTimeout(() => {
                      const days = document.querySelectorAll('.day');
                      days.forEach((day) => {
                          if (!day.classList.contains('prev-date') && day.innerHTML === target.innerHTML) {
                              day.classList.add('active-date');
                          }
                      });
                  }, 100);
              } else if (target.classList.contains('next-date')) {
                  nextMonth();
                  setTimeout(() => {
                      const days = document.querySelectorAll('.day');
                      days.forEach((day) => {
                          if (!day.classList.contains('next-date') && day.innerHTML === target.innerHTML) {
                              day.classList.add('active-date');
                          }
                      });
                  }, 100);
              } else {
                  activeDay = Number(target.innerHTML);
                  updateActiveDay(target);
                  updateEvents(activeDay);
              }
          });
      });
  };

  const updateActiveDay = (target) => {
      const days = document.querySelectorAll('.day');
      days.forEach((day) => {
          day.classList.remove('active-date');
      });
      target.classList.add('active-date');
      today = new Date(year, month, activeDay);
      eventDay.innerHTML = today.toLocaleString('en-us', { weekday: 'long' });
      eventDate.innerHTML = `${today.getDate()} ${months[month]} ${year}`;
  };

  const updateEvents = (day) => {
      let events = '';
      eventsArr.forEach((event) => {
          if (day === event.day && month + 1 === event.month && year === event.year) {
              event.events.forEach((e) => {
                  events += `<div class="event"><div class="title"><i class="fas fa-circle"></i><h3 class="event-title">${e.title}</h3></div><div class="event-time"><span class="event-time">${e.time}</span></div></div>`;
              });
          }
      });

      if (events === '') {
          events = '<div class="no-event"><h3>No Events</h3></div>';
      }

      eventsContainer.innerHTML = events;
  };

  const prevMonth = () => {
      month--;
      if (month < 0) {
          month = 11;
          year--;
      }
      updateMonth();
  };

  const nextMonth = () => {
      month++;
      if (month > 11) {
          month = 0;
          year++;
      }
      updateMonth();
  };

  prevEl.addEventListener('click', prevMonth);
  nextEl.addEventListener('click', nextMonth);

  todayBtn.addEventListener('click', () => {
      today = new Date();
      month = today.getMonth();
      year = today.getFullYear();
      updateMonth();
  });

  gotoBtn.addEventListener('click', () => {
      const dateArr = dateInput.value.split('/');
      if (dateArr.length === 2) {
          month = dateArr[0] - 1;
          year = dateArr[1];
          updateMonth();
      } else {
          alert('Invalid Date');
      }
  });

  addEventBtn.addEventListener('click', () => {
      addEventWrapper.classList.add('active');
  });

  addEventCloseBtn.addEventListener('click', () => {
      addEventWrapper.classList.remove('active');
  });

  addEventSubmit.addEventListener('click', () => {
      const eventTitle = addEventName.value;
      const eventTimeFrom = addEventFrom.value;
      const eventTimeTo = addEventTo.value;

      if (!eventTitle || !eventTimeFrom || !eventTimeTo) {
          alert('Please fill out all fields');
          return;
      }

      const timeFromArr = eventTimeFrom.split(':');
      const timeToArr = eventTimeTo.split(':');
      const newEvent = {
          title: eventTitle,
          time: `${convertTime(timeFromArr[0], timeFromArr[1])} - ${convertTime(timeToArr[0], timeToArr[1])}`
      };

      let eventAdded = false;
      if (eventsArr.length > 0) {
          eventsArr.forEach((item) => {
              if (item.day === activeDay && item.month === month + 1 && item.year === year) {
                  item.events.push(newEvent);
                  eventAdded = true;
              }
          });
      }

      if (!eventAdded) {
          eventsArr.push({
              day: activeDay,
              month: month + 1,
              year: year,
              events: [newEvent]
          });
      }

      addEventWrapper.classList.remove('active');
      addEventName.value = '';
      addEventFrom.value = '';
      addEventTo.value = '';
      updateEvents(activeDay);
      generateCalendar();
  });

  const convertTime = (hour, minute) => {
      const time = `${hour}:${minute}`;
      const [hours, minutes] = time.split(':');
      const suffix = hours >= 12 ? 'PM' : 'AM';
      const convertedHour = hours % 12 || 12;
      return `${convertedHour}:${minutes} ${suffix}`;
  };

  updateMonth();
  updateEvents(today.getDate());
});
document.addEventListener('DOMContentLoaded', () => {
  const eventsContainer = document.querySelector('.events');
  let eventsArr = []; // Sample events array, replace with your actual events array

  // Function to update events shown
  const updateEvents = () => {
      let eventsHtml = '';
      eventsArr.forEach((event, index) => {
          eventsHtml += `
              <div class="event">
                  <div class="title">
                      <i class="fas fa-circle"></i>
                      <h3 class="event-title">${event.title}</h3>
                  </div>
                  <div class="event-time">
                      <span class="event-time">${event.time}</span>
                  </div>
                  <div class="delete-popup" onclick="confirmDelete(${index})">Delete</div>
              </div>
          `;
      });
      eventsContainer.innerHTML = eventsHtml;
  };

  document.addEventListener('DOMContentLoaded', () => {
    const eventsContainer = document.querySelector('.events');
    const popupNotification = document.getElementById('popupNotification');
    let eventsArr = []; // Sample events array, replace with your actual events array

    // Function to update events shown
    const updateEvents = () => {
        let eventsHtml = '';
        eventsArr.forEach((event, index) => {
            eventsHtml += `
                <div class="event">
                    <div class="title">
                        <i class="fas fa-circle"></i>
                        <h3 class="event-title">${event.title}</h3>
                    </div>
                    <div class="event-time">
                        <span class="event-time">${event.time}</span>
                    </div>
                    <div class="delete-popup" onclick="confirmDelete(${index})">Delete</div>
                </div>
            `;
        });
        eventsContainer.innerHTML = eventsHtml;
    };

    // Function to handle delete confirmation
    window.confirmDelete = (index) => {
        const confirmed = confirm('Are you sure you want to delete this event?');
        if (confirmed) {
            eventsArr.splice(index, 1); // Remove event from array
            updateEvents(); // Update events displayed
            showNotification(); // Show notification after deleting event
        }
    };

    // Function to show pop-up notification
    const showNotification = () => {
        popupNotification.style.display = 'block';
        setTimeout(() => {
            popupNotification.style.display = 'none';
        }, 4000); // Hide notification after 4 seconds (adjust as needed)
    };

    // Example to add events (you can replace this with your own method of adding events)
    const addEvent = () => {
        const newEvent = {
            title: 'New Event',
            time: '10:00 AM - 12:00 PM'
        };
        eventsArr.push(newEvent); // Add event to array
        updateEvents(); // Update events displayed
    };

    // Initial call to populate events (you can replace this with your actual initialization)
    addEvent();
});

});



