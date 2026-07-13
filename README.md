# Signal QR — QR Code Generator

Node/Express QR generator ที่อ่านพารามิเตอร์จาก URL รองรับ GitHub Pages และ [Render](https://render.com)

## รันบนเครื่อง

```bash
npm install
npm start
```

เปิด [http://localhost:3000](http://localhost:3000)

## Deploy บน Render

1. เปิด [Deploy to Render](https://render.com/deploy?repo=https://github.com/suntarz/QRcode-Generatetor)
2. หรือสร้าง **Web Service** แล้วชี้ repo นี้ — `build`: `npm install`, `start`: `npm start`
3. หลัง deploy ใช้ URL แบบ  
   `https://<service>.onrender.com/convert_message_for_me_pls?box_size=40&border=2&messages=change_this_message`

## URL พารามิเตอร์

```
/convert_message_for_me_pls?box_size=40&border=2&messages=change_this_message
```

| พารามิเตอร์ | ความหมาย |
|---|---|
| `messages` | ข้อความใน QR |
| `box_size` | ขนาดช่อง QR (1–40) |
| `border` | ความหนาขอบ (0–10) |

### PNG จาก Express

```
/convert_message_for_me_pls?format=png&box_size=8&border=2&messages=hello
/api/qr?box_size=8&border=2&messages=hello
```
