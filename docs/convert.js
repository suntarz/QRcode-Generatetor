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

function apiQrUrl(messages, boxSize, border) {
  const params = new URLSearchParams({
    box_size: String(boxSize),
    border: String(border),
    messages,
  });
  return `/api/qr?${params.toString()}`;
}

function showImage(url) {
  const canvas = document.getElementById("qr-canvas");
  const image = document.getElementById("qr-image");
  const pngLink = document.getElementById("png-link");
  canvas.hidden = true;
  image.hidden = false;
  image.src = url;
  pngLink.href = url;
}

async function showCanvas(messages, boxSize, border) {
  const canvas = document.getElementById("qr-canvas");
  const image = document.getElementById("qr-image");
  const pngLink = document.getElementById("png-link");
  image.hidden = true;
  canvas.hidden = false;
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

async function main() {
  const { messages, boxSize, border } = readParams();
  const meta = document.getElementById("meta-line");
  const echo = document.getElementById("message-echo");

  meta.textContent = `box_size=${boxSize} · border=${border}`;
  echo.textContent = messages;

  const serverUrl = apiQrUrl(messages, boxSize, border);

  try {
    const res = await fetch(serverUrl, { method: "GET" });
    if (res.ok && (res.headers.get("content-type") || "").includes("image")) {
      showImage(serverUrl);
      return;
    }
  } catch {
    // Fall through to client-side generation (e.g. GitHub Pages).
  }

  await showCanvas(messages, boxSize, border);
}

main().catch((err) => {
  document.getElementById("meta-line").textContent =
    "สร้าง QR ไม่สำเร็จ — ตรวจพารามิเตอร์อีกครั้ง";
  console.error(err);
});
