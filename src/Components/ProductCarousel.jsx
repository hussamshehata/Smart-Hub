import React, { useState, useEffect } from 'react';
import { Heart, ChevronRight, Star } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/Components/ui/button.jsx";
import { addToCart } from '@/redux/cartSlice';

export default function ProductCarousel() {
  const [products, setProducts] = useState([]);
  const [wishlistedItems, setWishlistedItems] = useState(new Set());
  const dispatch = useDispatch();
  const navigate = useNavigate();

 
  useEffect(() => {
    try {
      const productsData = localStorage.getItem('products');
      if (productsData) {
        const allProducts = JSON.parse(productsData);

        setProducts(allProducts.slice(0, 6));
      }
    } catch (error) {
      console.error('Error loading products from localStorage:', error);
    }
  }, []);

  const handleWishlist = (productId, e) => {
    e.stopPropagation();
    setWishlistedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      color: product.colors?.[0]?.name || '',
      size: product.size || '',
      image: product.image || (product.images && product.images[0]) || '🛋️',
    }));
  };

  if (products.length === 0) {
    return null; // Or show a loading state
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold">You might also like</h2>
        <Button 
          variant="ghost" 
          className="gap-2"
          onClick={() => navigate('/shop')}
        >
          More Products
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Scrollable Container */}
      <div className="relative">
        <div className="overflow-x-auto scrollbar-thin pb-4">
          <div className="flex gap-4 min-w-min">
            {products.map((product) => (
              <div 
                key={product.id} 
                className="w-[280px] flex-shrink-0"
                onClick={() => handleProductClick(product.id)}
              >
                <div className="group cursor-pointer border-0 shadow-none">
                  <div className="p-0">
                    {/* Product Image Card */}
                    <div className="relative bg-muted rounded-lg overflow-hidden mb-3 aspect-square">
                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
                        {product.isNew && (
                          <span className="bg-white text-gray-900 px-2 py-1 rounded text-xs font-semibold">
                            NEW
                          </span>
                        )}
                        {product.hasDiscount && (
                          <span className="bg-teal-400 text-white px-2 py-1 rounded text-xs font-semibold">
                            -{product.discount}%
                          </span>
                        )}
                      </div>

                      {/* Wishlist Button */}
                      <Button
                        size="icon"
                        variant="secondary"
                        className="absolute top-3 right-3 w-8 h-8 rounded-full z-10 bg-white hover:bg-gray-100"
                        onClick={(e) => handleWishlist(product.id, e)}
                      >
                        <Heart 
                          className={`w-4 h-4 ${
                            wishlistedItems.has(product.id) 
                              ? 'fill-red-500 text-red-500' 
                              : ''
                          }`} 
                        />
                      </Button>

                      {/* Product Image */}
                      <img
                        src={product.image || (product.images && product.images[0])}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />

                      {/* Add to Cart Button - Shows on Hover */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          className="w-full bg-white text-black hover:bg-gray-100"
                          onClick={(e) => handleAddToCart(product, e)}
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="px-1">
                      {/* Rating */}
                      <div className="flex gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < (product.rating || 5)
                                ? 'fill-black text-black'
                                : 'fill-gray-300 text-gray-300'
                            }`}
                          />
                        ))}
                      </div>

                      {/* Product Name */}
                      <h3 className="text-sm font-medium mb-2 line-clamp-2">
                        {product.name}
                      </h3>

                      {/* Price */}
                      <div className="flex items-center gap-2">
                        <span className="text-base font-semibold">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-thin::-webkit-scrollbar {
          height: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}