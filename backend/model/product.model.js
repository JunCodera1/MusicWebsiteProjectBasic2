import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

const songSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  author_name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  timesPlayed: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  musicName: {
    type: String,
    required: true,
  },
  attribution: {
    song: {
      type: String,
      required: true,
    },
    musicBy: {
      type: String,
      required: true,
    },
    download: {
      type: String,
      required: true,
    },
    stream: {
      type: String,
      required: true,
    },
  },
});

const Product = mongoose.model("Product", productSchema);
const Song = mongoose.model("Song", songSchema);

export default Product;
