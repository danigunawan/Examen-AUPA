function uploadImage(event) {
  event.preventDefault();
  event.stopPropagation();
  let form = document.getElementById("#formUpload");
  let data = new FormData(form);
  let imagedata = document.querySelector("input[type=file]").files[0];
  let list = document.getElementById("#emotion");
  data.append("file", imagedata);

  ///////////////
  axios
    .post("http://localhost:3000/api/upload", data, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then(function(response) {
      // por alguna razón lo retorna como string
      data = JSON.parse(response.data)[0];

      // obtener emociones
      emotions = data.faceAttributes.emotion;

      // ordernar obtener las 3 emociones más valoradas
      emotions = sort(emotions);
      console.table(emotions);
      alert(emotions);
    });

  return false;
}
///////////////

function sort(emotions) {
  let arr = [];
  for (const emotion in emotions) {
    arr.push({ emotion: emotion, value: emotions[emotion] });
  }
  console.log(arr);
  return arr.sort((a, b) => b.value - a.value);
}
