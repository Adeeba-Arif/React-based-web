// ProductDetail.js
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../slices/productSlice';

const ProductDetail = () => {
  const { productId } = useParams(); // Fetch productId from URL
  const dispatch = useDispatch();
  const { product, isLoading, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (!product || product.id !== parseInt(productId)) {
      dispatch(fetchProducts(productId)); // Fetch product by ID if not found
    }
  }, [dispatch, productId, product]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error || !product) {
    return <p className="text-center text-red-500">Product not found or failed to load.</p>;
  }

  return (
    <div className="flex flex-col md:flex-row items-center gap-8 p-6 md:p-12 bg-gray-100">
      {/* Image Section */}
      <div className="flex-1">
        <img
          src={product.images[0]}
          alt={product.title}
          className="rounded-lg w-full h-auto object-cover"
        />
      </div>

      {/* Product Info Section */}
      <div className="flex-1 flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-blue-900">{product.title}</h1>
        <p className="text-lg text-gray-700">{product.description}</p>
        <span className="text-2xl font-semibold text-green-700">${product.price.toFixed(2)}</span>
        <button className="mt-4 bg-blue-700 text-white py-2 px-6 rounded-lg hover:bg-blue-800 transition-all">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
