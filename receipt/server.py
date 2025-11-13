from flask import Flask, request, jsonify
from flask_cors import CORS
from escpos.printer import Usb
from pdf_generate import generate_receipt_pdf, pdf_to_bmp, convert_to_1bpp, resize_bmp
from pdf_generate_waiter import generate_receipt_pdf_w, pdf_to_bmp_w, convert_to_1bpp_w, resize_bmp_w
import time
import uuid

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ["https://frontend-eta-eight-48.vercel.app"]}})

PRINTER_VENDOR_ID = 0x0416
PRINTER_PRODUCT_ID = 0x5011

WAITER_PRINTER_VENDOR_ID = 0x04B8
WAITER_PRINTER_PRODUCT_ID = 0x0202

@app.route('/print_waiter', methods=['POST'])
def print_receipt_waiter():
    
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400
    try:
        unique_id = str(uuid.uuid4())

        pdf_path = f"waiter_receipt_{unique_id}.pdf"
        bmp_path = f"waiter_receipt_{unique_id}.bmp"
        bpp_path = f"waiter_receipt_{unique_id}_1bpp.bmp"
        resized_bmp_path = f"waiter_receipt_{unique_id}_resized.bmp"

        generate_receipt_pdf_w(data, pdf_path)
        pdf_to_bmp_w(pdf_path, bmp_path)
        convert_to_1bpp_w(bmp_path, bpp_path)
        resize_bmp_w(bpp_path, resized_bmp_path)
        printer = Usb(WAITER_PRINTER_VENDOR_ID, WAITER_PRINTER_PRODUCT_ID)

        printer._raw(b'\x1b\x40')  # ESC @
        time.sleep(0.2)

        printer.image(resized_bmp_path, impl='bitImageColumn', center=True)
        time.sleep(0.5)

        return jsonify({"message": "Receipt printed successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/print', methods=['POST'])
def print_receipt():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400
    try:
        unique_id = str(uuid.uuid4())

        pdf_path = f"receipt_{unique_id}.pdf"
        bmp_path = f"receipt_{unique_id}.bmp"
        bpp_path = f"receipt_{unique_id}_1bpp.bmp"
        resized_bmp_path = f"receipt_{unique_id}_resized.bmp"

        generate_receipt_pdf(data, pdf_path)
        pdf_to_bmp(pdf_path, bmp_path)
        convert_to_1bpp(bmp_path, bpp_path)
        resize_bmp(bpp_path, resized_bmp_path)
        printer = Usb(PRINTER_VENDOR_ID, PRINTER_PRODUCT_ID)

        printer._raw(b'\x1b\x40')  # ESC @
        time.sleep(0.2)

        printer.image(resized_bmp_path, impl='bitImageColumn', center=True)
        time.sleep(0.5)

        return jsonify({"message": "Receipt printed successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def run_flask():
    app.run(host="0.0.0.0", port=5000)
if __name__ == '__main__':
    run_flask()