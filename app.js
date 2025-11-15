import express from 'express';

const app = express();

const PORT = 3025;

const inputs = [];

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/form', (req, res) => {
    res.render('form');
});

app.get('/resume', (req, res) => {
    res.render('resume');
});

app.post('/confirmation', (req, res) => {
    const forminput = {
        fname: req.body.firstName,
        lname: req.body.lastName,
        title: req.body.title,
        company: req.body.company,
        LN: req.body.linkedIn,
        EA: req.body.email,
        meeting: req.body.meeting,
        addition: req.body.Eaddition,
        message: req.body.message,
        format: req.body.format
    }
    forminput.timestamp = new Date();
    inputs.push(forminput);
    res.render('confirmation');
});

app.get('/admin', (req, res) => {
    res.render('admin', {inputs});
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`) ;
});