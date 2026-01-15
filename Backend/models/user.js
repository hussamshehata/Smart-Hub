// models/User.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const addressSchema = new mongoose.Schema({
    label: {
        type: String,
        enum: ['home', 'work', 'other'],
        default: 'home'
    },
    fullName: {
        type: String,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    addressLine1: {
        type: String,
        required: true,
        trim: true
    },
    addressLine2: {
        type: String,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    state: {
        type: String,
        required: true,
        trim: true
    },
    postalCode: {
        type: String,
        required: true,
        trim: true
    },
    country: {
        type: String,
        required: true,
        default: 'United States',
        trim: true
    },
    isDefault: {
        type: Boolean,
        default: false
    }
}, { _id: true });

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            minlength: [2, 'Name must be at least 2 characters'],
            maxlength: [50, 'Name cannot exceed 50 characters']
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
            index: true
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [6, 'Password must be at least 6 characters'],
            select: false // Don't include password in queries by default
        },
        role: {
            type: String,
            enum: ['user', 'admin', 'moderator'],
            default: 'user',
            index: true
        },

        // Profile Information
        avatar: {
            type: String,
            default: 'https://via.placeholder.com/150'
        },
        phone: {
            type: String,
            trim: true,
            match: [/^[\d\s\-\+\(\)]+$/, 'Invalid phone number format']
        },
        dateOfBirth: {
            type: Date
        },
        gender: {
            type: String,
            enum: ['male', 'female', 'other', 'prefer_not_to_say']
        },

        // Addresses
        addresses: [addressSchema],

        // Account Status
        isActive: {
            type: Boolean,
            default: true,
            index: true
        },
        isEmailVerified: {
            type: Boolean,
            default: false
        },
        emailVerificationToken: String,
        emailVerificationExpires: Date,

        // Password Reset
        resetPasswordToken: String,
        resetPasswordExpires: Date,

        // Security
        lastLogin: Date,
        loginAttempts: {
            type: Number,
            default: 0
        },
        lockUntil: Date,

        // Preferences
        preferences: {
            newsletter: {
                type: Boolean,
                default: true
            },
            smsNotifications: {
                type: Boolean,
                default: false
            },
            emailNotifications: {
                type: Boolean,
                default: true
            }
        },

        // Metadata
        lastPasswordChange: Date,
        deactivatedAt: Date,
        deactivationReason: String
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: function (doc, ret) {
                delete ret.password;
                delete ret.resetPasswordToken;
                delete ret.resetPasswordExpires;
                delete ret.emailVerificationToken;
                delete ret.emailVerificationExpires;
                delete ret.__v;
                return ret;
            }
        },
        toObject: {
            virtuals: true,
            transform: function (doc, ret) {
                delete ret.password;
                delete ret.resetPasswordToken;
                delete ret.resetPasswordExpires;
                delete ret.emailVerificationToken;
                delete ret.emailVerificationExpires;
                delete ret.__v;
                return ret;
            }
        }
    }
);

// Indexes for better performance
userSchema.index({ email: 1 });
userSchema.index({ role: 1, isActive: 1 });
userSchema.index({ createdAt: -1 });

// Virtual for account lock status
userSchema.virtual('isLocked').get(function() {
    return !!(this.lockUntil && this.lockUntil > Date.now());
});

// Virtual for full name (if you want to split firstName/lastName later)
userSchema.virtual('initials').get(function() {
    return this.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase();
});

// Virtual for age (if dateOfBirth is set)
userSchema.virtual('age').get(function() {
    if (!this.dateOfBirth) return null;
    const today = new Date();
    const birthDate = new Date(this.dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
});

// Hash password before saving
userSchema.pre("save", async function (next) {
    // Only hash if password is modified
    if (!this.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);

        // Update last password change timestamp
        if (!this.isNew) {
            this.lastPasswordChange = new Date();
        }

        next();
    } catch (error) {
        next(error);
    }
});

// Ensure only one default address
userSchema.pre("save", function (next) {
    if (this.isModified('addresses')) {
        const defaultAddresses = this.addresses.filter(addr => addr.isDefault);

        // If multiple defaults, keep only the last one
        if (defaultAddresses.length > 1) {
            this.addresses.forEach((addr, index) => {
                addr.isDefault = index === this.addresses.length - 1;
            });
        }

        // If no default but addresses exist, set first as default
        if (defaultAddresses.length === 0 && this.addresses.length > 0) {
            this.addresses[0].isDefault = true;
        }
    }
    next();
});

// Instance method: Compare password for login
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Instance method: Generate email verification token
userSchema.methods.generateEmailVerificationToken = function () {
    const verificationToken = crypto.randomBytes(32).toString('hex');

    this.emailVerificationToken = crypto
        .createHash('sha256')
        .update(verificationToken)
        .digest('hex');

    this.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

    return verificationToken;
};

// Instance method: Generate password reset token
userSchema.methods.generateResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    this.resetPasswordExpires = Date.now() + 60 * 60 * 1000; // 1 hour

    return resetToken;
};

// Instance method: Increment login attempts
userSchema.methods.incLoginAttempts = async function () {
    // Reset attempts if lock has expired
    if (this.lockUntil && this.lockUntil < Date.now()) {
        return await this.updateOne({
            $set: { loginAttempts: 1 },
            $unset: { lockUntil: 1 }
        });
    }

    const updates = { $inc: { loginAttempts: 1 } };
    const maxAttempts = 5;
    const lockTime = 2 * 60 * 60 * 1000; // 2 hours

    // Lock account after max attempts
    if (this.loginAttempts + 1 >= maxAttempts && !this.isLocked) {
        updates.$set = { lockUntil: Date.now() + lockTime };
    }

    return await this.updateOne(updates);
};

// Instance method: Reset login attempts
userSchema.methods.resetLoginAttempts = async function () {
    return await this.updateOne({
        $set: { loginAttempts: 0, lastLogin: new Date() },
        $unset: { lockUntil: 1 }
    });
};

// Instance method: Deactivate account
userSchema.methods.deactivate = async function (reason) {
    this.isActive = false;
    this.deactivatedAt = new Date();
    this.deactivationReason = reason;
    return await this.save();
};

// Instance method: Reactivate account
userSchema.methods.reactivate = async function () {
    this.isActive = true;
    this.deactivatedAt = undefined;
    this.deactivationReason = undefined;
    return await this.save();
};

// Instance method: Add address
userSchema.methods.addAddress = async function (addressData) {
    // If this is set as default, unset other defaults
    if (addressData.isDefault) {
        this.addresses.forEach(addr => {
            addr.isDefault = false;
        });
    }

    this.addresses.push(addressData);
    return await this.save();
};

// Instance method: Update address
userSchema.methods.updateAddress = async function (addressId, addressData) {
    const address = this.addresses.id(addressId);
    if (!address) {
        throw new Error('Address not found');
    }

    // If setting as default, unset other defaults
    if (addressData.isDefault) {
        this.addresses.forEach(addr => {
            if (addr._id.toString() !== addressId.toString()) {
                addr.isDefault = false;
            }
        });
    }

    Object.assign(address, addressData);
    return await this.save();
};

// Instance method: Delete address
userSchema.methods.deleteAddress = async function (addressId) {
    const address = this.addresses.id(addressId);
    if (!address) {
        throw new Error('Address not found');
    }

    const wasDefault = address.isDefault;
    address.deleteOne();

    // If deleted default, set first remaining as default
    if (wasDefault && this.addresses.length > 0) {
        this.addresses[0].isDefault = true;
    }

    return await this.save();
};

// Static method: Find active users
userSchema.statics.findActive = function (options = {}) {
    return this.find({ isActive: true, ...options });
};

// Static method: Find by email (including password for auth)
userSchema.statics.findByEmail = function (email) {
    return this.findOne({ email: email.toLowerCase() }).select('+password');
};

// Static method: Get user statistics
userSchema.statics.getStatistics = async function () {
    const stats = await this.aggregate([
        {
            $group: {
                _id: null,
                totalUsers: { $sum: 1 },
                activeUsers: {
                    $sum: { $cond: [{ $eq: ['$isActive', true] }, 1, 0] }
                },
                verifiedUsers: {
                    $sum: { $cond: [{ $eq: ['$isEmailVerified', true] }, 1, 0] }
                },
                adminUsers: {
                    $sum: { $cond: [{ $eq: ['$role', 'admin'] }, 1, 0] }
                }
            }
        }
    ]);

    return stats[0] || {
        totalUsers: 0,
        activeUsers: 0,
        verifiedUsers: 0,
        adminUsers: 0
    };
};

const User = mongoose.model("User", userSchema);

export default User;