const cartCounter = document.getElementById("CartCount");

// Set the counter based on cookie
count_cookie_cart_items();
show_checkout_page();


document.addEventListener('click', function(event) {

  // If the clicked element doesn't have the right selector, bail
  if (event.target.matches('.cart-button')) {
    // Add to cookies to track the items
    add_cart_cookie(event.target.getAttribute('item-id'))

    // Add to Cart Counter

    cartCounter.innerHTML = Number(cartCounter.innerHTML) + 1
  }

}, false);

async function show_checkout_page() {
  // Get the items from the cookie
  cart_items = document.cookie.substring(5).split(',')
  let unique_items = cart_items.filter((item, i, ar) => ar.indexOf(item) === i);
  console.log(unique_items);

  const response = await fetch(api_url);
  let data = await response.json();

  let element = `<div class="checkout-container">`;
  let cart_total_price = 0

  unique_items.forEach(function(item_id) {
      let count = cart_items.reduce((n, x) => n + (x === item_id), 0);


      // Dynamically add the items
      data.some(function(item) {
        if (item.id == item_id) {
          // Compute for total price per item
          let total_item_price = Number(item.item_price) * count;
          cart_total_price = cart_total_price + total_item_price;

          element += `<div class='cart-item'>`
          element += `<img src='${item.item_image}'>`
          element += `<p class="item-name">${item.item_name}</p>`;
          element += `<p class="cart-count">x ${count}</p>`;
          element += `<p class="item-price">$ ${item.item_price}</p>`;
          element += `<p class="item-total-price">Total: $ ${total_item_price}</p>`;
          element += `</div>`;

        }
      })

    });

    element += `</div>`; // End of DIV.container
    element += `<div class="total-cart-price">$ ${cart_total_price}</div>`
    document.getElementById("checkout-page").innerHTML = element;
}

function add_cart_cookie(item_id) {
  // Get current cookie
  cart_cookie = document.cookie

  if (cart_cookie == '') {
    console.log('Cart is empty');
    cart_cookie = 'cart='
    cart_cookie += item_id;
  } else {
    cart_cookie += "," + item_id;
  }

  document.cookie = cart_cookie;
  console.log(document.cookie);
}

function count_cookie_cart_items() {
  if (document.cookie == '') {
    // Do nothing. Keep the counter at zero.
  } else {
    let count = document.cookie.split(',').length;
    cartCounter.innerHTML = count;
  }
}