const sharp = require('sharp');

const inputImagePath = './images/2.png';

const outputImagePath = './images/out-2.png';

async function blurImage() {
  try {

    const image = sharp(inputImagePath);
  
    const blurredImage = await image.blur(10) 
  
    await blurredImage.toFile(outputImagePath);
  
    console.log('Изображение успешно размыто и сохранено.');
  } catch (error) {
    console.error('Произошла ошибка при размытии изображения:', error);
  }
}

blurImage();