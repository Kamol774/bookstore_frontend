import { createSlice } from '@reduxjs/toolkit';
import { ProductsPageState } from '../../../lib/types/screen';

const initialState: ProductsPageState = {
  admin: null,
  chosenProduct: null,
  products: []
};

const productsPageSlice = createSlice({
  name: "productsPage",
  initialState,
  reducers: { //reducer orqali initial qiymatlarni o'zgartiramiz
    setAdmin: (state, action) => {
      state.admin = action.payload;
    },
    setChosenProduct: (state, action) => {
      state.chosenProduct = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { setAdmin, setChosenProduct, setProducts } = productsPageSlice.actions;

// quyida reducerni export qilishdan maqsad, biz yaratgan reducerimizni store.ts dagi reducerga bog'lash 
const ProductsPageReducer = productsPageSlice.reducer;
export default ProductsPageReducer;