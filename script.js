const calendar = document.querySelector(".calendar"),
  date = document.querySelector(".date"),
  daysContainer = document.querySelector(".days"),
  prev = document.querySelector(".prev"),
  next = document.querySelector(".next"),
  todayBtn = document.querySelector(".today-btn"),
  gotoBtn = document.querySelector(".goto-btn"),
  dateInput = document.querySelector(".date-input"),
  eventDay = document.querySelector(".event-day"),
  eventDate = document.querySelector(".event-date"),
  eventsContainer = document.querySelector(".events"),
  addEventSubmit = document.querySelector(".add-event-btn");

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Set an Empty Array
let eventsArr = [];

// Then Call Get
getEvents(eventsArr);

/*=============== Function to Add Days   ===============*/

function initCalendar() {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();
  const lastDate = lastDay.getDate();
  const day = firstDay.getDay();
  const nextDays = 7 - lastDay.getDay() - 1;

  date.innerHTML = months[month] + " " + year;

  let days = "";

  // Prev month days
  for (let x = day; x > 0; x--) {
    days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
  }

  // Current month days
  for (let i = 1; i <= lastDate; i++) {
    // Check if Event is Present on Current Day
    let event = false;
    eventsArr.forEach((eventObj) => {
      if (
        eventObj.day === i &&
        eventObj.month === month + 1 &&
        eventObj.year === year
      ) {
        // If Event Found
        event = true;
      }
    });

    // If Day is Today Add Class
    if (
      i === new Date().getDate() &&
      year === new Date().getFullYear() &&
      month === new Date().getMonth()
    ) {
      activeDay = i;
      getActiveDay(i);
      updateEvents(i);

      // If Event Found Also add Event Class
      // Add Active on Today at Startup
      if (event) {
        days += `<div class="day today active event">${i}</div>`;
      } else {
        days += `<div class="day today active">${i}</div>`;
      }
    }
    // Add remaining as it is
    else {
      if (event) {
        days += `<div class="day event">${i}</div>`;
      } else {
        days += `<div class="day">${i}</div>`;
      }
    }
  }

  // Next Month Days
  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next-date">${j}</div>`;
  }

  daysContainer.innerHTML = days;
  // Add Listener After Calendar Initialized
  addListener();
}

initCalendar();

// Prev Month
function prevMonth() {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  initCalendar();
}

function nextMonth() {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  initCalendar();
}

prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

todayBtn.addEventListener("click", () => {
  today = new Date();
  month = today.getMonth();
  year = today.getFullYear();
  initCalendar();
});

dateInput.addEventListener("input", (e) => {
  // Allow only numbers and slashes
  dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");

  // Automatically add a slash after the month
  if (dateInput.value.length === 2 && !dateInput.value.includes("/")) {
    dateInput.value += "/";
  }

  // Limit the input to a maximum of 7 characters (MM/YYYY)
  if (dateInput.value.length > 7) {
    dateInput.value = dateInput.value.slice(0, 7);
  }

  // Handle backspace to remove the slash if needed
  if (e.inputType === "deleteContentBackward") {
    if (dateInput.value.length === 3) {
      dateInput.value = dateInput.value.slice(0, 2);
    }
  }
});

gotoBtn.addEventListener("click", gotoDate);

function gotoDate() {
  const dateArr = dateInput.value.split("/");
  if (dateArr.length === 2) {
    if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
      month = dateArr[0] - 1; // Fixed assignment operator
      year = dateArr[1];
      initCalendar();
      return;
    }
  }
  alert("Invalid Date");
}

const addEventBtn = document.querySelector(".add-event"),
  addEventContainer = document.querySelector(".add-event-wrapper"),
  addEventCloseBtn = document.querySelector(".close"),
  addEventTitle = document.querySelector(".event-name"),
  addEventFrom = document.querySelector(".event-time-from"),
  addEventTo = document.querySelector(".event-time-to");

addEventBtn.addEventListener("click", () => {
  addEventContainer.classList.toggle("active");
});
addEventCloseBtn.addEventListener("click", () => {
  addEventContainer.classList.remove("active"); // Fixed here
});

document.addEventListener("click", (e) => {
  // If clicked outside
  if (e.target !== addEventBtn && !addEventContainer.contains(e.target)) {
    addEventContainer.classList.remove("active");
  }
});

// Allow only 50 characters for Event Title
addEventTitle.addEventListener("input", (e) => {
  addEventTitle.value = addEventTitle.value.slice(0, 50);
});

// Time format in from & to Time
addEventFrom.addEventListener("input", (e) => {
  // Remove anything else than numbers
  addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, "");
  // If two numbers entered auto add
  if (addEventFrom.value.length === 2) {
    addEventFrom.value += ":";
  }
  // Don't let user enter more than 5 characters
  if (addEventFrom.value.length > 5) {
    addEventFrom.value = addEventFrom.value.slice(0, 5);
  }
});

// Same with to Time
addEventTo.addEventListener("input", (e) => {
  // Remove anything else than numbers
  addEventTo.value = addEventTo.value.replace(/[^0-9:]/g, "");
  // If two numbers entered auto add
  if (addEventTo.value.length === 2) {
    addEventTo.value += ":";
  }
  // Don't let user enter more than 5 characters
  if (addEventTo.value.length > 5) {
    addEventTo.value = addEventTo.value.slice(0, 5);
  }
});

// Lets Create a Function to Add Listener on Days After Rendered
function addListener() {
  const days = document.querySelectorAll(".day");
  days.forEach((day) => {
    day.addEventListener("click", (e) => {
      // Set Current Day as Active Day
      activeDay = Number(e.target.innerHTML);

      // Call Active Day After Click
      getActiveDay(e.target.innerHTML);
      updateEvents(Number(e.target.innerHTML));

      // Remove Active From Already Active Day
      days.forEach((day) => {
        day.classList.remove("active");
      });

      // If Prev Month Day Clicked Goto Prev Month & Add Active
      if (e.target.classList.contains("prev-date")) {
        prevMonth();

        setTimeout(() => {
          // Select All Days of That Month
          const days = document.querySelectorAll(".day");

          // After Going to Prev Month Add Active to Clicked
          days.forEach((day) => {
            if (
              !day.classList.contains("prev-date") &&
              day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add("active");
            }
          });
        }, 100);
        // Same With Next Month Days
      } else if (e.target.classList.contains("next-date")) {
        nextMonth();

        setTimeout(() => {
          // Select All Days of That Month
          const days = document.querySelectorAll(".day");

          // After Going to Prev Month Add Active to Clicked
          days.forEach((day) => {
            if (
              !day.classList.contains("next-date") &&
              day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add("active");
            }
          });
        }, 100);
      } else {
        // Remaining Current Month Days
        e.target.classList.add("active");
      }
    });
  });
}

// Lets Show Active Day events & Date at Top
function getActiveDay(date) {
  const day = new Date(year, month, date);
  const dayName = day.toString().split(" ")[0];
  eventDay.innerHTML = dayName;
  eventDate.innerHTML = date + " " + months[month] + " " + year;
}

// Function to Show Events of That Day
function updateEvents(date) {
  let events = "";
  eventsArr.forEach((event) => {
    if (
      date === event.day &&
      month + 1 === event.month &&
      year === event.year
    ) {
      event.events.forEach((event) => {
        events += `<div class="event">
            <div class="title">
              <i class="fas fa-circle"></i>
              <h3 class="event-title">${event.title}</h3>
            </div>
            <div class="event-time">
              <span class="event-time">${event.time}</span>
            </div>
        </div>`;
      });
    }
  });

  // If Nothing Found
  if (events === "") {
    events = `<div class="no-event">
          <h3>No Events</h3>
        </div>`;
  }

  eventsContainer.innerHTML = events;
  // Save Events WheUpdate Called
  saveEvents();
}

// Lets Create Function to Add Events
addEventSubmit.addEventListener("click", () => {
  const eventTitle = addEventTitle.value;
  const eventTimeFrom = addEventFrom.value;
  const eventTimeTo = addEventTo.value;
  if (eventTitle === "" || eventTimeFrom === "" || eventTimeTo === "") {
    alert("Please fill all the fields");
    return;
  }

  // Check correct time format 24 hour
  const timeFromArr = eventTimeFrom.split(":");
  const timeToArr = eventTimeTo.split(":");
  if (
    timeFromArr.length !== 2 ||
    timeToArr.length !== 2 ||
    timeFromArr[0] > 23 ||
    timeFromArr[1] > 59 ||
    timeToArr[0] > 23 ||
    timeToArr[1] > 59
  ) {
    alert("Invalid Time Format");
    return; // Return to prevent further execution
  }

  const timeFrom = convertTime(eventTimeFrom);
  const timeTo = convertTime(eventTimeTo);

  const newEvent = {
    title: eventTitle,
    time: `${timeFrom} - ${timeTo}`, // Use backticks for template literals
  };

  let eventAdded = false;

  // Check if eventsArr not empty
  if (eventsArr.length > 0) {
    // Check if Current Day Has Any Event Then Add to That
    eventsArr.forEach((item) => {
      if (
        item.day === activeDay &&
        item.month === month + 1 &&
        item.year === year
      ) {
        item.events.push(newEvent);
        eventAdded = true;
      }
    });
  }

  // If Event Array Empty or Current Day has No Event New
  if (!eventAdded) {
    eventsArr.push({
      day: activeDay,
      month: month + 1,
      year: year,
      events: [newEvent],
    });
  }

  // Remove Active From Add Event Form
  addEventContainer.classList.remove("active");
  // Clear the Fields
  addEventTitle.value = "";
  addEventFrom.value = "";
  addEventTo.value = "";

  // Show Current Added Event
  updateEvents(activeDay);

  // Also Add Event Class to Newly Added Day if Not Already

  const activeDayElem = document.querySelector(".day.active");
  if (!activeDayElem.classList.contains("event")) {
    activeDayElem.classList.add("event");
  }
});

function convertTime(time) {
  let timeArr = time.split(":");
  let timeHour = timeArr[0];
  let timeMin = timeArr[1];
  let timeFormat = timeHour >= 12 ? "PM" : "AM";
  timeHour = timeHour % 12 || 12;
  time = timeHour + ":" + timeMin + " " + timeFormat;
  return time;
}

// Create a Function to Remove Events on Click

eventsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("event")) {
    const eventTitle = e.target.children[0].children[1].innerHTML;
    // Get theTitle of Event then Search in Array by Title & Delete
    eventsArr.forEach((event) => {
      if (
        event.day === activeDay &&
        event.month === month + 1 &&
        event.year === year
      ) {
        event.events.forEach((item, index) => {
          if (item.title === eventTitle) {
            event.events.splice(index, 1);
          }
        });

        // If no Event Remaining on That Day Remove Complete Day

        if (event.events.length === 0) {
          eventsArr.splice(eventsArr.indexOf(event), 1);
          // After Remove Complete Day Also Remove Class from Day Element

          const activeDayElem = document.querySelector(".day.active");
          if (activeDayElem.classList.contains("event")) {
            activeDayElem.classList.remove("event");
          }
        }
      }
    });
    // After Removing Form Array Update Event
    updateEvents(activeDay);
  }
});

// Store Events in Local Storage Get From There

function saveEvents() {
  localStorage.setItem("events", JSON.stringify(eventsArr));
}

//function to get events from local storage
function getEvents() {
  //check if events are already saved in local storage then return event else nothing
  if (localStorage.getItem("events") === null) {
    return;
  }
  eventsArr.push(...JSON.parse(localStorage.getItem("events")));
}
