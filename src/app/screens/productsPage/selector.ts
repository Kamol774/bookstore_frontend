import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";

const selectProductsPage = (state: AppRootState) => state.productsPage;
// quyida screen.ts dagi productsPage interfacelaridan selector yasaymiz 
export const retrieveAdmin = createSelector(selectProductsPage, (ProductsPage) => ProductsPage.admin);

export const retrieveChosenProduct = createSelector(selectProductsPage, (ProductsPage) => ProductsPage.chosenProduct);

export const retrieveProducts = createSelector(selectProductsPage, (ProductsPage) => ProductsPage.products);