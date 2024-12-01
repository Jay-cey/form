"use client";

import UpdateProductForm from "../../components/UpdateProductForm";

export default function NewProductPage() {
  return (
    <div className="pt-11">
      {/* <h1>Create New Product</h1> */}
      <UpdateProductForm productId={undefined} />
    </div>
  );
}