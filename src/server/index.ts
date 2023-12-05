const express = require('express')
const app = express()
const port = 3000;
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/calorieTrackingApp');

const Cat = mongoose.model('User', { name: String, password: Number });

const kitty = new Cat({ name: 'Zildjnaa', password: 123 });
kitty.save().then(() => console.log('meow'));

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})