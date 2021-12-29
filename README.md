![Gif](https://imgur.com/BEKS4dk)



### Visit https://bdotracker.netlify.app/ for a live demonstration of the website! 


# Features
* Quickly estimate your profits base on your inputs
* Interactive table to easily view the profitability of each item (using [react-table](https://github.com/tannerlinsley/react-table))
* Uses updated item information from a live api to accurately reflect the marketplace values


# Architecture
This website is built using a monolithic layered architecture due to the simplicity of the application. The architecture is setup to decouple the frontend, server backend, and database to allow developers to update and deploy each one individually without needing to take down the whole application. The design for each service are shown in the frontend and project folders:
* [Frontend](/frontend/README.md)
* [Backend](/project/README.md)


<br/>A diagram below is shown to showcase the overall design of the website and how each framework interact:
<img src="https://imgur.com/a/E3LQkY0" alt="Stack Architecture" width="960px" height=""/>