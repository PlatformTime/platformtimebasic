var GtfsRealtimeBindings = require('gtfs-realtime-bindings');
var request = require('request');
  
var requestSettings = {
  method: 'GET',
  headers: {'x-api-key':'aJD7AswEA1aZM6y2tvON436fIcsuGvD16ZzdxSri'},
  url: 'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/camsys%2Flirr-alerts',
  encoding: null
};
request(requestSettings, function (error, response, data) {
  if (!error && response.statusCode == 200) {
    var feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(data);
      
    alertFeed = feed;
  }
});