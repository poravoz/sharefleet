window.addEventListener('load', function() {
    const imageData = localStorage.getItem('image');
    if (imageData) {
        const { url, id } = JSON.parse(imageData);

        if (url) {
            const container = document.createElement("div");

            const imageElement = document.createElement('img');
            imageElement.src = url;

            const deleteButton = document.createElement("button");
            deleteButton.innerText = "Delete File";
            deleteButton.classList.add("deleteButton");
            deleteButton.addEventListener("click", function() {
                fetch(`http://localhost:5433/user/deletefile/${id}`, {
                    method: "DELETE"
                })
                .then(response => {
                    if (response.ok) {
                        container.remove();
                        console.log("File deleted");
                    } else {
                        console.error("Failed to delete file");
                    }
                })
                .catch(error => {
                    console.error("Error: ", error);
                });
            });

            container.appendChild(imageElement);
            container.appendChild(deleteButton);

            document.getElementById('imageContainer').appendChild(container);
        }
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

            localStorage.setItem('image', JSON.stringify({ url: imageUrl, id: fileId }));

            const imageElement = document.createElement("img");
            imageElement.src = imageUrl;
            console.log(data);

            const imageContainer = document.getElementById("imageContainer");
            imageContainer.appendChild(imageElement);

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
                    } else {
                        console.error("Failed to delete file");
                    }
                })
                .catch(error => {
                    console.error("Error: ", error);
                });
            });

            imageContainer.appendChild(deleteButton);
        })
        .catch(error => {
            console.error("Error: ", error);
        });
    } else {
        console.error("No file selected");
    }
});