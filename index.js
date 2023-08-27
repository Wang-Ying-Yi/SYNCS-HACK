const sharp = require("sharp");
const fs = require("fs");

async function cropImage(inputPath, outputPath) {
  try {
    const metadata = await sharp(inputPath).metadata();
    const width = Math.floor(metadata.width / 2);
    const height = metadata.height;
    const croppedImage = sharp(inputPath).extract({
      left: 0,
      top: 0,
      width: width,
      height: height,
    });
    await croppedImage.toFile(outputPath);
    console.log("Image cropping completed.");
  } catch (err) {
    console.error(err);
  }
}

function removeBackground(inputImagePath, outputImagePath) {
  const backgroundColor = [255, 255, 255, 0]; // RGB color with alpha

  sharp(inputImagePath)
    .ensureAlpha()
    .background(backgroundColor)
    .flatten()
    .toFile(outputImagePath)
    .then(() => {
      console.log("Image processing completed.");
    })
    .catch((err) => {
      console.error(err);
    });
}

function checkFileExtension(fileName, allowedExtensions) {
  const fileExtension = fileName.split(".").pop().toLowerCase();
  if (allowedExtensions.includes(fileExtension)) {
    const inputPath = fileName;
    const outputPath = "./output_" + fileName;
    cropImage(inputPath, outputPath)
      .then(() => {
        removeBackground(
          outputPath,
          outputPath.replace("./  output_", "./output_bg_removed_")
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

const allowedExtensions = ["jpg", "jpeg", "png"];

// Example input array
var inputArray = ["image_1.jpg", "image_2.jpg"];

for (const image of inputArray) {
  checkFileExtension(image, allowedExtensions);
}

//! check if the image is cropped before sending by checking if the total numeber of
//!pixels is halfed
