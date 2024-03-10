const Products = [
    {id: 1, name: 'Product-1', price: 100},
    {id: 2, name: 'Product-2', price: 200},
    {id: 3, name: 'Product-3', price: 300}
  ];

  const cart = [];

  function renderProducts() {
    const productsList = document.getElementById('products');
    productsList.innerHTML = '';
    Products.forEach(product => {
      const li = document.createElement('li');
      li.classList.add('product-item');
      li.innerHTML = `
        ${product.name} - $${product.price}
        <button onclick="addToCart(${product.id})">+</button>
        <button onclick="removeFromCart(${product.id})">-</button>
      `;
      productsList.appendChild(li);
    });
  }

  function renderCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    cart.forEach(item => {
      const li = document.createElement('div');
      li.classList.add('cart-item');
      li.textContent = `${item.name} - Quantity: ${item.quantity}`;
      cartItems.appendChild(li);
    });

    const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    document.getElementById('cart-total').textContent = `Total: $${totalPrice}`;
  }

  function addToCart(productId) {
    const product = Products.find(p => p.id === productId);
    const itemInCart = cart.find(item => item.id === productId);

    if (itemInCart) {
      itemInCart.quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    renderCart();
  }

  function removeFromCart(productId) {
    const itemIndex = cart.findIndex(item => item.id === productId);

    if (itemIndex !== -1) {
      if (cart[itemIndex].quantity > 1) {
        cart[itemIndex].quantity--;
      } else {
        cart.splice(itemIndex, 1);
      }
    }

    renderCart();
  }

  // Initial rendering
  renderProducts();
  renderCart();