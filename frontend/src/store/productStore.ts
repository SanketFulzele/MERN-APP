import { create } from "zustand";
import api from "../api/axios";

interface Product {
  _id: string;
  productName: string;
  description: string;
  category: string;
  price: number;
}

interface ProductStore {
  selectedProduct: Product | null;
  products: Product[];
  addedProductIds: string[];
  cartItemCount: number;
  setSelectedProduct: (product: Product) => void;
  clearSelectedProduct: () => void;
  setProducts: (products: Product[]) => void;
  refreshProducts: () => Promise<void>;
  addProductToCart: (product: Product) => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  selectedProduct: null,
  products: [],
  addedProductIds: [],
  cartItemCount: 0,

  setSelectedProduct: (product) =>
    set({
      selectedProduct: product,
    }),

  clearSelectedProduct: () =>
    set({
      selectedProduct: null,
    }),

  setProducts: (products) =>
    set({
      products,
    }),

  addProductToCart: (product) =>
    set((state) => {
      if (state.addedProductIds.includes(product._id)) {
        return {};
      }
      return {
        addedProductIds: [...state.addedProductIds, product._id],
        cartItemCount: state.cartItemCount + 1,
      };
    }),

  refreshProducts: async () => {
    try {
      const result = await api.get("/api/get-products");
      set({ products: result.data.data });
    } catch (error) {
      console.error("Failed to refresh products:", error);
    }
  },
}));