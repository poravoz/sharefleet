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

            localStorage.setItem('image', imageUrl);

            const imageElement = document.createElement("img");
            imageElement.src = imageUrl;
            console.log(data);

            const imageContainer = document.getElementById("imageContainer");
            imageContainer.appendChild(imageElement);
        })
        .catch(error => {
            console.error("Error: ", error);
        });
    } else {
        console.error("No file selected");
    }
});

const imageUrl = localStorage.getItem('image');
if (imageUrl) {
    const imageElement = document.createElement('img');
    imageElement.src = imageUrl;
    document.getElementById('imageContainer').appendChild(imageElement);
}