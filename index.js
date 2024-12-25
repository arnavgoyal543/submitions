const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = 9090;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname)); // Serve static files (like CSS)

// Replace with your correct key and Discord webhook URL
const CORRECT_KEY = "GTA5WINNER123";
const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1321436962137178162/aQcPU6bH6HkonPuHFlp3GXyKxxY2YZ3C3ki8Oe-QKU80rV_bBdPT7bzOagsFBbYN1fgS";

// Route to display the key submission form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/submission.html');
});

// Route to handle key submission
app.post('/submit-key', (req, res) => {
    const submittedKey = req.body.key;

    if (submittedKey === CORRECT_KEY) {
        // If the key is correct, show the form
        res.sendFile(__dirname + '/form.html');
    } else {
        res.sendFile(__dirname + '/failure.html');
    }
});

// Route to handle form submission
app.post('/submit-form', async (req, res) => {
    const { name, insta, mail, age, reason } = req.body;

    // Prepare the message for Discord
    const discordMessage = {
        content: `🎉 **New GTA Giveaway Submission!**\n
        **Name**: ${name}\n
        **Instagram ID**: ${insta}\n
        **Email**: ${mail}\n
        **Age**: ${age}\n
        **Reason**: ${reason}`,
    };

    // Send data to Discord webhook
    try {
        await axios.post(DISCORD_WEBHOOK_URL, discordMessage);
        res.sendFile(__dirname + '/success.html'); // Show success message
    } catch (error) {
        console.error('Discord webhook error:', error);
        res.send('Error sending data to Discord. Please try again later.');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
