import { fetchProducts } from "./productsAPI";
import type { Product } from "../../models/Product";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface ProductsSliceState {
  products: Product[];
  status: "idle" | "loading" | "failed";
  total: number;
  totalCount: number;
}

const initialState: ProductsSliceState = {
  products: [],
  status: "idle",
  total: 0,
  totalCount: 0,
};

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const response = await fetchProducts();
    return response.data;
  },
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    incCountProduct: (state, action) => {
      state.products = state.products.map(item => {
        if (item.id === action.payload.id) {
          item.count += 1;
        }
        return item;
      });
      state.total += action.payload.price;
      state.totalCount += 1;
    },
    decCountProduct: (state, action) => {
      state.products = state.products.map(item => {
        if (item.id === action.payload.id) {
          item.count -= 1;
        }
        return item;
      });
      state.total -= action.payload.price;
      state.totalCount -= 1;
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        item => item.id !== action.payload.id,
      );
      state.total = state.products.reduce((a, b) => a + b.price, 0);
      state.totalCount = state.products.reduce((a, b) => a + b.count, 0);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getProducts.pending, state => {
        state.status = "loading";
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload.map((item: Product) => ({
          ...item,
          count: 1,
        }));
        state.total = state.products.reduce((a, b) => a + b.price, 0);
        state.totalCount = state.products.length;
        state.status = "idle";
      })
      .addCase(getProducts.rejected, state => {
        state.status = "failed";
      });
  },
});

// Action creators are generated for each case reducer function.
export const { incCountProduct, decCountProduct, deleteProduct } =
  productsSlice.actions;
