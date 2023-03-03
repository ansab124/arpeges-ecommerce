import Breadcrumb, { BreadcrumbItem } from "@components/BreadCrumb";
import { MdOutlineClose } from "react-icons/md";
import { BsDashLg, BsPlusLg } from "react-icons/bs";
import { MdAddShoppingCart } from "react-icons/md";
import { ImBin } from "react-icons/im";
import { getWishListProducts } from "@actions";
import { useEffect, useState } from "react";
import Link from "next/link";


const MyWishList = () => {
  const [wishlist, setWishList] = useState()
  console.log("wishlist---", wishlist);

  const getWishList = async () => {
    let response = await getWishListProducts();
    setWishList(response);
  };
  useEffect(() => {
    getWishList();
  }, []);

  console.log({ wishlist });


  return (
    <div className="text-dark container ">
      <Breadcrumb>
        <BreadcrumbItem isLast>{"Liste d'envives"}</BreadcrumbItem>
      </Breadcrumb>
      <div className="row cartItems ">


        <div className="col-md-3 mt-4 ">
          <button className="bg-white">
            <h6 className="mt-2 px-2">+ NOUVELLA LISTE</h6>
          </button>

          <div className="mt-4">
            <h6 className="text-primary fw-bold">MA LISTE DENVIES {"D'u"}<br />03.11.2022</h6>
            <p className="mb-5">2 Products <br />Ma Liste modification {"D'u"}<br />03.11.2022</p>
          </div>

          <div className="mt-5">
            <h6 className="text-primary fw-bold">MA LISTE DENVIES {"D'u"}<br />03.11.2022</h6>
            <p className="mb-5">2 Products <br />Ma Liste modification {"D'u"}<br />03.11.2022</p>
          </div>


        </div>


        <div className="col-md-9 col-sm-12 step step01">
          <div className="d-flex justify-content-between align-items-center">
            <h2>{"MA liste d'envies du 03.11.2022"}</h2>
            <p>
              <ImBin /> <span>supprimer la liste</span>
            </p>
          </div>
          <div className="cartItems">
            <ul>
              {wishlist?.data?.map((item, index) => {
                return (
                  <li key={index} className="row">
                    <div className="col-md-9">
                      <div className="row">
                        <div className="col-md-3 ItemImg">
                          <img src={item.image} alt="" />

                          {/* <div className="discount">-20%</div> */}
                        </div>

                        <div className="col-md-6 itemInfo">
                          <div className="responsiveWrap">
                            <div className="mainInfo">
                              <Link passHref href={`${item?.type == "instrument" ? "/products" : "/partitions"}/${item?.slug}`}>
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
                                <button>
                                  <MdOutlineClose />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-3 quantity">
                          <div className="responsiveWrapQ">
                            <div className="quantityItems">
                              <button>
                                {" "}
                                <BsPlusLg />{" "}
                              </button>
                              <button>
                                {" "}
                                <BsDashLg />{" "}
                              </button>
                              <input type="text" value="1" />
                            </div>

                            <div className="itemPrice duplicatedPrice d-sm-none">
                              <div className="price">
                                {item.price}
                                <span className="taxInfo">
                                  {item.formatted_total}
                                </span>
                              </div>
                              <div>
                                <MdAddShoppingCart
                                  className="cartIcon"
                                  size={26}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-3 itemPrice hideInResponsive">
                      <div className="deleteItem">
                        <button>
                          <MdOutlineClose />
                        </button>
                      </div>
                      <div className="price">
                        {item.price}
                        <span className="taxInfo">{item.formatted_total}</span>
                      </div>
                      <div>
                        <MdAddShoppingCart className="cartIcon" size={26} />
                      </div>
                    </div>

                  </li>

                );
              })}
            </ul>

          </div>



          <div className="mt-4 d-flex justify-content-center border border-warning p-2">
            <p className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam odit at nisi numquam.</p>
          </div>

          <div className="p-2 d-flex justify-content-center mt-4 mb-4">
            <div className="col-md-4 cartSideBar">
              <div className=" wrapper totals">
                {
                  <h3>
                    Total liste : <span>477,60 TTC </span>
                  </h3>
                }
                <button>
                  <span className="ms-2">AJOUTER AU PAINER</span>{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default MyWishList;
