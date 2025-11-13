from json_process import process_json 

from reportlab.lib.pagesizes import mm
from reportlab.pdfgen import canvas
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase import pdfmetrics


TEMP_PDF_PATH = "receipt.pdf"
FONT_PATH = "C:/Users/atsuk/AppData/Local/Microsoft/Windows/Fonts/NotoSansJP-Regular.ttf"
pdfmetrics.registerFont(TTFont("NotoSansJP", FONT_PATH))

def draw_bold_text(c, text, x, y, font="NotoSansJP", size=14, offset=0.3):
    """文字を少しずらして重ねることで太字風に描く"""
    c.setFont(font, size)
    for dx, dy in [(0, 0), (offset, 0), (0, offset), (offset, offset)]:
        c.drawCentredString(x + dx, y + dy, text)
    
def generate_receipt_pdf(data, output_path="receipt.pdf"):
    process_json(data)
    ticket_width = 48 * mm
    base_height = 80 * mm
    whole_height = 0 * mm
    for item in data["items"]:
        if int(item["quantity"]) >= 2:
            whole_height += 6 * mm
        else:
            whole_height += 3 * mm
    if data["payment"] == "cash":
        whole_height += 9 * mm  # Add height for cash payment section
    dynamic_height = base_height + whole_height

    if data["orderType"] == "takeout":
        dynamic_height += 20 * mm

    c = canvas.Canvas(output_path, pagesize=(ticket_width, dynamic_height))
    c.setFont("NotoSansJP", 18)
    c.drawImage("logo.png", 0, dynamic_height - 25.5 * mm, width=48 * mm, height=24 * mm)
    y = dynamic_height - 24 * mm
    y -= 6 * mm
    def equalwidth_zenkaku(text, y):
        c.setFont("NotoSansJP", 9.0)
        x = 1.5 * mm
        for char in text:
            c.drawCentredString(x, y, char)
            x += 3.0 * mm
    def equalwidth_hankaku(texts, xs, y):
        for i, text in enumerate(texts):
            c.setFont("NotoSansJP", 8.2)
            x = xs[i]
            c.drawCentredString((3 * x - 2.25) * mm, y, text[0])
            c.drawCentredString((3 * x - 0.75) * mm, y, text[1])
    equalwidth_zenkaku("筑駒　期高３喫茶班", y)
    equalwidth_hankaku(["74"], [3], y)
    y -= 6 * mm
    equalwidth_zenkaku("東京都世田谷区池尻４丁目７番１号", y)
    y -= 6 * mm
    c.scale(2, 1)
    c.drawCentredString(12 * mm, y, "領　収　書")
    c.scale(0.5, 1)
    y -= 6 * mm
    year_ = data['year']
    month_ = data['month']
    day_ = data['day']
    hour_ = data['hour']
    minute_ = data['minute']
    equalwidth_zenkaku("　　年　月　日", y)

    #### 修正①: orderNumber（4桁ゼロ埋め）を使用 ####
    order_number = int(data['orderNumber'])
    order_number_str = f"{order_number:04d}"  # 4桁にゼロ埋め
    equalwidth_hankaku(
        [
            year_[0] + year_[1], year_[2] + year_[3],
            month_[0] + month_[1], day_[0] + day_[1],
            hour_[0] + hour_[1], ":" + minute_[0], minute_[1] + " ",
            "No", ". ", order_number_str[0] + order_number_str[1],
            order_number_str[2] + order_number_str[3]
        ],
        [1, 2, 4, 6, 8, 9, 10, 13, 14, 15, 16],
        y
    )
    y -= 3 * mm
    #### 修正①ここまで ####

    #### 修正②: orderType == 'eat-in' のときのみテーブル番号を印字 ####
    if data.get('orderType') == 'eat-in':
        tablenumber = data['tableNumber']
        equalwidth_zenkaku("　　　　　　　 テーブル", y)
        equalwidth_hankaku(
            [" N", "o.", tablenumber[0] + tablenumber[1], tablenumber[2] + tablenumber[3]],
            [13, 14, 15, 16],
            y
        )
        y -= 6 * mm
    #### 修正②ここまで ####
    
    for item in data["items"]:
        item_name = item["name"]
        item_price = item["price"]
        item_quantity = item["quantity"]
        item_total = item["total"]
        if int(item_quantity) >= 2:
            equalwidth_zenkaku("　　" + item_name, y)
            y -= 3 * mm
            if len(item_price) == 2:
                equalwidth_hankaku([" ¥", item_price[0] + item_price[1], " x", item_quantity], [6, 7, 8, 9], y)
            else: equalwidth_hankaku(["¥" + item_price[0], item_price[1] + item_price[2], " x", item_quantity], [6, 7, 8, 9], y)
            if int(item_total) >= 1000:
                equalwidth_hankaku([" ¥", item_total[0] + item_total[1], item_total[2] + item_total[3]], [14, 15, 16], y)
            elif int(item_total) >= 100:
                equalwidth_hankaku(["¥" + item_total[0], item_total[1] + item_total[2]], [15, 16], y)
            else:
                equalwidth_hankaku([" ¥", item_total[0]] + item_total[1], [15, 16], y)
        if int(item_quantity) == 1:
            equalwidth_zenkaku("　　" + item_name, y)
            if len(item_price) == 2:
                equalwidth_hankaku([" ¥", item_price[0] + item_price[1]], [15, 16], y)
            else: equalwidth_hankaku(["¥" + item_price[0], item_price[1] + item_price[2]], [15, 16], y)
        y -= 3 * mm

    c.scale(2, 1)
    c.drawString(0 * mm, y, "合")
    c.drawString(4.5 * mm, y, "計")
    c.scale(0.5, 1)
    total_str = data["total"]
    print("total_str", total_str)
    if len(total_str) == 5:
        equalwidth_hankaku(["¥" + total_str[0], total_str[1] + total_str[2], total_str[3] + total_str[4]], [14, 15, 16], y)
    elif len(total_str) == 4:
        equalwidth_hankaku([" ¥", total_str[0] + total_str[1], total_str[2] + total_str[3]], [14, 15, 16], y)
    elif len(total_str) == 3:
        equalwidth_hankaku(["¥" + total_str[0], total_str[1] + total_str[2]], [15, 16], y)
    elif len(total_str) == 2:
        equalwidth_hankaku([" ¥", total_str[0] + total_str[1]], [15, 16], y)
    
    if data["payment"] == "cash":
        y -= 6 * mm
        equalwidth_zenkaku("お預かり", y)

        received_payment = data.get("receivedPayment", 0)
    
        received_payment_str = str(received_payment)
        if len(received_payment_str) == 5:
            equalwidth_hankaku(["¥" + received_payment_str[0], received_payment_str[1] + received_payment_str[2], received_payment_str[3] + received_payment_str[4]], [14, 15, 16], y)
        elif len(received_payment_str) == 4:
            equalwidth_hankaku([" ¥", received_payment_str[0] + received_payment_str[1], received_payment_str[2] + received_payment_str[3]], [14, 15, 16], y)
        elif len(received_payment_str) == 3:
            equalwidth_hankaku(["¥" + received_payment_str[0], received_payment_str[1] + received_payment_str[2]], [15, 16], y)
        elif len(received_payment_str) == 2:
            equalwidth_hankaku([" ¥", received_payment_str[0] + received_payment_str[1]], [15, 16], y)
        y -= 3 * mm
        equalwidth_zenkaku("お釣り", y)
        change = received_payment - int(data["total"])
        change_str = str(change)
        if len(change_str) == 5:
            equalwidth_hankaku(["¥" + change_str[0], change_str[1] + change_str[2], change_str[3] + change_str[4]], [14, 15, 16], y)
        elif len(change_str) == 4:
            equalwidth_hankaku([" ¥", change_str[0] + change_str[1], change_str[2] + change_str[3]], [14, 15, 16], y)
        elif len(change_str) == 3:
            equalwidth_hankaku(["¥" + change_str[0], change_str[1] + change_str[2]], [15, 16], y)
        elif len(change_str) == 2:
            equalwidth_hankaku([" ¥", change_str[0] + change_str[1]], [15, 16], y)

    if data["orderType"] == "takeout":
        y -= 6 * mm
        equalwidth_zenkaku("以下の番号でお呼びします。", y)
        y -= 3 * mm
        equalwidth_zenkaku("今しばらくお待ち下さい。", y)
        order_number_str = f"{int(data['orderNumber']):04d}"
        last_two_digits = order_number_str[-2:]  # 下二桁
        last_two_digits = "1" + last_two_digits

        # 黒い四角のサイズと位置（中央寄せ）
        rect_width = 28 * mm
        rect_height = 18 * mm
        rect_x = (ticket_width - rect_width) / 2
        y -= 20 * mm

        # 黒い四角を描く
        c.setFillColorRGB(0, 0, 0)  # 黒
        c.rect(rect_x, y, rect_width, rect_height, fill=1, stroke=0)

        # 白文字で番号を描く
        c.setFillColorRGB(1, 1, 1)  # 白

        draw_bold_text(c, last_two_digits, ticket_width / 2, y + 5 * mm, size=30, offset=0.8)

        # 色を戻す（以降の描画に影響しないように）
        c.setFillColorRGB(0, 0, 0)
    # --- 追加ここまで ---

    y -= 3 * mm
    equalwidth_zenkaku("ご来店ありがとうございます。", y)
    
    c.save()

import os
from pdf2image import convert_from_path

def pdf_to_bmp(pdf_path, output_path):
    image = convert_from_path(pdf_path, dpi=203)
    image[0].save(output_path, "BMP")
    os.remove(pdf_path)

def convert_to_1bpp(input_path, output_path, threshold=140):
    from PIL import Image
    img = Image.open(input_path)
    img = img.convert("L")
    img = img.point(lambda x: 255 if x > threshold else 0, '1')
    img.save(output_path, "BMP")

def resize_bmp(input_path, output_path):
    from PIL import Image
    img = Image.open(input_path)
    if img.width > 464:
        ratio = 464 / img.width
        img = img.resize((464, int(img.height * ratio)), Image.LANCZOS)
    img.save(output_path)
