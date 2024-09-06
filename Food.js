 
const express = require('express');
const app = express();
const port=3000;
app.use(express.json());
 
let users = [
{ id: 1, username: 'user1', password: 'pass1', email: 'user1@example.com' },
{ id: 2, username: 'user2', password: 'pass2', email: 'user2@example.com' },
{ id: 3, username: 'user3', password: 'pass3', email: 'user3@example.com' },
{ id: 4, username: 'user4', password: 'pass4', email: 'user4@example.com' },
{ id: 5, username: 'user5', password: 'pass5', email: 'user5@example.com' }
];
 
let restaurants = [
{ id: 1, name: 'Restaurant1', address: 'Address1', cuisineType: 'Cuisine1', contactInfo: 'Contact1' },
{ id: 2, name: 'Restaurant2', address: 'Address2', cuisineType: 'Cuisine2', contactInfo: 'Contact2' },
{ id: 3, name: 'Restaurant3', address: 'Address3', cuisineType: 'Cuisine3', contactInfo: 'Contact3' },
{ id: 4, name: 'Restaurant4', address: 'Address4', cuisineType: 'Cuisine4', contactInfo: 'Contact4' },
{ id: 5, name: 'Restaurant5', address: 'Address5', cuisineType: 'Cuisine5', contactInfo: 'Contact5' }
];
 
let orders = [
{ id: 1, userId: 1, restaurantId: 1, foodItems: ['Food1', 'Food2'], totalPrice: 20.0 },
{ id: 2, userId: 2, restaurantId: 2, foodItems: ['Food3', 'Food4'], totalPrice: 30.0 },
{ id: 3, userId: 3, restaurantId: 3, foodItems: ['Food5', 'Food6'], totalPrice: 40.0 },
{ id: 4, userId: 4, restaurantId: 4, foodItems: ['Food7', 'Food8'], totalPrice: 50.0 },
{ id: 5, userId: 5, restaurantId: 5, foodItems: ['Food9', 'Food10'], totalPrice: 60.0 }
];
 
let foods = [
{ id: 1, name: 'Food1', cuisineType: 'Cuisine1' },
{ id: 2, name: 'Food2', cuisineType: 'Cuisine2' },
{ id: 3, name: 'Food3', cuisineType: 'Cuisine3' },
{ id: 4, name: 'Food4', cuisineType: 'Cuisine4' },
{ id: 5, name: 'Food5', cuisineType: 'Cuisine5' }
];

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Online Food Delivery Management System!');
});
 
//Get All users
app.get('/users', (req, res) => {
res.send(users);
});





// User Authentication Endpoints

app.post('/users/register', (req, res) => {
const { username, password, email } = req.body;
const newUser = { id: users.length + 1, username, password, email };
users.push(newUser);
res.status(201).json(newUser);
});
 
app.post('/users/login', (req, res) => {
const { username, password } = req.body;
const user = users.find(u => u.username === username && u.password === password);
if (user) {
res.status(200).json({ message: 'Login successful' });
} else {
res.status(401).json({ message: 'Invalid credentials' });
}
});
 
// Restaurant Management Endpoints
//Add new restaurant
app.post('/restaurants', (req, res) => {
const { name, address, cuisineType, contactInfo } = req.body;
const newRestaurant = { id: restaurants.length + 1, name, address, cuisineType, contactInfo };
restaurants.push(newRestaurant);
res.status(201).json(newRestaurant);
});
 
app.get('/restaurants/:restaurantId', (req, res) => {
const restaurant = restaurants.find(r => r.id === parseInt(req.params.restaurantId));
if (restaurant) {
res.status(200).json(restaurant);
} else {
res.status(404).json({ message: 'Restaurant not found' });
}
});
 
// Order Processing Endpoints
app.post('/orders', (req, res) => {
const { userId, restaurantId, foodItems, totalPrice } = req.body;
const newOrder = { id: orders.length + 1, userId, restaurantId, foodItems, totalPrice };
orders.push(newOrder);
res.status(201).json(newOrder);
});
 
app.get('/orders/:orderId', (req, res) => {
const order = orders.find(o => o.id === parseInt(req.params.orderId));
if (order) {
res.status(200).json(order);
} else {
res.status(404).json({ message: 'Order not found' });
}
});
 
// User Profile Management Endpoints
app.put('/users/:userId', (req, res) => {
const user = users.find(u => u.id === parseInt(req.params.userId));
if (user) {
const { username, email } = req.body;
user.username = username;
user.email = email;
res.status(200).json(user);
} else {
res.status(404).json({ message: 'User not found' });
}
});
 
app.delete('/users/:userId', (req, res) => {
const userIndex = users.findIndex(u => u.id === parseInt(req.params.userId));
if (userIndex !== -1) {
users.splice(userIndex, 1);
res.status(204).send();
} else {
res.status(404).json({ message: 'User not found' });
}
});
 


// Food Search by Name Endpoint

app.get('/foods/search', (req, res) => {
    // Get the search query parameter
    const queryName = req.query.name ? req.query.name.toLowerCase() : '';

    // Filter foods based on the query parameter
    const results = foods.filter(food => 
        food.name && food.name.toLowerCase().includes(queryName)
    );

    // Return the filtered results
    res.json(results);
});

// Food Filter by Cuisine Type Endpoint
app.get('/foods/filter', (req, res) => {
    const { cuisine } = req.query;

    if (!cuisine) {
        return res.status(400).json({ message: 'Cuisine query parameter is required' });
    }

    const result = foods.filter(food => 
        food.cuisineType && food.cuisineType.toLowerCase() === cuisine.toLowerCase()
    );

    if (result.length > 0) {
        res.status(200).json(result);
    } else {
        res.status(404).json({ message: 'No food items found for this cuisine' });
    }
});





 
// Endpoint to show all data
app.get('/data', (req, res) => {
res.status(200).json({ users, restaurants, orders, foods });
});
 
// Start the server
app.listen(port, () => {
console.log(`Server is running on http://localhost:${port}`); });
 