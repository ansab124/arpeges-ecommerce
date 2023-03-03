import React, { useState, useCallback, useEffect } from "react";
import CartSideBar from "./cartSideBar";
import { MdOutlineClose } from "react-icons/md";
import { BsDashLg, BsPlusLg } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProductFromCart,
  removeProductFromProduct,
} from "@store/thunk/cart";
import { useRouter } from "next/router";
import Link from "next/link";

const Step1 = () => {
  const cartDetails = useSelector((state) => state.cart.details);
  console.log("cartDataaa----", cartDetails)

  const dispatch = useDispatch();

  const handleUpdateQuantity = (payload) => {
    dispatch(updateProductFromCart(payload));
  };

  const handleRemoveProduct = (id) => {
    dispatch(removeProductFromProduct(id));
  };

  const router = useRouter()


  const submitFormData = () => {


    router.push({
      path: "/cart",

      query: {
        step: "identity",
      }
    })

  };




  return (
    <div className="step step01">
      <div className="stepKeysWrapper">
        <ul>
          <li className="active">
            <div className="stepKey">
              <button> 1 </button>
            </div>
            <div className="stepTitle">Panier</div>
          </li>

          <li>
            <div className="stepKey">

              <button onClick={submitFormData}> 2 </button>


            </div>
            <div className="stepTitle">IDENTIFICATION / LIVRAISON</div>
          </li>

          <li>
            <div className="stepKey">
              <button> 3 </button>
            </div>
            <div className="stepTitle">PAIEMENT</div>
          </li>
        </ul>
      </div>

      <h3> PANIER </h3>

      <div className="row">
        <div className="col-md-8">
          <div className="cartItems">
            <ul>
              {cartDetails?.items?.map((item, index) => {
                return (
                  <ProductItem
                    key={index}
                    item={item}
                    onUpdate={handleUpdateQuantity}
                    onDelete={handleRemoveProduct}
                  />
                );
              })}
              {/* <li className='row'>


                                <div className="col-md-9">
                                    <div className="row">
                                        <div className="col-md-3 ItemImg">
                                            <img src="/assets/boisPngs/calque_104.png" alt="" />

                                            <div className="discount">
                                                -20%
                                            </div>
                                        </div>

                                        <div className="col-md-6 itemInfo">
                                            <div className="responsiveWrap">

                                                <div className="mainInfo">

                                                    <h3>
                                                        YAMAHA <span> YCL 250SUK </span>
                                                    </h3>

                                                    <h4>
                                                        CLARINETTE SIB
                                                    </h4>

                                                    <div className="codeArticle">
                                                        Code article : XXXXXX
                                                    </div>
                                                    <div className="format">
                                                        Format : <span> Numérique </span>
                                                    </div>

                                                </div>

                                                <div className="d-block d-sm-none ">
                                                    <div className="deleteItem">
                                                        <button><MdOutlineClose /></button>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>


                                        <div className="col-md-3 quantity">
                                            <div className="responsiveWrapQ">
                                                <div className="quantityItems">
                                                    <button> <BsPlusLg /> </button>
                                                    <button> <BsDashLg /> </button>
                                                    <input
                                                        type="text"
                                                        value="1" />
                                                </div>

                                                <div className="itemPrice duplicatedPrice d-sm-none">
                                                    <div className="price">
                                                        389,00€ TTC
                                                        <span className="taxInfo">
                                                            Au lieu de 491,00€ TTC
                                                        </span>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-3 itemPrice hideInResponsive">
                                    <div className="deleteItem">
                                        <button><MdOutlineClose /></button>
                                    </div>
                                    <div className="price">
                                        389,00€ TTC
                                        <span className="taxInfo">
                                            Au lieu de 491,00€ TTC
                                        </span>
                                    </div>

                                </div>
                            </li>


                            <li className='row'>


                                <div className="col-md-9">
                                    <div className="row">
                                        <div className="col-md-3 ItemImg">
                                            <img src="/assets/boisPngs/calque_104.png" alt="" />

                                            <div className="discount">
                                                -20%
                                            </div>
                                        </div>

                                        <div className="col-md-6 itemInfo">
                                            <div className="responsiveWrap">

                                                <div className="mainInfo">

                                                    <h3>
                                                        YAMAHA <span> YCL 250SUK </span>
                                                    </h3>

                                                    <h4>
                                                        CLARINETTE SIB
                                                    </h4>

                                                    <div className="codeArticle">
                                                        Code article : XXXXXX
                                                    </div>
                                                    <div className="format">
                                                        Format : <span> Numérique </span>
                                                    </div>

                                                </div>

                                                <div className="d-block d-sm-none ">
                                                    <div className="deleteItem">
                                                        <button><MdOutlineClose /></button>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>


                                        <div className="col-md-3 quantity">
                                            <div className="responsiveWrapQ">
                                                <div className="quantityItems">
                                                    <button> <BsPlusLg /> </button>
                                                    <button> <BsDashLg /> </button>
                                                    <input
                                                        type="text"
                                                        value="1" />
                                                </div>

                                                <div className="itemPrice duplicatedPrice d-sm-none">
                                                    <div className="price">
                                                        389,00€ TTC
                                                        <span className="taxInfo">
                                                            Au lieu de 491,00€ TTC
                                                        </span>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-3 itemPrice hideInResponsive">
                                    <div className="deleteItem">
                                        <button><MdOutlineClose /></button>
                                    </div>
                                    <div className="price">
                                        389,00€ TTC
                                        <span className="taxInfo">
                                            Au lieu de 491,00€ TTC
                                        </span>
                                    </div>

                                </div>
                            </li>



                            <li className='row'>


                                <div className="col-md-9">
                                    <div className="row">
                                        <div className="col-md-3 ItemImg">
                                            <img src="/assets/boisPngs/calque_104.png" alt="" />

                                            <div className="discount">
                                                -20%
                                            </div>
                                        </div>

                                        <div className="col-md-6 itemInfo">
                                            <div className="responsiveWrap">

                                                <div className="mainInfo">

                                                    <h3>
                                                        YAMAHA <span> YCL 250SUK </span>
                                                    </h3>

                                                    <h4>
                                                        CLARINETTE SIB
                                                    </h4>

                                                    <div className="codeArticle">
                                                        Code article : XXXXXX
                                                    </div>
                                                    <div className="format">
                                                        Format : <span> Numérique </span>
                                                    </div>

                                                </div>

                                                <div className="d-block d-sm-none ">
                                                    <div className="deleteItem">
                                                        <button><MdOutlineClose /></button>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>


                                        <div className="col-md-3 quantity">
                                            <div className="responsiveWrapQ">
                                                <div className="quantityItems">
                                                    <button> <BsPlusLg /> </button>
                                                    <button> <BsDashLg /> </button>
                                                    <input
                                                        type="text"
                                                        value="1" />
                                                </div>

                                                <div className="itemPrice duplicatedPrice d-sm-none">
                                                    <div className="price">
                                                        389,00€ TTC
                                                        <span className="taxInfo">
                                                            Au lieu de 491,00€ TTC
                                                        </span>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-3 itemPrice hideInResponsive">
                                    <div className="deleteItem">
                                        <button><MdOutlineClose /></button>
                                    </div>
                                    <div className="price">
                                        389,00€ TTC
                                        <span className="taxInfo">
                                            Au lieu de 491,00€ TTC
                                        </span>
                                    </div>

                                </div>
                            </li>



                            <li className='row'>


                                <div className="col-md-9">
                                    <div className="row">
                                        <div className="col-md-3 ItemImg">
                                            <img src="/assets/boisPngs/calque_104.png" alt="" />

                                            <div className="discount">
                                                -20%
                                            </div>
                                        </div>

                                        <div className="col-md-6 itemInfo">
                                            <div className="responsiveWrap">

                                                <div className="mainInfo">

                                                    <h3>
                                                        YAMAHA <span> YCL 250SUK </span>
                                                    </h3>

                                                    <h4>
                                                        CLARINETTE SIB
                                                    </h4>

                                                    <div className="codeArticle">
                                                        Code article : XXXXXX
                                                    </div>
                                                    <div className="format">
                                                        Format : <span> Numérique </span>
                                                    </div>

                                                </div>

                                                <div className="d-block d-sm-none ">
                                                    <div className="deleteItem">
                                                        <button><MdOutlineClose /></button>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>


                                        <div className="col-md-3 quantity">
                                            <div className="responsiveWrapQ">
                                                <div className="quantityItems">
                                                    <button> <BsPlusLg /> </button>
                                                    <button> <BsDashLg /> </button>
                                                    <input
                                                        type="text"
                                                        value="1" />
                                                </div>

                                                <div className="itemPrice duplicatedPrice d-sm-none">
                                                    <div className="price">
                                                        389,00€ TTC
                                                        <span className="taxInfo">
                                                            Au lieu de 491,00€ TTC
                                                        </span>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-3 itemPrice hideInResponsive">
                                    <div className="deleteItem">
                                        <button><MdOutlineClose /></button>
                                    </div>
                                    <div className="price">
                                        389,00€ TTC
                                        <span className="taxInfo">
                                            Au lieu de 491,00€ TTC
                                        </span>
                                    </div>

                                </div>
                            </li> */}
            </ul>
          </div>
        </div>

        <CartSideBar submitStep={submitFormData} />
      </div>
    </div>
  );
};

export default Step1;

function ProductItem({ item, onUpdate, onDelete }) {
  const increaseQuantity = () => {
    let payload = {
      qty: {
        [item?.id]: +item.quantity + 1,
      },
    };
    onUpdate(payload);
  };
  const decreaseQuantity = () => {
    if (item.quantity - 1 > 0) {
      let payload = {
        qty: {
          [item?.id]: +item.quantity - 1,
        },
      };
      onUpdate(payload);
    }
  };

  const handleRemove = () => {
    onDelete(item?.id);
  };

  return (
    <li className="row">
      <div className="col-md-9">
        <div className="row">
          <div className="col-md-3 ItemImg">
            <img src={item?.image} alt="" />

            {/* <div className="discount">
                                                        -20%
                                                    </div> */}
          </div>

          <div className="col-md-6 itemInfo">
            <div className="responsiveWrap">
              <div className="mainInfo">
               <Link passHref href={`${item?.type=="instrument"?"/products":"/partitions"}/${item?.slug}`}>
              <a>

              {item?.title ? (
                  <h3>{item?.title}</h3>
                ) : (
                  <h3>
                    {item.brand} <span> {item.model} </span>
                  </h3>
                )}
              </a>
               </Link>

                <h4>{item.category}</h4>

                {item?.code_article && (
                  <div className="codeArticle">
                    Code article : {item?.code_article}
                  </div>
                )}
                {item?.format && (
                  <div className="format">
                    Format : <span> {item?.format} </span>
                  </div>
                )}
              </div>

              <div className="d-block d-sm-none ">
                <div className="deleteItem">
                  <button onClick={handleRemove}>
                    <MdOutlineClose />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3 quantity">
            <div className="responsiveWrapQ">
              <div className="quantityItems">
                <button onClick={increaseQuantity}>
                  {" "}
                  <BsPlusLg />{" "}
                </button>
                <button onClick={decreaseQuantity}>
                  {" "}
                  <BsDashLg />{" "}
                </button>
                <input type="text" value={item.quantity} />
              </div>

              <div className="itemPrice duplicatedPrice d-sm-none">
                <div className="price">
                  {item?.formatted_total}
                  {/* <span className="taxInfo">
                                  Au lieu de 491,00€ TTC
                                </span> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-3 itemPrice hideInResponsive">
        <div className="deleteItem">
          <button onClick={handleRemove}>
            <MdOutlineClose />
          </button>
        </div>
        <div className="price">
          {item?.formatted_total}
          {/* <span className="taxInfo">
                                                    Au lieu de 491,00€ TTC
                                                </span> */}
        </div>
      </div>
    </li>
  );
}
