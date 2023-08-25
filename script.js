const navbar = [
    { name: 'home', id: 'home' },
    { name: 'about', id: 'about' },
    {
        name: 'our products', id: 'product', child: [
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

// Fetch product data from the API
fetch('https://api.escuelajs.co/api/v1/products')
  .then(response => response.json())
  .then(data => {
      data.forEach(product => {
          const productElement = document.createElement('li');
          productElement.innerHTML = `
              <h2>${product.name}</h2>
              <p>${product.description}</p>
              <p>Price: $${product.price}</p>
              <img src="${product.images[0]}" alt="Product Image">
          `;
          productList.appendChild(productElement);
      });
  })
  .catch(error => {
      console.error('Error fetching product data:', error);
  });
