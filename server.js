const express = require("express");
const ytdl = require("ytdl-core");

const app = express();

// Serve static files (HTML/CSS)
app.use(express.static("public"));

// YouTube Download API
app.get("/api/download", async (req, res) => {
  const { url, format } = req.query;

  if (!url || !ytdl.validateURL(url)) {
    return res.status(400).send({ error: "Invalid YouTube URL" });
  }

  try {
    const title = (await ytdl.getBasicInfo(url)).videoDetails.title;
    const cleanTitle = title.replace(/[^a-zA-Z0-9 ]/g, "");

    res.header("Content-Disposition", `attachment; filename="${cleanTitle}.${format}"`);

    if (format === "mp3") {
      ytdl(url, { filter: "audioonly" }).pipe(res);
    } else {
      ytdl(url, { format: "mp4" }).pipe(res);
    }
  } catch (err) {
    res.status(500).send({ error: "Failed to download video" });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));