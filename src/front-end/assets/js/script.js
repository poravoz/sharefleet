window.addEventListener('load', function() {
    const imagesData = localStorage.getItem('images');
    if (imagesData) {
        const images = JSON.parse(imagesData);
        const imageContainer = document.getElementById('imageContainer');

        images.forEach(imageData => {
            const { url, id } = imageData;
            const container = document.createElement("div");

            const imageElement = document.createElement('img');
            imageElement.src = url;

            const deleteButton = document.createElement("button");
            deleteButton.innerText = "Delete File";
            deleteButton.classList.add("deleteButton");
            deleteButton.addEventListener("click", function() {
                if (imageElement.complete && imageElement.naturalWidth > 0) {
                    fetch(`http://localhost:5433/user/deletefile/${id}`, {
                        method: "DELETE"
                    })
                    .then(response => {
                        if (response.ok) {
                            container.remove();
                            console.log("File deleted");
                            const updatedImages = images.filter(image => image.id !== id);
                            localStorage.setItem('images', JSON.stringify(updatedImages));
                        } else {
                            console.error("Failed to delete file");
                        }
                    })
                    .catch(error => {
                        console.error("Error: ", error);
                    });
                } else {
                    console.log("Image not found. Skipping deletion.");
                    container.remove();
                    const updatedImages = images.filter(image => image.id !== id);
                    localStorage.setItem('images', JSON.stringify(updatedImages));
                }
            });

            container.appendChild(imageElement);
            container.appendChild(deleteButton);
            imageContainer.appendChild(container);
        });
    }
});

document.getElementById("uploadButton").addEventListener("click", function() {
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];
    if (file) {
        const formData = new FormData();
        formData.append("file", file);

        fetch("http://localhost:5433/user/uploadfile", {
            method: "POST",
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            const imageUrl = data.url;
            const fileId = data.id;
            const imagesData = localStorage.getItem('images');
            let images = [];
            if (imagesData) {
                images = JSON.parse(imagesData);
            }
            const newImage = { url: imageUrl, id: fileId };
            images.push(newImage);
            localStorage.setItem('images', JSON.stringify(images));

            const imageElement = document.createElement("img");
            imageElement.src = imageUrl;

            const deleteButton = document.createElement("button");
            deleteButton.innerText = "Delete File";
            deleteButton.classList.add("deleteButton");
            deleteButton.addEventListener("click", function() {
                fetch(`http://localhost:5433/user/deletefile/${fileId}`, {
                    method: "DELETE"
                })
                .then(response => {
                    if (response.ok) {
                        imageElement.remove();
                        deleteButton.remove();
                        console.log("File deleted");
                        const updatedImages = images.filter(image => image.id !== fileId);
                        localStorage.setItem('images', JSON.stringify(updatedImages));
                    } else {
                        console.error("Failed to delete file");
                    }
                })
                .catch(error => {
                    console.error("Error: ", error);
                });
            });

            const imageContainer = document.getElementById("imageContainer");
            imageContainer.appendChild(imageElement);
            imageContainer.appendChild(deleteButton);

            const allImageContainers = imageContainer.querySelectorAll('div');
            const updatedImages = [];
            allImageContainers.forEach(container => {
                const imageSrc = container.querySelector('img').src;
                const imageId = container.querySelector('.deleteButton').getAttribute('data-id');
                updatedImages.push({ url: imageSrc, id: imageId });
            });
            localStorage.setItem('images', JSON.stringify(updatedImages));
        })
        .catch(error => {
            console.error("Error: ", error);
        });
    } else {
        console.error("No file selected");
    }
});