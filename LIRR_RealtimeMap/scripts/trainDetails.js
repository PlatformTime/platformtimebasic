function displayTrainDetails(clicked, tripId) {

    var trainDetailsBox = document.getElementById('trainDetails');
    trainDetailsBox.style.display = 'block';

    var clickedTrip = [];
    var clickedTrain = [];

    trainDetailsBox.innerHTML = '';

    var currentStatus = "";
    var currentStation = "";
    
    for (i = 0; i < globalFeedLen; i++) {
        if (globalFeed.entity[i].id.slice(0,1) == "V") {
            if (globalFeed.entity[i].vehicle.trip.tripId == tripId) {
                clickedTrain =  globalFeed.entity[i];
                currentStation = globalFeed.entity[i].vehicle.stopId;
                currentStatus = globalFeed.entity[i].vehicle.currentStatus;
            }
        }
        else {
            if (globalFeed.entity[i].tripUpdate.trip.tripId == tripId) {
                clickedTrip = globalFeed.entity[i];
            }
        }
    }

    drawShape(clickedTrip);

    trainDetailsBox.innerHTML += "<br>"+clicked.values_.tripName;

    var direction = clickedTrain.vehicle.trip.directionId;

    if (direction == '1') {
        var carriageOccupancies = "";
        for (j = 0; j < clickedTrain.vehicle.multiCarriageDetails.length; j++) {
            var occupancyStatus = "";
            var carriageSequence = "";
            occupancyStatus = clickedTrain.vehicle.multiCarriageDetails[j].occupancyStatus
            carriageSequence = clickedTrain.vehicle.multiCarriageDetails[j].carriageSequence;
            carriageOccupancies += "<td style='width: 40px;'><div class='carriage'><a data-occupancy='"+occupancyStatus+"' data-sequence='"+carriageSequence+"' data-direction='"+direction+"'></a></div></td>";
        }
        var carriageNumbers = "";
        for (j = 0; j < clickedTrain.vehicle.multiCarriageDetails.length; j++) {
            carriageNumbers += "<td class='carriageNumbers'><div>"+clickedTrain.vehicle.multiCarriageDetails[j].label+"</div></td>";
        }
        trainDetailsBox.innerHTML += "<br><table style='margin: auto;'><tbody><tr><td style='width: 40px; padding-top: 5px;'><img src='images/arrowleft.png' height='20'></td>"+carriageOccupancies+"<td style='width: 40px'></td></tr><tr><td class='carriageNumbers'></td>"+carriageNumbers+"<td></td></tr></tbody></table>";
    }
    else {
        var carriageOccupancies = "";
        for (j = clickedTrain.vehicle.multiCarriageDetails.length - 1; j >= 0; j--) {
            var occupancyStatus = "";
            var carriageSequence = "";
            occupancyStatus = clickedTrain.vehicle.multiCarriageDetails[j].occupancyStatus
            carriageSequence = clickedTrain.vehicle.multiCarriageDetails[j].carriageSequence;
            carriageOccupancies += "<td style='width: 40px;'><div class='carriage'><a data-occupancy='"+occupancyStatus+"' data-sequence='"+carriageSequence+"' data-direction='"+direction+"'></a></div></td>";
        }
        var carriageNumbers = "";
        for (j = clickedTrain.vehicle.multiCarriageDetails.length - 1; j >= 0; j--) {
            carriageNumbers += "<td class='carriageNumbers'><div>"+clickedTrain.vehicle.multiCarriageDetails[j].label+"</div></td>";
        }
        trainDetailsBox.innerHTML += "<br><table style='margin: auto;'><tbody><tr><td></td>"+carriageOccupancies+"<td style='width: 40px; padding-top: 5px;'><img src='images/arrowright.png' height='20'></td></tr><tr><td style='width: 40px'></td>"+carriageNumbers+"<td class='carriageNumbers'></td></tr></tbody></table>";
    }

    for (m = 0; m < stationArray.length; m++){
        if (currentStation == stationArray[m]['0']){
            currentStation = stationArray[m]['2'];
        }
    }

    switch(currentStatus){
        case 0:
            currentStatus = 'Due at '
        break;
        case 1:
            currentStatus = 'Arrived at '
        break;
        case 2:
            currentStatus = 'Enroute to '
        break;
    }

    if (currentStation == undefined) {
        currentStatus = 'Not in Service';
        currentStation = '';
    }

    trainDetailsBox.innerHTML += "<br>"+currentStatus+' '+currentStation;
}

function drawShape(clickedTrip) {

    var tripId = clickedTrip.tripUpdate.trip.tripId;
    var shapeId = "";
    var shapePoints = [];
    var routeId = clickedTrip.tripUpdate.trip.routeId;
    var routeColor = "";
    var routeName = "";
    var tripNum = "";

    for (n = 0; n < tripsArray.length; n++) {
        if (tripsArray[n][2] == tripId) {
            shapeId = tripsArray[n][6];
        }
    }

    for (p = 0; p < shapesArray.length; p++) {
        if (shapesArray[p][0] == shapeId) {
            shapePoints.push(ol.proj.fromLonLat([shapesArray[p][2],shapesArray[p][1]]));
        }
    }

    for (s = 0; s < routeArray.length; s++) {
        if (routeArray[s][0] == routeId) {
            routeColor = '#'+routeArray[s][3];
            routeName = routeArray[s][1];
        }
    }

    if (routeId <= 10) {
        routeName = routeName.slice(0,-7);
    }

    for (t = 0; t < tripsArray.length; t++){
        if (tripsArray[t][2] == tripId) {
            tripNum = tripsArray[t][4];
        }
    }

    var tripShape = new ol.layer.Vector({
        source: new ol.source.Vector({
            features: [new ol.Feature({
                geometry: new ol.geom.LineString(shapePoints),
                type: 'shape',
                name: routeName+' '+tripNum,
                toolText: routeName+' '+tripNum
            })]
        }),
        style: [
            new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: '#ffffff',
                    width: 9,
                    zIndex: 4
                })
            }),
            new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: routeColor,
                    width: 4,
                    zIndex: 5
                })
            })
        ],
        zIndex: 97
    });

    /*map.removeLayer(tripShape);*/
    map.addLayer(tripShape);

    drawStops(tripId,routeColor);
}

function drawStops(tripId,routeColor) {
    var tripStops = [];

    for (t = 0; t < stopTimesArray.length; t++) {
        if (tripId == stopTimesArray[t][0]) {
            var stopArrival = stopTimesArray[t][1];
            var stopDepart = stopTimesArray[t][2];
            var stopId = stopTimesArray[t][3];
            var stopSequence = stopTimesArray[t][4];
            var stopCode = "";
            var stopName = "";
            var stopLat = "";
            var stopLon = "";

            for (u = 0; u < stationArray.length; u++) {
                if (stopId == stationArray[u][0]) {
                    stopCode = stationArray[u][1];
                    stopName = stationArray[u][2];
                    stopLat = stationArray[u][3];
                    stopLon = stationArray[u][4];
                }
            }
            tripStops.push([stopArrival,stopDepart,stopId,stopSequence,stopCode,stopName,ol.proj.fromLonLat([stopLon,stopLat])]);
        
            var tripStopsLayer = new ol.layer.Vector({
                source: new ol.source.Vector({
                projection: 'ESPG:4326',
                features: [new ol.Feature({
                    geometry: new ol.geom.Point(ol.proj.fromLonLat([stopLon,stopLat])),
                    type: 'station',
                    routeColor: routeColor,
                    stopId: stopId,
                    stopAbr: stopCode,
                    name: stopName,
                    toolText: stopName
                })]
                }),
                style: [
                new ol.style.Style({
                    image: new ol.style.Circle({
                    stroke: new ol.style.Stroke({
                        color: '#ffffff',
                        width: 3
                    }),
                    fill: new ol.style.Fill({
                        color: routeColor
                    }),
                    radius: 7
                    })
                })
                ],
                zIndex: 98
            })
            map.addLayer(tripStopsLayer);
        }
    }
    /*console.log(tripStops);*/
}
