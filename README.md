# Live Reload v1.0
## Purpose: 
Most editors for web scripting (HTML, CSS, Javascript, etc.) are text based, and do not currently allow for monitoring “live” changes to your pages during development.  This  means each time a developer wants to see the changes they have recently made, they must save (Ctrl+S), then take their hands off the keyboard, and use the mouse to navigate to a browser that may or may not be open, select the browser, then refresh (or hit F5).  Alternately, some IDEs will open additional tabs in the browser with an appropriate hotkey combination, but this still requires the developer to use the mouse (or Alt+Tab) to return to the IDE.  (Plus this stacks up a number of open tabs as they develop.)  All of this breaks the coding “zone” for a developer, causing the brain to have to “remove itself” from the current IDE, and thus during the “move through virtual environments” developers will soon find that this 4-5 second process actually causes significant reduction in productivity.  (More information on this psychological phenomenon available here: http://www.tandfonline.com/doi/abs/10.1080/17470218.2011.571267).
The easiest way to prevent this is to keep the developer’s “mind” within the IDE, but allow them to see their changes in real-time.  This is easily done by using tools such as those at http://www.livereload.com.  However, when the installation requirements prevented me from using the tool behind a firewall, I decided to create a very simple script (at last check, only 693 bytes for the minified version) to emulate the livereload.com tool.  

## Function: 
The “LiveReload” script is very simple.  By adding a short setup script to the beginning of the main page (often index.html ) you can specify which files the script should monitor.  The script will then simply watch those files for any updates/changes to them, and when it detects a change in any of the monitored files, it will refresh the main page.  The functionality is so simple, I’m surprised I wasn’t able to find anything like this online already (perhaps my Google-fu is weak).  But the end result is a far less stressful, and productive development environment.  While I initially designed this for myself to aid in Javascript development, I soon realized it would be useful for those that work solely in HTML and CSS as well, regardless of IDE.  

## Usage: 
Setup is simple.  In the main page (often index.html) add the following script to the <HEAD> tag before anything else.  (This allows it to work even if there are errors elsewhere in the page.)  
    <!-- REMOVE the following when done developing. -->
      <script src = "js/liveReload.js"></script>
      <script>
      LiveReload.setFiles(["index.html",
                           "js/test.js",
                           "css/test.css"]);
      </script>
    <!-- ------------------------------------------ -->
Note that you will want to update the location of the “liveReload” file, and make sure to use the “.min.js” version if that is the one you prefer to use.  
After the script element that loads the script, call the “setFiles()” method, passing an array of the files you wish to monitor in a separate script tag.  
Because this tool will load each file being monitored every second, it is definitely not recommended that this be used in production systems due to the sheer load it will put on the servers.  It is best used in local environment.
