function BorovlevaButtonClick() {
    document.getElementById('yt-container').innerHTML = "";
    var url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCdterRJ--HghReKo2plaGIw&maxResults=5&key=AIzaSyAJOMuGFtAPyCB8jCuYCxNNSjvJdi3pBPI';
  
    fetch(url)
    .then(function(result) {
      return result.json();
    })
    .then(function(data) {
      console.log(data)
      let videos = data.items
      nextPageToken = data.nextPageToken
      let videoCont = document.querySelector(".yt-cont")
      videos.forEach(function(video) {
        videoCont.innerHTML += `
                <a href = "https://www.youtube.com/watch?v=${video.id.videoId}">${video.snippet.title}</a>
                <br>
                <img class  ="videoImages" src = "${video.snippet.thumbnails.high.url}">
                <br>
              `
      });
    })
    .catch(function(error) {
      console.log('Ошибка при выполнении запроса', error);
        });
      };
  function BurlachenkoButtonClick() {
    document.getElementById('yt-container').innerHTML = "";
    var url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCiLr3Ld--4JlLUNBoboBrkg&maxResults=5&key=AIzaSyAJOMuGFtAPyCB8jCuYCxNNSjvJdi3pBPI';
  
    fetch(url)
    .then(function(result) {
      return result.json();
    })
    .then(function(data) {
      console.log(data)
      let videos = data.items
      nextPageToken = data.nextPageToken
      let videoCont = document.querySelector(".yt-cont")
      videos.forEach(function(video) {
        videoCont.innerHTML += `
                <a href = "https://www.youtube.com/watch?v=${video.id.videoId}">${video.snippet.title}</a>
                <br>
                <img class  ="videoImages" src = "${video.snippet.thumbnails.high.url}">
                <br>
              `
      });
    })
    .catch(function(error) {
      console.log('Ошибка при выполнении запроса', error);
        });
  };