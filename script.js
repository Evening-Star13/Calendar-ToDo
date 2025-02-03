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

//Default Events Array
const eventsArr = [
  {
    day: 3,
    month: 2,
    year: 2025,
    events: [
      {
        title: "Event 1 Relax today",
        time: "10:00 AM",
      },
      {
        title: "Event 2 Do Dishes",
        time: "11:00 AM",
      },
    ],
  },
  {
    day: 12,
    month: 2,
    year: 2025,
    events: [
      {
        title: "Event 1 Take a Bath",
        time: "10:00 AM",
      },
    ],
  },
];

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

    //If Day is Today Add Class
    if (
      i === new Date().getDate() &&
      year === new Date().getFullYear() &&
      month === new Date().getMonth()
    ) {
      activeDay = i;
      getActiveDay(i);
      updateEvents(i);

      //If Event Found Also add Event Class
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

  console.log(events);
  eventsContainer.innerHTML = events;
}

// Lets Create Function to Add Events
addEventSubmit.addEventListener("click", () => {
  const eventTitle = addEventTitle.value;
  const eventTimeFrom = addEventFrom.value;
  const eventTimeTo = addEventTo.value;

  // Some Validation

  if (eventTitle === "" || eventTimeFrom === "" || eventTimeTo === "") {
    alert("Please Fill All Fields");
  }
});
