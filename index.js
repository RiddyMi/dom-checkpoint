const products = [
    {
        id: 0,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4iaW7TglKR7Rcjpn2hwoba50PDRdqx6slwg&usqp=CAU',
        title: 'Air Jordan',
        price: 120,
    },
    {
        id: 1,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP7ci-yuE1KrNdWZ46RcSx-z5H4n8C1uY20g&usqp=CAU',
        title: 'Air Kyrie',
        price: 60,
    },
    {
        id: 2,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL3wRzaF-MyldkTlE-IKAymLlY9ghKVnda855nrfpa0MyuIrU8zDOb90w84l-gDIYmElU&usqp=CAU',
        title: '250D LeBron',
        price: 230,
    },
    {
        id: 3,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHcMrpDAvWyuqG3revF3VPwCwXaBI6jkOKpvtyPZfnN9jRtFU1BW94E7XPhEUaVnitNhs&usqp=CAU',
        title: 'Air Jokic',
        price: 100,
    },
    {
        id: 4,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYyPlFk-vBJsP_t5gCPrvehvm77Y3l3XkeWx2YEuwMs5OBdhYDdhQbLWnxnaLpZrjBSlQ&usqp=CAU',
        title: 'Air Caruso',
        price: 100,
    },
    {
        id: 5,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxbkGNynYJfZfCX4JzgmUtdpQla9SBzuk1pQ&usqp=CAU',
        title: 'Air Kuzma',
        price: 100,
    },
];



const root = document.getElementById('root');
const cart = [];
const sidebar = document.querySelector('.sidebar');

function displayProducts() {
    root.innerHTML = products.map(product => {
        const { id, image, title, price } = product;
        return `
            <div class='box'>
                <div class='img-box'>
                    <img class='images' src=${image} alt="${title}">
                </div>
                <div class='bottom'>
                    <p>${title}</p>
                    <h2>$ ${price}.00</h2>
                    <button onclick='addToCart(${id})'>Add to cart</button>
                    <i class='fa fa-heart' style='color: #daa520' onclick='toggleHeartColor(this)'></i>
                </div>
            </div>
        `;
    }).join('');
}

function addToCart(productId) {
    const productToAdd = products.find(product => product.id === productId);
    if (productToAdd) {
        const existingCartItem = cart.find(item => item.id === productId);
        if (existingCartItem) {
            existingCartItem.quantity += 1;
        } else {
            cart.push({ ...productToAdd, quantity: 1 });
        }
        displayCart();
        toggleSidebar(true);
    }
}

function toggleHeartColor(heartIcon) {
    if (heartIcon.style.color === 'red') {
        heartIcon.style.color = '#daa520'; // Change back to initial color
    } else {
        heartIcon.style.color = 'red'; // Change to red when clicked
    }
}

function displayCart() {
    let total = 0;
    document.getElementById("count").textContent = cart.length;

    if (cart.length === 0) {
        document.getElementById('cartItem').textContent = "Your cart is empty";
        document.getElementById("total").textContent = "$ 0.00";
    } else {
        const cartItemsHTML = cart.map((item, index) => {
            const { image, title, price, quantity } = item;
            const itemTotal = price * quantity;
            total += itemTotal;
            return `
                <div class='cart-item'>
                    <div class='row-img'>
                        <img class='rowimg' src=${image} alt="${title}">
                    </div>
                    <p style='font-size:12px;'>${title}</p>
                    <div class="quantity-controls">
                        <button onclick='decreaseCartItemQuantity(${index})'>-</button>
                        <span id="cart-quantity-${index}">${quantity}</span>
                        <button onclick='increaseCartItemQuantity(${index})'>+</button>
                    </div>
                    <h2 style='font-size: 15px;'>$ ${price}.00</h2>
                    <i class='fa fa-trash' style='color: #daa520' onclick='removeCartItem(${index})'></i>
                </div>
            `;
        }).join('');

        document.getElementById("cartItem").innerHTML = cartItemsHTML;
        document.getElementById("total").textContent = `$ ${total}.00`;
    }
}

function increaseCartItemQuantity(cartIndex) {
    if (cartIndex >= 0 && cartIndex < cart.length) {
        cart[cartIndex].quantity += 1;
        displayCart();
    }
}

function decreaseCartItemQuantity(cartIndex) {
    if (cartIndex >= 0 && cartIndex < cart.length) {
        if (cart[cartIndex].quantity > 0) {
            cart[cartIndex].quantity -= 1;
            displayCart();
        }
    }
}

function removeCartItem(cartIndex) {
    if (cartIndex >= 0 && cartIndex < cart.length) {
        cart.splice(cartIndex, 1);
        displayCart();
    }
}

function toggleSidebar(show) {
    if (show) {
        sidebar.classList.add('cart-visible');
    } else {
        sidebar.classList.remove('cart-visible');
    }
}

// Initialize the product display
displayProducts();