const express = require('express')
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose')
const app = express()
//database connect
const db = require('./config/keys').mongoURI;

 mongoose.connect(db, {useNewUrlParser:true, useUnifiedTopology: true})
     .then(() => console.log('connected successfully'))
     .catch(err => console.log('database not connected',err));

//ejs
app.use(expressLayouts);
app.set('view engine', 'ejs');

//body parser
app.use(express.urlencoded({extended:false}));

//routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server startes on port ${PORT}`));