# Signal QR — QR Code Generator

Node/Express QR generator ที่อ่านพารามิเตอร์จาก URL และ deploy บน GitHub Pages ได้

## รันบนเครื่อง

```bash
npm install
npm start
```

เปิด [http://localhost:3000](http://localhost:3000)

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
