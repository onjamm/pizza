//Import the express model (Express is a web framework, that makes it easier to create applications)
import express from 'express';

//Create an express application
const app = express();

//Define a port number where server will listen
const PORT = 3000;


// "Middleware" that allows express to read 
// form data and store it in req.body
app.use(express.urlencoded({ extended: true }));

// Create a temp array to store orders
const orders = [];

//Define our main route (default) ('/') (the root directory of our project)
app.get('/', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/home.html`);
});

//Submit order route
app.post('/submit-order', (req, res) => {
    //create a JSON object to store the order data
    const order = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        method: req.body.method,
        toppings: req.body.toppings ? req.body.toppings : "none",
        size: req.body.size,
        comment: req.body.comment,
        timestamp: new Date()
    };

    //add order object to orders array
    orders.push(order);
    
    res.sendFile(`${import.meta.dirname}/views/confirmation.html`)
});

//admin route
app.get('/admin', (req, res) => {
    res.send(orders);
})


//contact route
app.get('/contact-us', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/contact.html`);
})

//confirmation route
app.get('/thank-you', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/confirmation.html`);
})

//Enable static file serving -- tells express where to look for the static files
app.use(express.static('public'));

//Start server and listen on the designated part
app.listen(PORT, () => {
    console.log(`Server is running gloriously at http://localhost:${PORT}`);
});