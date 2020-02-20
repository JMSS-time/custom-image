// Check for the File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
  document
    .getElementById("files")
    .addEventListener("change", handleFileSelect, false);
} else {
  alert("The File APIs are not fully supported in this browser.");
}

function handleFileSelect(evt) {
  var f = evt.target.files[0]; // FileList object
  var reader = new FileReader();
  // Closure to capture the file information.
  reader.onload = (function(theFile) {
    return function(e) {
      var binaryData = e.target.result;
      //Converting Binary Data to base 64
      var base64String = window.btoa(binaryData);
      //showing file converted to base64
      var outputString = "data:image/png;base64," + base64String;
	  var myHeaders = new Headers();
	  $("#goButton").removeClass("hidden");
	  $("#buttonText").html("Uploading...")
	  myHeaders.append("Authorization", "Client-ID 319e9b4e4cac3f6");
	  
	  var formdata = new FormData();
	  formdata.append("image", base64String);
	  
	  var requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: formdata,
		redirect: 'follow'
	  };
	  
	  fetch("https://api.imgur.com/3/image", requestOptions)
			.then(response => response.json())
			.then(data => {
				$("#goButton").addClass("bg-green-600 hover:bg-green-700");
				console.log(data.data.link)
				//$("#goLink").attr("href",data.data.link)
				$("#buttonText").html("Open clock")

				$("#goLink").attr("href","https://jmss-time.github.io/time-updated?cimg="+data.data.link)

			})
			.catch(error => console.log('error', error));
		};
  })(f);
  // Read in the image file as a data URL.
  reader.readAsBinaryString(f);
}

$("#urlInput").blur(function() {
	var value = $(this).val()
	if(value ==""){
		$("#goButton").removeClass("bg-green-600 hover:bg-green-700");
		$("#buttonText").html("Not enough information!")
		
		$("#goLink").removeAttr("href")
	
	}else{
		$("#goButton").addClass("bg-green-600 hover:bg-green-700");
		$("#buttonText").html("Open clock")
		
		$("#goLink").attr("href","https://jmss-time.github.io/time-updated?cimg="+value)
	
	}
	
	}
)

