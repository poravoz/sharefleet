const video = document.getElementById('video');

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
  faceapi.nets.faceExpressionNet.loadFromUri('./models')
]).then(startVideo);

function startVideo() {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      video.srcObject = stream;
      video.play().then(() => {
        const canvas = faceapi.createCanvasFromMedia(video);
        document.body.append(canvas);
        const displaySize = { width: video.width, height: video.height };
        setInterval(async () => {
          const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
          const resizedDetections = faceapi.resizeResults(detections, displaySize);
          canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
          faceapi.draw.drawDetections(canvas, resizedDetections);
          faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
          if (resizedDetections && resizedDetections.length > 0) {
            const faceCoordinates = extractFaceCoordinates(resizedDetections[0]);
            sendDataToBackend(faceCoordinates);
          }
        }, 100);
      });
    })
    .catch(err => console.error(err));
}

function extractFaceCoordinates(detection) {
  const { x, y, width, height } = detection.detection.box;
  return { x, y, width, height };
}

function sendDataToBackend(data) {
  fetch('http://localhost:5433/api/face-coordinates', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (response.ok) {
       console.log('Face coordinates sent to the backend successfully');
      } else {
        console.error('Failed to send face coordinates to the backend');
      }
    })
    .catch(error => {
      console.error('Error sending face coordinates to the backend:', error);
    });
}