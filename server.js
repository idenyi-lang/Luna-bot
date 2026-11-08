import express from 'express';
const app = express();
app.use(express.json());

const VERIFY_TOKEN = "lunabot2026"; // Must match your Meta token precisely

app.get('/webhook', (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            console.log('✅ Webhook verified by Meta successfully!');
            return res.status(200).send(challenge);
        }
        return res.sendStatus(403);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Verification listener running on port ${PORT}`));
