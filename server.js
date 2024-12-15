const express = require('express');
const axios = require('axios');
const ytdl = require('ytdl-core');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// تنظیمات میانه‌افزار
app.use(cors());
app.use(bodyParser.json());

// صفحه اصلی API
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
});

// API دانلود ویدیو
app.get('/api/downloader', async (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).json({ error: 'No URL provided' });
  }

  try {
    const info = await ytdl.getInfo(url);
    res.json({
      status: 200,
      title: info.videoDetails.title,
      image: info.videoDetails.thumbnails[0].url,
      download_url: ytdl.getDownloadURL(url)
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch video info' });
  }
});

// شروع سرور
app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});