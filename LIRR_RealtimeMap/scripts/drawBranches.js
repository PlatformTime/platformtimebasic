function drawStations() {
  for (k = 1; k < stationArray.length; k++) {

    var stopId = stationArray[k][0];
   
    var stationPoint = ol.proj.fromLonLat([stationArray[k]['4'],stationArray[k]['3']]);

    var stationColor = '#B2ACA8';

    if (stopId == '117' || stopId == '135' || stopId == '136' || stopId == '16' || stopId == '183' || stopId == '187' || stopId == '215' || stopId == '225' || stopId == '226' || stopId == '27' || stopId == '38' || stopId == '64' || stopId == '8') {
      stationColor = '#00985F'
    }
    else if (stopId == '149' || stopId == '175'|| stopId == '195'|| stopId == '23'|| stopId == '359'|| stopId == '36'|| stopId == '63'|| stopId == '68'|| stopId == '84'|| stopId == '86'|| stopId == '89') {
      stationColor = '#CE8E00'
    }
    else if (stopId == '1' || stopId == '123' || stopId == '154' || stopId == '182' || stopId == '185' || stopId == '52' || stopId == '67' || stopId == '71' || stopId == '76' || stopId == '77') {
      stationColor = '#00AF3F'
    }
    else if (stopId == '126' || stopId == '129' || stopId == '165' || stopId == '176' || stopId == '179' || stopId == '190' || stopId == '20' || stopId == '220' || stopId == '223' || stopId == '29' || stopId == '33' || stopId == '44' || stopId == '59' || stopId == '73') {
      stationColor = '#A626AA'
    }
    else if (stopId == '100' || stopId == '13' || stopId == '140' || stopId == '141' || stopId == '157' || stopId == '163' || stopId == '191' || stopId == '198' || stopId == '204' || stopId == '21' || stopId == '233' || stopId == '26' || stopId == '4' || stopId == '48' || stopId == '74' || stopId == '83') {
      stationColor = '#00B2A9'
    }
    else if (stopId == '113' || stopId == '125' || stopId == '155' || stopId == '31' || stopId == '51' || stopId == '99') {
      stationColor = '#FF6319'
    }
    else if (stopId == '101' || stopId == '114' || stopId == '119' || stopId == '122' || stopId == '180' || stopId == '211' || stopId == '217' || stopId == '32' || stopId == '65' || stopId == '66' || stopId == '94') {
      stationColor = '#6E3219'
    }
    else if (stopId == '124' || stopId == '142' || stopId == '184' || stopId == '216' || stopId == '219' || stopId == '85') {
      stationColor = '#00A1DE'
    }
    else if (stopId == '11' || stopId == '120' || stopId == '130' || stopId == '131' || stopId == '162' || stopId == '171' || stopId == '199' || stopId == '2' || stopId == '25' || stopId == '42' || stopId == '56' || stopId == '72') {
      stationColor = '#C60C30'
    }
    else if (stopId == '111' || stopId == '127' || stopId == '132' || stopId == '14' || stopId == '152' || stopId == '153' || stopId == '164' || stopId == '193' || stopId == '202' || stopId == '205' || stopId == '213' || stopId == '39' || stopId == '40' || stopId == '78' || stopId == '91' || stopId == '92') {
      stationColor = '#006EC7'
    }
    else if (stopId == '24') {
      stationColor = '#60269E'
    }

    var stationsLayer = new ol.layer.Vector({
        source: new ol.source.Vector({
          projection: 'ESPG:4326',
          features: [new ol.Feature({
            geometry: new ol.geom.Point(stationPoint),
            type: 'station',
            routeColor: stationColor,
            stopId: stopId,
            stopAbr: stationArray[k]['1'],
            name: stationArray[k]['2'],
            toolText: stationArray[k]['2']
          })]
        }),
        style: [
          new ol.style.Style({
            image: new ol.style.Circle({
              stroke: new ol.style.Stroke({
                color: '#4D5357',
                width: 1
              }),
              fill: new ol.style.Fill({
                color: stationColor
              }),
              radius: 4
            })
          })
        ],
        zIndex: 3
    })
    map.addLayer(stationsLayer);
  }
}

function drawBranch(i) {
  switch (i) {
    case 1:
      var points = [];

      for (j = 1; j < branchArray.length; j++) {
        points.push(ol.proj.fromLonLat([branchArray[j]['2'],branchArray[j]['1']]));
      }

      var babylonBranch = new ol.layer.Vector({
        source: new ol.source.Vector({
            features: [new ol.Feature({
                geometry: new ol.geom.LineString(points),
                type: 'branch',
                name: 'Babylon Branch',
                toolText: 'Babylon Branch'
            })]
        }),
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#00985F',
                width: 3
            })
        }),
        zIndex: 2
      });
      
      map.addLayer(babylonBranch);
    break;
    case 2:
      var points = [];

      for (j = 1; j < branchArray.length; j++) {
        points.push(ol.proj.fromLonLat([branchArray[j]['2'],branchArray[j]['1']]));
      }

      var hempsteadBranch = new ol.layer.Vector({
        source: new ol.source.Vector({
            features: [new ol.Feature({
                geometry: new ol.geom.LineString(points),
                type: 'branch',
                name: 'Hempstead Branch',
                toolText: 'Hempstead Branch'
            })]
        }),
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#CE8E00',
                width: 3
            })
        }),
        zIndex: 2
      });
    
      map.addLayer(hempsteadBranch);
    break;
    case 3:
      var points = [];

      for (j = 1; j < branchArray.length; j++) {
        points.push(ol.proj.fromLonLat([branchArray[j]['2'],branchArray[j]['1']]));
      }
      
      var oysterBayBranch = new ol.layer.Vector({
        source: new ol.source.Vector({
            features: [new ol.Feature({
                geometry: new ol.geom.LineString(points),
                type: 'branch',
                name: 'Oyster Bay Branch',
                toolText: 'Oyster Bay Branch'
            })]
        }),
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#00AF3F',
                width: 3
            })
        }),
        zIndex: 2
      });
  
      map.addLayer(oysterBayBranch);
    break;
    case 4:
      var points = [];

      for (j = 1; j < branchArray.length; j++) {
        points.push(ol.proj.fromLonLat([branchArray[j]['2'],branchArray[j]['1']]));
      }
      
      var ronkonkomaBranch = new ol.layer.Vector({
        source: new ol.source.Vector({
            features: [new ol.Feature({
                geometry: new ol.geom.LineString(points),
                type: 'branch',
                name: 'Ronkonkoma Branch',
                toolText: 'Ronkonkoma Branch'
            })]
        }),
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#A626AA',
                width: 3
            })
        }),
        zIndex: 2
      });
  
      map.addLayer(ronkonkomaBranch);
    break;
    case 5:
      var points = [];

      for (j = 1; j < branchArray.length; j++) {
        points.push(ol.proj.fromLonLat([branchArray[j]['2'],branchArray[j]['1']]));
      }

      var montaukBranch = new ol.layer.Vector({
        source: new ol.source.Vector({
            features: [new ol.Feature({
                geometry: new ol.geom.LineString(points),
                type: 'branch',
                nameText: 'Montauk Branch',
                toolText: 'Montauk Branch'
            })]
        }),
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#00B2A9',
                width: 3
            })
        }),
        zIndex: 1
      });
    
      map.addLayer(montaukBranch);
    break;
    case 6:
      var points = [];

      for (j = 1; j < branchArray.length; j++) {
        points.push(ol.proj.fromLonLat([branchArray[j]['2'],branchArray[j]['1']]));
      }

      var longBeachBranch = new ol.layer.Vector({
        source: new ol.source.Vector({
            features: [new ol.Feature({
                geometry: new ol.geom.LineString(points),
                type: 'branch',
                name: 'Long Beach Branch',
                toolText: 'Long Beach Branch'
            })]
        }),
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#FF6319',
                width: 3
            })
        }),
        zIndex: 1
      });
    
      map.addLayer(longBeachBranch);
    break;
    case 7:
      var points = [];

      for (j = 1; j < branchArray.length; j++) {
        points.push(ol.proj.fromLonLat([branchArray[j]['2'],branchArray[j]['1']]));
      }

      var farRockawayBranch = new ol.layer.Vector({
        source: new ol.source.Vector({
            features: [new ol.Feature({
                geometry: new ol.geom.LineString(points),
                type: 'branch',
                name: 'Far Rockaway Branch',
                toolText: 'Far Rockaway Branch'
            })]
        }),
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#6E3219',
                width: 3
            })
        }),
        zIndex: 1
      });
    
      map.addLayer(farRockawayBranch);
    break;
    case 8:
      var points = [];

      for (j = 1; j < branchArray.length; j++) {
        points.push(ol.proj.fromLonLat([branchArray[j]['2'],branchArray[j]['1']]));
      }

      var westHempsteadBranch = new ol.layer.Vector({
        source: new ol.source.Vector({
            features: [new ol.Feature({
                geometry: new ol.geom.LineString(points),
                type: 'branch',
                name: 'West Hempstead Branch',
                toolText: 'West Hempstead Branch'
            })]
        }),
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#00A1DE',
                width: 3
            })
        }),
        zIndex: 1
      });
    
      map.addLayer(westHempsteadBranch);
    break;
    case 9:
      var points = [];

      for (j = 1; j < branchArray.length; j++) {
        points.push(ol.proj.fromLonLat([branchArray[j]['2'],branchArray[j]['1']]));
      }

      var portWashingtonBranch = new ol.layer.Vector({
        source: new ol.source.Vector({
            features: [new ol.Feature({
                geometry: new ol.geom.LineString(points),
                type: 'branch',
                name: 'Port Washington Branch',
                toolText: 'Port Washington Branch'
            })]
        }),
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#C60C30',
                width: 3
            })
        }),
        zIndex: 1
      });
    
      map.addLayer(portWashingtonBranch);
    break;
    case 10:
      var points = [];

      for (j = 1; j < branchArray.length; j++) {
        points.push(ol.proj.fromLonLat([branchArray[j]['2'],branchArray[j]['1']]));
      }

      var portJeffersonBranch = new ol.layer.Vector({
        source: new ol.source.Vector({
            features: [new ol.Feature({
                geometry: new ol.geom.LineString(points),
                type: 'branch',
                name: 'Port Jefferson Branch',
                toolText: 'Port Jefferson Branch (Main Line)'
            })]
        }),
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#006EC7',
                width: 3
            })
        }),
        zIndex: 2
      });
    
      map.addLayer(portJeffersonBranch);
    break;
    case 11:
      var points = [];

      for (j = 1; j < branchArray.length; j++) {
        points.push(ol.proj.fromLonLat([branchArray[j]['2'],branchArray[j]['1']]));
      }

      var belmontBranch = new ol.layer.Vector({
        source: new ol.source.Vector({
            features: [new ol.Feature({
                geometry: new ol.geom.LineString(points),
                type: 'branch',
                name: 'Belmont Branch',
                toolText: 'Belmont Branch'
            })]
        }),
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#60269E',
                width: 3
            })
        }),
        zIndex: 2
      });
    
      map.addLayer(belmontBranch);
    break;
    case 12:
      var points = [];

      for (j = 1; j < branchArray.length; j++) {
        points.push(ol.proj.fromLonLat([branchArray[j]['2'],branchArray[j]['1']]));
      }

      var cityZone1 = new ol.layer.Vector({
        source: new ol.source.Vector({
            features: [new ol.Feature({
                geometry: new ol.geom.LineString(points),
                type: 'branch',
                name: 'City Terminal Zone (Atlantic Terminal)',
                toolText: 'City Terminal Zone (Atlantic Terminal)'
            })]
        }),
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#B2ACA8',
                width: 3
            })
        }),
        zIndex: 2
      });
    
      map.addLayer(cityZone1);
    break;
    case 13:
      var points = [];

      for (j = 1; j < branchArray.length; j++) {
        points.push(ol.proj.fromLonLat([branchArray[j]['2'],branchArray[j]['1']]));
      }

      var cityZone2 = new ol.layer.Vector({
        source: new ol.source.Vector({
            features: [new ol.Feature({
                geometry: new ol.geom.LineString(points),
                type: 'branch',
                name: 'City Terminal Zone (Penn Station)',
                toolText: 'City Terminal Zone (Penn Station)'
            })]
        }),
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#B2ACA8',
                width: 3
            })
        }),
        zIndex: 2
      });
    
      map.addLayer(cityZone2);
    break;
    case 14:
      var points = [];

      for (j = 1; j < branchArray.length; j++) {
        points.push(ol.proj.fromLonLat([branchArray[j]['2'],branchArray[j]['1']]));
      }

      var cityZone3 = new ol.layer.Vector({
        source: new ol.source.Vector({
            features: [new ol.Feature({
                geometry: new ol.geom.LineString(points),
                type: 'branch',
                name: 'City Terminal Zone (Grand Central)',
                toolText: 'City Terminal Zone (Grand Central)'
            })]
        }),
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#B2ACA8',
                width: 3
            })
        }),
        zIndex: 2
      });
    
      map.addLayer(cityZone3);
    break;
    case 15:
      var points = [];

      for (j = 1; j < branchArray.length; j++) {
        points.push(ol.proj.fromLonLat([branchArray[j]['2'],branchArray[j]['1']]));
      }

      var cityZone4 = new ol.layer.Vector({
        source: new ol.source.Vector({
            features: [new ol.Feature({
                geometry: new ol.geom.LineString(points),
                type: 'branch',
                name: 'City Terminal Zone (Long Island City)',
                toolText: 'City Terminal Zone (Long Island City)'
            })]
        }),
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#B2ACA8',
                width: 3
            })
        }),
        zIndex: 1
      });
    
      map.addLayer(cityZone4);
    break;
  }
}