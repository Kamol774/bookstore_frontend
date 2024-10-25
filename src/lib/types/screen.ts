import { Member } from "./member";
import { Order } from "./order";
import { Product } from "./product";


/** REACT APP STATE **/
export interface AppRootState {
  homePage: HomePageState;
  productsPage: ProductsPageState;
}


/** HOMEPAGE **/
export interface HomePageState {
 
}



/** PRODUCTS PAGE **/
export interface ProductsPageState {
  admin: Member | null;
  chosenProduct: Product | null;
  products: Product[];
}



