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
function getAllCountry() {
	let apiUrl = "http://localhost:3000/QueryAll"
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
