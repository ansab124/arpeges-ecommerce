import Breadcrumb, { BreadcrumbItem } from "../../components/BreadCrumb";
import Sidebar from "../../components/dashboard/SideBar";
import { useState, useEffect } from "react";
import {
  getActivitiesAndCountriesList,
  getUserAddresses,
  updateUserAddress,
} from "@actions";
import { Formik } from "formik";
import Select from "react-select";
import * as Yup from "yup";

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

const Addresses = () => {
  const [showModal, setShowModal] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [updateAddressData, setUpdateAddressData] = useState(null);
  const [countries, setCountries] = useState([]);

  const getCountries = async () => {
    const countryData = await getActivitiesAndCountriesList();
    setCountries(countryData?.countries);
  };
  const userAddresses = async () => {
    const response = await getUserAddresses();

    setAddresses(response?.data || []);
  };

  useEffect(() => {
    userAddresses();
    getCountries();
  }, []);

  return (
    <div className="container my-3 my-sm-5 dashboardPage addressesPage">
      <div className="my-4">
        <Breadcrumb>
          <BreadcrumbItem>Mon compte</BreadcrumbItem>
          <BreadcrumbItem>{"Mon carnet d'adresses"}</BreadcrumbItem>
        </Breadcrumb>
      </div>

      <div className="compteContainer">
        <div className="row">
          <Sidebar />
          <div className="col-md-8 compteDetails">
            <h1>{"MON CARNET D'ADRESSES"} </h1>

            <ul className="row addresses">
              {addresses &&
                addresses?.map((address, index) => {
                  const isDelivery =
                    address?.address_type == "DELIVERY_CUSTOMER";
                  return (
                    <li key={index} className="col-md-6">
                      <h3 className="text-uppercase">
                        ADRESSE DE {isDelivery ? "LIVRAISON" : "facturation"}
                      </h3>

                      {/* 👇 conditional H4 | show if available  */}
                      <h4> {"Nom de l'adresse "}</h4>
                      <p className="name">
                        {address?.first_name} {address?.last_name}{" "}
                      </p>
                      <p>
                        {address?.address1.map((add) => (
                          <>
                            <span>{add}</span>
                            <br />
                          </>
                        ))}
                        <br />
                        {address?.postcode} {address?.city}
                        <br />
                        {address?.country_name || "-"}
                      </p>

                      <button
                        type="button"
                        onClick={() => {
                          setUpdateAddressData(address);
                          setShowModal(true);
                        }}
                      >
                        modifier
                      </button>
                    </li>
                  );
                })}
            </ul>
          </div>
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
                address_title: "",
                company_name: updateAddressData?.company_name || "",
                first_name: updateAddressData?.first_name || "",
                last_name: updateAddressData?.last_name || "",
                address1: updateAddressData?.address1[0] || "",
                address2: updateAddressData?.address1[1] || "",
                additional: "",
                postcode: updateAddressData?.postcode,
                city: updateAddressData?.city,
                country_id: countries?.filter(
                  (country) => country.id == updateAddressData?.country
                ),
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
                  userAddresses();
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
                return (
                  <form onSubmit={handleSubmit}>
                    <div className="modal-body">
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
                              options={
                                countries?.map((country) => {
                                  return {
                                    label: country?.name,
                                    value: country?.id,
                                  };
                                }) || []
                              }
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addresses;
