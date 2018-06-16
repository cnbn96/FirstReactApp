export default (id, callback) =>
  fetch(`http://localhost:3000/${id}.json`)
    .then(res => res.json())
    .then(callback);  
