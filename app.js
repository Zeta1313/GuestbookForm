import express from 'express';
import mysql2 from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
}).promise();


const PORT = 3025;

const inputs = [];

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('resume');
});

app.get('/form', (req, res) => {
    res.render('form');
});

app.post('/confirmation', async (req, res) => {
    try {
    const sql = 'INSERT INTO contacts fname, lname, title, company, LN, EA, meeting, addition, format, timestamps';
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

    const [result] = await pool.execute(sql, forminput);

    res.render('confirmation', {result});
    }
    catch(err) {
        console.error('Database error:', err);
        res.status(500).send('Database error: ' + err.message);
    }
});

app.get('/admin', async (req, res) => {
    try {
        const [orders] = await pool.query('SELECT * FROM contacts');
        res.render('admin', { orders: orders });
    }
    catch(err) {
        console.error('Database error:', err);
        res.status(500).send('Database error: ' + err.message);

    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`) ;
});