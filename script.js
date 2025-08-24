const calendar = document.getElementById("calendar");
const eventModal = document.getElementById("eventModal");
const closeModal = document.getElementById("closeModal");
const eventDate = document.getElementById("eventDate");
const eventText = document.getElementById("eventText");
const newEventInput = document.getElementById("newEventInput");
const saveEvent = document.getElementById("saveEvent");
const themeToggle = document.getElementById("themeToggle");

const holidays2005 = {
  "2005-01-01": "New Year's Day",
  "2005-02-14": "Valentine's Day",
  "2005-02-25": "EDSA People Power Revolution",
  "2005-03-24": "Maundy Thursday",
  "2005-03-25": "Good Friday",
  "2005-03-26": "Black Saturday",
  "2005-03-27": "Easter Sunday",
  "2005-04-09": "Araw ng Kagitingan",
  "2005-05-01": "Labor Day",
  "2005-06-12": "Independence Day",
  "2005-08-21": "Ninoy Aquino Day",
  "2005-08-29": "National Heroes Day",
  "2005-11-01": "All Saints Day",
  "2005-11-02": "All Souls Day",
  "2005-11-30": "Bonifacio Day",
  "2005-12-25": "Christmas Day",
  "2005-12-30": "Rizal Day",
};

let events = {};

function generateCalendar(year) {
  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  calendar.innerHTML = "";

  months.forEach((month, monthIndex) => {
    const monthDiv = document.createElement("div");
    monthDiv.classList.add("month");

    const monthTitle = document.createElement("h2");
    monthTitle.textContent = month + " " + year;
    monthDiv.appendChild(monthTitle);

    const weekdaysDiv = document.createElement("div");
    weekdaysDiv.classList.add("weekdays");
    ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].forEach(day => {
      const wd = document.createElement("div");
      wd.textContent = day;
      weekdaysDiv.appendChild(wd);
    });
    monthDiv.appendChild(weekdaysDiv);

    const daysDiv = document.createElement("div");
    daysDiv.classList.add("days");

    let firstDay = new Date(year, monthIndex, 1).getDay();
    let totalDays = new Date(year, monthIndex + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
      const empty = document.createElement("div");
      daysDiv.appendChild(empty);
    }

    for (let day = 1; day <= totalDays; day++) {
      const dayDiv = document.createElement("div");
      dayDiv.classList.add("day");
      const dateStr = `${year}-${String(monthIndex+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
      dayDiv.textContent = day;

      if (holidays2005[dateStr]) {
        dayDiv.classList.add("holiday");
      }

      dayDiv.addEventListener("click", () => openModal(dateStr));
      daysDiv.appendChild(dayDiv);
    }

    monthDiv.appendChild(daysDiv);
    calendar.appendChild(monthDiv);
  });
}

function openModal(dateStr) {
  eventModal.style.display = "block";
  eventDate.textContent = dateStr;

  if (events[dateStr]) {
    eventText.textContent = events[dateStr];
  } else if (holidays2005[dateStr]) {
    eventText.textContent = holidays2005[dateStr];
  } else {
    eventText.textContent = "No event for this day.";
  }

  newEventInput.value = "";
  saveEvent.onclick = () => {
    const newEvent = newEventInput.value.trim();
    if (newEvent) {
      events[dateStr] = newEvent;
      eventText.textContent = newEvent;
    }
    eventModal.style.display = "none";
  };
}

closeModal.onclick = () => eventModal.style.display = "none";
window.onclick = e => { if (e.target == eventModal) eventModal.style.display = "none"; };

generateCalendar(2005);

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    themeToggle.textContent = "Light Mode";
  } else {
    themeToggle.textContent = "Dark Mode";
  }
});
