const express = require('express');
const http = require('http');
const multer  = require('multer');
var path = require('path');

const app = express();
const port = 3000;
const server = http.createServer(app);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/tmp/uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})
const upload = multer({ storage: storage })


const TrainingModleHandler = require('../handler/TrainingModleHandler');
const FindFileHandler = require('../handler/FindFileHandler');
const FindFineTuneHandler = require('../handler/FindFineTuneHandler');
const FindLisEventFineTuneHandler = require('../handler/FindListEventFineTunedHandler');
const DeleteFileHandler = require('../handler/DeleteFileHandler');
const CancelFineTuneHandler = require('../handler/CancelFineTuneHandler');
const GetFileContentHandler = require('../handler/GetFileContentHandler')

app.use(express.json());
app.use(express.static(path.join(__dirname, '../view/')));
app.get('/chat', (_req, res) => {
  const indexPath = path.join(__dirname, '../view/index.html');
  res.sendFile(indexPath);
});

// app.post('/question',)

app.post('/training', upload.single("file"), TrainingModleHandler.handler);
app.get('/file', FindFileHandler.handler);
app.get('/fine-tune', FindFineTuneHandler.handler);
app.get('/fine-tune/list-event', FindLisEventFineTuneHandler.handler);
app.delete('/file/:fileId', DeleteFileHandler.handler);
app.delete('/fine-tune/:fineTuneId', CancelFineTuneHandler.handler);
app.get('/file/:fileId', GetFileContentHandler.handler);


server.listen(port, ()=>{
    console.log(`app is running on http://localhost:${port}`);
})

