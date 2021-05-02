const express = require("express");

var bodyParser = require('body-parser')


const app = express();
const cors = require('cors')
const port = 3000;
// var app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.text())
app.use(cors({ origin: '*' }));

require('./router/index.js')(app)

app.listen(port, () => console.log(`Starting Server on port ${port}`));

return app






