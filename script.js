
document.addEventListener("DOMContentLoaded", function () {

  const navbar = [
  { name: 'home', id: 'home' },
  { name: 'about', id: 'about' },
  {
    name: 'our products', id: 'our-products', child: [
    { name: 'product 1', id: 'p1' },
    { name: 'product 2', id: 'p2' },
    { name: 'product 3', id: 'p3' },
    { name: 'product 4', id: 'p4' },
    ]
  },
  { name: 'contact us', id: 'contact' },
  ];

  const navbarList = document.getElementById('navbar');
  const productList = document.getElementById('product-list'); // New ul for product list

  navbar.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `<a href="#${item.id}">${item.name}</a>`;

    if (item.child) {
      const subMenu = document.createElement('ul');
      subMenu.classList.add('submenu');
      subMenu.style.display = 'none';

      item.child.forEach(subItem => {
        subMenu.innerHTML += `<li><a href="#${subItem.id}">${subItem.name}</a></li>`;
      });
      li.appendChild(subMenu);

      li.addEventListener('mouseenter', () => {
        subMenu.style.display = 'block';
      });

      li.addEventListener('mouseleave', () => {
        subMenu.style.display = 'none';
      });
    }

    navbarList.appendChild(li);
  });

  // Smooth scrolling for navigation links
  navbarList.addEventListener('click', (event) => {
    event.preventDefault();
    if (event.target.tagName === 'A') {
          const targetId = event.target.getAttribute('href').substring(1); // Remove the '#' symbol
          const targetSection = document.getElementById(targetId);
          if (targetSection) {
            window.scrollTo({
              top: targetSection.offsetTop,
              behavior: 'smooth',
            });
          }
        }
      });

  // Fetch product data from the API
  const productContainer = document.querySelector('.product-container');

function fetchAndDisplayProducts() {
  fetch('https://api.escuelajs.co/api/v1/products')
    .then(response => response.json())
    .then(data => {
      data.forEach(product => {
        const productElement = document.createElement('li');
        productElement.className = 'product-card'; // Add the product-card class
        productElement.innerHTML = `
          <div class="imgBox">
            <img src="${product.images[0]}" alt="Product Image">
          </div>
          <div class="content">
            <h2>${product.name}</h2>
            <span>${product.description}</span>
            <p class="product-price">$${product.price.toFixed(2)}</p>
          </div>
        `;
        productContainer.appendChild(productElement);
      });
    })
    .catch(error => {
      console.error('Error fetching product data:', error);
    });
}

// Call the function to fetch and display products
fetchAndDisplayProducts();



  // JavaScript for the About section carousel
  const carouselContainer = document.querySelector('.carousel-container');
  const slides = document.querySelectorAll('.carousel-slide');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  let currentIndex = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.transform = `translateX(${100 * (i - index)}%)`;
    });
  }

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
          currentIndex = slides.length - 1; // Wrap to the last slide
        }
        showSlide(currentIndex);
      });

  nextBtn.addEventListener('click', () => {
    if (currentIndex < slides.length - 1) {
      currentIndex++;
    } else {
          currentIndex = 0; // Wrap to the first slide
        }
        showSlide(currentIndex);
      });

  // Initial slide display
  showSlide(currentIndex);



});




