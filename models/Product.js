const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Variant name is required'],
    trim: true,
    maxlength: [50, 'Variant name cannot exceed 50 characters'],
  },
  sku: {
    type: String,
    required: [true, 'SKU is required'],
    unique: true,
    trim: true,
    maxlength: [50, 'SKU cannot exceed 50 characters'],
  },
  additionalCost: {
    type: Number,
    default: 0,
    min: [0, 'Additional cost cannot be negative'],
  },
  stockCount: {
    type: Number,
    required: [true, 'Stock count is required'],
    min: [0, 'Stock count cannot be negative'],
  },
});

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      maxlength: [100, 'Product name cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0, 'Price cannot be negative'],
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: 'Category',
      required: [true, 'Product must belong to a category'],
    },
    variants: [variantSchema],
    images: [String],
    isActive: {
      type: Boolean,
      default: true,
    },
    discount: {
      type: Number,
      default: 0,
      min: [0, 'Discount cannot be negative'],
      max: [100, 'Discount cannot exceed 100%'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for discounted price
productSchema.virtual('discountedPrice').get(function () {
  return this.price * (1 - this.discount / 100);
});

// Indexes for better performance
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ price: 1 });
productSchema.index({ category: 1 });
productSchema.index({ isActive: 1 });

// Query middleware to populate category
productSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'category',
    select: 'name',
  });
  next();
});

module.exports = mongoose.model('Product', productSchema);