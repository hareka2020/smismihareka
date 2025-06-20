const express = require('express');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

let config = JSON.parse(fs.readFileSync('config.json'));

app.post('/chat', (req, res) => {
  const { message } = req.body;
  const replies = config.responses[config.dialect];
  const reply = replies[Math.floor(Math.random() * replies.length)];
  res.json({ reply });
});

const storage = multer.diskStorage({
  destination: 'public',
  filename: (req, file, cb) => cb(null, 'logo.png')
});
const upload = multer({ storage });

app.post('/admin/upload-logo', upload.single('logo'), (req, res) => {
  res.send('تم رفع اللوغو بنجاح!');
});

app.post('/admin/update-config', (req, res) => {
  const { dialect, responses } = req.body;
  config.dialect = dialect;
  config.responses = responses;
  fs.writeFileSync('config.json', JSON.stringify(config, null, 2));
  res.send('تم تحديث الإعدادات');
});

app.listen(PORT, () => console.log(`سمسمي حريقة شغّال على http://localhost:${PORT}`));
