import React, { useState } from 'react';
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';

export default function TrayTableProduct() {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('black');
  const [currentImage, setCurrentImage] = useState(0);

  const colors = [
    { id: 'black', color: 'bg-black', border: 'border-black' },
    { id: 'beige', color: 'bg-amber-100', border: 'border-amber-100' },
    { id: 'red', color: 'bg-red-500', border: 'border-red-500' },
    { id: 'white', color: 'bg-white', border: 'border-gray-300' }
  ];

  const images = [
    { id: 1, main: true },
    { id: 2, main: false },
    { id: 3, main: false }
  ];

  const incrementQuantity = () => setQuantity(q => q + 1);
  const decrementQuantity = () => setQuantity(q => Math.max(1, q - 1));

  const nextImage = () => setCurrentImage(i => (i + 1) % images.length);
  const prevImage = () => setCurrentImage(i => (i - 1 + images.length) % images.length);

  return (
    <div className="min-h-screen bg-white">
      {/* Header Navigation */}
      <div className="border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="hover:text-black cursor-pointer">Home</span>
            <span>›</span>
            <span className="hover:text-black cursor-pointer">Shop</span>
            <span>›</span>
            <span className="hover:text-black cursor-pointer">Living Room</span>
            <span>›</span>
            <span className="text-black font-medium">Product</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-8 py-12">
        <div className="grid grid-cols-12 gap-16">
          {/* Left Side - Images (6 columns) */}
          <div className="col-span-6">
            <div className="space-y-6">
              {/* Main Image */}
              <div className="relative bg-gray-50 rounded-lg overflow-hidden" style={{ aspectRatio: '4/5' }}>
                {/* NEW Badge */}
                <div className="absolute top-6 left-6 bg-white px-4 py-1.5 rounded text-sm font-semibold z-10">
                  NEW
                </div>
                {/* Discount Badge */}
                <div className="absolute top-16 left-6 bg-emerald-500 text-white px-4 py-1.5 rounded text-sm font-semibold z-10">
                  -50%
                </div>
                
                {/* Main Product Image */}
                <div className="w-full h-full flex items-center justify-center p-16">
                  <img 
                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 400'%3E%3Cg%3E%3Ccircle cx='150' cy='80' r='70' fill='%23333' opacity='0.9'/%3E%3Cpath d='M 80 80 Q 80 100 80 120 L 80 320 Q 80 340 90 340 L 100 340' stroke='%23333' stroke-width='4' fill='none'/%3E%3Cpath d='M 220 80 Q 220 100 220 120 L 220 320 Q 220 340 210 340 L 200 340' stroke='%23333' stroke-width='4' fill='none'/%3E%3Cpath d='M 100 340 L 200 340' stroke='%23333' stroke-width='4'/%3E%3Cpath d='M 90 220 L 210 220' stroke='%23333' stroke-width='3'/%3E%3Cpath d='M 150 80 L 90 220' stroke='%23333' stroke-width='3'/%3E%3Cpath d='M 150 80 L 210 220' stroke='%23333' stroke-width='3'/%3E%3C/g%3E%3C/svg%3E" 
                    alt="Tray Table"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Navigation Arrows */}
                <button 
                  onClick={prevImage}
                  className="absolute left-6 top-1/2 -translate-y-1/2 bg-white rounded-full p-2.5 shadow-md hover:shadow-lg transition-shadow"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-6 top-1/2 -translate-y-1/2 bg-white rounded-full p-2.5 shadow-md hover:shadow-lg transition-shadow"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-3 gap-6">
                {images.map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => setCurrentImage(idx)}
                    className={`bg-gray-50 rounded-lg overflow-hidden transition-all ${
                      currentImage === idx ? 'ring-2 ring-black' : 'hover:ring-2 hover:ring-gray-300'
                    }`}
                    style={{ aspectRatio: '1/1' }}
                  >
                    <img 
                      src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='50' r='40' fill='%23333'/%3E%3Cpath d='M 60 50 L 60 140 L 70 140' stroke='%23333' stroke-width='3' fill='none'/%3E%3Cpath d='M 140 50 L 140 140 L 130 140' stroke='%23333' stroke-width='3' fill='none'/%3E%3Cpath d='M 70 140 L 130 140' stroke='%23333' stroke-width='3'/%3E%3C/svg%3E"
                      alt={`View ${idx + 1}`}
                      className="w-full h-full object-cover p-4"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Product Details (6 columns) */}
          <div className="col-span-6">
            <div className="space-y-6">
              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex text-black text-lg">
                  {'★★★★★'.split('').map((star, i) => (
                    <span key={i}>{star}</span>
                  ))}
                </div>
                <span className="text-sm text-gray-500">11 Reviews</span>
              </div>

              {/* Title */}
              <h1 className="text-5xl font-medium text-black leading-tight">Tray Table</h1>

              {/* Description */}
              <p className="text-gray-600 text-lg leading-relaxed">
                Buy one or buy a few and make every space where you sit more convenient. Light and easy to move around with removable tray top, handy for serving snacks.
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-semibold text-black">$199.00</span>
                <span className="text-2xl text-gray-400 line-through">$400.00</span>
              </div>

              {/* Offer Timer */}
              <div className="border-t border-gray-200 pt-6">
                <p className="text-sm text-gray-500 mb-4">Offer expires in:</p>
                <div className="flex gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-medium text-black">02</div>
                    <div className="text-xs text-gray-400 mt-1 uppercase tracking-wide">Days</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-medium text-black">12</div>
                    <div className="text-xs text-gray-400 mt-1 uppercase tracking-wide">Hours</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-medium text-black">45</div>
                    <div className="text-xs text-gray-400 mt-1 uppercase tracking-wide">Minutes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-medium text-black">05</div>
                    <div className="text-xs text-gray-400 mt-1 uppercase tracking-wide">Seconds</div>
                  </div>
                </div>
              </div>

              {/* Measurements */}
              <div className="border-t border-gray-200 pt-6">
                <p className="text-sm font-semibold text-black mb-2">Measurements</p>
                <p className="text-black text-base">17 1/2×20 5/8 "</p>
              </div>

              {/* Color Selection */}
              <div className="pt-2">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm font-semibold text-black">Choose Color</span>
                  <span className="text-gray-400">›</span>
                </div>
                <p className="text-base text-black mb-4 capitalize font-medium">{selectedColor}</p>
                <div className="flex gap-3">
                  {colors.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedColor(c.id)}
                      className={`w-14 h-14 rounded-lg border-2 ${c.color} ${
                        selectedColor === c.id ? `${c.border} ring-2 ring-offset-2 ring-black` : 'border-gray-200'
                      } transition-all hover:scale-105`}
                    />
                  ))}
                </div>
              </div>

              {/* Quantity and Actions */}
              <div className="flex gap-4 pt-6">
                {/* Quantity Selector */}
                <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={decrementQuantity}
                    className="px-5 py-3 hover:bg-gray-50 transition-colors text-lg font-medium"
                  >
                    −
                  </button>
                  <span className="px-8 py-3 border-x-2 border-gray-200 font-semibold text-base">{quantity}</span>
                  <button
                    onClick={incrementQuantity}
                    className="px-5 py-3 hover:bg-gray-50 transition-colors text-lg font-medium"
                  >
                    +
                  </button>
                </div>

                {/* Wishlist Button */}
                <button className="flex-1 flex items-center justify-center gap-2 border-2 border-gray-200 rounded-lg py-3 hover:bg-gray-50 transition-colors">
                  <Heart className="w-5 h-5" />
                  <span className="font-medium">Wishlist</span>
                </button>
              </div>

              {/* Add to Cart Button */}
              <button className="w-full bg-black text-white py-4 rounded-lg font-semibold text-base hover:bg-gray-900 transition-colors">
                Add to Cart
              </button>

              {/* Product Info */}
              <div className="border-t border-gray-200 pt-6 grid grid-cols-2 gap-8 text-sm">
                <div>
                  <p className="text-gray-400 mb-2 text-xs uppercase tracking-wider">SKU</p>
                  <p className="font-medium text-black">117</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-2 text-xs uppercase tracking-wider">CATEGORY</p>
                  <p className="font-medium text-black">Living Room, Bedroom</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}