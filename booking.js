document.addEventListener("DOMContentLoaded", () => {
  const timeSlotsContainer = document.getElementById("time-slots");
  const selectedTimeInput = document.getElementById("selected-time");
  const dateInput = document.getElementById("training-date");

  if (!timeSlotsContainer || !selectedTimeInput || !dateInput) return;

  const times = [
    "08:00", "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00", "17:00",
    "18:00", "19:00", "20:00"
  ];

  // Сегодняшняя дата по умолчанию
  const today = new Date().toISOString().split("T")[0];
  dateInput.value = today;
  dateInput.min = today;

  async function getBusyTimes(date) {
    try {
      const response = await fetch(`/api/bookings?date=${date}`);
      const data = await response.json();

      if (Array.isArray(data.busyTimes)) {
        return data.busyTimes;
      }

      return [];
    } catch (error) {
      console.error("Ошибка загрузки занятых часов:", error);
      return [];
    }
  }

  async function renderTimeSlots() {
    const selectedDate = dateInput.value;
    const busyTimes = await getBusyTimes(selectedDate);

    timeSlotsContainer.innerHTML = "";

    times.forEach((time) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "time-slot";
      button.textContent = time;

      const isBusy = busyTimes.includes(time);

      if (isBusy) {
        button.classList.add("busy");
        button.textContent = `${time} занято`;
        button.disabled = true;
      } else {
        button.addEventListener("click", () => {
          document.querySelectorAll(".time-slot").forEach((btn) => {
            btn.classList.remove("selected");
          });

          button.classList.add("selected");
          selectedTimeInput.value = time;
        });
      }

      timeSlotsContainer.appendChild(button);
    });
  }

  dateInput.addEventListener("change", renderTimeSlots);

  renderTimeSlots();
});
