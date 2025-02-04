# Airline-Point-Website
This is a website that provides an easy way to understand airlines information and check the average cost of earning miles. 

### How is this project unique?
After the pandemic, people have been earning airline miles through purchasing airline tickets (earning miles by flying), buying miles directly from airlines, using airline mileage credit cards offered by banks, or participating in other collaborative programs. With numerous airlines and their complex rules, travelers find it increasingly difficult to calculate how much they are spending to earn the corresponding miles or to determine which airline's mileage program best suits their needs. Currently, frequent flyers (or so-called mileage players) mostly share mileage-related information on platforms like Facebook or YouTube. However, this information is often unsuitable for newcomers to frequent flyer programs or those on tight budgets who have never considered the practicality of miles when purchasing tickets. This website aims to address these challenges by quickly analyzing the cost of earning miles and helping travelers find the best mileage strategies tailored to their needs, whether for redeeming award tickets or accessing other services.

### Feature Accomplishment
- **Introduction of Airlines**  
  Provides an overview of major airlines, highlighting their unique features and services to help users make informed travel decisions.

- **Airport Mileage Calculator**  
  Uses an API to retrieve airport-related information (latitude and longitude), then calculates the distance in miles between two airports using a precise formula.

- **Mileage Cost Calculator**  
  Quickly calculates and displays the cost per mile using inputted data such as total mileage and cost, making it easy to evaluate the value of miles and present a pie chart.

- **Airline Comparison Table**  
  Utilizes atomic state management with Jotai, simplifying the creation of a comparison table for airlines and improving efficiency and maintainability.

- **Web API with Authentication**  
  Implements a Web API with authentication functionality to secure the API and ensure that only authorized users can access specific resources or perform operations. This is achieved using JSON Web Tokens (JWT) for stateless and secure authentication.

- **Search History Table**  
  Stores submitted data in an array using Jotai, allowing users to quickly access and review previously entered records.

- **AutoComplete**  
  Features a dynamic AutoComplete dropdown that displays matching options in real-time. Users can enter keywords or directly click on suggested information to quickly select the desired item, improving input efficiency and reducing errors.


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
