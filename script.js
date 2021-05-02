let apiUrl = "http://localhost:3000/sentData"


function sentFile() {
	let inputFile = document.querySelector('.input-file')
	let text = document.querySelector('.text-result')
	if (inputFile) {
		var formData = new FormData();
		formData.append("data", inputFile);
		console.log(formData)
		axios.post(apiUrl, formData, {
			headers: {
				'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
			}
		})
		.then((res) => {
			text.innerHTML = res.data;
		})
		.catch((err) => {
			text.innerHTML = err
		})
	}
}