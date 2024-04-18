const multer = require("multer");
const sharp = require("sharp");

const AppError = require("../util/appError");
const catchAsync = require("../util/catchAsync");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadPhoto = upload.single("photo");

exports.resizePhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  let ownerType;
  let ownerId;

  if (req.user) {
    ownerType = "users";
    ownerId = req.user.id;
  } else if (req.community) {
    ownerType = "communities";
    ownerId = req.community.id;
  }

  req.file.filename = `${ownerType}-${ownerId}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`../client/public/img/${ownerType}/${req.file.filename}`);

  next();
});
