// server/models/category.js
import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    
    name: { 
        type: String, 
        required: true, 
        unique: true 
    },

    attributes: { 
        type: Object, 
        default: {} 
    }

}, { timestamps: true });

const category = mongoose.model('category', categorySchema);

export default category;
