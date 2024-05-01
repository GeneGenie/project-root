import express from 'express';
import cors from 'cors';
import path from 'path';

const app = new express();

app.use(express.static(path.join(process.cwd(), 'public')));
app.use(express.static(path.join(process.cwd(), 'public/dist')));
app.use(cors());

app.post('/analytics', express.json(), express.text(), (req, res) => {
    if (typeof req.body === 'string') req.body = JSON.parse(req.body);
    // console.log('BE', req.body);

    res.sendStatus(204);
});
console.log('BE', 'listening');
app.listen(80);
