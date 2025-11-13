from json_process import process_json 

from reportlab.lib.pagesizes import mm
from reportlab.pdfgen import canvas
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase import pdfmetrics

TEMP_WAITER_RECEIPT_PATH = "waiter_receipt.pdf"
FONT_PATH = "C:/Users/atsuk/AppData/Local/Microsoft/Windows/Fonts/NotoSansJP-Regular.ttf"
pdfmetrics.registerFont(TTFont("NotoSansJP", FONT_PATH))

def generate_receipt_pdf_w(data, output_path="waiter_receipt.pdf"):
    process_json(data)
    # print("SUCESS!")
    ticket_width = 78 * mm
    base_height = 75 * mm
    whole_height = 0 * mm
    for item in data["items"]:
        whole_height += 7 * mm
    dynamic_height = base_height + whole_height
    y = dynamic_height - 10 * mm

    c = canvas.Canvas(output_path, pagesize=(ticket_width, dynamic_height))

    c.setFont("NotoSansJP", 18)
    print("HELLO")
    
    
    orderNumber = data["orderNumber"]
    c.drawCentredString(39 * mm, y, str(orderNumber))
    y -= 6 * mm
    print("SUCESS!!")


    if data["orderType"] == "takeout":
        order_number_str = f"{int(data['orderNumber']):04d}"
        last_two_digits = order_number_str[-2:]  # 下二桁
        last_two_digits = "1" + last_two_digits
        c.drawCentredString(39 * mm, y, f"**テイクアウト{last_two_digits}**")
    else:
        customerCount = data["customerCount"]
        c.drawCentredString(39 * mm, y, str(customerCount))
    y -= 3 * mm
    
    print("HELOO")

    c.setFont("NotoSansJP", 30)
    c.setStrokeColorRGB(0, 0, 0)
    c.setLineWidth(2)
    c.line(0, y, ticket_width, y)
    y -= 12 * mm
    table_number = data['tableNumber']
    temp_str = "Table:" + str(table_number)[2] + str(table_number)[3]
    c.drawCentredString(39 * mm, y, temp_str)
    y -= 3 * mm
    c.line(0, y, ticket_width, y)
    y -= 10 * mm
    c.setFont("NotoSansJP", 18)

    print("HEKPE")


    year_ = data['year']
    month_ = data['month']
    day_ = data['day']
    hour_ = data['hour']
    minute_ = data['minute']
    year_month_day = f"{month_}月{day_}日"
    hour_minute = f"{hour_}:{minute_}"
    c.drawString(5 * mm, y, year_month_day)
    c.drawString(60 * mm, y, hour_minute)
    y -= 10 * mm
    c.setFont("NotoSansJP", 18)
    for item in data["items"]:
        # 商品名 | 数量 | 単価 | 金額
        item_name = item["name"]
        quantity = item["quantity"]
        unit_price = item["price"]
        item_name_x = 5 * mm
        quantity_x = 67 * mm
        unit_price_x = 67 * mm
        c.setFont("NotoSansJP", 14)
        c.drawString(item_name_x, y, item_name)
        if int(quantity) >= 2: c.setFont("NotoSansJP", 22)
        else: c.setFont("NotoSansJP", 14)
        c.drawString(quantity_x, y, quantity)
        y -= 7 * mm
    

    c.save()

import os
from pdf2image import convert_from_path

def pdf_to_bmp_w(pdf_path, output_path):
    image = convert_from_path(pdf_path, dpi=203)
    image[0].save(output_path, "BMP")
    os.remove(pdf_path)

def convert_to_1bpp_w(input_path, output_path, threshold=140):
    from PIL import Image
    img = Image.open(input_path)
    img = img.convert("L")
    img = img.point(lambda x: 255 if x > threshold else 0, '1')
    img.save(output_path, "BMP")

def resize_bmp_w(input_path, output_path):
    from PIL import Image
    img = Image.open(input_path)
    if img.width > 592:
        ratio = 592 / img.width
        # img = img.resize((464, int(img.height * ratio)), Image.ANTIALIAS)
        # AttributeError: module 'PIL.Image' has no attribute 'ANTIALIAS'
        img = img.resize((592, int(img.height * ratio)), Image.LANCZOS)
    img.save(output_path)