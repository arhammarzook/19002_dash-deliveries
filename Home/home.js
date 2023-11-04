let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', () => {
    body.classList.add('active');
})
closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
})

let products = [{
        id: 1,
        name: 'Kebab',
        image: 'kebab.png',
        price: 13.00
    },
    {
        id: 2,
        name: 'Pizza',
        image: 'pizza.png',
        price: 18.00
    },
    {
        id: 3,
        name: 'Beef',
        image: 'beef.png',
        price: 25.00
    },
    {
        id: 4,
        name: 'Burger',
        image: 'burger.png',
        price: 12.00
    },
    {
        id: 5,
        name: 'Chips',
        image: 'chips.png',
        price: 6.00
    },
    {
        id: 6,
        name: 'Desert',
        image: 'desert.png',
        price: 8.00
    },    
                {
                    id: 7,
                    name: 'Sandwich',
                    image: 'sandwich.png',
                    price: 13.00
                }, 
                
                {
                    id: 8,
                    name: 'Hotdog',
                    image: 'hotdog.png',
                    price: 12.50
                },
                
                {
                    id: 9,
                    name: 'Pancake',
                    image: 'pancake.png',
                    price: 8.50
                }, 
                {
                    id: 10,
                    name: 'Salad',
                    image: 'salad.png',
                    price: 10.00
                }, 
                {
                    id: 11,
                    name: 'Smoothie',
                    image: 'smoothie.png',
                    price: 6.00
                }, 
                {
                    id: 12,
                    name: 'Sundae',
                    image: 'sundae.png',
                    price: 12.00
                }, 
                {
                    id: 13,
                    name: 'Sushi',
                    image: 'sushi.png',
                    price: 12.50
                }, 
                {
                    id: 14,
                    name: 'Taco',
                    image: 'taco.png',
                    price: 8.50
                }, 

                {
                    id: 15,
                    name: 'Waffle',
                    image: 'waffle.png',
                    price: 12.00
                }, 

                {
                    id: 16,
                    name: 'Wings',
                    image: 'wings.png',
                    price: 10.00
                }, 

              
    
                
];
let listCards = [];

function initApp() {
    products.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="imgs/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">$ ${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Cart</button>`;
        list.appendChild(newDiv);
    })
}
initApp();

function addToCard(key) {
    if (listCards[key] == null) {
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}

function reloadCard() {
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key) => {
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if (value != null) {
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="imgs/${value.image}"/></div>
                <div>${value.name}</div>
                <div>$ ${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
            listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}

function changeQuantity(key, quantity) {
    if (quantity == 0) {
        delete listCards[key];
    } else {
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}