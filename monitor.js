const fetch = require('node-fetch');

const TELEGRAM_TOKEN = "8322039269:AAGKhOhlftdeoJTJMHCxIa3_rl7ToMI3EMA";
const TELEGRAM_CHAT_ID = "1906496583";
const CREATOR_URL = "https://www.binance.com/en/square/profile/Square-Creator-fef5cb2476c7";

async function sendMessage(text) {
  const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text })
  });
}

async function monitor() {
  try {
    const res = await fetch(CREATOR_URL);
    const html = await res.text();

    if (!html || html.includes("login")) {
      await sendMessage("⚠️ Binance blocked the request or requires login.");
      return;
    }

    await sendMessage("✅ Binance page fetched successfully. Monitoring works.");
  } catch (err) {
    await sendMessage("❌ Error: " + err.message);
  }
}

monitor();
