function refreshData() {

    rawDate = new Date();
    var MLseconds = rawDate.getTime();
    startDate = new Date(MLseconds - 3600000);
    startTime = new Date(MLseconds - 3600000);
    displayDate = new Date(MLseconds - 300000);
    displayTime = new Date(MLseconds - 300000);
    endDate = new Date (MLseconds + 86400000);
    endTime = new Date (MLseconds + 86400000);

    startDate = startDate.getFullYear()+''+("0"+(startDate.getMonth()+1)).slice(-2)+''+("0"+startDate.getDate()).slice(-2);
    startTime = startTime.toLocaleTimeString('en-US', {hour12: false});
    displayDate = displayDate.getFullYear()+''+("0"+(displayDate.getMonth()+1)).slice(-2)+''+("0"+displayDate.getDate()).slice(-2);
    displayTime = displayTime.toLocaleTimeString('en-US', {hour12: false});
    endDate = endDate.getFullYear()+''+("0"+(endDate.getMonth()+1)).slice(-2)+''+("0"+endDate.getDate()).slice(-2);
    endTime = endTime.toLocaleTimeString('en-US', {hour12: false});

    /*console.log('Live Data Refreshing...');*/

    var script = document.createElement('script');
    script.src = 'scripts/bundle.js';
    var head = document.getElementsByTagName("head")[0];
    head.appendChild(script);

    console.log(globalFeed);
    console.log(alertFeed);

    drawBlips();

    if (document.getElementById('trainDetails').style.display == 'block') {
        displayTrainDetails(lastTrainClicked,lastTrainClicked.values_.tripId);
    }

    /*filterCalendar();        
    filterStops();
    addDataToTable(westboundTrips,'wbData', wbTableLength);
    addDataToTable(eastboundTrips,'ebData', ebTableLength);

    if (stopList.classList.contains('hidden')) {
    }
    else {
      stoppingAt(document.getElementById(dataRowSelection));
    }*/
  }

setInterval(refreshData,5000);
