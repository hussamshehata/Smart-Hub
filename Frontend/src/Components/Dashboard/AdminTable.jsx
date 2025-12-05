import React, { useState } from 'react';
import { Search, Filter, Download, Plus, Edit2, Trash2, Eye, X } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add', 'edit', 'view'
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // Products state
  const [products, setProducts] = useState([
    { id: 1, name: 'Wireless Headphones', category: 'Electronics', price: 99.99, stock: 45, status: 'In Stock', description: 'High-quality wireless headphones' },
    { id: 2, name: 'Smart Watch', category: 'Electronics', price: 299.99, stock: 23, status: 'In Stock', description: 'Feature-rich smart watch' },
    { id: 3, name: 'Laptop Stand', category: 'Accessories', price: 49.99, stock: 0, status: 'Out of Stock', description: 'Ergonomic laptop stand' },
    { id: 4, name: 'USB-C Cable', category: 'Accessories', price: 19.99, stock: 150, status: 'In Stock', description: 'Durable USB-C cable' },
    { id: 5, name: 'Mechanical Keyboard', category: 'Electronics', price: 129.99, stock: 8, status: 'Low Stock', description: 'RGB mechanical keyboard' },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    description: ''
  });

  // Sample data for other tabs
  const users = [
    { id: 1, name: 'Ahmed Hassan', email: 'ahmed@example.com', role: 'Customer', joined: '2024-01-15', status: 'Active' },
    { id: 2, name: 'Sara Mohamed', email: 'sara@example.com', role: 'Admin', joined: '2023-11-20', status: 'Active' },
    { id: 3, name: 'Omar Ali', email: 'omar@example.com', role: 'Customer', joined: '2024-03-10', status: 'Inactive' },
    { id: 4, name: 'Mona Khaled', email: 'mona@example.com', role: 'Customer', joined: '2024-02-05', status: 'Active' },
    { id: 5, name: 'Youssef Ibrahim', email: 'youssef@example.com', role: 'Manager', joined: '2023-12-01', status: 'Active' },
  ];

  const orders = [
    { id: '#ORD-001', customer: 'Ahmed Hassan', date: '2024-11-25', total: '$299.99', status: 'Delivered', items: 3 },
    { id: '#ORD-002', customer: 'Sara Mohamed', date: '2024-11-26', total: '$149.98', status: 'Processing', items: 2 },
    { id: '#ORD-003', customer: 'Omar Ali', date: '2024-11-27', total: '$99.99', status: 'Shipped', items: 1 },
    { id: '#ORD-004', customer: 'Mona Khaled', date: '2024-11-28', total: '$449.97', status: 'Pending', items: 5 },
    { id: '#ORD-005', customer: 'Youssef Ibrahim', date: '2024-11-29', total: '$199.99', status: 'Delivered', items: 2 },
  ];

  // CRUD Operations
  const handleAdd = () => {
    setModalMode('add');
    setFormData({ name: '', category: '', price: '', stock: '', description: '' });
    setShowModal(true);
  };

  const handleView = (product) => {
    setModalMode('view');
    setSelectedProduct(product);
    setFormData(product);
    setShowModal(true);
  };

  const handleEdit = (product) => {
    setModalMode('edit');
    setSelectedProduct(product);
    setFormData(product);
    setShowModal(true);
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    setProducts(products.filter(p => p.id !== productToDelete.id));
    setShowDeleteConfirm(false);
    setProductToDelete(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (modalMode === 'add') {
      const newProduct = {
        id: Math.max(...products.map(p => p.id)) + 1,
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        status: parseInt(formData.stock) === 0 ? 'Out of Stock' : 
                parseInt(formData.stock) < 10 ? 'Low Stock' : 'In Stock'
      };
      setProducts([...products, newProduct]);
    } else if (modalMode === 'edit') {
      setProducts(products.map(p => 
        p.id === selectedProduct.id 
          ? {
              ...formData,
              id: p.id,
              price: parseFloat(formData.price),
              stock: parseInt(formData.stock),
              status: parseInt(formData.stock) === 0 ? 'Out of Stock' : 
                      parseInt(formData.stock) < 10 ? 'Low Stock' : 'In Stock'
            }
          : p
      ));
    }
    
    setShowModal(false);
    setFormData({ name: '', category: '', price: '', stock: '', description: '' });
  };

  const getStatusColor = (status) => {
    const colors = {
      'In Stock': 'bg-green-100 text-green-800',
      'Out of Stock': 'bg-red-100 text-red-800',
      'Low Stock': 'bg-yellow-100 text-yellow-800',
      'Active': 'bg-green-100 text-green-800',
      'Inactive': 'bg-gray-100 text-gray-800',
      'Delivered': 'bg-green-100 text-green-800',
      'Processing': 'bg-blue-100 text-blue-800',
      'Shipped': 'bg-purple-100 text-purple-800',
      'Pending': 'bg-yellow-100 text-yellow-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const ActionButtons = ({ item, type }) => (
    <div className="flex gap-2">
      {type === 'products' && (
        <>
          <button 
            onClick={() => handleView(item)}
            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition"
            title="View"
          >
            <Eye size={16} />
          </button>
          <button 
            onClick={() => handleEdit(item)}
            className="p-1.5 text-green-600 hover:bg-green-50 rounded transition"
            title="Edit"
          >
            <Edit2 size={16} />
          </button>
          <button 
            onClick={() => handleDeleteClick(item)}
            className="p-1.5 text-red-600 hover:bg-red-50 rounded transition"
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </>
      )}
      {type !== 'products' && (
        <>
          <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition">
            <Eye size={16} />
          </button>
          <button className="p-1.5 text-green-600 hover:bg-green-50 rounded transition">
            <Edit2 size={16} />
          </button>
          <button className="p-1.5 text-red-600 hover:bg-red-50 rounded transition">
            <Trash2 size={16} />
          </button>
        </>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your products, users, and orders</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Products</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{products.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-blue-500 rounded"></div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Users</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">1,429</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Orders</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">892</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-purple-500 rounded"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Table Section */}
        <div className="bg-white rounded-lg shadow">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('products')}
                className={`px-6 py-4 font-medium transition ${
                  activeTab === 'products'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Products
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`px-6 py-4 font-medium transition ${
                  activeTab === 'users'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Users
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`px-6 py-4 font-medium transition ${
                  activeTab === 'orders'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Orders
              </button>
            </div>
          </div>

          {/* Toolbar */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                  <Filter size={20} />
                  Filter
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                  <Download size={20} />
                  Export
                </button>
                {activeTab === 'products' && (
                  <button 
                    onClick={handleAdd}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    <Plus size={20} />
                    Add New
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Tables */}
          <div className="overflow-x-auto">
            {activeTab === 'products' && (
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.filter(p => 
                    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    p.category.toLowerCase().includes(searchTerm.toLowerCase())
                  ).map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{product.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{product.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">${product.price}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{product.stock}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                          {product.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <ActionButtons item={product} type="products" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === 'users' && (
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{user.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{user.role}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{user.joined}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <ActionButtons item={user} type="users" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === 'orders' && (
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-blue-600">{order.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">{order.customer}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{order.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{order.items}</td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{order.total}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <ActionButtons item={order} type="orders" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing 1 to {products.length} of {products.length} results
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition disabled:opacity-50" disabled>
                Previous
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">1</button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition disabled:opacity-50" disabled>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Modal (Add/Edit/View) */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {modalMode === 'add' ? 'Add New Product' : 
                 modalMode === 'edit' ? 'Edit Product' : 'Product Details'}
              </h2>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    disabled={modalMode === 'view'}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    disabled={modalMode === 'view'}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  >
                    <option value="">Select Category</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Home & Garden">Home & Garden</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price ($)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      disabled={modalMode === 'view'}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Stock
                    </label>
                    <input
                      type="number"
                      value={formData.stock}
                      onChange={(e) => setFormData({...formData, stock: e.target.value})}
                      disabled={modalMode === 'view'}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    disabled={modalMode === 'view'}
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                {modalMode !== 'view' && (
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition font-medium"
                  >
                    {modalMode === 'add' ? 'Add Product' : 'Save Changes'}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition font-medium"
                >
                  {modalMode === 'view' ? 'Close' : 'Cancel'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete <strong>{productToDelete?.name}</strong>? 
              This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={confirmDelete}
                className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition font-medium"
              >
                Delete
              </button>
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setProductToDelete(null);
                }}
                className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;