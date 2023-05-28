var XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');
const multer = require('multer')
const User=require('../models/uesrdb')
 // Set the destination folder for uploaded files


module.exports.home = (req, res) => {
    // console.log(data);
    return res.render('home', {
        title: 'Movies',

    })
}


const upload = multer({
  dest: 'uploads/',
  fileFilter: (req, file, cb) => {
    if (!file.originalname.endsWith('.xlsx')) {
      cb(new Error('Only .xlsx files are allowed'));
    } else {
      cb(null, file);
    }
  }
});


module.exports.create=function(req,res){
  User.create({
      email: 'john@example1.com5',
      number: '7000000005',
      name: 'reo',
  }).then(user=>{
    return res.redirect('back')
  })
}


module.exports.bulkUpload = async (req, res) => {
  try {
    const filePath = req.file.path;

    // Read the Excel file
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(sheet);

    // Create an array of user documents
    const users = jsonData.map((data) => ({
      email: data.email,
      number: data.number,
      name: data.name
    }));

    // Insert multiple users into the database with an increased timeout value
    await User.insertMany(users, { timeout: 30000 }); // Increase timeout to 30 seconds

    console.log('Data uploaded successfully');
    res.status(200).send('Data uploaded successfully');
  } catch (error) {
    console.error('Error uploading data:', error);
    res.status(500).send('An error occurred during data upload');
  } 
};

module.exports.bulkUpload2 = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({ error: 'No file found' });
    }
    const filePath = req.file.path;

    // Read the Excel file
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(sheet);

    // Get field names from the first row of the sheet
    const fieldNames = Object.keys(jsonData[0]);

    console.log(fieldNames);

    // Create an array of user documents
    const users = jsonData.map((data) => {
      const user = {};
      fieldNames.forEach((fieldName) => {
        if (data[fieldName] !== undefined) {
          user[fieldName] = data[fieldName];
        }
      });
      return user;
    });

    // Insert multiple users into the database with an increased timeout value
    await User.insertMany(users, { timeout: 30000 }); // Increase timeout to 30 seconds

    // Delete the file
    fs.unlinkSync(filePath);

    console.log('Data uploaded successfully');
    res.status(200).send('Data uploaded successfully');
  } catch (error) {
    console.error('Error uploading data:', error);
    res.status(500).send('An error occurred during data upload');
  }
};


module.exports.send=async(req,res)=>{
  const { name, email, number, role, degree, clg, passout, skills, exp } = req.body;
  const pdfFile = req.file.path;

  // Create a new FormData object
  const formData = new User({
    name: name,
    email: email,
    number: number,
    role: role,
    degree: degree,
    clg: clg,
    passout: passout,
    skills: skills,
    exp: exp,
    pdfFile: pdfFile
  });

  // Save the form data to MongoDB
  formData.save((err) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      console.log('Form data saved to MongoDB');
      res.sendStatus(200);
    }
  });
}
