const socket = io();

const productsCards = document.querySelector(".products-container");
const newProductForm = document.querySelector("#formAddProduct");
const updateProductForm = document.querySelector("#formUpdateProduct");
const deleteProductForm = document.querySelector("#formDeleteProduct");

socket.on("products-list", async (data) => {
  const products = data.products || [];

  productsCards.innerHTML = "";

  await products.forEach((product) => {
    const productCardContainer = document.createElement("article");
    const productCardFigure = document.createElement("figure");
    const productCardImg = document.createElement("img");
    const productCardTextContainer = document.createElement("div");
    const productCardTitle = document.createElement("h2");
    const productCardDescription = document.createElement("p");
    const productCardPrice = document.createElement("p");
    const productCardButton = document.createElement("button");

    // CONTENT
    productCardImg.src = `/api/public/images/${product.thumbnail}`;
    productCardImg.alt = product.name;
    productCardTitle.textContent = product.name;
    productCardPrice.textContent = product.price;
    productCardDescription.textContent = product.description;
    productCardButton.textContent = "Add to cart";

    // STYLES
    productCardContainer.className = "product-card";
    productCardImg.className = "product-card_image";
    productCardPrice.className = "product-card_price";
    productCardButton.className = "product-card_btn";

    // product ID
    productCardContainer.id = product.id;

    // ADD BTN EVENT
    productCardButton.onclick = (e) => emitAddProduct(e);

    productCardFigure.append(productCardImg);
    productCardTextContainer.append(
      productCardTitle,
      productCardPrice,
      productCardDescription,
      productCardButton
    );

    productCardContainer.append(productCardFigure, productCardTextContainer);
    productsCards.append(productCardContainer);
  });
});

newProductForm.onsubmit = async (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);

  form.reset();

  await socket.emit("new-product", {
    name: formData.get("name"),
    brand: formData.get("brand"),
    category: formData.get("category"),
    price: formData.get("price"),
    description: formData.get("description"),
    stock: formData.get("stock"),
    thumbnail: "",
    status: true,
  });

  await Swal.fire({
    title: "Product added",
    icon: "success",
    width: 600,
  });
};

updateProductForm.onsubmit = async (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);

  form.reset();

  await socket.emit("update-product", {
    id: formData.get("id"),
    data: {
      name: formData.get("name"),
      brand: formData.get("brand"),
      category: formData.get("category"),
      price: formData.get("price"),
      description: formData.get("description"),
      stock: formData.get("stock"),
      thumbnail: formData.get("thumbnail") || null,
      status: true,
    },
  });

  await Swal.fire({
    title: `Product ID ${formData.get("id")} updated`,
    icon: "success",
    width: 600,
  });
};

deleteProductForm.onsubmit = async (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);

  form.reset();

  const id = formData.get("id");

  await socket.emit("delete-product", { id: id });

  await Swal.fire({
    title: `Product ID ${id} deleted`,
    icon: "success",
    width: 600,
  });
};

async function emitAddProduct(e) {
  e.preventDefault();
  const product = e.target.parentElement.parentElement;

  await socket.emit("add-product-cart", { cart: 1, product: product.id });

  await Swal.fire({
    toast: true,
    icon: "success",
    title: "Product added to cart",
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
}

// ERRORS
socket.on("err-message", async (data) => {
  await Swal.fire({
    title: `${data.message}`,
    icon: "error",
    width: 600,
  });
});
