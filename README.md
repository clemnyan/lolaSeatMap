# lolaSeatMap

#App Navigation

-This app is made up of 2 pages, the welcome page and the seat map page.
-In the welcome page, the user is prompted to click the link CLICK HERE TO FIND SEAT to enter the seat map page.
-In the seat map page the user can then select the seat or his/her choice.

#What worked and what didn't

-Page navigation and arrangement of seats in their respective positions and order was successful
-Hovering and clicking a seat for selection was also successful
-Permanent selection of a seat once clicked didnt work well, as I had challenges updating the state once the element had been rendered. With more time i'm sure I can figure out a way to tackle this part.

#Code Structure
-Used a react/redux framework.
-The seat map is generated from the data/json file.
-The main constituents of the app include an action folder, compnent folder, container folder and the reducers folder, which follor the react/redux framework
-i've included a seperate folder called Helper utility Methods which helps to generate the seatmap. Props from the json data are passed into these methods, to generate the desired states which are the usued in the seatmap.
