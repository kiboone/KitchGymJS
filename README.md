# KitchGymJS

KitchGym is a web-based application used for managing personal fitness and nutrition. A simple user interface allows the user create an account and sign into the application. The application is split into two main functionailites: the "Kitchen" and the "Gym". On the gym side, users can create a view custom workouts. Users selected their desired target muscle groups, and a workout of randomly selected exercises matching those muscle groups will be created and saved. These workouts, and their exercises, can be viewed in another page of the application. We believe that healthy choices start with mindful behavior, and the bests way to analyze one's own eating habits is to track them over time. On the Kitchen side, users can search for foods they have eaten to view their macros and add them to their total calorie count. Users can track their daily total calories in the "Calorie Log".

## Set-up
xampp - host local MySql server  
npm run start - start React application  
node connect.js (in src) - start node.js  

## APIs
Nutrition Facts: This API is NodeJs wrapper of the USDA Food Composition Database API (NDB API), which provides the ability to search a large database of food items, and returns their individual macro values, such as proteins, carbohydrates, and fats.
