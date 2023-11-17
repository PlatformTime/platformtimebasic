function drawBlips() {
    
    var blipCount = map.getLayers().getArray().length;

    for (k = blipCount-1; k > 143; k--) {
        var layer =[];
        layer = map.getLayers().getArray()[k];
        map.removeLayer(layer);
    }

    console.log(blipCount-144+' trains');

    for (i = 0; i < globalFeedLen; i++) {
        if (globalFeed.entity[i].id.slice(0,1) == "V") {

            var lon = globalFeed.entity[i].vehicle.position.longitude;
            var lat = globalFeed.entity[i].vehicle.position.latitude;
            var routeId = globalFeed.entity[i].vehicle.trip.routeId;
            var routeName = routeArray[routeId]['1'];
            var tripId = globalFeed.entity[i].vehicle.trip.tripId;
            var tripNum = tripId.split('_');
            var speed = Math.round((globalFeed.entity[i].vehicle.position.speed*100)/100);
            var currentStation = globalFeed.entity[i].vehicle.stopId;
            var currentStatus = globalFeed.entity[i].vehicle.currentStatus;
            var vehicleId = globalFeed.entity[i].vehicle.vehicle.label;
            var bearing = globalFeed.entity[i].vehicle.position.bearing;
            var carType = "";

            if (routeId <= 10){
                routeName = routeName.slice(0,-7);
            }

            var blipName = routeName+'\n'+tripNum[3];

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

            if (400 <= vehicleId && vehicleId <= 5023) {
                carType = 'C3';
            }
            else if (7001 <= vehicleId && vehicleId <= 7836) {
            carType = 'M7';
            }
            else if (9001 <= vehicleId && vehicleId <= 9600) {
            carType = 'M9';
            }
            else if (9771 <= vehicleId && vehicleId <= 10000) {
            carType = 'M3';
            }

            var blipCenter = ol.proj.fromLonLat([lon,lat]);

            var selectionCheck = '';
            var selectionScale = 0.04;
            var zIndexSet = speed + 10;


            if (lastTrainClicked == '') {
                selectionCheck = '';
                selectionScale = 0.05;
                zIndexSet = speed + 10;
            }
            else if (tripId == lastTrainClicked.values_.tripId) {
                selectionCheck = 'a';
                selectionScale = 0.06;
                zIndexSet = speed + 99;
            }
            else {
                selectionCheck = '';
                selectionScale = 0.05;
                zIndexSet = speed + 10;
            }

            var blipIcon = new ol.style.Icon({
                anchor: [0.5, 0.6],
                size: [402, 478],
                offset: [0, 0],
                opacity: 1.0,
                scale: selectionScale,
                rotation: (bearing)/57.2958,
                src: './images/blip'+routeId+selectionCheck+'.png'
            });
            var blipText = blipTextVis(blipText,blipName);

            blipLayer = new ol.layer.Vector({
                source: new ol.source.Vector({
                    projection: 'ESPG:4326',
                    features: [new ol.Feature({
                        geometry: (new ol.geom.Point(blipCenter)),
                        type: 'train',
                        routeId: routeId,
                        tripId: tripId,
                        bearing: bearing,
                        name: routeName+' '+tripNum[3],
                        tripName: routeName+'\n'+tripNum[3],
                        toolText: '<b>'+routeName+' '+tripNum[3]+'</b><br>Type: '+carType+'<br>Speed: '+speed+' mph<br>'+currentStatus+currentStation,
                    })] 

                }),
                style: [
                    new ol.style.Style({
                        image: blipIcon,
                        text: blipText
                    })
                ],
                zIndex: zIndexSet
            });

            map.addLayer(blipLayer);
        }
    }
}

function blipTextVis(blipText,blipName) {
    if (labelToggle == 1) {
        blipText = new ol.style.Text({
            fill: new ol.style.Fill({
                color: '#ffffff'
            }),
            stroke: new ol.style.Stroke({
                color: '#000000',
                width: 2
            }),
            offsetX: 20,
            offsetY: 15,
            scale: 1.25,
            textAlign: 'left',
            text: blipName,
            backgroundFill: new ol.style.Fill({
                color: 'rgba(34, 34, 17, 0.3)',
            })
        });
    }
    else {
        blipText = '';
    }
    return blipText;
}