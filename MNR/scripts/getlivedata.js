var GtfsRealtimeBindings = require('gtfs-realtime-bindings');
var request = require('request');
  
var requestSettings = {
  method: 'GET',
  headers: {'x-api-key':'aJD7AswEA1aZM6y2tvON436fIcsuGvD16ZzdxSri'},
  url: 'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/mnr%2Fgtfs-mnr',
  encoding: null
};
request(requestSettings, function (error, response, data) {
  if (!error && response.statusCode == 200) {
    var feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(data);
      
    var timestamp = (feed.header.timestamp * 1000)
    var date = new Date(timestamp);
    var currentDate = date.getFullYear()+''+(date.getMonth()+1)+''+date.getDate();
    var currentTime = date.toLocaleTimeString('en-US', {hour12: false});

    console.log("Data Refreshed At: "+currentDate+' '+currentTime);

    globalFeed = feed;

    feed.entity.forEach(function(entity) {
      if (entity.trip_update) {
        console.log(entity.trip_update);6
      }
    });
  }
});