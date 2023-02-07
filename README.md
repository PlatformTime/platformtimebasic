# PlatformTimeBasic
Platform Time Basic v1.0

Data used in this application is directly sourced from MTA Real-Tima data feeds. Information in this application in not guaranteed to be accurate, complete, or timely and is issued AS-IS.

Platform Time Basic is in no way associated with MTA and is not licensed by such.

ABOUT

Platform Time Basic is a commuter-oriented application designed to show trains arriving and departing from stations in the next 24-hour period on commuter rail lines in and around New York City.

To use this application, select a transit agency to begin.

Find a station or search for it in the dropdown menu. Click the station name to show the next 12 train trips departing (or arriving for terminal stations) at the selected station on two time tables. (6 towards NYC (Westbound, Southbound) and 6 towards suburban areas (Eastbound, Northbound)).

To reveal more train trips, click the "Show more..." button below the list to show 6 more train trips for that time table. This can be repeated until the end of the 24-hour period has been reached.

To see the preceeding and following station stops with stop times, click on a train trip to open the Trip Details window. If the train has been dispatched for the trip, this window will also show the current stop position of the train. Within this window, clicking on a station will redirect the time tables to show train trips at that station. Click outside of the Trip Details window and time tables to close this window.

If there is a service alert affecting the station or line the station is on, a "!" icon will appear next to the station name. Click this icon to show the Service Alert window. Click outside of the Service Alert window to close it.

TIME TABLES

Time tables have four columns of information:
  Service - Service or Line the train is serving.
  
  Terminus - Last stop on the train trip.
  
  Scheduled Time - Time at which the train trip is scheduled to depart the station (please note: within the Trip Details window, this time is the scheduled arrival time).
  
  Status - Live status of the train trip. Applicable train trip statuses:
  
    On Time - Train is running on time and should depart the station with six minutes of the scheduled time. 
      (note: this is in accordance with industry standards; a train is condidered On Time if it arrives within six minutes of its scheduled time)
    
    Delayed (min) - Train is delayed six minutes or more. In some cases, a service alert may be issued detailing the reason for the delay.
    
    Enroute - Train is traveling to the selected station next.
    
    Approaching Station - Train is approaching the station.
    
    Arrived - Train is at the station and is loading at the platform.
    
    Departed - Train has left the station and is continuing on its route.
    
    LAST CALL - Train is set to depart its origin station.
    
    SKIPPED - Train will skip the selected station. In some cases, a service alert may be issued detailing the reason for the station skip.
    
    NO SERVICE - Train has been canceled and removed from service. In some cases, a service alert may be issued detailing the reason for the cancellation.
    
    Not Dispatched - Train has not yet been dispatched from its yard.
    
VERSIONS / CHANGE LOG

v1.0 - 2021-12-18: Initial release.

v1.1 - 2021-12-20: Updated styles for MetroNorth to match station signage and fixed dropdown content for LIRR

v1.2 - 2021-12-23: Added NJT timetables

v1.3 - 2023-02-06: Added ability to navigate using browser history and load a specific staion on start via hash
