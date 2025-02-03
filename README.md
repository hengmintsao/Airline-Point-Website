# Airline-Point-Website
This is a website that provides an easy way to check the required miles for redeeming award tickets and the average cost of earning miles when purchasing tickets. It helps users in Canada find the most suitable airline among various Canadian carriers.

### How is this project unique?
After the pandemic, people have been earning airline miles through purchasing airline tickets (earning miles by flying), buying miles directly from airlines, using airline mileage credit cards offered by banks, or participating in other collaborative programs. With numerous airlines and their complex rules, travelers find it increasingly difficult to calculate how much they are spending to earn the corresponding miles or to determine which airline's mileage program best suits their needs. Currently, frequent flyers (or so-called mileage players) mostly share mileage-related information on platforms like Facebook or YouTube. However, this information is often unsuitable for newcomers to frequent flyer programs or those on tight budgets who have never considered the practicality of miles when purchasing tickets. This website aims to address these challenges by quickly analyzing the cost of earning miles and helping travelers find the best mileage strategies tailored to their needs, whether for redeeming award tickets or accessing other services.

### Feature Accomplishment
- Introduction of airlines
  Provides an overview of major airlines, highlighting their unique features and services to help users make informed travel decisions.
- Airport mileage calculator
  Use an API to retrieve airport-related information (latitude and longitude), then calculate the distance in miles between two airports with a precise formula.
- Mileage cost calculator
  Quickly calculate and display the cost per mile using inputted data such as total mileage and cost, making it easy to evaluate the value of miles and present a pie chart.
- Airline comparison Table
  Using atomic state management with Jotai, this feature simplifies the creation of a comparison table for airlines, improving efficiency and maintainability.
- WEB API with authentication
  A Web API with authentication functionality is implemented to secure the API and ensure that only authorized users can access specific resources or perform operations. This is achieved using JSON Web Tokens (JWT) for stateless and     secure authentication.
- Search History Table
  The submitted data is stored in an array using Jotai, allowing users to quickly access and review previously entered records.
- AutoComplete
  A designed AutoComplete dropdown dynamically displays matching options in real-time. Users can enter keywords or directly click on suggested information to quickly select the desired item, improving input efficiency and reducing errors.


### Tech Stack
***Front End***
- React
- Styled Component(CSS)/Materical-UI

***Server-side***
- Express.js

***Database***
- MongoDB

***Deployment/Hosting***
- Vercel

***Development Environment***
- VS Code

***Unit Testing***
- Cypress
