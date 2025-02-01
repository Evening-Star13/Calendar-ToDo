const calendar = document.querySelector(".calendar"),
  date = document.querySelector(".date"),
  daysContainer = document.querySelector(".days"),
  prev = document.querySelector(".prev"),
  next = document.querySelector(".next");
todayBtn = document.querySelector(".today-btn");
gotoBtn = document.querySelector(".goto-btn");
dateInput = document.querySelector(".date-input");

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

/*=============== Function to Add Days   ===============*/

function initCalendar() {
  // To Get prev month days and current month all days and rem next month days
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();
  const lastDate = lastDay.getDate();
  const day = firstDay.getDay();
  const nextDays = 7 - lastDay.getDay() - 1;

  // Update date top of Calendar
  date.innerHTML = months[month] + " " + year;

  // Adding days on DOM

  let days = "";

  // Prev month days
  for (let x = day; x > 0; x--) {
    days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
  }

  // Current month days
  for (let i = 1; i <= lastDate; i++) {
    // Changed < to <=
    // If day is today add class today
    if (
      i === new Date().getDate() &&
      year === new Date().getFullYear() &&
      month === new Date().getMonth()
    ) {
      days += `<div class="day today">${i}</div>`; // Corrected template literal
    } else {
      // Add remaining Days
      days += `<div class="day">${i}</div>`; // Corrected template literal
    }
  }

  // Next Month Days
  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next-date">${j}</div>`; // Corrected template literal
  }

  daysContainer.innerHTML = days;
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

// Next Month

function nextMonth() {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  initCalendar();
}

// Add Event Listener to prev and next buttons

prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

//Goto Date Functionality

todayBtn.addEventListener("click", () => {
  today = new Date();
  month = today.getMonth();
  year = today.getFullYear();
  initCalendar();
});

dateInput.addEventListener("keyup", (e) => {
  // Allow only numbers remove anything else
  dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
});
