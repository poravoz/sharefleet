const sharp = require('sharp');

const inputImagePath = './images/2.png';

const outputImagePath = './images/out-2.png';

async function blurImage() {
  try {

    const image = sharp(inputImagePath);
  
    const blurredImage = await image.blur(10) 
  
    await blurredImage.toFile(outputImagePath);
  
    console.log('The image is successfully blurred and saved.');
  } catch (error) {
    console.error('An error occurred while blurring the image:', error);
  }
}

blurImage();