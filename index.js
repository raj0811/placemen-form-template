const express = require('express');
// const cookieParser = require('cookie-parser');

const port = 8006
const db = require('./config/mongoose')
const flash = require('connect-flash');
var bodyParser = require('body-parser')
var expressLayouts = require('express-ejs-layouts');
const multer = require('multer');
const path = require('path');
const app = express();
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressLayouts);
app.use(express.static('assets'));
const MongoStore = require('connect-mongo');



// Set the destination and filename for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + ext);
    }
  });
  
  // Set up the multer middleware
  const upload = multer({ storage });

  console.log(upload);
app.set('view engine', 'ejs');
app.set('views', './views');




app.use('/', require('./routes'));

app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port} `);

})