import express from 'express';

const app = express();

const PORT = 3025;

const inputs = [];

app.use(express.urlencoded({ extended: true }));


app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/home.html`);
});

app.post('/confirmation', (req, res) => {
    const forminput = {
  fname: req.body["first-name"],
  lname: req.body["last-name"],
  title: req.body["job-title"],
  company: req.body.company,
  LN: req.body.linkedin,
  EA: req.body.email,
  meeting: req.body.meeting,
  addition: req.body.other,
  message: req.body.message,
  format: req.body.format
    };
    inputs.push(forminput);
    res.sendFile(`${import.meta.dirname}/views/confirmation.html`);
});

app.get('/admin', (req, res) => {
    res.send(inputs);
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`) ;
});