import React from 'react';
import { Heart, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function ProductCarousel() {
  const products = [
    {
      id: 1,
      name: 'Loveseat Sofa',
      price: 199.00,
      originalPrice: 420.00,
      rating: 5,
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop',
      isNew: true,
      hasDiscount: true
    },
    {
      id: 2,
      name: 'Table Lamp',
      price: 24.99,
      rating: 5,
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop',
      isNew: false,
      hasDiscount: false
    },
    {
      id: 3,
      name: 'Beige Table Lamp',
      price: 24.99,
      rating: 5,
      image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400&h=400&fit=crop',
      isNew: false,
      hasDiscount: false
    },
    {
      id: 4,
      name: 'Bamboo basket',
      price: 24.99,
      rating: 5,
      image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=400&h=400&fit=crop',
      isNew: false,
      hasDiscount: false
    },
    {
      id: 5,
      name: 'Toaster',
      price: 224.99,
      rating: 5,
      image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&h=400&fit=crop',
      isNew: false,
      hasDiscount: false
    },
    {
      id: 6,
      name: 'Coffee Maker',
      price: 149.99,
      rating: 5,
      image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&h=400&fit=crop',
      isNew: false,
      hasDiscount: false
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold">You might also like</h2>
        <Button variant="ghost" className="gap-2">
          More Products
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Scrollable Container */}
      <div className="relative">
        <div className="overflow-x-auto scrollbar-thin pb-4">
          <div className="flex gap-4 min-w-min">
            {products.map((product) => (
              <div key={product.id} className="w-[280px] flex-shrink-0">
                <Card className="group cursor-pointer border-0 shadow-none">
                  <CardContent className="p-0">
                    {/* Product Image Card */}
                    <div className="relative bg-muted rounded-lg overflow-hidden mb-3 aspect-square">
                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
                        {product.isNew && (
                          <Badge variant="secondary" className="bg-white text-foreground hover:bg-white">
                            NEW
                          </Badge>
                        )}
                        {product.hasDiscount && (
                          <Badge className="bg-teal-400 hover:bg-teal-500 text-white">
                            -50%
                          </Badge>
                        )}
                      </div>

                      {/* Wishlist Button */}
                      <Button
                        size="icon"
                        variant="secondary"
                        className="absolute top-3 right-3 w-8 h-8 rounded-full z-10"
                      >
                        <Heart className="w-4 h-4" />
                      </Button>

                      {/* Product Image */}
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="px-1">
                      {/* Rating */}
                      <div className="flex gap-1 mb-2">
                        {[...Array(product.rating)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-3 h-3 fill-current text-foreground"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                      </div>

                      {/* Product Name */}
                      <h3 className="text-sm font-medium mb-2">
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
                  </CardContent>
                </Card>
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
      `}</style>
    </div>
  );
}