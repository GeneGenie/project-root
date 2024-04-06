import express from 'express';

const app = new express();


app.post('/analytics', (req, res) => {
    console.log('BE', req.body);

    res.sendStatus(204)
})
app.listen(3001)
