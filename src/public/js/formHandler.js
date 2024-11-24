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
      Swal.fire({
        title: "Error",
        text: `Error adding the product: ${res.statusText} (${res.status} )`,
        icon: "error",
        width: 600,
      });
      throw new Error("Failed to add a new product");
    }

    Swal.fire({
      title: "Product added",
      icon: "success",
      width: 600,
    });

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
      Swal.fire({
        title: "Error",
        text: "Please add a product ID",
        icon: "warning",
        width: 600,
      });
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
      Swal.fire({
        title: "Error",
        text: `Error updating the product: ${res.statusText} (${res.status} )`,
        icon: "error",
        width: 600,
      });
      throw new Error("Failed to update the product");
    }

    Swal.fire({
      title: `Product ID ${data.id} updated`,
      icon: "success",
      width: 600,
    });
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
      Swal.fire({
        title: "Error",
        text: "Please add a product ID",
        icon: "warning",
        width: 600,
      });
      throw new Error("Failed to delete the product");
    }

    const res = await fetch(`/api/products/${data.id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      Swal.fire({
        title: "Error",
        text: `Error deleting the product: ${res.statusText} (${res.status} )`,
        icon: "error",
        width: 600,
      });
      throw new Error("Failed to delete the product");
    }

    Swal.fire({
      title: `Product ID ${data.id} deleted`,
      icon: "success",
      width: 600,
    });

    form.reset();
  } catch (err) {
    throw new Error("Failed to delete the product");
  }
};

document.querySelector("#formAddProduct").onsubmit = newProductHandler;
document.querySelector("#formUpdateProduct").onsubmit = updateProductHandler;
document.querySelector("#formDeleteProduct").onsubmit = deleteProductHandler;
