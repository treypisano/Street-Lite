# Street-Lite

Street-Lite is an application that informs users about public events and Open Streets in NYC. It utilizes the power of NYC Open Data APIs and Google Maps API to provide a plethora of information to the user. 

### Functionality and MVPS
- The app will display open streets and park events for users
- Users can interact with preexisting events by choosing to "attend" or "follow" the event
- Users can create new events that will be visible to other users
- Users can leave comments on event pages

### Technologies
- [NYC Open Data - Parks Events Locations](https://data.cityofnewyork.us/City-Government/NYC-Parks-Events-Listing-Event-Locations/cpcm-i88g)
- [NYC Open Data - Open Streets Locations](https://data.cityofnewyork.us/Health/Open-Streets-Locations/uiay-nctu)
- [Google Maps API](https://developers.google.com/maps/documentation/javascript/places#find_place_from_query)
- MERN Stack (MongoDB, Express, React.js, Node.js)

### Technical Challenges 
- Stability and reliabilty of NYC Open Data API, limited scope of dataset
- Recieving data from NYC API and parsing it to the Google Maps API

### Group members
- Trey, (Team Lead)
- -Harjit (Front End)
- Mohammad (Flex)
- Arvid (Back End)

### Time Line
#### 6/11 
- Pre-Design Process Begins, Make Production Read-me, Start authentication
#### 6/12 
- Begin Splash Page, Get APIs confirmed, Finish Authentication, create backend routes for events
#### 6/13
- Connect Google Maps to Page, Make a page for specific events, frontend routes for Event Page, start routes for users to create events
#### 6/14
- Create backend routes for User Likes, Add overlay to google maps, advanced styling on splash and events page
#### 6/15
- Ensure styling is consistent, potentially add comments, make frontend routes for make event page
