'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebase';

interface Product {
  id: string; // doc ID from firestore
  productName: string;
  productCategory: string;
  productPrice: number;
  // ..... add other fields later
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  // Fetch products from firestore
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, 'products');
        const querySnapshot = await getDocs(productsCollection);
        const productsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(), 
        })) as Product[];
        setProducts(productsList);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className='justify-items-center min-h-screen bg-gray-100'>
      <h1 className='text-4xl font-bold pt-20 text-gray-900'>Products</h1>
      {products.length === 0 ? (
        <p>No products available</p>
      ) : (
        <ul className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-20 mt-10'>
            {products.map((product) => (
                <li key={product.id} className='mb-4 space-y-3 border border-black rounded-md p-4 '>
                <h2 className='font-semibold text-2xl capitalize text-gray-800'>{product.productName}</h2>
                <div className='*:text-sm'>
                <p className='font-thin'><span className='font-semibold'>Category:</span> {product.productCategory}</p>
                <p>
                    <span className='font-semibold'>
                        Price: $
                    </span>
                    {typeof product.productPrice === 'number'
                    ? product.productPrice.toFixed(2)
                    : parseFloat(product.productPrice).toFixed(2)}
                </p>
                </div>
                <button
                    onClick={() => router.push(`/products/${product.id}`)}
                    className='w-full rounded-lg px-4 py-3 bg-orange-500 hover:bg-orange-700 cursor-pointer border-none text-white text-sm'
                >
                    Edit Product
                </button>
                </li>
            ))}
        </ul>

      )}
    </div>
  );
}
