
This repo is the source code for [Winhalla](https://winhalla.app) as of 04/04/2023
---------

This is my first more-than-100-line project ever, that has been updated and refactored an embarassing amount of times.   
As it's (almost) only a static front-end, and has been refactored entirely a year ago, this repo is relatively clean compared to [the API](https://github.com/Winhalla/winhalla-api)
This project learned me the basics of UI and responsiveness, and let's just say it's not always fun.
## Technical data
Made with SvelteJS and Sapper for routing  
Tech details :
* Socket.io for realtime
* 3rd party auth from Google, Apple and Steam
* Axios for HTTP requests
* TailwindCSS
* Sessions with cookies (classic)
* Referral link and affiliated link handling from Firebase dynamic links
* Google Analytics
---
### Branch overview
app-presentation : dev branch.

deployement : when changes can be deployed, the pipline was push=>merge into deployement=>pull from server. This was useful so that we didn't have to change ports or ip etc. Looking back it would've been better to set env variables that were different on the server.

master: when the app was a website, this was the code.

### Final thoughts
Some routes are unreachable or just not working, as some of them were temporary.  
This repo should be run easily with npm i & npm run dev (but i didn't check)  
Commits messages are often weird and rarely useful, but as i was alone coding this, i didn't really care back then  

