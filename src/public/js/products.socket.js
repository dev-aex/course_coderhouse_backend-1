const socket = io();

const productsCards = document.querySelector(".products-container");
const newProductForm = document.querySelector("#formAddProduct");
const updateProductForm = document.querySelector("#formUpdateProduct");
const deleteProductForm = document.querySelector("#formDeleteProduct");

socket.on("products-list", (data) => {
  const products = data.products || [];

  productsCards.innerHTML = "";

  products.forEach((product) => {
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
    productCardTitle.textContent = product.name;
    productCardPrice.textContent = product.price;
    productCardDescription.textContent = product.description;
    productCardButton.textContent = "Add to cart";

    // STYLES
    productCardContainer.className = "product-card";
    productCardImg.className = "product-card_image";
    productCardPrice.className = "product-card_price";
    productCardButton.className = "product-card_btn";

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

newProductForm.onsubmit = (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);

  form.reset();

  socket.emit("new-product", {
    name: formData.get("name"),
    brand: formData.get("brand"),
    category: formData.get("category"),
    price: formData.get("price"),
    description: formData.get("description"),
    stock: formData.get("stock"),
    thumbnail: "",
    status: true,
  });

  Swal.fire({
    title: "Product added",
    icon: "success",
    width: 600,
  });
};

updateProductForm.onsubmit = (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);

  form.reset();

  socket.emit("update-product", {
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

  Swal.fire({
    title: `Product ID ${formData.get("id")} updated`,
    icon: "success",
    width: 600,
  });
};

deleteProductForm.onsubmit = (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);

  form.reset();

  const id = formData.get("id");

  socket.emit("delete-product", { id: id });

  Swal.fire({
    title: `Product ID ${id} deleted`,
    icon: "success",
    width: 600,
  });
};

socket.on("err-message", (data) => {
  Swal.fire({
    title: `${data.message}`,
    icon: "error",
    width: 600,
  });
});
