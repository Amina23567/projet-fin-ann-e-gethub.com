const cartIcon = document.getElementById('cart-icon');
const cartContent = document.getElementById('cart-content');
const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');

let isDragging = false;
let offsetX, offsetY;

let cart = [];
let total = 0;

// Toggle cart content
cartIcon.addEventListener('click', (e) => {
  if (isDragging) return;
  if (cartContent.style.display === 'block') {
    cartContent.style.display = 'none';
  } else {
    cartContent.style.display = 'block';
    positionCartContent();
  }
});
           function toggleMenu() {
      document.querySelector('.menu').classList.toggle('active');
    }

      const burger = document.querySelector('.burger');
  const menuUL = document.querySelector('.menu > ul');
  const categories = document.querySelector('.has-sous-nav');

  burger.addEventListener('click', () => {
    menuUL.classList.toggle('active');
  });

// Dragging
cartIcon.addEventListener('pointerdown', (e) => {
  isDragging = true;
  offsetX = e.clientX - cartIcon.getBoundingClientRect().left;
  offsetY = e.clientY - cartIcon.getBoundingClientRect().top;
  cartIcon.style.transition = 'none';
});

window.addEventListener('pointermove', (e) => {
  if (!isDragging) return;
  e.preventDefault();
  let left = e.clientX - offsetX;
  let top = e.clientY - offsetY;

  const minLeft = 0;
  const minTop = 0;
  const maxLeft = window.innerWidth - cartIcon.offsetWidth;
  const maxTop = window.innerHeight - cartIcon.offsetHeight;
  left = Math.min(Math.max(left, minLeft), maxLeft);
  top = Math.min(Math.max(top, minTop), maxTop);

  cartIcon.style.left = left + 'px';
  cartIcon.style.top = top + 'px';
  cartIcon.style.right = 'auto';
  cartIcon.style.bottom = 'auto';

  if (cartContent.style.display === 'block') {
    positionCartContent();
  }
});

window.addEventListener('pointerup', () => {
  isDragging = false;
  cartIcon.style.transition = '';
});

// Position content near icon
function positionCartContent() {
  const iconRect = cartIcon.getBoundingClientRect();
  const contentWidth = cartContent.offsetWidth;

  let left = iconRect.left - contentWidth - 10;
  if (left < 0) {
    left = iconRect.right + 10;
  }

  let top = iconRect.top;
  if (top + cartContent.offsetHeight > window.innerHeight) {
    top = window.innerHeight - cartContent.offsetHeight - 10;
  }
  if (top < 0) top = 10;

  cartContent.style.left = left + 'px';
  cartContent.style.top = top + 'px';
}

// Click outside to close
document.addEventListener('click', (e) => {
  if (!cartIcon.contains(e.target) && !cartContent.contains(e.target)) {
    cartContent.style.display = 'none';
  }
});

// Add to cart
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    const product = button.parentElement;
    const name = product.querySelector('h3').innerText;
    const priceText = product.querySelector('p').innerText;
    const price = parseInt(priceText.replace(/\D/g,''));
    cart.push({ name, price });
    total += price;
    cartCount.innerText = cart.length;
    updateCart();
  });
});

function updateCart() {
  cartItems.innerHTML = '';
  cart.forEach(item => {
    const li = document.createElement('li');
    li.innerText = `${item.name} - ${item.price} MAD`;
    cartItems.appendChild(li);
  });
  cartTotal.innerText = total;
}