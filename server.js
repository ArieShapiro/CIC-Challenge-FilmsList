var express = require('express');
var app = express();



app.use(express.static(__dirname + '/views'));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`)
});