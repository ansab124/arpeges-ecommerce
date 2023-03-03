import { BsArrowRight, BsHeartFill } from "react-icons/bs";
import { AntSelectDropDown } from "./controls/AntSelectDropDown";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { BsHeart } from "react-icons/bs";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart, addToWishList } from "@store/thunk/cart";

export const AdContent = () => (
  <div className="ad_container justify-content-center d-flex my-5">
    <img src="/assets/calque_99.png" alt="" />
  </div>
);

export const CardTextComponent = ({
  ctxtOne,
  txtTwo = "",
  cardClass = "align-items-end ",
}) => (
  <div className={`card_content text-dark ms-4 ${cardClass} text-uppercase`}>
    <p>{ctxtOne}</p>
    {txtTwo ? <p> {txtTwo}</p> : null}
    {/* <BsArrowRight className="ms-2 mb-1" /> */}
  </div>
);

const ImageContentContainer = ({ mainH1, mainH2 }) => (
  <div
    style={{
      background: '#1c1c1a url("/assets/calque_100.png") no-repeat center',
    }}
    className="image__container w-100 flex-column p-3 p-sm-5 d-flex justify-content-center"
  >
    <div className="image_heading mb-4">{mainH1}</div>
    <div className="image_sub_heading">{mainH2}</div>
  </div>
);

export const FilterDropdown = ({ filters, getFilter, clearFilter, router }) => {
  let brands = router?.query?.brand?.split(",") || [];
  let status = router?.query?.status?.split(",") || [];

  console.log({ brands });
  return (
    <div className="clarinettes_filter_button text-uppercase text-dark d-flex align-items-center mb-4 flex-wrap justify-content-center justify-content-md-start gap-4">
      <div className="jost_font clarinettes_filter_button_text mb-3 mb-sm-0 ">
        trier :
      </div>
      {/* <div>
        {filters?.brandsData && <AntSelectDropDown placeholder="PRIX" />}
        <AntSelectDropDown placeholder="PRIX" />
      </div> */}
      <div>
        {filters?.brandsData && (
          <AntSelectDropDown
            options={filters?.brandsData?.map((item) => ({
              label: item?.name,
              value: item?.id,
            }))}
            placeholder="COMPOSITEUR"
            onChange={(e) => getFilter("brand", e)}
            value={filters?.brandsData?.map((item) => {
              if (brands.includes(item?.id?.toString())) {
                return {
                  label: item?.name,
                  value: item?.id,
                };
              }
            })}
          />
        )}
      </div>
      <div>
        {/* <AntSelectDropDown placeholder="OFFRE" />
         */}
        {filters?.brandsData && (
          <AntSelectDropDown
            options={filters?.stateData?.map((item) => ({
              label: item?.name,
              value: item?.state_id,
            }))}
            placeholder="ETAT"
            onChange={(e) => getFilter("status", e)}
            value={filters?.stateData?.map((item) => {
              if (status.includes(item?.state_id?.toString())) {
                return {
                  label: item?.name,
                  value: item?.state_id,
                };
              }
            })}
          />
        )}
      </div>

      <RiDeleteBin5Fill
        onClick={clearFilter}
        className="ms-3 cursor-pointer mb-3 mb-sm-0"
      />
    </div>
  );
};

export const ProdPriceRowSection = ({
  newPrice,
  countPrice,
  oldPrice,
  productId,
  format,
}) => {
  const dispatch = useDispatch();
  const wishList = useSelector(state=>state.cart.wishList)


    const addProductWishList=async(productId)=>{
      dispatch(addToWishList(productId))
    }
  const addToCart = (productId) => {
    console.log("Col");
    let object = {
      product_id: productId,
      quantity: 1,
      type: format == "digital" ? 2 : 1,
    };

    dispatch(addProductToCart(object));
  };
  return (
    <div className="prod_price_card d-flex align-items-center justify-content-between">
      <div className="d-flex flex-column">
        <div className="prod_featured_price theme_primary_color">
          {newPrice}
        </div>
        {oldPrice ? <div className="prod_old_price">{oldPrice}</div> : null}
        {countPrice ? (
          <div className="prod_price_multiply_contianer d-flex">
            <div className="prod_price_multiply_black text-dark me-1">OU</div>
            <div className="prod_price_multiply_theme theme_primary_color">
              {countPrice}
            </div>
          </div>
        ) : null}
      </div>
      <div className="prod_price_cart d-flex flex-column theme_primary_color ms-3">
      {
                wishList.includes(productId)?<BsHeartFill size={18}  className="cursor-pointer me-3" onClick={()=>addProductWishList(productId)} />:
                <BsHeart size={18}  className="cursor-pointer me-3" onClick={()=>addProductWishList(productId)} />
              }
        <FaCartPlus
          className=" cursor-pointer"
          onClick={() => addToCart(productId)}
        />
      </div>
    </div>
  );
};
