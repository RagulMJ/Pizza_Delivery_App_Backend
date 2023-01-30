const express = require('express');
require('dotenv').config();

const Pizza = require('./models/pizzaModel');

const app = express();
const db = require('./db.js');
app.use(express.json());
const path = require('path');
const cors = require('cors');

app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

app.get('/', (req, res) => {
  res.send('Web server started running');
});

const pizzasRoute = require('./routes/pizzasRoute');
const userRoute = require('./routes/userRoute');
const ordersRoute = require('./routes/ordersRoute');
const seedRoute = require('./routes/seedRoute');

app.use('/api/seed', seedRoute);
app.use('/api/pizzas/', pizzasRoute);
app.use('/api/users/', userRoute);
app.use('/api/orders/', ordersRoute);

// if (process.env.NODE_ENV === 'production') {
//   app.use('/', express.static('client/build'));

//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client/build/index.html'));
//   });
// }

const port = process.env.PORT || 8000;

app.listen(port, () =>
  console.log(`Server running on port http://localhost:${port} 🔥`)
);
