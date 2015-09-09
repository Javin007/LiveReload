/*-------------------------------------------------------------------------------------
Title: Live Reload
Version: 1.0
Author: Javin
Address: javin@javin-inc.com

Add this simple script to a page to begin monitoring those pages that may change.  When
any page listed in the link changes, the page will automatically refresh.  For obvious 
reasons, this puts a significant load on both the client, and server side since each page 
must be "checked" (loaded) each second.  For this reason, only use this script for 
development purposes, and be sure to remove it from a live site.  This should help 
developers work on their pages significantly, as it also works if they aren't putting 
their pages on the server, but are just using them from the file system.  By keeping a 
site open in a second window, you can be working on the code, and just save your work to 
see the changes take place without having to manually refresh the target page.
-------------------------------------------------------------------------------------
Usage: 
First embed the script in the "head" of a page that will be loaded once (eg: index.html):
		<script src = "<location>/liveReload.js"></script>

Then create a small inline script that calls the "LiveReload.setFiles()" method.  
(Note the case.)
		<script>
			LiveReload.setFiles(["index.html",
			                     "js/test.js",
			                     "css/test.css"]);
		</script>
		
Calling the "setFiles" method will also initialize the script to monitor those files.
-------------------------------------------------------------------------------------
    Copyright (C) 2015 Javin-Inc.com
	See associated license.txt file for more info.
-------------------------------------------------------------------------------------*/


var LiveReload = LiveReload || (function(){
	
	var strCheckFiles = [];
	var strPages = [];
	
	return {
		
		//First call should be to set up the settings.
		setFiles: function(args) {
			strCheckFiles = args;
		
			//Just an integer for counting.  I'm not a fan of "i".
			var intCount = 0;
			
			//Function for the original loading of the pages/scripts to be monitored.
			var loadPage = function(index) {
		
				//Create AJAX request object.
				var xmlhttp=new XMLHttpRequest();
		
				//Request the monitored page.
				xmlhttp.open("GET",strCheckFiles[index],true);
				
				//Fire off the send request.
				try {
					xmlhttp.send();
				} catch(err) {
					console.log(err.message);
					console.log("(" + index + ")" + strCheckFiles[index]);
				}
		
				//Watch for state changes to know when the item has loaded.
				xmlhttp.onreadystatechange=function() {
					if (xmlhttp.readyState == 4) {
						if (xmlhttp.status == 200  || xmlhttp.status == 0) {
							strPages[index] = xmlhttp.responseText;
						}
					}
				};
			};
			
			//Function for checking those pages/scripts against the ones initially loaded.
			var checkPage = function(index) {
		
				//Create AJAX request object.
				var xmlhttp=new XMLHttpRequest();
		
				//Request the monitored page.
				xmlhttp.open("GET",strCheckFiles[index],true);
				
				//Override the mime type since we're just using it for comparison and not trying to parse it.
				xmlhttp.overrideMimeType("text/plain; charset=x-user-defined");
				xmlhttp.responseType = "string";
				
				//Fire off the send request.
				try {
					xmlhttp.send();
				} catch(err) {
					console.log(err.message);
					console.log("(" + index + ")" + strCheckFiles[index]);
				}
		
				//Watch for state changes to know when the item has loaded.
				xmlhttp.onreadystatechange=function() {
					if (xmlhttp.readyState == 4) {
						if (xmlhttp.status == 200  || xmlhttp.status == 0) {
							var strNewPage = xmlhttp.responseText;
							if (strPages[index] != strNewPage) {
								location.reload(false);			
							};
						};
					};
				};
			};
		
			
			//First do the initial load of each page (should just be pulling cache if nothing has changed)
			//to grab an array of pages at the start.  
			for (intCount = 0; intCount < strCheckFiles.length; intCount++) {
				loadPage(intCount);
			}
			
			//Then, on a regular interval (each second), check to see if the page has changed since load.
			setInterval(function(){
				for (var intCount = 0; intCount < strCheckFiles.length; intCount++) {
					checkPage(intCount);
				};
			}, 1000);
	
		}
	
	};
	
})();
