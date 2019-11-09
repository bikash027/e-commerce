const express=require('express');
const bodyParser=require('body-parser');
const Sequelize=require('sequelize');
const session=require('express-session');
const db=require('./config/database');
const mugs=require('./routes/mugs');
const users=require('./routes/users');

const app=express();
const port =5000;


//database
db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'shhhh, very secret'
}));


app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine','ejs');
app.use(express.static('public'));
app.use('/accounts',users);
app.use('/mugs',mugs);
app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));