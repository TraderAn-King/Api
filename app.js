const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Serve HTML file
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// API Route for ChatGPT
app.get("/ai/chatgpt", (req, res) => {
    const userQuery = req.query.query;

    if (!userQuery) {
        return res.status(400).json({
            status: false,
            creator: "nothing",
            message: "Please provide a query.",
        });
    }

    // Simulate a response from ChatGPT
    const chatgptReply = `ChatGPT reply to: "${userQuery}"`;

    res.status(200).json({
        status: true,
        creator: "nothing",
        message: chatgptReply,
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});