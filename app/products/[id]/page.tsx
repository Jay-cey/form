"use client";

import { useParams } from "next/navigation";
import UpdateProductForm from "../../components/UpdateProductForm";

export default function UpdateProductPage() {
  const { id } = useParams();

  const productId = Array.isArray(id) ? id[0] : id;

  return (
    <div>
      {/* <h1>Edit Product</h1> */}
      <UpdateProductForm productId={productId} />
    </div>
  );
}



// "use client";

// import { useParams } from "next/navigation";
// import UpdateProductForm from "../../components/UpdateProductForm";

// export default function UpdateProductPage() {
//   const params = useParams();
//   const id = params?.id as string | undefined;

//   // Ensure id is a single string
//   const productId = Array.isArray(id) ? id[0] : id;

//   return (
//     <div>
//       <h1>Edit Product</h1>
//       <UpdateProductForm productId={productId} />
//     </div>
//   );
// }