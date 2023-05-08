// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');

// // const app = express();
// app.use(cors());
// app.use(express.static('./public'));
// // app.get('/', (req, res) => {
// //     res.send('<h1>Sabbir</h1>')
// // })

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// app.use('/api/history', required('./api/route'));

// // const PORT = process.env.PORT || 4444;
// app.listen(PORT, () => {
//     mongoose.connect("mongodb+srv://Sabbirfeni:5n1KP4iTPZEA7R4L@cluster0.m6kt8gd.mongodb.net/?retryWrites=true&w=majority",
//     {useNewUrlParser: true }, () => {
//         console.log('Database connected')
//     })
//     console.log(`App is running on PORT ${PORT}`);
// })









const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()
app.use(cors())

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api/history', require('./api/route.js'))

const PORT = process.env.PORT || 4444
app.listen(PORT, () => {
    console.log('APP is Running on PORT ' + PORT)
    mongoose.connect(`mongodb://Sabbirfeni:5n1KP4iTPZEA7R4L@ds159216.mlab.com:59216/weather-api`, { useNewUrlParser: true }, () => {
        console.log('Database Connected')
    })
})
// https://ap-south-1.aws.data.mongodb-api.com/app/data-uviyc/endpoint/data/v1