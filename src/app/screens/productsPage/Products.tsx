import {
  ArrowBack,
  ArrowForward,
  Search,
  MonetizationOn,
  RemoveRedEye,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  Pagination,
  PaginationItem,
  Stack,
  Badge,
  InputBase,
  IconButton,
} from '@mui/material';
import { Dispatch, createSelector } from '@reduxjs/toolkit';
import { Link, useHistory } from 'react-router-dom';
import { setChosenProduct, setProducts, setAdmin } from './slice';
import { useDispatch, useSelector } from 'react-redux';
import { Product, ProductInquiry } from '../../../lib/types/product';
import { retrieveProducts } from './selector';
import { ChangeEvent, useEffect, useState } from 'react';
import ProductService from '../../services/ProductService';
import { ProductCollection } from '../../../lib/enum/product.enum';
import { serverApi } from '../../../lib/config';
import { CartItem } from '../../../lib/types/search';

/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data))
});

const productsRetriever = createSelector(retrieveProducts, (products) => ({ products }));

interface ProductsProps { //props ni parent dan olib kelish uchun mantiq
  onAdd: (item: CartItem) => void;
}
export default function Products(props: ProductsProps) {
  const { onAdd } = props; //destruction: props ichidan onAdd ni olishni talab qilamiz
  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRetriever);
  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 10,
    order: "createdAt",
    productCollection: ProductCollection.FICTION,
    search: "",
  });
  const [searchText, setSearchText] = useState<string>("");
  const history = useHistory();

  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts(productSearch) // (productSearch ==> argument)
      .then((data) => { setProducts(data) })
      .catch((err) => { console.log(err) })
  }, [productSearch]);

  useEffect(() => {
    if (searchText === "") {
      productSearch.search = "";
      setProductSearch({ ...productSearch });
    }
  }, [searchText]);

  /* HANDLERS */

  const searchCollectionHandler = (collection: ProductCollection) => {
    console.log(collection);
    productSearch.page = 1;
    productSearch.productCollection = collection;
    setProductSearch({ ...productSearch });
  };

  const searchOrderHandler = (order: string) => {
    console.log(order);
    productSearch.page = 1;
    productSearch.order = order;
    setProductSearch({ ...productSearch });
  };

  const searchProductHandler = () => {
    productSearch.search = searchText;
    setProductSearch({ ...productSearch });
  };

  const paginationHandler = (e: ChangeEvent<any>, value: number) => {
    productSearch.page = value;
    setProductSearch({ ...productSearch });
  };

  const chooseBookHandler = (id: string) => {
    history.push(`/products/${id}`); // nested product ga kirish uchun link qo'shib beradi
  }

  return (
    <div className="products">
      <Container>
        <Stack flexDirection={'column'} alignItems={'center'}>
          <Stack className="avatar-big-box">
            <Stack className="title">Books</Stack>
            <Stack className="input-wrapper">
              <InputBase
                type={'search'}
                className="text-field"
                placeholder="Type here"
                value={searchText}
                onChange={(e) => { setSearchText(e.target.value) }}
                onKeyDown={(e) => { if (e.key === "Enter") searchProductHandler() }}
              />
              <IconButton
                type="button"
                className="icon-btn"
                aria-label="search"
                onClick={searchProductHandler}
              >
                search
                <Search sx={{ width: '18px', height: '18px' }} />
              </IconButton>
            </Stack>
          </Stack>

          <Stack className="dishes-filter-section">
            <Stack className="dishes-filter-box">
              <Button variant="contained" color={productSearch.order === "createdAt" ? "primary" : "secondary"} className="order" onClick={() => searchOrderHandler("createdAt")}>
                New
              </Button>
              <Button variant="contained" color={productSearch.order === "productPrice" ? "primary" : "secondary"} className="order" onClick={() => searchOrderHandler("productPrice")}>
                Price
              </Button>
              <Button variant="contained" color={productSearch.order === "productViews" ? "primary" : "secondary"} className="order" onClick={() => searchOrderHandler("productViews")}>
                Views
              </Button>
            </Stack>
          </Stack>

          <Stack className="list-category-section">
            <Stack className="product-category">
              <Button variant="contained" color={productSearch.productCollection === ProductCollection.FICTION ? "primary" : "secondary"} className="order" onClick={() => searchCollectionHandler(ProductCollection.FICTION)}>
                fiction books
              </Button>
              <Button variant="contained" color={productSearch.productCollection === ProductCollection.TEXTBOOK ? "primary" : "secondary"} className="order" onClick={() => searchCollectionHandler(ProductCollection.TEXTBOOK)}>
                text books
              </Button>
              <Button variant="contained" color={productSearch.productCollection === ProductCollection.OTHER ? "primary" : "secondary"} className="order" onClick={() => searchCollectionHandler(ProductCollection.OTHER)}>other
              </Button>
            </Stack>
            <Stack className="product-wrapper">
              {products.length !== 0 ? (
                products.map((product: Product) => {
                  const imagePath = `${serverApi}/${product.productImages[0].replace(/\\/, "/")}`;
                  return (
                    <Stack key={product._id} className="product-card" onClick={() => chooseBookHandler(product._id)}>
                      <Stack
                        className="product-img"
                        sx={{ backgroundImage: `url(${imagePath.replace(/\\/, "/")})` }}
                      >
                        
                        <Button className="view-btn" sx={{ right: '36px' }}>
                          <Badge badgeContent={product.productViews} color="secondary">
                            <RemoveRedEye
                              sx={{ color: product.productViews === 0 ? "gray" : "white" }}
                            />
                          </Badge>
                        </Button>
                      </Stack>
                      <Box className="product-desc">
                        <span className="product-title">
                          {product.productName}
                        </span>
                        <span className="product-title">
                          Author: {product.productAuthor}
                        </span>
                        <span className="product-desc2">
                          {product.productDesc}
                        </span>
                        <div className="product-desc">
                          W
                          {product.productPrice}
                        </div>
                      </Box>
                    </Stack>
                  );
                })
              ) : (
                <Box className="no-data">Books are not available!</Box>
              )}
            </Stack>
          </Stack>

          <Stack className="pagination-section">
            <Pagination
              count={products.length !== 0 ? productSearch.page + 1 : productSearch.page}
              page={productSearch.page}
              renderItem={(item) => (
                <PaginationItem
                  components={{ previous: ArrowBack, next: ArrowForward }}
                  {...item}
                  color="secondary"
                />
              )}
              onChange={paginationHandler}
            />
          </Stack>
        </Stack>
      </Container>
    </div >)
}
