// ADD PRODUCT
const newProductHandler = async (event) => {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      alert(`Error adding the product: ${res.statusText} (${res.status} )`);
      throw new Error("Failed to add a new product");
    }

    alert("Product added");
    form.reset();
  } catch (err) {
    throw new Error("Error", err);
  }
};

// UPDATE PRODUCT
const updateProductHandler = async (event) => {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    if (!data.id) {
      alert("Por favor, agregue el ID del producto");
      throw new Error("Failed to update the product");
    }

    const res = await fetch(`/api/products/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      alert(`Error updating the product: ${res.statusText} (${res.status})`);
      throw new Error("Failed to update the product");
    }

    alert("Product updated");
    form.reset();
  } catch (err) {
    throw new Error("Failed to update the product");
  }
};

// DELETE PRODUCT
const deleteProductHandler = async (event) => {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    if (!data.id) {
      alert("Please write a product ID");
      throw new Error("Failed to delete the product");
    }

    const res = await fetch(`/api/products/${data.id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert(`Error deleting the product: ${res.statusText} (${res.status} )`);
      throw new Error("Failed to delete the product");
    }

    alert("Product deleted");
    form.reset();
  } catch (err) {
    throw new Error("Failed to delete the product");
  }
};

document.querySelector("#formAddProduct").onsubmit = newProductHandler;
document.querySelector("#formUpdateProduct").onsubmit = updateProductHandler;
document.querySelector("#formDeleteProduct").onsubmit = deleteProductHandler;
