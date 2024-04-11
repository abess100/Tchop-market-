const path = require('path')
const multer = require('multer')

// Configuration de multer pour les uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/data/uploads/');
  },
 
  filename : (req, file, cb) => {
    let ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});
 
const upload = multer({ 
  storage: storage ,
  // fileFilter: (req, file, cb) => {
  //   if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
  //     cb(null, true);
  //   } else {
  //     cb(null, false);
  //     return console.log(new Error('Only .png, .jpg and .jpeg format allowed!'));
  //   }
  // },
  // limits: { fileSize: 1024 * 1024 * 5 }
});


module.exports = upload



    