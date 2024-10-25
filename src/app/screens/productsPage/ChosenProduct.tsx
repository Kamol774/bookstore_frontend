import React, { useEffect } from "react";
import { Container, Stack, Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Divider from "../../components/divider";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, createSelector } from "@reduxjs/toolkit";
import { Product } from "../../../lib/types/product";
import { setChosenProduct, setAdmin } from "./slice";
import { retrieveChosenProduct, retrieveAdmin} from "./selector";
import { useParams } from "react-router-dom";
import ProductService from "../../services/ProductService";
import MemberService from "../../services/MemberService";
import { Member } from "../../../lib/types/member";
import { serverApi } from "../../../lib/config";
import { CartItem } from "../../../lib/types/search";

/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
  setChosenProduct: (data: Product) => dispatch(setChosenProduct(data)),
  setAdmin: (data: Member) => dispatch(setAdmin(data)),
});
const ChosenProductRetriever = createSelector(retrieveChosenProduct, (chosenProduct) => ({ chosenProduct })
);
const AdminRetriever = createSelector(retrieveAdmin, (admin) => ({ admin })
);

interface ChosenProductsProps { //props ni parent dan olib kelish uchun mantiq
  onAdd: (item: CartItem) => void;
}
export default function ChosenProduct(props: ChosenProductsProps) {
  const { onAdd } = props; //destruction: props ichidan onAdd ni olishni talab qilamiz
  const { productId } = useParams<{ productId: string }>();
  const { setAdmin, setChosenProduct } = actionDispatch(useDispatch());
  const { chosenProduct } = useSelector(ChosenProductRetriever);
  const { admin } = useSelector(AdminRetriever);

  useEffect(() => {
    const product = new ProductService();
    product
      .getProduct(productId)
      .then(data => setChosenProduct(data)) // backend dan qabul qilgan data ni argument sifatida paste qilyapmiz
      .catch(err => console.log(err));

    const member = new MemberService();
    member
      .getAdmin()
      .then(data => setAdmin(data)) // backend dan qabul qilgan data ni argument sifatida paste qilyapmiz
      .catch(err => console.log(err));
  }, [])

  if (!chosenProduct) return null;
  return (
    <div className={"chosen-product"}>
      <Box className={"title"}>Book Detail</Box>
      <Container className={"product-container"}>
        <Stack className={"chosen-product-slider"}>
          <Swiper
            loop={true}
            spaceBetween={10}
            navigation={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="swiper-area"
          >
            {chosenProduct?.productImages.map(
              (ele: string, index: number) => {
                const imagePath = `${serverApi}/${ele}`;
                return (
                  <SwiperSlide key={index}>
                    <img className="slider-image" src={imagePath} />
                  </SwiperSlide>
                );
              }
            )}
          </Swiper>
        </Stack>
        <Stack className={"chosen-product-info"}>
          <Box className={"info-box"}>
            <strong className={"product-name"}>{chosenProduct?.productName}</strong>
            <span className={"resto-name"}>{chosenProduct?.productAuthor}</span>
            <Box className={"rating-box"}>
              <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
              <div className={"evaluation-box"}>
                <div className={"product-view"}>
                  <RemoveRedEyeIcon sx={{ mr: "10px" }} />
                  <span>{chosenProduct?.productViews}</span>
                </div>
              </div>
            </Box>
            <p className={"product-desc"}>{chosenProduct?.productDesc ? chosenProduct?.productDesc : "No Description"}</p>
            <Divider height="1" width="100%" bg="#000000" />
            <div className={"product-price"}>
              <span>Price:</span>
              <span>$ {chosenProduct?.productPrice}</span>
            </div>
            <div className={"button-box"}>
              
            </div>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}