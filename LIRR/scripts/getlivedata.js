/*var GtfsRealtimeBindings = require('gtfs-realtime-bindings');
var request = require('request');*/
var protobuf = require('protobufjs');
/*var globalFeed = [];*/

var requestSettings = {
  method: 'GET',
  headers: {'x-api-key':'aJD7AswEA1aZM6y2tvON436fIcsuGvD16ZzdxSri'},
  url: 'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/lirr%2Fgtfs-lirr',
  encoding: null
};

protobuf.load("gtfs-realtime-LIRR.proto", function (err, requestSettings) {
  if (err)
    throw err;
  
  var FeedMessage = requestSettings.lookupType("transit_realtime.FeedMessage");

  var payload = {entity: "FeedMessage"};

  var errMsg = FeedMessage.verify(payload);
  if (errMsg)
    throw Error(errMsg);

  var message = FeedMessage.create(payload);
  console.log(message);

  var buffer = FeedMessage.encode(message).finish();

  var message = FeedMessage.decode(buffer);

  var object = FeedMessage.toObject(message, {
    longs: String,
    enums: String,
    bytes: String,
  });
});
/*request(requestSettings, function (error, response, data) {
  if (!error && response.statusCode == 200) {
    var feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(data);
      
    var timestamp = (feed.header.timestamp * 1000)
    var date = new Date(timestamp);
    var currentDate = date.getFullYear()+''+(date.getMonth()+1)+''+date.getDate();
    var currentTime = date.toLocaleTimeString('en-US', {hour12: false});

    console.log("Data Refreshed At: "+currentDate+' '+currentTime);

    globalFeed = feed;
  }
});*/