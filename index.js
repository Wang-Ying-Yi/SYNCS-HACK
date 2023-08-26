const sharp = require("sharp");

function cropImage(file) {
  const outputImagePath = "./output.jpg";
  console.log(file);

  sharp(file)
    .metadata()
    .then((metadata) => {
      const width = Math.floor(metadata.width / 2);
      const height = metadata.height;

      // Crop the left half of the image
      return sharp(file)
        .extract({ left: 0, top: 0, width: width, height: height })
        .toFile(outputImagePath);
    })
    .then(() => {
      console.log("Image processing completed.");
    })
    .catch((err) => {
      console.error(err);
    });
}
sharp(file)
  .metadata()
  .then((metadata) => {
    const width = Math.floor(metadata.width / 2);
    const height = metadata.height;

    return sharp(file).resize(width, height).toFile(outputImagePath);
  })
  .then(() => {
    console.log("Image processing completed.");
  })
  .catch((err) => {
    console.error(err);
  });

function checkFileExtension(fileName, allowedExtensions) {
  const fileExtension = fileName.split(".").pop().toLowerCase();
  if (allowedExtensions.includes(fileExtension)) {
    cropImage(fileName);
  }
}

const allowedExtensions = ["jpg", "jpeg", "png", "gif"];

// Example input array
var inputArray = [["image_1.jpg", "image_2.jpg"]];

for (const set of inputArray) {
  for (const image of set) {
    console.log("Processing image:", image);
    checkFileExtension(image, allowedExtensions);
  }
}

//! check if the image is cropped before sending by checking if the total numeber of
//!pixels is halfed
