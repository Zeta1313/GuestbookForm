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
        const sql = `INSERT INTO contacts (fname, lname, title, company, LN, EA, meeting, addition, message, format, timestamps)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const forminput = {
            fname: req.body.firstName,
            lname: req.body.lastName,
            title: req.body.title || null,
            company: req.body.company || null,
            LN: req.body.linkedIn || null,
            EA: req.body.email || null,
            meeting: req.body.meeting,
            addition: req.body.other || null,
            message: req.body.message || null,
            format: req.body.format || null,
            timestamps: new Date()
        };
        const params = [
            forminput.fname,
            forminput.lname,
            forminput.title,
            forminput.company,
            forminput.LN,
            forminput.EA,
            forminput.meeting,
            forminput.addition,
            forminput.message,
            forminput.format,
            forminput.timestamps
        ];

        const [result] = await pool.execute(sql, params);

    res.render('confirmation', {forminput});
    }
    catch(err) {
        console.error('Database error:', err);
        res.status(500).send('Database error: ' + err.message);
    }
});

app.get('/admin', async (req, res) => {
    try {
        const [inputs] = await pool.query('SELECT * FROM contacts');
        res.render('admin', { inputs: inputs });
    }
    catch(err) {
        console.error('Database error:', err);
        res.status(500).send('Database error: ' + err.message);

    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`) ;
});