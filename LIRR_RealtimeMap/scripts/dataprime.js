var stationArray = [];
var routeArray = [];
var tripsArray = [];
var stopTimesArray = [];
var calendarArray = [];
var shapesArray = [];
var trackArray = [];

function textToArray(text) {
    rows = text.split("\n");
    return rows.map(function (row) {
      return row.split(",");
    });
}

window.onload = function loadBranch() {
    for (i = 1; i < 16; i++) {
      var branchTXT = null;
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open('GET', 'data/branches/'+i+'.txt', false);
      xmlhttp.send();
      if (xmlhttp.status==200) {
        branchTXT = xmlhttp.responseText;
      }
        
      branchTXT = branchTXT.replace(/["]+/g, '');
      branchArray = textToArray(branchTXT);
  
      drawBranch(i);
  
      continue;
    }
    loadStations();
}

function loadStations() {
    var stationTXT = null;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', 'data/stops.txt', false);
    xmlhttp.send();
    if (xmlhttp.status==200) {
      stationTXT = xmlhttp.responseText;
    }

    stationTXT = stationTXT.replace(/["]+/g, '');
    stationArray = textToArray(stationTXT);

    drawStations();
    loadRoutes();
}

function loadRoutes() {
    var routeTXT = null;
    var routexmlhttp = new XMLHttpRequest();
    routexmlhttp.open("GET", "data/routes.txt", false);
    routexmlhttp.send();
    if (routexmlhttp.status==200) {
        routeTXT = routexmlhttp.responseText;
    }
        
    routeTXT = routeTXT.replace(/["]+/g, '');
    routeArray = textToArray(routeTXT);

    refreshData();
    loadTrips();
}

function loadTrips() {
    var tripsTXT = null;
    var tripsxmlhttp = new XMLHttpRequest();
    tripsxmlhttp.open("GET", "data/trips.txt", false);
    tripsxmlhttp.send();
    if (tripsxmlhttp.status==200) {
        tripsTXT = tripsxmlhttp.responseText;
    }
        
    tripsTXT = tripsTXT.replace(/["]+/g, '');
    tripsArray = textToArray(tripsTXT);

    loadStopTimes();
}

function loadStopTimes() {
    var stopTimesTXT = null;
    var stopTimesxmlhttp = new XMLHttpRequest();
    stopTimesxmlhttp.open("GET", "data/stop_times.txt", false);
    stopTimesxmlhttp.send();
    if (stopTimesxmlhttp.status==200) {
        stopTimesTXT = stopTimesxmlhttp.responseText;
    }
        
    stopTimesTXT = stopTimesTXT.replace(/["]+/g, '');
    stopTimesArray = textToArray(stopTimesTXT);

    loadCalendar();
}

function loadCalendar() {
    var calendarTXT = null;
    var calendarxmlhttp = new XMLHttpRequest();
    calendarxmlhttp.open("GET", "data/calendar_dates.txt", false);
    calendarxmlhttp.send();
    if (calendarxmlhttp.status==200) {
        calendarTXT = calendarxmlhttp.responseText;
    }
        
    calendarTXT = calendarTXT.replace(/["]+/g, '');
    calendarArray = textToArray(calendarTXT);

    loadShapes();
}

function loadShapes() {
    var shapesTXT = null;
    var shapesxmlhttp = new XMLHttpRequest();
    shapesxmlhttp.open("GET", "data/shapes.txt", false);
    shapesxmlhttp.send();
    if (shapesxmlhttp.status==200) {
        shapesTXT = shapesxmlhttp.responseText;
    }
        
    shapesTXT = shapesTXT.replace(/["]+/g, '');
    shapesArray = textToArray(shapesTXT);

    loadTrack();
}

function loadTrack() {
    var trackTXT = null;
    var trackxmlhttp = new XMLHttpRequest();
    trackxmlhttp.open("GET", "data/track.txt", false);
    trackxmlhttp.send();
    if (trackxmlhttp.status==200) {
        trackTXT = trackxmlhttp.responseText;
    }
        
    trackTXT = trackTXT.replace(/["]+/g, '');
    trackArray = textToArray(trackTXT);
}