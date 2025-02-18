const express = require('express');
const cors = require('cors');
const path = require('path');
const { MemoryDatabase } = require('./src/utils/memoryDb');

const app = express();
const db = new MemoryDatabase();

// CORS configuration
app.use(cors({
    origin: ['http://localhost:3000', 'https://t.me', 'https://*.ton.org', 'https://*.ton.app'],
    credentials: true
}));

app.use(express.json());

// Updated CSP with necessary domains for TON wallet and Telegram
app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', 
        "default-src 'self' https://t.me https://*.ton.org https://*.ton.app; " +
        "style-src 'self' 'unsafe-inline'; " +
        "script-src 'self' https://telegram.org https://*.ton.org https://*.ton.app 'unsafe-inline' 'unsafe-eval'; " +
        "img-src 'self' data: https: http:; " +
        "connect-src 'self' http://localhost:* https://t.me https://*.ton.org https://*.ton.app https://*.githubusercontent.com ws://localhost:* wss://*.bridge.tonapi.io/bridge/events; " +
        "frame-src 'self' https://t.me https://*.ton.org https://*.ton.app"
    );
    next();
});

app.post('/api/referral/create', (req, res) => {
    const { userId } = req.body;
    const referralCode = `REF${Math.random().toString(36).substr(2, 9)}`;
    db.store('referrals', { code: referralCode, userId, count: 0 });
    res.json({ referralCode });
});

app.post('/api/referral/use', (req, res) => {
    const { referralCode } = req.body;
    const referrals = db.find('referrals', { code: referralCode });
    if (referrals.length > 0) {
        const referral = referrals[0];
        referral.count++;
        res.json({ success: true });
    } else {
        res.status(404).json({ error: 'Invalid referral code' });
    }
});

app.post('/api/raffle/enter', (req, res) => {
    const { userId, raffleId } = req.body;
    db.store('raffleEntries', { userId, raffleId, timestamp: Date.now() });
    res.json({ success: true });
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Always return the main index.html file for any route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});