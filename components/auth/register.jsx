import Breadcrumb, { BreadcrumbItem } from "../../components/BreadCrumb";
import IntlTelInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { userRegister } from "@actions";
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

const register = ({ setStep, listsData, stepOneData }) => {
  return (
    <Formik
      enableReinitialize
      initialValues={{
        activity_id: "",
        societe: "",
        first_name: "",
        last_name: "",
        gender: 1,
        telephone: "",
        telephone_portable: "",
        date_of_birth: "",
        address_title: "",
        address1: "",
        address2: "",
        additional: "",
        postcode: "",
        city: "",
        country_id: "",
        error: "",
      }}
      validationSchema={Yup.object().shape({
        activity_id: Yup.object().shape({
          label: Yup.string().required(),
          value: Yup.string().required(),
        }),
        societe: Yup.string().required("Required"),
        first_name: Yup.string().required("Required"),
        last_name: Yup.string().required("Required"),
        telephone: Yup.string().required("Required"),
        telephone_portable: Yup.string().required("Required"),
        date_of_birth: Yup.string().required("Required"),
        address_title: Yup.string().required("Required"),
        address1: Yup.string().required("Required"),
        address2: Yup.string().required("Required"),
        additional: Yup.string().required("Required"),
        postcode: Yup.string().required("Required"),

        country_id: Yup.object().shape({
          label: Yup.string().required(),
          value: Yup.string().required(),
        }),
        gender: Yup.number().required("Required"),
      })}
      onSubmit={async (values, actions) => {
        const { setSubmitting, setFieldError } = actions;
        setSubmitting(true);
        delete stepOneData.confirmEmail;
        const payload = {
          ...stepOneData,
          activity_id: values.activity_id.value,
          first_name: values.first_name,
          last_name: values.last_name,
          gender: values.gender,
          telephone: values.telephone,
          telephone_portable: values.telephone_portable,
          date_of_birth: values.date_of_birth,
          address: {
            address_title: 1,
            address1: values.address1,
            address2: values.address2,
            additional: values.additional,
            postcode: values.postcode,
            city: values.city,
            country_id: values.country_id.value,
          },
        };
        const response = await userRegister(payload);
        setSubmitting(false);
        if (response.error) {
          setFieldError("error", response.message);
        } else {
          setStep(0);
        }
      }}
    >
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        errors,
        values,
        isSubmitting,
        touched,
        setFieldValue,
        setFieldTouched,
      }) => (
        <form onSubmit={handleSubmit}>
          <div className="instrument__container container my-3 my-sm-5 user registerPage ">
            <div className="my-4">
              <Breadcrumb>
                <BreadcrumbItem isLast>INSCRIPTION</BreadcrumbItem>
              </Breadcrumb>
            </div>

            <div className="loginContainer">
              <h1 className="text-dark"> Inscription </h1>

              <div className="row">
                <div className="col-md-6 loginFormContainer">
                  <h2> Informations </h2>

                  <div className="row formWrapper">
                    <div className="col-md-6">
                      <Select
                        className={` ${
                          errors.activity_id && touched.activity_id
                            ? "border border-danger"
                            : ""
                        }`}
                        styles={styles}
                        options={
                          listsData?.list_activities?.map((activity) => {
                            return {
                              label: activity?.title,
                              value: activity?.list_activity_id,
                            };
                          }) || []
                        }
                        onChange={(event) =>
                          setFieldValue("activity_id", event)
                        }
                        value={values.activity_id}
                        onBlur={handleBlur}
                        name="activity_id"
                        placeholder="Votre activite*"
                      />
                    </div>

                    <div className="col-md-6">
                      <input
                        type="text"
                        name="societe"
                        className={`form-control ${
                          errors.societe && touched.societe
                            ? "border border-danger"
                            : ""
                        }`}
                        placeholder="Societe"
                        value={values.societe}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>

                    <div className="col-md-12 radioWrap">
                      <label>
                        <input
                          type="radio"
                          name="gender"
                          onChange={() => setFieldValue("gender", 0)}
                          checked={+values.gender == 0}
                        />
                        Mme
                      </label>

                      <label>
                        <input
                          type="radio"
                          name="gender"
                          onChange={() => setFieldValue("gender", 1)}
                          checked={+values.gender == 1}
                        />
                        Mr
                      </label>
                    </div>

                    <div className="col-md-6">
                      <input
                        type="text"
                        name="last_name"
                        className={`form-control ${
                          errors.last_name && touched.last_name
                            ? "border border-danger"
                            : ""
                        }`}
                        placeholder="Nom*"
                        value={values.last_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>

                    <div className="col-md-6">
                      <input
                        type="text"
                        name="first_name"
                        className={`form-control ${
                          errors.first_name && touched.first_name
                            ? "border border-danger"
                            : ""
                        }`}
                        placeholder="Prenom*"
                        value={values.first_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>

                    <div className="col-md-6 tel">
                      <label> Telephone*: </label>

                      <IntlTelInput
                        containerClass="w-full"
                        inputClass="w-full "
                        country={"fr"}
                        preferredCountries={["fr"]}
                        placeholder="Telephone*"
                        onChange={(value) => setFieldValue("telephone", value)}
                        onBlur={handleBlur}
                        name="telephone"
                        className={`form-control ${
                          errors.telephone && touched.telephone
                            ? "border border-danger"
                            : ""
                        }`}
                        value={values.telephone}
                      />
                    </div>

                    <div className="col-md-6 tel">
                      <label> Telephone Portable: </label>
                      <IntlTelInput
                        preferredCountries={["fr"]}
                        country={"fr"}
                        placeholder="Telephone Portable*"
                        onChange={(value) =>
                          setFieldValue("telephone_portable", value)
                        }
                        onBlur={handleBlur}
                        name="telephone_portable"
                        className={`form-control ${
                          errors.telephone_portable &&
                          touched.telephone_portable
                            ? "border border-danger"
                            : ""
                        }`}
                        value={values.telephone_portable}
                      />
                    </div>

                    <div className="col-md-12 formNotes">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Deserunt <span> vero illo ipsa iusto nostrum </span>
                    </div>

                    <div className="col-md-6 calendarInput">
                      <label> Date de naissance: </label>
                      <input
                        type="date"
                        id="birthday"
                        name="date_of_birth"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`form-control ${
                          errors.date_of_birth && touched.date_of_birth
                            ? "border border-danger"
                            : ""
                        }`}
                      />
                    </div>

                    <div className="col-md-12 checkboxWrap">
                      <label>
                        <input
                          type="checkbox"
                          id="newsletter"
                          name="newsletter"
                          value="newsletter"
                        />
                        Profitez de nos offers grace a notre newsletter
                      </label>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 registerFormContainer">
                  <h2> Livraison </h2>

                  <div className="row formWrapper">
                    <div className="col-md-6">
                      <input
                        placeholder="Mon adresse (nom adresse)"
                        type="text"
                        name="address_title"
                        className={`form-control ${
                          errors.address_title && touched.address_title
                            ? "border border-danger"
                            : ""
                        }`}
                        value={values.address_title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    <div className="col-md-12">
                      <input
                        placeholder="Adresse*"
                        type="text"
                        name="address1"
                        className={`form-control ${
                          errors.address1 && touched.address1
                            ? "border border-danger"
                            : ""
                        }`}
                        value={values.address1}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    <div className="col-md-12">
                      <input
                        placeholder="Adresse suite"
                        type="text"
                        name="address2"
                        className={`form-control ${
                          errors.address2 && touched.address2
                            ? "border border-danger"
                            : ""
                        }`}
                        value={values.address2}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    <div className="col-md-12">
                      <input
                        placeholder="Commplement adresse "
                        type="text"
                        name="additional"
                        className={`form-control ${
                          errors.additional && touched.additional
                            ? "border border-danger"
                            : ""
                        }`}
                        value={values.additional}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        placeholder="Code postal* "
                        type="text"
                        name="postcode"
                        className={`form-control ${
                          errors.postcode && touched.postcode
                            ? "border border-danger"
                            : ""
                        }`}
                        value={values.postcode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>

                    <div className="col-md-6">
                      <input
                        placeholder="villa* "
                        type="text"
                        name="city"
                        className={`form-control ${
                          errors.city && touched.city
                            ? "border border-danger"
                            : ""
                        }`}
                        value={values.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    <div className="col-md-6">
                      <Select
                        styles={styles}
                        options={
                          listsData?.countries?.map((country) => {
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
                    <div className="col-md-12 checkboxWrap">
                      <label>
                        <input type="checkbox" name="terms" value="terms" />
                        Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor
                        <a> adipisicing elit </a>
                      </label>
                    </div>
                    <div>
                      {errors.error && (
                        <p className="text-danger">{errors.error}</p>
                      )}
                    </div>
                    <div className="col-md-12">
                      <button
                        type="submit"
                        className="btn btn-primary generalBtn"
                      >
                        {isSubmitting && <AiOutlineLoading3Quarters />}
                        <span className="ms-2">Creer le compte</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default register;
