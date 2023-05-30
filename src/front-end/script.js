const imageUpload = document.getElementById('fileInput');
const uploadButton = document.getElementById('uploadButton');
const imageContainer = document.getElementById('imageContainer');
let images = [];

Promise.all([
    faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
    faceapi.nets.ssdMobilenetv1.loadFromUri('./models')
]).then(() => {
    uploadButton.addEventListener('click', async () => {
        const file = imageUpload.files[0];

        if (file) {
            const formData = new FormData();
            formData.append("file", file);

            try {
                const response = await fetch("http://localhost:5433/user/uploadfile", {
                    method: "POST",
                    body: formData,
                });

                const data = await response.json();
                const imageUrl = data.url;
                const fileId = data.id;

                if (images.length >= 4) {
                    console.log("Max file count reached");
                    return;
                }

                const imageElement = document.createElement("img");
                imageElement.src = imageUrl;

                const deleteButton = document.createElement("button");
                deleteButton.innerText = "Delete File";
                deleteButton.classList.add("deleteButton");
                deleteButton.setAttribute("data-id", fileId);
                deleteButton.addEventListener("click", function () {
                    const clickedId = this.getAttribute("data-id");
                    deleteImage(clickedId);
                });

                const container = document.createElement("div");
                container.appendChild(imageElement);
                container.appendChild(deleteButton);
                imageContainer.appendChild(container);

                const image = await faceapi.bufferToImage(file);
                const canvas = faceapi.createCanvasFromMedia(image);
                const displaySize = { width: image.width, height: image.height };
                faceapi.matchDimensions(canvas, displaySize);
                const detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors();
                const resizedDetections = faceapi.resizeResults(detections, displaySize);
                resizedDetections.forEach(detection => {
                    const box = detection.detection.box;
                    const drawBox = new faceapi.draw.DrawBox(box, { label: 'Darkness man' });
                    drawBox.draw(canvas);
                });
                canvas.classList.add('face-api-canvas');
                container.appendChild(canvas);

                const maskDataURL = canvas.toDataURL(); 
                const maskImage = document.createElement('img');
                maskImage.src = maskDataURL;
                

                const newImage = {
                    url: imageUrl,
                    id: fileId,
                    mask: maskDataURL
                };

                images.push(newImage);
            } catch (error) {
                console.error("Error: ", error);
            }
        } else {
            console.error("No file selected");
        }
    });
});

function loadImagesFromStorage() {
    const imagesData = localStorage.getItem('images');
    if (imagesData) {
        images = JSON.parse(imagesData);

        images.forEach(imageData => {
            const { url, id, mask } = imageData;

            const imageElement = document.createElement('img');
            imageElement.src = url;

            const deleteButton = document.createElement("button");
            deleteButton.innerText = "Delete File";
            deleteButton.classList.add("deleteButton");
            deleteButton.setAttribute("data-id", id);
            deleteButton.addEventListener("click", function () {
                const clickedId = this.getAttribute("data-id");
                deleteImage(clickedId);
            });

            const container = document.createElement("div");
            container.appendChild(imageElement);
            container.appendChild(deleteButton);
            imageContainer.appendChild(container);

            const maskImage = document.createElement('img');
            maskImage.classList.add('maskOverlay');
            maskImage.src = mask;
            container.appendChild(maskImage);
        });
    }
}

window.addEventListener('beforeunload', function () {
    localStorage.setItem('images', JSON.stringify(images));
});

loadImagesFromStorage();

function deleteImage(id) {
    images = images.filter(image => image.id !== id);

    const imageContainer = document.getElementById("imageContainer");
    const imageElement = imageContainer.querySelector(`[data-id="${id}"]`).previousElementSibling;
    const deleteButton = imageContainer.querySelector(`[data-id="${id}"]`);
    const maskImage = imageContainer.querySelector(`[data-id="${id}"]`).nextElementSibling;

    if (imageElement) {
        imageElement.remove();
    }
    if (deleteButton) {
        deleteButton.remove();
    }
    if (maskImage) {
        maskImage.remove();
    }
}
