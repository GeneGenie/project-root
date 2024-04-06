import express from 'express';
import cors from 'cors';

const app = new express();

app.use(cors());
app.post('/analytics', express.json(), express.text(), (req, res) => {
    if (typeof req.body === "string") req.body = JSON.parse(req.body);
    console.log('BE', req.body);

    res.sendStatus(204)
})
console.log('BE', 'listening');
app.listen(3001)
