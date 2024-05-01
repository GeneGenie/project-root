import express from 'express';
import cors from 'cors';
import path from 'path';

const whiteListedIps = ['84.123.85.38'];
const app = new express();

app.use(express.static(path.join(process.cwd(), 'public')));

// middleware to allow *.js.map files to be served only for ip 127.0.0.1
app.use((req, res, next) => {
    const ip = req.socket.remoteAddress.split(':').pop();
    console.log(ip);
    if (req.path.endsWith('.js.map')) {
        if (!whiteListedIps.includes(ip)) {
            res.status(404).send('Not Found');
        }
    }
    next();
});
app.use(express.static(path.join(process.cwd(), 'public/dist')));
app.use(cors());

app.post('/analytics', express.json(), express.text(), (req, res) => {
    if (typeof req.body === 'string') req.body = JSON.parse(req.body);
    // console.log('BE', req.body);

    res.sendStatus(204);
});
console.log('BE', 'listening');
app.listen(80);
