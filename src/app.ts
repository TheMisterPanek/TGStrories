
import Telegraf, { session } from "telegraf";

import { config } from 'dotenv';
import { ExtraReplyMessage } from "telegraf/typings/telegram-types";

config();

if (process.env.BOT_TOKEN) {
  const bot = new Telegraf(process.env.BOT_TOKEN)

  bot.use(session({
    getSessionKey: (ctx) => {
      if (ctx.from && ctx.chat) {
        return `${ctx.from.id}:${ctx.chat.id}`
      } else if (ctx.from && ctx.inlineQuery) {
        return `${ctx.from.id}:${ctx.from.id}`
      }
      return '';
    },
    store:
  }));

  bot.start((ctx) => {
    const replyMarkUp: ExtraReplyMessage = {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Hello!",
              callback_data: "hello",
            }
          ]
        ]
      }
    }
    ctx.reply('Hello, use following commands', replyMarkUp);
  });
  bot.on('text', ctx => {
    var session = (ctx as any).session;
    session.counter = session.counter || 0;
    session.counter++;
    return ctx.reply(`Counter: ${session.counter}`);
  })
  bot.launch();  
} else {
  console.log("Token not found")
}