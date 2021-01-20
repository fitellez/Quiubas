const express = require('express');
const app = express();
var server = require('http').Server(app);
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT;
const whitelist = [
  'http://localhost:8081',
  'http://localhost:8080',
  'http://localhost:8083'
];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};
app.use(cors(corsOptions));

app.use(express.json());
// ***************** C O N T R O L L E R S ***************** //
const smsController = require('./controllers/SMS/sms');


// ********************* R O U T I N G ********************* //
app.get('/', (req, res) => res.send('Quiubas is alive!!!'));

app.post('/sms', (req, res) => smsController.sendSMS(req, res));
app.get('/sms', (req, res) => smsController.getAllSMS(req, res));
app.get('/sms/:id', (req, res) => smsController.getOneSMS(req, res));
app.get('/sms/:id/responses', (req, res) => smsController.getOneResponseSMS(req, res));

server.listen(port, () => {
  console.log(`app is running on port ${port}`);
});