document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const telegramUsername = "yyaallaavvv";

  if (!form) {
    console.log("Форма не найдена");
    return;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nameInput = form.querySelector('input[name="name"], input[type="text"]');
    const phoneInput = form.querySelector('input[name="phone"], input[type="tel"]');
    const selects = form.querySelectorAll("select");
    const commentInput = form.querySelector("textarea");

    const name = nameInput ? nameInput.value.trim() : "Не указано";
    const phone = phoneInput ? phoneInput.value.trim() : "Не указан";
    const day = selects[0] ? selects[0].value : "По договорённости";
    const time = selects[1] ? selects[1].value : "По договорённости";
    const comment = commentInput ? commentInput.value.trim() : "Без комментария";

    const text =
      `Здравствуйте! Хочу записаться на индивидуальную тренировку по вольной борьбе.\n\n` +
      `Имя: ${name}\n` +
      `Телефон: ${phone}\n` +
      `Удобный день: ${day}\n` +
      `Удобное время: ${time}\n` +
      `Комментарий: ${comment}\n\n` +
      `Адрес: 10th Planet BJJ, Краснодар, ул. Октябрьская 68/1`;

    const telegramLink = `https://t.me/${telegramUsername}?text=${encodeURIComponent(text)}`;

    window.location.href = telegramLink;
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const phoneInput = document.querySelector('input[type="tel"], input[name="phone"], #phone');

  if (!phoneInput) return;

  // Сразу ставим +7, если поле пустое
  if (!phoneInput.value.startsWith("+7")) {
    phoneInput.value = "+7";
  }

  phoneInput.addEventListener("focus", () => {
    if (!phoneInput.value.startsWith("+7")) {
      phoneInput.value = "+7";
    }
  });

  phoneInput.addEventListener("input", () => {
    let value = phoneInput.value;

    // Оставляем только цифры
    let digits = value.replace(/\D/g, "");

    // Если пользователь случайно начал с 7 или 8 — убираем первую цифру
    if (digits.startsWith("7")) {
      digits = digits.slice(1);
    }

    if (digits.startsWith("8")) {
      digits = digits.slice(1);
    }

    // Ограничиваем до 10 цифр после +7
    digits = digits.slice(0, 10);

    phoneInput.value = "+7" + digits;
  });

  phoneInput.addEventListener("keydown", (e) => {
    // Не даём удалить +7
    if (
      phoneInput.selectionStart <= 2 &&
      (e.key === "Backspace" || e.key === "Delete")
    ) {
      e.preventDefault();
    }
  });
});
