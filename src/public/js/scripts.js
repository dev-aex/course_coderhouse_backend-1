const addProductTab = document.querySelector("#addProductTab");
const updateProductTab = document.querySelector("#updateProductTab");
const deleteProductTab = document.querySelector("#deleteProductTab");

const addProductSection = document.querySelector("#addProductSection");
const updateProductSection = document.querySelector("#updateProductSection");
const deleteProductSection = document.querySelector("#deleteProductSection");

addProductTab.addEventListener("click", () => {
  addProductTab.className = "tab--enable";
  addProductSection.className = "visible";

  updateProductTab.className = "tab--disable";
  updateProductSection.className = "hidden";

  deleteProductTab.className = "tab--disable";
  deleteProductSection.className = "hidden";
});

updateProductTab.addEventListener("click", () => {
  addProductTab.className = "tab--disable";
  addProductSection.className = "hidden";

  updateProductTab.className = "tab--enable";
  updateProductSection.className = "visible";

  deleteProductTab.className = "tab--disable";
  deleteProductSection.className = "hidden";
});

deleteProductTab.addEventListener("click", () => {
  addProductTab.className = "tab--disable";
  addProductSection.className = "hidden";

  updateProductTab.className = "tab--disable";
  updateProductSection.className = "hidden";

  deleteProductTab.className = "tab--enable";
  deleteProductSection.className = "visible";
});
