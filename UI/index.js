// async function cropImage(imageElement, outputPath) {
//   const imageElement = document.getElementById("imageElement");
//   const cropButton = document.getElementById("cropButton");
//   const croppedImageElement = document.getElementById("croppedImage");

//   cropButton.addEventListener("click", () => {
//     const canvas = document.createElement("canvas");
//     const ctx = canvas.getContext("2d");

//     const width = Math.floor(imageElement.width / 2);
//     const height = imageElement.height;

//     canvas.width = width;
//     canvas.height = height;

//     ctx.drawImage(imageElement, 0, 0, width, height);

//     const croppedImageDataURL = canvas.toDataURL("image/png");
//     croppedImageElement.src = croppedImageDataURL;
//   });
// }

// example Images array
var images = ["88.jpg", "1.jpg", "7607320.jpg"];
var parent_dir = "./static/test";

// Create an array to hold the full paths
var fullpathsArray = [];
for (let i = 0; i < images.length; i++) {
  var fullPath = parent_dir + "/" + images[i];
  fullpathsArray.push(fullPath);
}

// Get the container element to append images
var lower_garments = document.getElementById("layer-2");
var upper_garments = document.getElementById("layer-1");
var inner_garments = document.getElementById("layer-0");

//! pants shirt jacket
// Create and append image elements
var imageElementArray = [];
for (let i = 0; i < fullpathsArray.length; i++) {
  var imageElement = document.createElement("img");
  imageElement.setAttribute("src", fullpathsArray[i]);
  imageElementArray.push(imageElement);
}
lower_garments.appendChild(imageElementArray[0]);
upper_garments.appendChild(imageElementArray[2]);
inner_garments.appendChild(imageElementArray[1]);

//crop layer 1
var upper_garments_img = upper_garments.childNodes;
var lower_garments_img = lower_garments.childNodes;
var inner_garments_img = inner_garments.childNodes;

upper_garments.setAttribute("style", "position:absolute; margin-top: -347px");
lower_garments.setAttribute("style", "position:absolute; margin-top:-100px");
// var croopped_upper_garments = "./static/cropped_upper_garment.png";
// cropImage(upper_garments_img, croopped_upper_garments);

var croopped_upper_garments = "./static/cropped_upper_garment.png";
//  cropImage(imageElementArray[2].src, croopped_upper_garments);

//access the cropped image

console.log(upper_garments_img);
