# street_lite

**street_lite** is an application that keeps users up-to-date with public events held on street closures in NYC. It utilizes the power of NYC Open Data API and Google Maps API to provide users users with the information they need to attend an event near them. 

[Visit the Live Site!](https://street-lite-cnp7.onrender.com/)

![image](frontend/src/images/street_lite_splash.png)

---

## Functionality and MVPS
- The app integrates NYC Open Data API with Google Maps API to display open streets and events to users
- Users can search for events near them by navigating the event index or by browsing a map pre-filled with events

![image](frontend/src/images/street_lite_index.png)

- Logged-in users can interact with preexisting events by choosing to "attend" the event
- Logged-in users can leave comments on event pages

![image](frontend/src/images/street_lite_event.png)

---

## Technologies
- [NYC Open Data - Parks Events Locations](https://data.cityofnewyork.us/City-Government/NYC-Parks-Events-Listing-Event-Locations/cpcm-i88g)
- [NYC Open Data - Open Streets Locations](https://data.cityofnewyork.us/Health/Open-Streets-Locations/uiay-nctu)
- [Google Maps API](https://developers.google.com/maps/documentation/javascript/places#find_place_from_query)
- MERN Stack (MongoDB, Express, React.js, Node.js)

---

## Technical Challenges 
- Stability and reliabilty of NYC Open Data API, limited scope of dataset
- Recieving data from NYC API and parsing it to the Google Maps API

![image](https://github.com/treypisano/Street-Lite/assets/126501514/c381f3f5-b4dd-47ae-96e4-1343fadffb22)

![image](https://github.com/treypisano/Street-Lite/assets/126501514/847d4c89-ea7a-4d0a-82d1-a0583b117387)

![image](https://github.com/treypisano/Street-Lite/assets/126501514/c9f59fa4-14e7-40e7-bb5d-a293fca241e0)

---

## Group members
- Trey Pisano (Team Lead)
- Harjit Singh (Front End Lead)
- Arvid Hossein (Back End Lead)
- Mohammad Naqvi(Flex Lead)

---

## Timeline
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

---

## CC Licensing
- Data from [NYC OpenData](https://opendata.cityofnewyork.us/)
- Map data from [Google Maps API](https://developers.google.com/maps)
- Places data from [Google Places API](https://developers.google.com/maps/documentation/places/web-service/overview)
- Streetlight icon from [Flaticon](https://www.flaticon.com/free-icons/street")
- Images from [Unsplash](https://www.unsplash.com)