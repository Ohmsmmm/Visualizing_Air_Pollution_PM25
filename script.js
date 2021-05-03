function sentFile() {
	let apiUrl = "http://localhost:3000/ImportExcel"
	let inputFile = document.querySelector('.input-file')
	let text = document.querySelector('.text-result')
	if (inputFile) {
		// var formData = new FormData();
		// formData.append("data", inputFile);
		// console.log(formData)
		axios.post(apiUrl, inputFile, {
			headers: {
				'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
			}
		})
			.then((res) => {
				text.innerHTML = "OK";
			})
			.catch((err) => {
				text.innerHTML = err
			})
	}
}
function genXlsQ4A() {
	let apiUrl = "http://localhost:3000/Query4A"
	axios.post(apiUrl)
		.then((res) => {

		})
		.catch((err) => {
		})
}
function genXlsQ4B() {
	let apiUrl = "http://localhost:3000/Query4B"
	axios.post(apiUrl)
		.then((res) => {

		})
		.catch((err) => {
		})
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

	$.post("http://localhost:3000/Query4C",
	{
		country: country,
	},
	function(data, status){
		console.log(data.message)
	  alert("Status: " + status);

	});
  };

function genXlsQ4D(color) {

	$.post("http://localhost:3000/Query4C",
	{
		color: color,
	},
	function(data, status){
		console.log(data.message)
	  alert("Status: " + status);

	});
  };


function getQuery_5a(year) {

	require(["esri/config", "esri/Map", "esri/views/MapView", "esri/Graphic", "esri/layers/GraphicsLayer"],
		function (esriConfig, Map, MapView, Graphic, GraphicsLayer) {
			esriConfig.apiKey = "AAPK1de36c09dbce4a3dad01f5f065411f9buq4hL9FOFwRdkfLlC2qc72GtfpO_54FZL4ftOkExDfGtNhFbtJNmY9zcBmu5O__I";
			const map = new Map({
				basemap: "arcgis-topographic" // Basemap layer service
			});
			const view = new MapView({
				map: map,
				center: [0, 0], // Longitude, latitude
				zoom: 3, // Zoom level
				container: "viewDiv" // Div element
			});
			const graphicsLayer = new GraphicsLayer();
			map.add(graphicsLayer);

			function getQuery5a(year) {
				let apiUrl = "http://localhost:3000/Query5A"
				axios.post(apiUrl, year)
					.then((res) => {
						console.log(res.data.message.recordsets)
						var data = res.data.message.recordsets
						data.forEach((res) => {
							//console.log(res.longitude+' '+res.latitude)
							addPoint(res['longitude'], res['latitude'])
						})
					})
					.catch((err) => {
						text.innerHTML = err
					})
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
			getQuery5a(year);
		});
}