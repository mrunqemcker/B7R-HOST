import express from "express";
import multer from "multer";
import fs from "fs";
import { exec } from "child_process";

const app = express();
const upload = multer({ dest: "bots/" });
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.post("/upload", upload.single("bot"), (req, res) => {
  const file = req.file;
  if (!file) return res.send("❌ لم يتم رفع أي ملف بوت!");

  const name = file.originalname.replace(".zip", "");
  const botPath = `bots/${name}`;

  exec(`mkdir ${botPath} && unzip ${file.path} -d ${botPath} && pm2 start ${botPath}/index.js --name ${name}`, (err) => {
    if (err) return res.send("⚠️ فشل في تشغيل البوت!");
    res.send(`✅ تم رفع وتشغيل البوت بنجاح (${name})!`);
  });
});

app.listen(PORT, () => console.log(`🚀 B7R HOSTING شغال على المنفذ ${PORT}`));