const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./index.js');
const query = require('./Query.js');
const api = require('./imagesearch.js');
const keys = require('./keys.js');
const GoogleImages = require('google-images');


const app = express();
const client = new GoogleImages(keys.googleCSEID, keys.googleAPIID);

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(keys.mongoURI);

app.use(express.static(__dirname + '/public'));


routes(app);
api(app, query, client);


app.listen(process.env.PORT || 3000, () => {
  console.log('Application is running on PORT ' + 3000);
});
