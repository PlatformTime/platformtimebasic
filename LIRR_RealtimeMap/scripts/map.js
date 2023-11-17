var mapLayer = "";
var labelToggle = 0;
var r = document.querySelector(':root');
r.style.setProperty('--labelstopnleft', '#ffffff');
r.style.setProperty('--labelsbotnright', '#aaaaaa');

var map = new ol.Map({
    view: new ol.View({
      center: ol.proj.fromLonLat([-73.04, 40.82]),
      zoom: 10
    }),
    layers: [
      mapLayer = new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    target: 'js-map'
  });

mapLayer.setOpacity(0.5);

const stroke = new ol.style.Stroke({
  color: 'rgba(255, 255, 255, 0.7)',
  width: 4
});

let selected = null;
map.on('pointermove', function (e) {
  if (selected !== null) {
    selected.setStyle(undefined);
    selected = null;
  }

  map.forEachFeatureAtPixel(e.pixel, function (f) {
    selected = f;

    var selectedName = selected.values_.tripName;

    var blipText = blipTextVis(blipText,selectedName);

    var selectStyle = null;

    if (selected.values_.type == 'branch') {
      selectStyle = new ol.style.Style({
        stroke: stroke,
        text: blipText
      });
    }
    else if (selected.values_.type == 'station') {
      selectStyle = new ol.style.Style({
        image: new ol.style.Circle({
          fill: new ol.style.Fill({
            color: selected.values_.routeColor
          }),
          stroke: new ol.style.Stroke({
            color: 'rgba(255, 255, 255, 0.7)',
            width: 3
          }),
          radius: 9
        }),
        text: blipText
      });
    }
    else if (selected.values_.type == 'train') {
      selectStyle = new ol.style.Style({
        image: new ol.style.Icon({
          anchor: [0.5, 0.6],
          size: [402, 478],
          offset: [0, 0],
          opacity: 1.0,
          scale: 0.06,
          rotation: (selected.values_.bearing)/57.2958,
          src: './images/blip'+selected.values_.routeId+'a.png'
        }),
        text: blipText
      });
    }
    f.setStyle(selectStyle);
    return true;
  });

  if (selected) {
    branchtooltip.innerHTML = selected.get('toolText');
    branchtooltip.style.display = 'block'
  } else {
    branchtooltip.innerHTML = '&nbsp;';
    branchtooltip.style.display = 'none';
  }
});

var lastClicked = [];
var lastTrainClicked = [];
var lastStationClicked = [];

map.on('click', function (e) {
  var featureArray = map.getFeaturesAtPixel(e.pixel);

  lastClicked = featureArray[0];

  if (lastClicked == undefined) {
    console.log('Cleared');
    lastTrainClicked = [];
    drawBlips();
    document.getElementById('trainDetails').style.display = 'none'
  }
  else {
    switch (lastClicked.values_.type) {
      case 'train':
        lastTrainClicked = lastClicked
        drawBlips();
        displayTrainDetails(lastTrainClicked,lastTrainClicked.values_.tripId);
      break;
      case 'station':
        lastStationClicked = lastClicked
        console.log(lastStationClicked.values_.name);
      break;
      case 'branch':
        console.log(lastClicked.values_.type);
      break;
    }
  }
});


var tooltipSpan = document.getElementById('branchtooltip');

function toggleLabels() {
  if (labelToggle == 0) {
    labelToggle = 1;
    r.style.setProperty('--labelstopnleft', '#aaaaaa');
    r.style.setProperty('--labelsbotnright', '#ffffff');
    drawBlips();
    if (lastTrainClicked != []) {
      displayTrainDetails(lastTrainClicked,lastTrainClicked.values_.tripId);
    }    
  }
  else {
    labelToggle = 0;
    r.style.setProperty('--labelstopnleft', '#ffffff');
    r.style.setProperty('--labelsbotnright', '#aaaaaa');
    drawBlips();
    if (lastTrainClicked != []) {
      displayTrainDetails(lastTrainClicked,lastTrainClicked.values_.tripId);
    }
  }
}

window.onmousemove = function (e) {
    var x = e.clientX,
        y = e.clientY;
    tooltipSpan.style.top = (y + 10) + 'px';
    tooltipSpan.style.left = (x + 20) + 'px';
};