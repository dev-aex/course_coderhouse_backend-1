const socket = io();

const cartContainer = document.querySelector(".cart-container");

socket.on("cart-list", (data) => {
  const cart = Object.values(data).flat() || [];

  cartContainer.innerHTML = "";

  if (cart.length > 0) {
    cart.forEach((product) => {
      const cartProductContainer = document.createElement("article");
      const deleteBtnContainer = document.createElement("div");
      const deleteBtn = document.createElement("button");
      const productImgContainer = document.createElement("figure");
      const productImg = document.createElement("img");
      const quantityContainer = document.createElement("div");
      const quantityPlus = document.createElement("button");
      const quantityMinus = document.createElement("button");
      const quantity = document.createElement("p");
      const cartTextContainer = document.createElement("div");
      const cartProductName = document.createElement("h2");
      const cartProductPrice = document.createElement("p");

      // CONTENT
      deleteBtn.textContent = "X";
      quantityPlus.textContent = "+";
      quantityMinus.textContent = "-";
      quantity.textContent = product.quantity;
      productImg.src = `/api/public/images/${product.thumbnail}`;
      productImg.alt = product.name;
      cartProductName.textContent = product.name;
      cartProductPrice.textContent = product.price;

      // STYLES
      cartProductContainer.className = "cart-card";
      deleteBtnContainer.className = "cart-card_btn-delete-container";
      deleteBtn.className = "cart-card_btn-delete";
      productImg.className = "cart-card_image";
      quantityContainer.className = "cart-card_quantity-container";
      quantityPlus.className = "cart-card_btn-plus";
      quantity.className = "cart-card_quantity";
      quantityMinus.className = "cart-card_btn-minus";
      cartTextContainer.className = "cart-card_text-container";
      cartProductName.className = "cart-card_text-name";
      cartProductPrice.className = "cart-card_text-price";

      // EVENT
      deleteBtn.onclick = (e) => {
        e.preventDefault();
        const product = e.target.parentElement.parentElement;

        const id = Number(product.id);

        socket.emit("delete-product-cart", {
          cart: 1,
          product: id,
        });

        Swal.fire({
          toast: true,
          icon: "success",
          title: "Product deleted",
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          with: 600,
        });
      };

      // ID
      cartProductContainer.id = product.id;

      // LAYOUT
      deleteBtnContainer.appendChild(deleteBtn);
      productImgContainer.appendChild(productImg);
      quantityContainer.append(quantityMinus, quantity, quantityPlus);
      cartTextContainer.append(cartProductName, cartProductPrice);

      cartProductContainer.append(
        deleteBtnContainer,
        productImgContainer,
        quantityContainer,
        cartTextContainer
      );

      cartContainer.appendChild(cartProductContainer);
    });
  } else {
    const emptyCartContainer = document.createElement("div");
    emptyCartContainer.className = "cart-card_empty-container";

    emptyCartContainer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#808080" height="100px" width="100px" version="1.1" id="Icons" viewBox="0 0 32 32" xml:space="preserve">
<path d="M30.8,2.6l-1.4-1.4c-0.3-0.3-0.9-0.4-1.3-0.1l-4.3,2.9c-0.2,0.2-0.4,0.4-0.4,0.7c0,0.3,0.1,0.6,0.3,0.8l0,0l-5.3,5.3  L1.8,15.9c-0.4,0.1-0.7,0.5-0.7,0.9c0,0.4,0.2,0.8,0.6,1l9,3.5l3.5,9c0.1,0.4,0.5,0.6,0.9,0.6c0,0,0,0,0,0c0.4,0,0.8-0.3,0.9-0.7  L21.4,13l-2.5,2.5c-0.4,0.4-1,0.4-1.4,0c-0.2-0.2-0.3-0.5-0.3-0.7l7.9-7.9l0.7,0.7c0,0,0,0,0,0l0.7,0.7c0.2,0.2,0.4,0.3,0.7,0.3  c0,0,0.1,0,0.1,0c0.3,0,0.6-0.2,0.7-0.4l2.9-4.3C31.2,3.5,31.2,3,30.8,2.6z M15.8,20.5c-0.2,0.2-0.5,0.3-0.7,0.3s-0.5-0.1-0.7-0.3  l-2.9-2.9c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l2.9,2.9C16.2,19.5,16.2,20.1,15.8,20.5z"/>
</svg>`;

    const emptyCartTitle = document.createElement("h1");
    emptyCartTitle.textContent = "No guitars!";
    emptyCartTitle.className = "cart-card_empty-title";
    emptyCartContainer.append(emptyCartTitle);
    cartContainer.append(emptyCartContainer);
  }
});

// ERRORS
socket.on("err-message", async (data) => {
  await Swal.fire({
    title: `${data.message}`,
    icon: "error",
    width: 600,
  });
});
