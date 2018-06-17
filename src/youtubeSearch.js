export default (champName, callback) =>
  fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${champName}+Spotlight&key=AIzaSyBvz0PS9cWkru_vNbE0kNEn1dJ-KYs2Qhg`)
    .then(res => res.json())
    .then(callback);  
