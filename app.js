//Import the express model (Express is a web framework, that makes it easier to create applications)
import express from 'express';
import dotenv from 'dotenv';
import mysql2 from 'mysql2';
import {validateForm} from './validation.js';


// Load environment variables from .env
dotenv.config();
// console.log(process.env.DB_HOST);
//connection pool, like a bucket of connections

//Create an express application
const app = express();

//Define a port number where server will listen
const PORT = 3000;

//Enable static file serving -- tells express where to look for the static files
app.use(express.static('public'));


// "Middleware" that allows express to read 
// form data and store it in req.body
app.use(express.urlencoded({ extended: true }));

//Set EJS as the view engine
app.set('view engine', 'ejs');

// Create a temp array to store orders
const orders = [];

// Create a pool (bucket) of database connections
const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
}).promise();

//Database test Root
app.get('/db-test', async(req, res) => {
    try {
        const pizza_orders = await pool.query('SELECT * FROM orders');
        res.send(pizza_orders[0]);
    } catch (err){
        console.error(err);
    }
});
//Define our main route (default) ('/') (the root directory of our project)
app.get('/', (req, res) => {
    res.render('home');
});

//Submit order route
app.post('/submit-order', async(req, res) => {
    const order = req.body;

    const valid = validateForm(order);
    
    if (!valid.isValid) {
        console.log(valid);
        res.render('home', { errors: valid.errors});
        return;
    }

    //create a JSON object to store the order data
    const params = [
        order.fname,
        order.lname,
        order.email,
        order.method,
        order.size,
        Array.isArray(order.toppings) ? order.toppings.join(", ") : "none"
    ];

    //insert a new order into the database
    const sql = `INSERT INTO orders (fname, lname, email, method, size, toppings) VALUES (?, ?, ?, ?, ?, ?)`;

    const result = await pool.execute(sql, params);

    //add order object to orders array
    orders.push(params);
    
    res.render('confirmation', { order });
});

//admin route
app.get('/admin', async(req, res) => {

    // Read all orders from the database 
    //newest first
    const orders = await pool.query('SELECT * FROM orders ORDER BY timestamp DESC');
    console.log(orders);

    res.render('admin', { orders: orders[0] });
});


//contact route
app.get('/contact-us', (req, res) => {
    res.render('contact');
});

//confirmation route
app.get('/thank-you', (req, res) => {
    res.render('confirmation');
});



//Start server and listen on the designated part
app.listen(PORT, () => {
    console.log(`Server is running gloriously at http://localhost:${PORT}`);
});