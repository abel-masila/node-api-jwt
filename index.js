const express = require('express');
const bodyParser = require('body-parser');
const expressJwt = require('express-jwt');

const app = express();
const PORT = process.env.API_PORT || 8888;
//add body parser middleware
app.use(bodyParser.json());

//setup express express jwt middleware
const jwtCheck = expressJwt({
  secret: 'secret'
});
//users database
const users = [
  { id: 1, username: 'Admin', password: 'admin' },
  { id: 2, username: 'abel', password: 'abel' },
  { id: 3, username: 'masila', password: 'masila' }
];

//public resource
app.get('/resource', (req, res) => {
  res.status(200).send('Public resource, you can see this!');
});
//Protected route
app.get('/resource/secret', jwtCheck, (req, res) => {
  res
    .status(200)
    .send('Protected resource, you should be logged in to see this!');
});
app.get('*', (req, res) => {
  res.sendStatus(404);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
