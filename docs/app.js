function buildConvertUrl(messages, boxSize, border) {
  const params = new URLSearchParams({
    box_size: String(boxSize),
    border: String(border),
    messages,
  });
  return `./convert_message_for_me_pls/?${params.toString()}`;
}

async function drawQr(canvas, text, boxSize, border) {
  await QRCode.toCanvas(canvas, text, {
    errorCorrectionLevel: "M",
    scale: boxSize,
    margin: border,
    color: {
      dark: "#102018",
      light: "#ffffff",
    },
  });
}

const form = document.getElementById("qr-form");
const canvas = document.getElementById("qr-canvas");
const openLink = document.getElementById("open-link");
const shareUrl = document.getElementById("share-url");
const copyBtn = document.getElementById("copy-link");

async function syncPreview() {
  const messages = document.getElementById("messages").value.trim() || " ";
  const boxSize = Number(document.getElementById("box_size").value) || 8;
  const border = Number(document.getElementById("border").value) || 2;
  const relative = buildConvertUrl(messages, boxSize, border);
  const absolute = new URL(relative, window.location.href).href;

  openLink.href = relative;
  shareUrl.textContent = absolute;
  await drawQr(canvas, messages, Math.min(Math.max(boxSize, 1), 40), border);
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  await syncPreview();
});

["messages", "box_size", "border"].forEach((id) => {
  document.getElementById(id).addEventListener("input", () => {
    syncPreview().catch(console.error);
  });
});

copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(shareUrl.textContent);
    copyBtn.textContent = "คัดลอกแล้ว";
    setTimeout(() => {
      copyBtn.textContent = "คัดลอกลิงก์";
    }, 1400);
  } catch {
    copyBtn.textContent = "คัดลอกไม่สำเร็จ";
  }
});

syncPreview().catch(console.error);
