
const apiUrl = 'https://dummyjson.com/products';

const productsContainer = document.getElementById('productsContainer');
const categoryDropdown = document.getElementById('categoryDropdown');
const searchInput = document.getElementById('searchInput');
const submitBtn = document.getElementById('submitBtn');

let allProducts = [];

fetch(apiUrl)
  .then(response => response.json()) 
  .then(data => {
     allProducts = data.products; 
    fillCategoryDropdown(allProducts); 
    showProducts(allProducts); 
  });

function shortenDescription(text, limit = 150) {
  if (text.length > limit) {
    return text.slice(0, limit) + '...';
  } else {
    return text;
  }
}

function fillCategoryDropdown(products) {
  const categories = [...new Set(products.map(product => product.category))];

  categoryDropdown.innerHTML = '<option value="all">All Categories</option>';

  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryDropdown.appendChild(option);
  });
}


function showProducts(products) {
  productsContainer.innerHTML = ''; 
  products.forEach(product => {
  
    const productCard = document.createElement('div');
    productCard.className = 'product';

    
    productCard.innerHTML = `
      <img src="${product.thumbnail}" alt="${product.title}" />
      <h3>${product.title}</h3>
      <p>${shortenDescription(product.description)}</p>
      <div class="meta">Place: Unknown</div>
      <div class="meta">Category: ${product.category}</div>
    `;
    productsContainer.appendChild(productCard);
  });
}
submitBtn.addEventListener('click', () => {
  const searchText = searchInput.value.toLowerCase(); 
  const selectedCategory = categoryDropdown.value;

  let filteredProducts = allProducts.filter(product => {
    return (
      product.title.toLowerCase().includes(searchText) ||
      product.description.toLowerCase().includes(searchText)
    );
  });
  if (selectedCategory !== 'all') {
    filteredProducts = filteredProducts.filter(product => product.category === selectedCategory);
  }
  showProducts(filteredProducts);
});
