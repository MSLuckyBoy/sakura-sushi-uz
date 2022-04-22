import telebot
from telebot import types
import re

TOKEN = "1848723245:AAHHDSLoIR9FHaFAIKaTOKEN8sw4KlDVZ5jsdCRI" #!!!FAIK TOKEN!!!!

bot = telebot.TeleBot(TOKEN)

def price_editor(price):
	price = str(price)
	count = len(price)
	while count > 3:
		count -= 3
		price = price[:count] + ' ' + price[count:]

	return f'{price} сум'


def send_order(chat_id=None, data=None):
	text = f'👤 <b>ФИО:</b> <i>{data["full_name"]}</i>\n📞 <b>Тел.:</b> <i>{data["tel"]}</i>\n🏡 <b>Адрес:</b> <i>{data["address"]}</i>\n💳 <b>Способ оплаты:</b> <i>{data["payment"]}</i>\n\n<b>Коментария:</b>\n➖ <i>{data["comment"]}</i>\n\n' + '➖' * 10 + '\n\n'

	n = 0
	summa = 0
	for value in data['order'].values():
		n += 1
		text += f'🛍 №{n}\n<b>Название:</b> <i>{value["name"]}</i>\n<b>Количество:</b> <i>{value["count"]}</i>\n<b>Цена:</b> <i>{price_editor(value["price"])}</i>\n\n'

		summa += value["price"] * value["count"]

	summa = price_editor(summa)

	text += '➖' * 10 + f'\n<b>Итого:</b> <i>{summa}</i>' 


	try:
		msg = bot.send_message(
			chat_id,
			text,
			parse_mode="HTML"
		)

		bot.send_location(chat_id, data['x_cor'], data['y_cor'], reply_to_message_id=msg.id)

	except Exception as e:
		print(e)
		x = '🛍 №11'
		n, m = text.split(x)

		msg = bot.send_message(
			chat_id,
			n,
			parse_mode="HTML"
		)

		bot.send_message(
			chat_id,
			x+m,
			parse_mode="HTML",
			reply_to_message_id=msg.id
		)

		bot.send_location(chat_id, data['x_cor'], data['y_cor'], reply_to_message_id=msg.id)




