import Breadcrumb, { BreadcrumbItem } from "../../components/BreadCrumb";
import IntlTelInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

const register = () => {
  return (
    <Formik
      initialValues={{
        activity_id: "",
        societe: "",
        first_name: "",
        last_name: "",
        address_title: "",
        address1: "",
        address2: "",
        additional: "",
        postcode: "",
      }}
      validationSchema={Yup.object().shape({
        activity_id: Yup.string().required("Required"),
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
      })}
      onSubmit={(values, {}) => {
        console.log(values);
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
                <BreadcrumbItem>INSCRIPTION</BreadcrumbItem>
              </Breadcrumb>
            </div>

            <div className="loginContainer">
              <h1 className="text-dark"> Inscription </h1>

              <div className="row">
                <div className="col-md-6 loginFormContainer">
                  <h2> Informations </h2>

                  <div className="row formWrapper">
                    <div className="col-md-6">
                      <input
                        type="text"
                        name="activity_id"
                        className={`form-control ${
                          errors.activity_id && touched.activity_id
                            ? "border border-danger"
                            : ""
                        }`}
                        placeholder="Votre activite*"
                        value={values.activity_id}
                        onChange={handleChange}
                        onBlur={handleBlur}
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
                          value="Female"
                          checked
                        />
                        Mme
                      </label>

                      <label>
                        <input type="radio" name="gender" value="Female" />
                        Mr
                      </label>
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
                        placeholder="Nom*"
                        value={values.first_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
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
                        placeholder="Prenom*"
                        value={values.last_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>

                    <div className="col-md-6 tel">
                      <label> Telephone*: </label>

                      <IntlTelInput
                        containerClass="w-full"
                        inputClass="w-full"
                        country={"fr"}
                        preferredCountries={["fr"]}
                        placeholder="Prenom*"
                        onChange={(value) => setFieldValue("telephone", value)}
                        onBlur={handleBlur}
                        name="telephone_portable"
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
                        placeholder="Prenom*"
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
                        // onChange={handleChange}
                        // onBlur={handleBlur}
                        // onPhoneNumberChange={onChange()}
                        // onPhoneNumberBlur={onBlur()}
                      />
                    </div>

                    <div className="col-md-12 formNotes">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Deserunt <span> vero illo ipsa iusto nostrum </span>
                    </div>

                    <div className="col-md-6 calendarInput">
                      <label> Date de naissance: </label>
                      <input type="date" id="birthday" name="birthday" />
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
                      <select name="cp" id="cp">
                        <option value="">Ville recuperee selon CP*</option>
                      </select>
                    </div>

                    <div className="col-md-6">
                      <select name="country" id="country">
                        <option value="France">France*</option>
                      </select>
                    </div>

                    <div className="col-md-12 checkboxWrap">
                      <label>
                        <input type="checkbox" name="terms" value="terms" />
                        Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor
                        <a> adipisicing elit </a>
                      </label>
                    </div>

                    <div className="col-md-12">
                      <button
                        type="submit"
                        className="btn btn-primary generalBtn"
                      >
                        Creer le compte
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
