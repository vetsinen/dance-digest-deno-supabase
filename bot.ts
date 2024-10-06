import { Bot, config } from "./deno.deps.ts";
import {renderHtmlForTelegram} from "./event.view.ts";
import {events} from "./event.model.ts";

let botToken = Deno.env.get("TGTOKEN");
if (!botToken) {
     console.log("Deno Environment variable 'TGTOKEN' not found.");
     const env = await config(); botToken = env.TGTOKEN
}
console.log("Your bot token is:", botToken);

export const bot = new Bot(botToken);// <-- put your bot token between the "" (https://t.me/BotFather)

bot.command("start", (ctx) => {
     bot.api.sendMessage(ctx.message.chat.id,"Hello! I'm Merengueros bot.")
});
bot.command("digest", async (ctx) => {
     const html = renderHtmlForTelegram(await events())
     const d = `Hello!This is the first line.\nAnd this is the second line.`
     bot.api.sendMessage(ctx.message.chat.id,html,{ parse_mode: "HTML" })
});
// bot.on("message", (ctx) => ctx.reply("start for deno tgbot!"));

//await bot.start();