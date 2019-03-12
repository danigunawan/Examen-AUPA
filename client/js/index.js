function uploadImage(event) {
  event.preventDefault();
  event.stopPropagation();
  let form = document.getElementById("#formUpload");
  let data = new FormData(form);
  let imagedata = document.querySelector("input[type=file]").files[0];
  data.append("file", imagedata);

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
      let list = (document.getElementById("emotion").innerHTML = `
      <li class="col s3">${emotions[0].emotion}: ${emotions[0].value}</li>
      <li class="col s3">${emotions[1].emotion}: ${emotions[1].value}</li>
      <li class="col s3">${emotions[2].emotion}: ${emotions[2].value}</li>`);

      console.table(emotions);
    });

  return false;
}

function sort(emotions) {
  let arr = [];
  for (const emotion in emotions) {
    arr.push({ emotion: emotion, value: emotions[emotion] });
  }
  console.log(arr);
  return arr.sort((a, b) => b.value - a.value);
}

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
      $(".image-upload-wrap").hide();

      $(".file-upload-image").attr("src", e.target.result);
      $(".file-upload-content").show();

      $(".image-title").html(input.files[0].name);
    };

    reader.readAsDataURL(input.files[0]);
  }
}
