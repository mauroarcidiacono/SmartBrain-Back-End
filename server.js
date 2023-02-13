const express = require('express');
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : 'mauroar',
      database : 'smart-brain'
    }
});

const handleApiKey = (req, res) => {
  return res.json('Key 13c14567895547bebe11ea855c557f2f');
}

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.get('/apikey', (req, res) => { handleApiKey(req, res) })

app.listen(3000, () => {
    console.log('app is running on port 3000')
})
