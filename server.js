// Local Node.js server for testing the website before publishing.
// Run: npm install && npm start

const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// Временное хранилище записей
let bookings = [];

// Получить занятые часы по выбранной дате
app.get("/api/bookings", (req, res) => {
  const { date } = req.query;

  if (!date) {
    return res.json({ busyTimes: [] });
  }

  const busyTimes = bookings
    .filter((booking) => booking.date === date)
    .map((booking) => booking.time);

  res.json({ busyTimes });
});

// Создать новую запись
app.post("/api/bookings", (req, res) => {
  const { name, phone, date, time } = req.body;

  if (!name || !phone || !date || !time) {
    return res.status(400).json({
      success: false,
      message: "Заполните имя, телефон, дату и время"
    });
  }

  const alreadyBooked = bookings.some(
    (booking) => booking.date === date && booking.time === time
  );

  if (alreadyBooked) {
    return res.status(409).json({
      success: false,
      message: "Это время уже занято"
    });
  }

  bookings.push({
    name,
    phone,
    date,
    time,
    createdAt: new Date().toISOString()
  });

  res.json({
    success: true,
    message: "Вы успешно записались на тренировку"
  });
});

app.listen(port, () => {
  console.log(`Website is running: http://localhost:${port}`);
});
