<<<<<<< HEAD
# TravelTrack
=======
# Travel Track
>>>>>>> 2f9f3a9bb41f29289bac323be4fe46caf9e804b8

This project was developed by Jon Moran of Computer Enterprises, Inc. (CEI) for the purpose of grasping and applying a better understanding of web development with Angular.

Travel Track is a web-application that tracks users traveling and vacations. Users have accounts and the ability to log previous and current trips, add people as participants of trips, schedule trips, etc. 

---
---
## Page Layouts

This section covers briefly the overall layout of the webpages for Travel Track.
<br/>
<br/>
*Asterik signifies something that can be clicked or interacted with by a user  

> ### Header

- Displays tabs:
  - *Travel Track 
    - logo: click to go 'Home'
  - *Trips 
    - text: click to go to 'Trips'
  - *New Trip
      - refers user to 'Create Trip' page
  - *Bucket List (bucket icon)
    - text: click to go to 'Bucket List'
  - *Search & Search Button
    - search: user types in relevant location or trip title to find related trips
  - *Profile [dropdown] (alternatively, show "Login" if signed out)
    - Options:
      - profile picture, name, username
      - *Edit Profile
        - refers user to 'Edit Profile' page
      - *Settings
        - refers user to 'Settings' page
      - *Log out
  ---

> ### Home

- Displays: 
  - Pictures of cities/places around the world
  - Description of what the site is about
  - *BUTTON: "I'm Ready to Explore!"
    - refers user to the login
  
  ---

> ### Bucket List 

- Displays:
  - *Location Search (allows users to search for cities they'd like to visit)
    - Suggestions/autofill from API
  - *BUTTON: 'Add to Bucketlist'
    - Adds the location to bucket list, updates page
  - List of cities on user's buckelist
    - Image of City
    - City
    - Country
    - Checkmark Icon
      - Only displayed if country has been visited (checks user's previously visited locations)
  ---

> ### Trips  

This page will include the list of all trips that the user created or is a part of.
- Displays:
  - Upcoming Trips
    - *Trip Thumbnails
      - if clicked on, refers user to 'Trip (Overview)' page
    - *ICON: Filter by:
      - date, location (a-z)
  - Previous Trips
    - *Trip Thumbnails
      - if clicked on, refers user to 'Trip (Overview)' page
    - *ICON: Filter by:
      - date, location (a-z)  
<br/>
- **Trip Thumbnail:**
  - Displays:
    - Trip Image (will be stock based on location)
    - Trip Title
    - Start Date &mdash; End Date
    - Location(s)

    ---
  > ### Trip (Overview)

    This page displays once a user clicks on a specific trip they'd like to view/edit.
  - Side Panel (left)
    - Displays:
      - *Overview (suitcase icon)
        - refers user to 'Trip Overview' page (homepage of Trip)
      - *Itinerary (pinpoint icon)
        - refers user to 'Trip Itinerary' page
      - *To Do (checkmark icon)
        - refers user to 'Trip To-Do' page
      - *Photos (camera icon)
        - refers user to 'Trip Photos' page
    
  - Main Content
    - Displays:
      - trip image
        - photo icon, # of photos
        - pinpoint icon, # of places
        - calendar icon, # day on trip
        - clock icon, # of days left until trip
      - trip description
      - total trip cost
      - list of trip members ('travel buddies')
        - *list of usernames and profile photos
          - if member is clicked on
            - *option to remove member
              - POP-UP: "are you sure? yes or no"
                - Yes => perform remove member from trip
                - No => remove popup
            - *option to make member an organizer (admin of trip)
              - POP-UP: "are you sure? yes or no"
                - Yes => perform remove member from trip
                - No => remove popup
            - *option to remove "organizer" from trip 
        - *BUTTON: add member(s)
          - refers user to 'Add Member' page
    ---
  > ### Trip Itinerary

  - Displays:
    - *BUTTON: 'Add Event'
      - refers to 'Add Event' page  
    - Day #, date  
    **The amount of days and events per day are all looped onto page**
      - event title
      - event start time
      - *ICON: pencil icon
        - allows user to edit event
        - refers user to 'Edit Event' page
      - event location
      - event description
      - event cost
  <br/>
    ---
  >### Trip To-Do 

  - Displays: 
    - *input box: 'What task do you need done for this trip?'
    - *BUTTON: 'Add Task'
      - submits new task, adds it to the bottom of the list
    - *list of tasks
      - hover over task, button appears
        - *BUTTON: 'DONE' 
        - removes task from view, deletes task
  <br/>
    ---
  >### Trip Photos

  - Displays: 
    - *ICON: paperclip icon
      - enables user to add image files (jpg, png, etc.)
    - *BUTTON: 'Add Photo(s)'
      - submits added photos, updates page
    - list of photos for each trip
      - filter by:
        - date or location (a-z)


  ---

> ### Login

- Displays:
  - *Username
    - input
  - *Password
    - input
  - *Remember Me
    - check box
  - *Forgot password (link)
    - refers user to 'Forgot Password' page
  - *I'm New. (link)
    - refers user to 'Create Account' page
  - *BUTTON: "Login"
  ---

> ### Create Account

- Displays: 
  - *First Name
    - input
  - *Last Name
    - input
  - *Username
    - input
  - *Password
    - input
  - *Confirm Password
    - input
  - *Profile Picture
    -file attachment of image file
  - *BUTTON: "Create Account"
  ---

### Add Trip

- Displays:
  - *Trip Title
    -input
  - *Start Date
    -input
  - *End Date
    -input
  - *Location(s)
    - Search Autofill/Suggesitons (using API)
    - BUTTON: 'Add Location'
    - resets to blank, can add unlimited locations
  - *Description
    -input
  - *BUTTON: "Create Trip"
  ---

### Add Event

- Displays:
  - *Location (Place)
    - input
  - *Start Date / Time
    - input
  - *End Date / Time
    - input
  - *Estimated Cost
    - input
  - *Notes
    - input
  - *BUTTON: "Create Event"

  ---


### Add Member 

- Displays:
  - *Username
    - Suggested/autofill list of users
  - *BUTTON: "Add Member

<br/>
<br/>
<br/>

---
---


More to add..
