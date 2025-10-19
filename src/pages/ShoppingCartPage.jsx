import React, { useState } from 'react';
import { Minus, Plus, X } from 'lucide-react';
import { Input } from '@/components/ui/input';



export default function ShoppingCartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'T-shirt',
      color: 'White',
      size: 'Large',
      price: 145,
      quantity: 1,
      image: '🎽'
    },
    {
      id: 2,
      name: 'T-shirt',
      color: 'Red',
      size: 'Large',
      price: 145,
      quantity: 1,
      image: '👕'
    },
    {
      id: 3,
      name: 'Jeans',
      color: 'Blue',
      size: 'Large',
      price: 80,
      quantity: 1,
      image: '👖'
    }
  ]);

  const [couponCode, setCouponCode] = useState('');

  const updateQuantity = (id, delta) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 15;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">3legant.</h1>
            <nav className="hidden md:flex space-x-8 text-sm text-gray-600">
              <a href="#" className="hover:text-gray-900">Home</a>
              <a href="#" className="hover:text-gray-900">Shop</a>
              <a href="#" className="hover:text-gray-900">Product</a>
              <a href="#" className="hover:text-gray-900">Contact Us</a>
            </nav>
            <div className="flex items-center space-x-4 text-gray-700">
              <button className="text-lg">🔍</button>
              <button className="text-lg">👤</button>
              <button className="relative text-lg">
                🛒
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {cartItems.length}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Title */}
        <h2 className="text-4xl font-semibold mb-10">Cart</h2>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-10">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-semibold text-sm">
              1
            </div>
            <span className="ml-3 font-semibold text-sm">Shopping cart</span>
          </div>
          <div className="w-24 h-px bg-gray-300 mx-6"></div>
          <div className="flex items-center text-gray-400">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-sm">
              2
            </div>
            <span className="ml-3 font-medium text-sm">Checkout details</span>
          </div>
          <div className="w-24 h-px bg-gray-300 mx-6"></div>
          <div className="flex items-center text-gray-400">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-sm">
              3
            </div>
            <span className="ml-3 font-medium text-sm">Order complete</span>
          </div>
        </div>

        {/* Cart Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Cart Items + Coupon */}
          <div className="lg:col-span-2 space-y-6">
            {/* Cart Items Table */}
            <div className="bg-white rounded-lg overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b text-xs font-semibold text-gray-600 uppercase">
                <div className="col-span-5">Product</div>
                <div className="col-span-3 text-center">Quantity</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-right">Subtotal</div>
              </div>

              {/* Cart Items */}
              {cartItems.map((item, index) => (
                <div key={item.id} className={`grid grid-cols-12 gap-4 px-6 py-6 items-center ${index < cartItems.length - 1 ? 'border-b' : ''}`}>
                  <div className="col-span-5 flex items-start space-x-4">
                    <div className="w-20 h-20 bg-gray-100 rounded flex items-center justify-center text-3xl flex-shrink-0">
                      {item.image}
                    </div>
                    <div className="flex flex-col">
                      <h3 className="font-semibold text-sm mb-1">{item.name}</h3>
                      <p className="text-xs text-gray-500 mb-0.5">Color: {item.color}</p>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-xs text-gray-400 hover:text-red-600 flex items-center mt-2"
                      >
                        <X className="w-3 h-3 mr-1" />
                        Remove
                      </button>
                    </div>
                  </div>
                  
                  <div className="col-span-3 flex items-center justify-center">
                    <div className="inline-flex items-center border rounded overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-2 hover:bg-gray-50 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-5 py-1.5 font-medium text-sm border-x min-w-[50px] text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-2 hover:bg-gray-50 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="col-span-2 text-center text-sm">
                    ${item.price.toFixed(2)}
                  </div>
                  
                  <div className="col-span-2 text-right font-semibold text-base">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Coupon Section */}
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold text-base mb-2">Have a coupon?</h3>
              <p className="text-sm text-gray-500 mb-4">
                Add your code for an instant cart discount
              </p>
              <div className="flex gap-3">
                <Input
                  placeholder="Coupon Code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 h-11 border-gray-300"
                />
                <Button variant="outline" className="h-11 px-6 font-medium border-gray-300">
                  Apply
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column - Cart Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 sticky top-8">
              <h3 className="font-bold text-lg mb-5">Cart summary</h3>
              
              {/* Shipping Options */}
              <div className="space-y-3 mb-5">
                <label className="flex items-center justify-between p-4 border-2 border-black rounded-lg cursor-pointer">
                  <div className="flex items-center">
                    <div className="w-5 h-5 rounded-full border-2 border-black mr-3 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-black"></div>
                    </div>
                    <span className="text-sm font-medium">Free shipping</span>
                  </div>
                  <span className="font-semibold text-sm">$0.00</span>
                </label>
                
                <label className="flex items-center justify-between p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-gray-400">
                  <div className="flex items-center">
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300 mr-3"></div>
                    <span className="text-sm font-medium">Express shipping</span>
                  </div>
                  <span className="font-semibold text-sm">+$15.00</span>
                </label>
                
                <label className="flex items-center justify-between p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-gray-400">
                  <div className="flex items-center">
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300 mr-3"></div>
                    <span className="text-sm font-medium">Pick Up</span>
                  </div>
                  <span className="font-semibold text-sm">+$21.00</span>
                </label>
              </div>

              {/* Price Summary */}
              <div className="border-t pt-4 space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm pb-4 border-b">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">+${shipping.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-5">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-2xl">${total.toFixed(2)}</span>
              </div>

              <Button className="w-full bg-black hover:bg-gray-900 text-white h-12 text-base font-medium rounded-lg">
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}