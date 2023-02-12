const deleteProduct = (btn) => {
  const prodId = btn.parentNode.querySelector("[name-productId]").value;
  const csrf = btn.parentNode.querySelector("[name_csrf]").value;

  const productElement = btn.closest("article");

  fetch("/admin/product/" + prodId, {
    method: "DELETE",
    headers: {
      "csrf-troken": csrf,
    },
  })
    .then((result) => {
      console.log(result);
    })
    .then((data) => {
      console.log(data);
      productElement.parentNode.removeChild(productElement);
    })
    .catch((err) => {
      console.log(err);
    });
};
