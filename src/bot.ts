const Telegraf = require('telegraf')
const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const WizardScene = require('telegraf/scenes/wizard')

import { Composer } from 'telegraf/typings';

const handler = new Composer()
handler.action('next', (ctx) => {
  ctx.reply(`Hello ${ctx.chat?.first_name}`);
});

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.use(session())
bot.launch()