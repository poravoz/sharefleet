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
            deleteButton.setAttribute("data-id", id); 
            deleteButton.addEventListener("click", function() {
                const clickedId = this.getAttribute("data-id"); 
                deleteImage(clickedId); 
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

            if (images.length >= 4) {
                console.log("Max file count reached");
                return;
            }

            const newImage = { url: imageUrl, id: fileId };
            images.push(newImage);
            localStorage.setItem('images', JSON.stringify(images));

            const imageElement = document.createElement("img");
            imageElement.src = imageUrl;

            const deleteButton = document.createElement("button");
            deleteButton.innerText = "Delete File";
            deleteButton.classList.add("deleteButton");
            deleteButton.setAttribute("data-id", fileId); 
            deleteButton.addEventListener("click", function() {
                const clickedId = this.getAttribute("data-id"); 
                deleteImage(clickedId); 
            });

            const imageContainer = document.getElementById("imageContainer");
            imageContainer.appendChild(imageElement);
            imageContainer.appendChild(deleteButton);
        })
        .catch(error => {
            console.error("Error: ", error);
        });
    } else {
        console.error("No file selected");
    }
});

function deleteImage(id) {
    const imagesData = localStorage.getItem('images');
    if (imagesData) {
        const images = JSON.parse(imagesData);
        const updatedImages = images.filter(image => image.id !== id);
        localStorage.setItem('images', JSON.stringify(updatedImages));
    }
    const imageContainer = document.getElementById("imageContainer");
    const imageElement = imageContainer.querySelector(`[data-id="${id}"]`).previousElementSibling;
    const deleteButton = imageContainer.querySelector(`[data-id="${id}"]`);
    if (imageElement) {
        imageElement.remove();
    }
    if (deleteButton) {
        deleteButton.remove();
    }
}


