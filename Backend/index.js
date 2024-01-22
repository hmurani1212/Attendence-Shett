
const express = require('express');
const ConnectToMongo = require("./Db/db");
const cors = require("cors");
const http = require('http');
const app = express();
const dotenv = require('dotenv');
const path = require("path");
const bodyParser = require('body-parser');
const server = http.createServer(app);

dotenv.config({ path: './config.env' }); // Move this line here

ConnectToMongo();


const port = 5000;
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use('/Uploads', express.static(path.join(__dirname, 'Uploads')));

app.get('/', (req, res) => {
    res.send('Hello World!');
});
const userRoute = require('./route/UserRoutr');
app.use('/api/vi', userRoute)
app.use("/ap2/v2", require("./Controoler/Attendence"));
// For Leave
app.use("/ap3/v3", require("./Controoler/Leave"));
// http://localhost:5000/ap8/v8/send-email
app.use("/ap8/v8", require("./Nodemailer/mailer"))


server.listen(port, () => {
    console.log(`Store app listening on port ${port}`);
});
