//Listen for form submit
document.getElementById('my-form').addEventListener('submit', saveBookmark);

//Save Bookmark
function saveBookmark(e) {

	//Get form values
	var siteName = document.getElementById('site-name').value;
	var siteUrl = document.getElementById('site-url').value;

	/*
	Call form validation function and 
	stop saveBookmark() function from proceeding 
	if validation returns false
	*/
	if(!validateForm(siteName, siteUrl)) {
		return false;
	}


	var bookmark = { 
		name: siteName,
		url: siteUrl
	}

	/*
	Local Storage Test:

	localStorage.setItem('test', 'Hello World');
	console.log(localStorage.getItem('test'));
	localStorage.removeItem('test');
	console.log(localStorage.getItem('test'));
	*/

	//Test if bookmarks is null
	if(localStorage.getItem('bookmarks') === null) {

		//Init array
		var bookmarks = [];

		//Add to array
		bookmarks.push(bookmark);

		//Set to local storage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	} else {
		//Get bookmarks from local storage
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		//Add bookmark to array
		bookmarks.push(bookmark);
		//REset it back to local storage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}

	//Clear form text areas after submission
	document.getElementById('my-form').reset();

	fetchBookmarks();

	//Prevent form from submitting
	e.preventDefault();
}

//Delete bookmark
	/*
	Note that the "url" parameter is being passed through
	from the variable "url" which is set equal to the
	user inputted url that is subsequently added to the bookmark
	html in the "fetchBookmarks()" function. 
	*/ 

function deleteBookmark(url) {
	//Get bookmarks from localStorage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	//Loop through bookmarks until matches "url" variable being passed through
	for(var i=0;i < bookmarks.length; i++) {
		if(bookmarks[i].url == url) {
			//Remove from array
			bookmarks.splice(i, 1);
		}
	}
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	fetchBookmarks();
}

//Fetch bookmarks
function fetchBookmarks() {
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	//Get output id
	var bookmarksResults = document.getElementById('bookmarks-results');

	//Build output 

	/*This vvv prevents the loop from duplicating 
	previously-entered bookmarks by clearing the inner HTML*/
	bookmarksResults.innerHTML = '';

	/* The loop (now that the HTML has been cleared)
	will now scan the array from start to finish and 
	enter (and re-enter) the HTML for each bookmark */
	for(var i = 0; i < bookmarks.length; i++) {
		var name = bookmarks[i].name;
		var url = bookmarks[i].url;

		/*
		append here with "innerHTML +=" instead of just "innerHTML ="
		to ensure that each portion of the array is converted to the 
		bookrmark format and added to the prior iteration of the loop
		*/
		bookmarksResults.innerHTML+='<div class="well">'+
									'<h3>'+name+
									'	<a class="btn btn-success" role="button" target="_blank" href="'+url+'">Visit</a>' +
									'	<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>' +
									'</h3>'+
									'</div>';

	}
}

/*Validate form to check if user input text in both fields
and stop bookmark creation if not*/
function validateForm(siteName, siteUrl) {
	
	if(!siteName || !siteUrl) {
		alert("Error: Please fill in the form before submitting.")
		return false;
	}

	//Formatting url (copy and paste from stack overflow)
	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);
	if(!siteUrl.match(regex)) {
		alert("Error: Please use a valid URL");
		return false;
	}
	return true;
}
