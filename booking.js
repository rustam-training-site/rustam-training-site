// Vercel/Netlify-style serverless endpoint for Telegram notifications.
// Required environment variables:
// TELEGRAM_BOT_TOKEN=123456:ABC...
// TELEGRAM_CHAT_ID=123456789

async function sendTelegramMessage(text) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    throw new Error('Telegram bot token or chat id is not configured');
  }

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
      disable_web_page_preview: true
    })
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Telegram error: ${details}`);
  }
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { name, phone, day, time, comment } = body || {};

    if (!name || !phone || !day || !time) {
      return res.status(400).json({ error: 'Заполните имя, телефон, день и удобное время' });
    }

    const message = [
      '🥇 <b>Новая заявка на индивидуальную тренировку</b>',
      '',
      `👤 <b>Имя:</b> ${escapeHtml(name)}`,
      `📞 <b>Телефон:</b> ${escapeHtml(phone)}`,
      `📅 <b>День:</b> ${escapeHtml(day)}`,
      `⏰ <b>Время:</b> ${escapeHtml(time)}`,
      comment ? `💬 <b>Комментарий:</b> ${escapeHtml(comment)}` : '',
      '',
      '📍 10th Planet BJJ, Краснодар, ул. Октябрьская 68/1',
      '💰 Разовая тренировка: 4000 ₽',
      '🎟 Промокод СТАРТ20: −20% на первые 2 тренировки'
    ].filter(Boolean).join('\n');

    await sendTelegramMessage(message);
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Ошибка отправки заявки' });
  }
};

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
