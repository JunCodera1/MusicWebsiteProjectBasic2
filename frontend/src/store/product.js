import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  
  // Optionally add a loading state
  loading: false,
  
  createProduct: async (newProduct) => {
    // Validate input
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "Please fill in all fields." };
    }

    // Start loading
    set({ loading: true });

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      // Handle non-2xx responses
      if (!res.ok) {
        const errorData = await res.json(); // Try to read the error response
        return { success: false, message: errorData.message || "Failed to create product." };
      }

      const data = await res.json();

      // Update products state
      set((state) => ({ products: [...state.products, data.data] }));
      
      // Return success message
      return { success: true, message: "Product created successfully" };
    } catch (error) {
      // Handle fetch errors
      console.error("Error in creating product:", error);
      return { success: false, message: "Server Error" };
    } finally {
      // Stop loading
      set({ loading: false });
    }
  },
}));
