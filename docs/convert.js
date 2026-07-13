function readParams() {
  const params = new URLSearchParams(window.location.search);
  const messages = params.get("messages") || "Hello from Signal QR";
  const boxSize = Math.min(
    Math.max(parseInt(params.get("box_size") || "8", 10) || 8, 1),
    40
  );
  const border = Math.min(
    Math.max(parseInt(params.get("border") || "2", 10) || 2, 0),
    10
  );
  return { messages, boxSize, border };
}

async function main() {
  const { messages, boxSize, border } = readParams();
  const canvas = document.getElementById("qr-canvas");
  const meta = document.getElementById("meta-line");
  const echo = document.getElementById("message-echo");
  const pngLink = document.getElementById("png-link");

  meta.textContent = `box_size=${boxSize} · border=${border}`;
  echo.textContent = messages;

  await QRCode.toCanvas(canvas, messages, {
    errorCorrectionLevel: "M",
    scale: boxSize,
    margin: border,
    color: {
      dark: "#102018",
      light: "#ffffff",
    },
  });

  pngLink.href = canvas.toDataURL("image/png");
}

main().catch((err) => {
  document.getElementById("meta-line").textContent =
    "สร้าง QR ไม่สำเร็จ — ตรวจพารามิเตอร์อีกครั้ง";
  console.error(err);
});
