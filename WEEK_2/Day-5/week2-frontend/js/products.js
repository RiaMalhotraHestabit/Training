const productContainer = document.getElementById("productContainer");
let products = [];  //to store products
//fetch all products and add on to products.html 
fetch("https://dummyjson.com/products")  
  .then(response => response.json())
  .then(data => {
    products = data.products;
    displayProducts(products);
  })
  .catch(error => {
    console.error("Error fetching products:", error);
  });
  function displayProducts(productList) {
  productContainer.innerHTML = "";

  productList.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.thumbnail}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>₹ ${product.price}</p>
    `;

    productContainer.appendChild(card);
  });
}

//search bar logic
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", () => {
  const searchText = searchInput.value.toLowerCase();

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchText)
  );

  displayProducts(filteredProducts);
});


// sort high -> low logic 
const sortBtn = document.getElementById("sortBtn");
sortBtn.addEventListener("click", () => {
  const sortedProducts = [...products].sort(
    (a, b) => b.price - a.price
  );

  displayProducts(sortedProducts);
});
