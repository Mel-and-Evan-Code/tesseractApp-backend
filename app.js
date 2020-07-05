const express = require('express');
const bodyParser =  require('body-parser');
const cors =  require('cors');
const fileUpload = require('express-fileupload');

const app = express();

app.set('trust proxy', true)
const corsOptions = {
  origin:'http://localhost:4200',
  credentials: true
};

app.use(cors(corsOptions));

// default options
app.use(fileUpload());

const port = process.env.PORT || 5000;

app.post('/upload', function(req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;
  console.log(req.files,sampleFile)

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv('./images/'+ sampleFile.name, function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });
});

app.listen(port, ()=>{
  console.log('server started on port ' + port)
})
