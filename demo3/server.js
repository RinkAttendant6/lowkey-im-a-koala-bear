import express from 'express';

const app = express();

const host = '::1';
const port = 3000;

// Request parser
app.use(express.urlencoded({extended: true}));

// Handle ajax request
app.post('/api/tickets', (req, res) => {
    res.json({
        offender: req.body.offender,
        date: req.body.date,
        violation: req.body.violation
    });
});

// Serve static files
app.use(express.static('.'));

app.listen(port, host);
console.log('Server listening on [%s]:%d', host, port);