document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const telegramUsername = "yyaallaavv";

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
