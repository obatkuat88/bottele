# TON Fortune Cookie - Telegram Mini App

A creative and engaging Telegram Mini App where users crack a virtual cookie for a daily fortune and earn TON points.

## Tech Stack
- **Frontend:** React, Vite
- **Web3:** @tonconnect/ui-react
- **Animations:** framer-motion
- **Styling:** Vanilla CSS (Telegram Theme variables)

## Features
- 🥠 **Daily Loop:** Crack a fortune cookie to see your luck.
- 💎 **Points & Streaks:** Gamified retention mechanics.
- 👛 **TON Connect:** Ready for Web3 integration.
- 🚀 **Viral Referral:** Built-in sharing to invite friends.

## Getting Started

1. **Install dependencies:**
   ```bash
   cd ton-fortune-cookie
   npm install
   ```

2. **Run locally:**
   ```bash
   npm run dev
   ```

3. **Deploy & Integrate:**
   - Deploy the `dist` folder to a static host (GitHub Pages, Vercel, Netlify).
   - Use [BotFather](https://t.me/botfather) to create a bot and set the `web_app` URL to your deployed URL.

## Bot Snippet (Node.js/Telegraf)

```javascript
const { Telegraf } = require('telegraf');
const bot = new Telegraf('YOUR_BOT_TOKEN');

bot.command('start', (ctx) => {
  ctx.reply('Welcome to TON Fortune Cookie! 🥠', {
    reply_markup: {
      inline_keyboard: [[
        { text: '🚀 Open App', web_app: { url: 'https://your-deployed-app.com' } }
      ]]
    }
  });
});

bot.launch();
```
