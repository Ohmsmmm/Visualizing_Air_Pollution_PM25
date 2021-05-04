

function sentFile() {
  let apiUrl = "http://localhost:3000/ImportExcel";
  let inputFile = document.querySelector(".input-file");
  let text = document.querySelector(".text-result");
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
      .then((res) => {
        text.innerHTML = "OK";
      })
      .catch((err) => {
        text.innerHTML = err;
      });
  }
}
function genXlsQ4A() {
  let apiUrl = "http://localhost:3000/Query4A";
  axios
    .post(apiUrl)
    .then((res) => {})
    .catch((err) => {});
}
function genXlsQ4B() {
  let apiUrl = "http://localhost:3000/Query4B";
  axios
    .post(apiUrl)
    .then((res) => {})
    .catch((err) => {});
}

// function genXlsQ4C(data) {
// 	console.log("-----------------" + data)
// 	let apiUrl = "http://localhost:3000/Query4C"

// 	axios.post(apiUrl,data)
// 		.then((res) => {
// 		})
// 		.catch((err) => {
// 		})
// }

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
  );
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
  );
}

function getQ5A(year) {
	$.post(
	  "http://localhost:3000/Query5A",
	  {
		year: year,
	  },
	  function (data, status) {
      console.log(data.message.length)
      for(var i = 0;i<= data.message.length;i++)
		console.log(data.message[i].longitude);
		// point5A(data.message)
		alert("Status: " + status + "data ");
	  }
	);
  }



  function getQuery_5a(year){
    require(["esri/config", "esri/Map", "esri/views/MapView", "esri/Graphic", "esri/layers/GraphicsLayer"
    ], function (esriConfig, Map, MapView, Graphic, GraphicsLayer) {
        esriConfig.apiKey = "wrb0Zf26IJRKKP2yABh0TzhdjxHAoFT1c0I6LZU5LMN5_b47nXHaxOnyXb1a2aKx6jyCz-9M1iDjl_dS4CsU2Zk4P6UfZrKTnYnDK9lMDnyPcujfQP_tn1qpFS9FtLO_KXhHgf04m-fnAzERLAfdlg..";
        const map = new Map({
            basemap: "arcgis-topographic" 
        });

        const view = new MapView({
            map: map,
            center: [0, 0],
            zoom: 3, 
            container: "viewDiv" 
        });
        const graphicsLayer = new GraphicsLayer();
        map.add(graphicsLayer);

        //addPoint(-118.80500, 34.02700);

        function createCORSRequest(method, url) {
            var xhr = new XMLHttpRequest();
            if ("withCredentials" in xhr) {
                xhr.open(method, url, true);
            }
            else if (typeof XDomainRequest != "undefined") {
                xhr = new XDomainRequest();
                xhr.open(method, url);
            }
            else {
                xhr = null;
            }
            return xhr;
        }
        // function getQuery5a(year) {
        //     var url = 'http://localhost:5000/query5a/' + year
        //     var xhr = createCORSRequest('GET', url);
        //     if (!xhr) {
        //         return;
        //     }
        //     xhr.onload = function () {
        //         data = JSON.parse(this.response)
        //         if (xhr.status >= 200 && xhr.status < 400) {
        //             data.forEach((res) => {
        //                 //console.log(res.longitude+' '+res.latitude)
        //                 addPoint(res['longitude'], res['latitude'])
        //             })
        //         } else {
        //             const errorMessage = document.createElement('marquee')
        //             errorMessage.textContent = `Gah, it's not working!`

        //         }
        //         list = data;
        //     };
        //     xhr.onerror = function () {
        //     };
        //     xhr.send();
        // }

        function getQ5A(year) {
          $.post(
            "http://localhost:3000/Query5A",
            {
            year: year,
            },
            function (data, status) {
              console.log(data.message.length)
              for(var i = 0;i<= data.message.length;i++)
            console.log(data.message[i].longitude);
            // point5A(data.message)
            alert("Status: " + status + "data ");
            }
          );
          }
        

        function addPoint(long, lat) {

            //for loop 
            const point = { //Create a point
                type: "point",
                longitude: long,
                latitude: lat
            };
            const simpleMarkerSymbol = {
                type: "simple-marker",
                color: [226, 119, 40],  // Orange
                outline: {
                    color: [255, 255, 255], // White
                    width: 1
                }
            };
            const pointGraphic = new Graphic({
                geometry: point,
                symbol: simpleMarkerSymbol
            });
            graphicsLayer.add(pointGraphic);
            // end loop
        }
        getQ5A(year);
    });
}



// function point5A (input) {
// 	console.log(input)
// 	require([
// 	  "esri/config",
// 	  "esri/Map",
// 	  "esri/views/MapView",
  
// 	  "esri/Graphic",
// 	  "esri/layers/GraphicsLayer"
  
// 	  ], function(esriConfig,Map, MapView, Graphic, GraphicsLayer) {
  
// 	esriConfig.apiKey = "yxBCYxOMk3rMXGGU07ZWXz2IXeSPiuZIaPQvoX6LFDyPuyODZmvbE2Pl6v5s2nqJpiD58FmuxcFlgXkYsuJmN_Q85GZt29CPofcfufxXMiO6L1iPlaQinbUGLxJwcF8yClQF26_F4qvA1qep0rZV1w..";
  
// 	const map = new Map({
// 	  basemap: "arcgis-topographic" //Basemap layer service
// 	});
  
// 	const view = new MapView({
// 	  map: map,
// 	  center: [-118.80500,34.02700], //Longitude, latitude
// 	  zoom: 13,
// 	  container: "viewDiv"
//    });
  
//    const graphicsLayer = new GraphicsLayer();
//    map.add(graphicsLayer);
  
  
  
//    for(var i = 0 ;i < 10 ; i++){
  
//    const point = { //Create a point
// 	  type: "point",
// 	  longitude: -118.80657463861+i,
// 	  latitude: 34.0005930608889+i
//    };
//    const simpleMarkerSymbol = {
// 	  type: "simple-marker",
// 	  color: [226, 119, 40],  // Orange
// 	  outline: {
// 		  color: [255, 255, 255], // White
// 		  width: 1
// 	  }
//    };
//    const popupTemplate = {
// 	  title: "{Name}",
// 	  content: "{Description}"
//    }
//    const attributes = {
// 	  Name: "Graphic",
// 	  Description: "I am a polygon"
//    }
  
//    const pointGraphic = new Graphic({
// 	  geometry: point,
// 	  symbol: simpleMarkerSymbol,
// 	  attributes: attributes,
// 	  popupTemplate: popupTemplate
//    });
//    graphicsLayer.add(pointGraphic);
//   }
  
//    });
//   }
