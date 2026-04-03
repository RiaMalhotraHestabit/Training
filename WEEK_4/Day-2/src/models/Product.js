import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    ratingSum: {
      type: Number,
      default: 0
    },
    ratingCount: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      default: "active"
    },
    deletedAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

/*  Virtual rating */
ProductSchema.virtual("rating").get(function () {
  if (this.ratingCount === 0) return 0;
  return this.ratingSum / this.ratingCount;
});

/* TTL index (30 days) */
ProductSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 60 * 60 * 24 * 30 }
);

/* Compound index */
ProductSchema.index({ status: 1, createdAt: -1 });

export default mongoose.model("Product", ProductSchema);