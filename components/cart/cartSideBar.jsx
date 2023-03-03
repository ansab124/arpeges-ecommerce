import { getActivitiesAndCountriesList, updateUserAddress } from "@actions";
import { Formik } from "formik";
import React, { useEffect } from "react";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import Select from "react-select";
import { getShippingMethods } from "@store/thunk/cart";
import { useRouter } from "next/router";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
const styles = {
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    color: isSelected ? "#fff" : "#000",
    zIndex: 1,
    fontWeight: 400,
  }),
  placeholder: (basestyle) => {
    return {
      ...basestyle,
      fontWeight: 400,
      fontSize: "0.9rem",
    };
  },
};

const CartSideBar = ({ submitStep, onPayment, loading }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [updateAddressData, setUpdateAddressData] = useState(null);
  const [countries, setCountries] = useState([]);



  const { info, token } = useSelector((state) => state.user);
  const {
    details,
    addresses: { shipping_address, billing_addresses },
  } = useSelector((state) => state.cart);

  const getCountries = async () => {
    const countryData = await getActivitiesAndCountriesList();
    setCountries(
      countryData?.countries?.map((country) => ({
        label: country?.name,
        value: country?.id,
      }))
    );
  };

  useEffect(() => {
    getCountries();
  }, []);

  const handleStep = (e) => {
    if (!info || !token) {
      router.push("/auth/login");
    } else {
      submitStep(e);
    }
  };

  return (
    <div className="col-md-4 cartSideBar">
      <div className="wrapper deliveryAddress">
        <h3> Adresse de livraison </h3>

        <div className="addressDetails">
          <div className="fullAddress">
            <h4>
              {" "}
              {shipping_address?.first_name} {shipping_address?.last_name}{" "}
            </h4>
            <p>
              {shipping_address?.address1} <br />
              {shipping_address?.address2} <br />
              {shipping_address?.additional}
              <br />
              {shipping_address?.postcode} {shipping_address?.city}
              <br />
              {shipping_address?.country}
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setUpdateAddressData(shipping_address);
              setShowModal(true);
            }}
          >
            MODIFIER
          </button>
        </div>
      </div>

      {/* Modal UI */}

      <div className={`modal fade editAddressModal ${showModal ? "show" : ""}`}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowModal(false)}
              ></button>
            </div>
            <Formik
              enableReinitialize
              initialValues={{
                id: updateAddressData?.id,
                address_title: updateAddressData?.address_title || "",
                company_name: updateAddressData?.company_name || "",
                first_name: updateAddressData?.first_name || "",
                last_name: updateAddressData?.last_name || "",
                address1: updateAddressData?.address1 || "",
                address2: updateAddressData?.address2 || "",
                additional: updateAddressData?.additional || "",
                postcode: updateAddressData?.postcode,
                city: updateAddressData?.city,
                country_id: countries?.filter(
                  (country) => country.value == updateAddressData?.country_id
                )[0],
                error: "",
              }}
              validationSchema={Yup.object().shape({
                company_name: Yup.string().required("Required"),
                first_name: Yup.string().required("Required"),
                last_name: Yup.string().required("Required"),
                address_title: Yup.string().required("Required"),
                address1: Yup.string().required("Required"),
                address2: Yup.string().required("Required"),
                additional: Yup.string().required("Required"),
                postcode: Yup.string().required("Required"),

                country_id: Yup.object().shape({
                  label: Yup.string().required(),
                  value: Yup.string().required(),
                }),
              })}
              onSubmit={async (values, actions) => {
                const { setSubmitting, setFieldError } = actions;
                let obj = {
                  ...values,
                  country_id: values.country_id.value,
                };
                const response = await updateUserAddress(obj);
                if (!response?.error) {
                  dispatch(getShippingMethods());
                  setShowModal(false);
                } else {
                  setFieldError("error", response?.message || "error");
                }
              }}
            >
              {({
                values,
                errors,
                handleChange,
                handleSubmit,
                handleBlur,
                touched,
                setFieldValue,
              }) => {
                console.log({ values });
                return (
                  <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                      <div className=" addressForm">
                        <h3> Ajouter ou Modifier une nouvelle adresse </h3>

                        <div className="row">
                          <div className="col-md-6">
                            <input
                              type="text"
                              name="address_title"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={`form-control ${
                                errors.address_title && touched.address_title
                                  ? "border border-danger"
                                  : ""
                              }`}
                              placeholder="nom adresse"
                              value={values.address_title}
                            />
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                            <input
                              type="text"
                              name="company_name"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={`form-control ${
                                errors.company_name && touched.company_name
                                  ? "border border-danger"
                                  : ""
                              }`}
                              value={values.company_name}
                              placeholder="nom DE SOCIété"
                            />
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                            <input
                              type="text"
                              name="last_name"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={`form-control ${
                                errors.last_name && touched.last_name
                                  ? "border border-danger"
                                  : ""
                              }`}
                              placeholder="NOM*"
                              value={values.last_name}
                            />
                          </div>

                          <div className="col-md-6">
                            <input
                              type="text"
                              name="first_name"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={`form-control ${
                                errors.first_name && touched.first_name
                                  ? "border border-danger"
                                  : ""
                              }`}
                              placeholder="Prénom*"
                              value={values.first_name}
                            />
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-12">
                            <input
                              type="text"
                              name="address1"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={`form-control ${
                                errors.address1 && touched.address1
                                  ? "border border-danger"
                                  : ""
                              }`}
                              placeholder="Adresse*"
                              value={values.address1}
                            />
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-12">
                            <input
                              type="text"
                              name="address2"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={`form-control ${
                                errors.address2 && touched.address2
                                  ? "border border-danger"
                                  : ""
                              }`}
                              placeholder="Adresse Suite"
                              value={values.address2}
                            />
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-12">
                            <input
                              type="text"
                              name="additional"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={`form-control ${
                                errors.additional && touched.additional
                                  ? "border border-danger"
                                  : ""
                              }`}
                              placeholder="complément adresse"
                              value={values.additional}
                            />
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                            <input
                              type="text"
                              name="postcode"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={`form-control ${
                                errors.postcode && touched.postcode
                                  ? "border border-danger"
                                  : ""
                              }`}
                              value={values.postcode}
                              placeholder="code postal*"
                            />
                          </div>

                          <div className="col-md-6">
                            <input
                              type="text"
                              name="city"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={`form-control ${
                                errors.city && touched.city
                                  ? "border border-danger"
                                  : ""
                              }`}
                              value={values.city}
                              placeholder="ville*"
                            />
                          </div>

                          <div className="col-md-6">
                            <Select
                              styles={styles}
                              options={countries}
                              value={values.country_id}
                              onChange={(e) => setFieldValue("country_id", e)}
                              name="country_id"
                              placeholder="pays"
                              className={` ${
                                errors.country_id && touched.country_id
                                  ? "border border-danger"
                                  : ""
                              }`}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      {errors.error && (
                        <p className="text-danger">{errors.error}</p>
                      )}
                    </div>

                    <div className="modal-footer">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        data-bs-dismiss="modal"

                        // onClick={() => setShowModal(false)}
                      >
                        Enregister
                      </button>
                    </div>
                  </form>
                );
              }}
            </Formik>

            {/* <div className="modal-body"> */}
            {/* <ul className="editAddresses">
                <li className="addressBlock">
                  <div className="addressInfo">
                    <div className="title"> ADRESSE DE LIVRAISON</div>
                    <p className="name"> Prenom Nom </p>
                    <p> 29 boulevard de la république</p>
                    <p> Exemple adresse ligne 2 lorem ipsum</p>
                    <p> Complément adresse</p>
                    <p> 92250 La Garenne Colombes </p>
                    <p> France métropolitaine</p>
                  </div>
                  <button className="modifier">modifier</button>
                </li>

                <li className="addressBlock">
                  <div className="addressInfo">
                    <div className="title"> ADRESSE DE FACTURATION</div>
                    <p className="name"> Prenom Nom </p>
                    <p> 29 boulevard de la république</p>
                    <p> Exemple adresse ligne 2 lorem ipsum</p>
                    <p> Complément adresse</p>
                    <p> 92250 La Garenne Colombes </p>
                    <p> France métropolitaine</p>
                  </div>
                  <button className="modifier">modifier</button>
                </li>
              </ul> */}

            {/* <div className=" addressForm">
                <h3> Ajouter ou Modifier une nouvelle adresse </h3>

                <div className="row">
                  <div className="col-md-6">
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder="nom adresse"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder="nom DE SOCIété"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <input type="text" name="" id="" placeholder="NOM*" />
                  </div>

                  <div className="col-md-6">
                    <input type="text" name="" id="" placeholder="Prénom*" />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <input type="text" name="" id="" placeholder="Adresse*" />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder="Adresse Suite"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder="complément adresse"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder="code postal*"
                    />
                  </div>

                  <div className="col-md-6">
                    <select name="" id="">
                      <option value=""> ville récupérée selon cp*</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <select name="" id="">
                      <option value=""> France </option>
                    </select>
                  </div>
                </div>
              </div>
            </div> */}

            {/* <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => setShowModal(false)}
              >
                Enregister
              </button>
            </div> */}
          </div>
        </div>
      </div>

      <div className="wrapper billingAddress">
        <h3> Adresse de facturation </h3>
        <div className="addressDetails">
          <div className="fullAddress">
            <h4>
              {" "}
              {billing_addresses?.first_name} {billing_addresses?.last_name}{" "}
            </h4>
            <p>
              {billing_addresses?.address1} <br />
              {billing_addresses?.address2} <br />
              {billing_addresses?.additional}
              <br />
              {billing_addresses?.postcode} {billing_addresses?.city}
              <br />
              {billing_addresses?.country}
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setUpdateAddressData(billing_addresses);
              setShowModal(true);
            }}
          >
            MODIFIER
          </button>
        </div>
      </div>

      <div className="wrapper totals">
        {
          <h3>
            Total panier : <span>{details?.formatted_grand_total} </span>
          </h3>
        }

        <p>
          {" "}
          <span> Les frais de livraison </span>{" "}
          {`seront calculés à l'étape suivante`}{" "}
        </p>

        <button onClick={handleStep}>
          {loading && <AiOutlineLoading3Quarters />}
          <span className="ms-2">ALLER AU PAIEMENT</span>{" "}
        </button>
      </div>

      {/* </div> */}
      {/* customerSupport */}

      <div className="customerSupport">
        <div className="supportDetails">
          <div className="title"> SERVICE CLIENT </div>
          <div className="supportNumber"> 01 53 06 39 40 </div>
          <div className="supportNote">
            Du lundi au samedi (9h -13h/14h -19h){" "}
          </div>
        </div>
        <div className="supportIcon">
          <img src="/assets/icons/support.gif" alt="" />
        </div>
      </div>

      {/* ============== LastStep sidebar */}
      <div className="cartSummary">
        <h4>
          {" "}
          Panier : <span> {details?.formatted_grand_total} TTC </span>{" "}
        </h4>
        <div className="taxTip">Prix TTC, frais de livraison inclus.</div>

        <ul className="summaryItems">
          {details?.items?.map((item, index) => {
            return (
              <li key={index}>
                <img src={item?.image} alt={index} />

                <div className="itemInfo">
                  {item?.title ? (
                    <h5>{item?.title}</h5>
                  ) : (
                    <h5>
                      {item.brand} <span> {item.model} </span>
                    </h5>
                  )}

                  <div className="price">
                    {item?.formatted_total} TTC
                    {/* <span>491,00€ TTC </span> */}
                  </div>
                </div>

                <div className="itemQuantity">X{item?.quantity}</div>
              </li>
            );
          })}
          {/* 

          <li>
            <img src="/assets/boisPngs/calque_104.png" alt="" />

            <div className="itemInfo">
              <h5>
                {" "}
                YAMAHA <span> YCL 250SUK </span>{" "}
              </h5>

              <div className="price">
                389,00€ TTC
                <span>491,00€ TTC </span>
              </div>
            </div>

            <div className="itemQuantity">X1</div>
          </li> */}
        </ul>

        <ul className="calculation">
          <li>
            <label> Sous-total TTC </label>
            <div className="price"> {details?.formatted_sub_total} </div>
          </li>

          <li>
            <label> Eco taxe TTC </label>
            <div className="price"> {details?.formatted_tax_total} </div>
          </li>

          <li>
            <label> Livraison </label>
            <div className="price"> - </div>
          </li>

          <li>
            <label> Code promo </label>
            <div className="promoApplied">
              {/* <span> SOLDES2022 </span> */}
              <button>
                {" "}
                <MdDelete />{" "}
              </button>
            </div>
            <div className="price"> - </div>
          </li>
        </ul>

        <div className="totalCartPrice">
          total TTC : <span> {details?.formatted_grand_total} TTC </span>
        </div>

        <button className="PayTotal " onClick={onPayment}>
          {" "}
          {loading && <AiOutlineLoading3Quarters />}
          <span className="ms-2">PAYEZ</span> {details?.formatted_grand_total}{" "}
        </button>
      </div>
    </div>
  );
};

export default CartSideBar;
