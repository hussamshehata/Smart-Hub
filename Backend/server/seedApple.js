const mongoose = require('mongoose');
const Product = require('./models/product.js');
const appleData = require('./data/apple.json');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/smart-hub', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

const seedApple = async () => {
    try {
        await Product.deleteMany({ brand: 'Apple' }); // optional: clean Apple products first
        const products = appleData.map(item => ({ ...item, brand: 'Apple' }));
        await Product.insertMany(products);
        console.log('Apple products seeded!');
        mongoose.disconnect();
    } catch (err) {
        console.error(err);
        mongoose.disconnect();
    }
};

seedApple();
