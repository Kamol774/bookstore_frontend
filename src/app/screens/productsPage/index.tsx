import { Container } from "@mui/material";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ChosenProduct from "./ChosenProduct";
import Products from "./Products";
import "../../../css/products.css"
import { CartItem } from "../../../lib/types/search";

interface ProductsPageProps { //props ni App dagi parent dan olib kelish uchun
  onAdd: (item: CartItem) => void;
}

export default function ProductsPage(props: ProductsPageProps) {
  const { onAdd } = props; //destruction: props ichidan onAdd ni olishni talab qilamiz
  const products = useRouteMatch();
  console.log("products", products)

  return <div className={"products-page"}>
    <Switch>
      <Route path={`${products.path}/:productId`}>
        <ChosenProduct onAdd={onAdd} /> {/*onAdd={onAdd} => parent dan childga props larni paste qilish uchun */}
      </Route>
      <Route path={`${products.path}`}>
        <Products onAdd={onAdd} /> {/*onAdd={onAdd} => parent dan childga props larni paste qilish uchun */}
      </Route>
    </Switch>
  </div>;
}