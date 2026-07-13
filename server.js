const express = require("express");
const path = require("path");
const QRCode = require("qrcode");

const app = express();
const PORT = process.env.PORT || 3000;
const PUBLIC = path.join(__dirname, "docs");

function parseQrOptions(query) {
  const message =
    typeof query.messages === "string" && query.messages.length > 0
      ? query.messages
      : "Hello from QR Generator";

  const boxSize = Math.min(
    Math.max(parseInt(query.box_size, 10) || 8, 1),
    40
  );
  const border = Math.min(Math.max(parseInt(query.border, 10) || 2, 0), 10);

  return { message, boxSize, border };
}

async function renderQrPng(message, boxSize, border) {
  return QRCode.toBuffer(message, {
    type: "png",
    errorCorrectionLevel: "M",
    scale: boxSize,
    margin: border,
    color: {
      dark: "#0b1220",
      light: "#ffffff",
    },
  });
}

app.get("/api/qr", async (req, res, next) => {
  try {
    const { message, boxSize, border } = parseQrOptions(req.query);
    const png = await renderQrPng(message, boxSize, border);
    res.set("Content-Type", "image/png");
    res.set("Cache-Control", "no-store");
    res.send(png);
  } catch (err) {
    next(err);
  }
});

app.get("/convert_message_for_me_pls", async (req, res, next) => {
  const wantsImage =
    req.query.format === "png" ||
    (req.headers.accept || "").includes("image/png");

  if (!wantsImage) {
    return res.sendFile(
      path.join(PUBLIC, "convert_message_for_me_pls", "index.html")
    );
  }

  try {
    const { message, boxSize, border } = parseQrOptions(req.query);
    const png = await renderQrPng(message, boxSize, border);
    res.set("Content-Type", "image/png");
    res.set("Cache-Control", "no-store");
    res.send(png);
  } catch (err) {
    next(err);
  }
});

app.use(express.static(PUBLIC));

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Failed to generate QR code" });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`QR Generator running at http://localhost:${PORT}`);
  console.log(
    `Try: http://localhost:${PORT}/convert_message_for_me_pls?box_size=8&border=2&messages=hello`
  );
});
