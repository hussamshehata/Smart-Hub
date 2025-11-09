import React, { useState, useEffect } from 'react';
import { Heart, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/Cartslice';
import { useParams, useNavigate } from 'react-router-dom';
import ProductCarousel from '@/Components/ProductCarousel.jsx';

export default function ProductDetails() {
  const [selectedColor, setSelectedColor] = useState('black');
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    try {
      const productsData = localStorage.getItem('products');
      if (productsData) {
        const products = JSON.parse(productsData);
        const foundProduct = products.find(p => p.id === parseInt(id) || p.id === id);
        
        if (foundProduct) {
          setProduct(foundProduct);
          if (foundProduct.colors && foundProduct.colors.length > 0) {
            setSelectedColor(foundProduct.colors[0].value);
          }
        } else {
          console.error('Product not found');
        
        }
      }
    } catch (error) {
      console.error('Error loading product from localStorage:', error);
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  const handleAddToCart = () => {
    if (!product) return;

    dispatch(addToCart({
      id: product.id,
      name: product.name || product.title,
      price: product.price,
      color: colors.find(c => c.value === selectedColor)?.name || selectedColor,
      size: product.size || '',
      image: product.image || (product.images && product.images[0]) || '🛋️',
      quantity: quantity
    }));
  };

  const images = product?.images || [
    product?.image,
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
    'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80'
  ];

  const colors = product?.colors || [
    { name: 'Black', value: 'black', hex: '#000000' },
    { name: 'Gray', value: 'gray', hex: '#9CA3AF' },
    { name: 'Red', value: 'red', hex: '#DC2626' },
    { name: 'White', value: 'white', hex: '#FFFFFF' }
  ];

  const thumbnails = product?.thumbnails || images;

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };


  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/shop')}
            className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex text-sm text-gray-500">
            <span className="hover:text-gray-700 cursor-pointer" onClick={() => navigate('/')}>Home</span>
            <span className="mx-2">/</span>
            <span className="hover:text-gray-700 cursor-pointer" onClick={() => navigate('/shop')}>Shop</span>
            <span className="mx-2">/</span>
            <span className="hover:text-gray-700 cursor-pointer">{product.category || 'Living Room'}</span>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">Product</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Images */}
          <div>
            {/* Main Image */}
            <div className="relative bg-white rounded-lg overflow-hidden mb-4 group">
              <div className="absolute top-4 left-4 z-10">
                {product.isNew && (
                  <span className="bg-green-500 text-white px-3 py-1 rounded text-sm font-semibold">
                    NEW
                  </span>
                )}
                {product.discount && (
                  <span className="bg-green-500 text-white px-3 py-1 rounded text-sm font-semibold ml-2">
                    -{product.discount}%
                  </span>
                )}
              </div>
              
              <img 
                src={images[selectedImage]} 
                alt={product.name || product.title} 
                className="w-full h-96 object-cover"
              />
              
              <button 
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <button 
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-3 gap-4">
              {thumbnails.map((thumb, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`bg-white rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === idx ? 'border-black' : 'border-transparent'
                  }`}
                >
                  <img src={thumb} alt={`Thumbnail ${idx + 1}`} className="w-full h-24 object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div>
            {/* Rating */}
            <div className="flex items-center gap-2 mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${
                      i < (product.rating || 5) ? 'fill-black text-black' : 'fill-gray-300 text-gray-300'
                    }`} 
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">{product.reviews || 11} Reviews</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {product.name || product.title}
            </h1>

            {/* Description */}
            <p className="text-gray-600 mb-6">
              {product.description || 'Buy one or buy a few and make every space where you sit more convenient. Light and easy to move around with removable tray top, handy for serving snacks.'}
            </p>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold text-gray-900">
                ${product.price?.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-gray-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Timer - Only show if product has timer data */}
            {product.offerExpires && (
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-2">Offer expires in:</p>
                <div className="flex gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold">02</div>
                    <div className="text-xs text-gray-500">Days</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">12</div>
                    <div className="text-xs text-gray-500">Hours</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">45</div>
                    <div className="text-xs text-gray-500">Minutes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">05</div>
                    <div className="text-xs text-gray-500">Seconds</div>
                  </div>
                </div>
              </div>
            )}

            <hr className="my-6" />

            {/* Measurements */}
            {product.measurements && (
              <div className="mb-6">
                <p className="text-sm font-semibold text-gray-700 mb-2">Measurements</p>
                <p className="text-lg">{product.measurements}</p>
              </div>
            )}

            {/* Color Selection */}
            {colors && colors.length > 0 && (
              <div className="mb-6">
                <p className="text-sm font-semibold text-gray-700 mb-3">
                  Choose Color <span className="font-normal text-gray-500">1</span>
                </p>
                <p className="text-base mb-3">{colors.find(c => c.value === selectedColor)?.name}</p>
                <div className="flex gap-3">
                  {colors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setSelectedColor(color.value)}
                      className={`w-16 h-16 rounded border-2 transition-all ${
                        selectedColor === color.value ? 'border-black' : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color.hex }}
                    >
                      {color.value === 'white' && (
                        <div className="w-full h-full border border-gray-200 rounded"></div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Actions */}
            <div className="flex gap-4 mb-6">
              <div className="flex items-center border border-gray-300 rounded">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-6 py-3 border-x border-gray-300">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 hover:bg-gray-100"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="flex-1 flex items-center justify-center gap-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                Wishlist
              </button>
            </div>

            {/* Add to Cart Button */}
            <button 
              onClick={handleAddToCart} 
              className="w-full bg-black text-white py-4 rounded hover:bg-gray-800 transition-colors font-medium mb-6"
            >
              Add to Cart
            </button>

            {/* Product Details */}
            <div className="border-t pt-6 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500 mb-1">SKU</p>
                <p className="font-medium">{product.sku || product.id}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">CATEGORY</p>
                <p className="font-medium">{product.category || 'Living Room, Bedroom'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
       <ProductCarousel/>
    </div>
  );
}