

function sentFile() {
  let apiUrl = "http://localhost:3000/ImportExcel";
  let inputFile = document.querySelector(".input-file");
  if (inputFile) {
    // var formData = new FormData();
    // formData.append("data", inputFile);
    // console.log(formData)
    axios
      .post(apiUrl, inputFile, {
        headers: {
          "Content-Type":
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        },
      })
      .then((res, status) => {
        alert("Status: Success");
      })
      .catch((err) => {
        alert("Status: " + err);
      });
  }
}
function genXlsQ4A() {
  let apiUrl = "http://localhost:3000/Query4A";
  $.post(
    apiUrl,
    function (data, status) {
      console.log(data.message);
      alert("Status: " + status);
    }
  ).catch((err) => {
    alert("Status: " + err);
  })
}
function genXlsQ4B() {
  let apiUrl = "http://localhost:3000/Query4B";
  $.post(
    apiUrl,
    function (data, status) {
      console.log(data.message);
      alert("Status: " + status);
    }
  ).catch((err) => {
    alert("Status: " + err);
  })
}

function genXlsQ4C(country) {
  $.post(
    "http://localhost:3000/Query4C",
    {
      country: country,
    },
    function (data, status) {
      console.log(data.message);
      alert("Status: " + status);
    }
  ).catch((err) => {
    alert("Status: " + err);
  })
}

function genXlsQ4D(color, year) {
  $.post(
    "http://localhost:3000/Query4D",
    {
      color_pm25: color,
      year: year,
    },
    function (data, status) {
      console.log(data.message);
      alert("Status: " + status);
    }
  ).catch((err) => {
    alert("Status: " + err);
  })
}