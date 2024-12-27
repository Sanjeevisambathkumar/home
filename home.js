document.addEventListener('DOMContentLoaded', fetchRestaurants);

function fetchRestaurants() {
    fetch('http://localhost:3000/restaurants')
        .then(response => response.json())
        .then(data => {
            const restaurantList = document.getElementById('restaurant-list');
            restaurantList.innerHTML = '';
            data.forEach(restaurant => {
                const card = `
                    <div class="restaurant-card">
                        <h3>${restaurant.name}</h3>
                        <p>${restaurant.cuisine}</p>
                        <button onclick="orderFood('${restaurant.name}')">Order Now</button>
                    </div>`;
                restaurantList.innerHTML += card;
            });
        })
        .catch(error => console.error('Error fetching restaurants:', error));
}

function searchRestaurants() {
    const query = document.getElementById('search-bar').value.toLowerCase();
    fetch('http://localhost:3000/restaurants')
        .then(response => response.json())
        .then(data => {
            const filteredRestaurants = data.filter(restaurant => 
                restaurant.name.toLowerCase().includes(query) ||
                restaurant.cuisine.toLowerCase().includes(query)
            );

            const restaurantList = document.getElementById('restaurant-list');
            restaurantList.innerHTML = '';
            filteredRestaurants.forEach(restaurant => {
                const card = `
                    <div class="restaurant-card">
                        <h3>${restaurant.name}</h3>
                        <p>${restaurant.cuisine}</p>
                        <button onclick="orderFood('${restaurant.name}')">Order Now</button>
                    </div>`;
                restaurantList.innerHTML += card;
            });

            if (filteredRestaurants.length === 0) {
                restaurantList.innerHTML = '<p>No results found.</p>';
            }
        })
        .catch(error => console.error('Error searching restaurants:', error));
}

function orderFood(name) {
    alert(`Order placed for ${name}`);
}
