const form = document.getElementById('bookingForm');
const statusEl = document.getElementById('formStatus');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  statusEl.className = 'form-status';
  statusEl.textContent = 'Отправляем заявку...';

  const data = Object.fromEntries(new FormData(form).entries());

  try {
    const response = await fetch('/api/booking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.error || 'Не удалось отправить заявку');

    statusEl.className = 'form-status ok';
    statusEl.textContent = 'Заявка отправлена. Мы свяжемся с вами для согласования времени.';
    form.reset();
  } catch (error) {
    statusEl.className = 'form-status err';
    statusEl.textContent = 'Заявку не удалось отправить автоматически. Позвоните: 8 995 005-05-02 или попробуйте позже.';
  }
});
