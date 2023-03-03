import Breadcrumb, { BreadcrumbItem } from "../../components/BreadCrumb";
import { useRouter } from "next/router";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  userLogin,
  checkEmailExist,
  userForgetPassword,
  userResetPassword,
} from "@actions";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { userActions } from "@store/slices/auth";
import { useDispatch } from "react-redux";
import { useState } from "react";

const Login = ({ setStep, getFieldValue }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [openForgetPasswordModel, setOpenForgetPasswordModal] = useState(false);

  return (
    <div className="instrument__container container my-3 my-sm-5 loginPage">
      <div className="my-4">
        <Breadcrumb>
          <BreadcrumbItem isLast>CONNEXION</BreadcrumbItem>
        </Breadcrumb>
      </div>

      <div className="loginContainer">
        <h1 className="text-dark"> Connexion-Inscription </h1>

        <div className="row">
          <div className="col-md-6 loginFormContainer">
            <h2> Se Connecter </h2>
            <p> Lorem ipsum dolor sit amet consectetur adipisicing elit </p>
            <Formik
              initialValues={{
                email: "",
                password: "",
                error: "",
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string().email("Invalid email").required("Required"),
                password: Yup.string().required("Required"),
              })}
              onSubmit={async (values, actions) => {
                actions.setSubmitting(true);
                const response = await userLogin(values);
                actions.setSubmitting(false);
                console.log({ response });
                if (!response.error) {
                  router.push("/");
                  dispatch(userActions.getUserInfo(response.data));
                  dispatch(userActions.getUserToken(response.token));
                } else {
                  actions.setFieldError("error", response?.message);
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
              }) => (
                <form onSubmit={handleSubmit}>
                  <div className="row formWrapper">
                    <div className="col-md-6">
                      <input
                        placeholder="E-mail ou code magasin*"
                        name="email"
                        type="email"
                        className={`form-control ${
                          errors.email && touched.email
                            ? "border border-danger"
                            : ""
                        }`}
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>

                    <div className="col-md-6">
                      <input
                        placeholder="Mot de passe*"
                        name="password"
                        type="password"
                        className={`form-control ${
                          errors.password && touched.password
                            ? "border border-danger"
                            : ""
                        }`}
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>

                    <div
                      onClick={() => setOpenForgetPasswordModal(true)}
                      className="col-md-12 forgotPass"
                    >
                      <a> mot de passe oublié ? </a>
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
                        disabled={isSubmitting}
                      >
                        {isSubmitting && <AiOutlineLoading3Quarters />}
                        <span className="ms-2">Se Connecter</span>
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </Formik>
          </div>

          <div className="col-md-6 registerFormContainer">
            <h2> {"S'inscrire"} </h2>
            <p> Lorem ipsum dolor sit amet consectetur adipisicing elit </p>

            <Formik
              initialValues={{
                email: "",
                confirmEmail: "",
                password: "",
                password_confirmation: "",
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string().email("Invalid email").required("Required"),
                confirmEmail: Yup.string()
                  .email("Invalid email")
                  .required("Required")
                  .lowercase()
                  .oneOf([Yup.ref("email", "")], "Email must match"),
                password: Yup.string().required("Required").min(8),
                password_confirmation: Yup.string()
                  .required("Required")
                  .oneOf(
                    [Yup.ref("password", "")],
                    "Le mot de passe doit correspondre"
                  ),
                error: "",
              })}
              onSubmit={async (values, actions) => {
                const { setSubmitting } = actions;
                setSubmitting(true);
                const response = await checkEmailExist({ email: values.email });
                setSubmitting(false);
                console.log(response);
                if (!response.error && !+response?.email_exists) {
                  getFieldValue(values);
                  setStep(1);
                } else {
                  actions.setFieldError("error", response?.message);
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
              }) => (
                <form onSubmit={handleSubmit}>
                  <div className="row formWrapper">
                    <div className="col-md-6">
                      <input
                        placeholder="E-mail*"
                        name="email"
                        type="email"
                        className={`form-control ${
                          errors.email && touched.email
                            ? "border border-danger"
                            : ""
                        }`}
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>

                    <div className="col-md-6">
                      <input
                        placeholder="Confirmez E-mail*"
                        name="confirmEmail"
                        type="email"
                        className={`form-control ${
                          errors.confirmEmail && touched.confirmEmail
                            ? "border border-danger"
                            : ""
                        }`}
                        value={values.confirmEmail}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        placeholder="password*"
                        name="password"
                        type="password"
                        className={`form-control ${
                          errors.password && touched.password
                            ? "border border-danger"
                            : ""
                        }`}
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        placeholder="Confirmez mot de passe*"
                        name="password_confirmation"
                        type="password"
                        className={`form-control ${
                          errors.password_confirmation &&
                          touched.password_confirmation
                            ? "border border-danger"
                            : ""
                        }`}
                        value={values.password_confirmation}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                  </div>

                  <div className="formErrors">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec porttitor erat neque, vel sagittis tellus tempus
                    scelerisque.
                  </div>

                  <div>
                    {errors.error && (
                      <p className="text-danger">{errors.error}</p>
                    )}
                  </div>

                  <div className="col-md-12">
                    <button
                      type="submit"
                      className="btn btn-primary generalBtn d-flex align-items-center justify-content-center "
                    >
                      {isSubmitting && <AiOutlineLoading3Quarters />}
                      <span className="ms-2">{"S'inscrire"}</span>
                    </button>

                    <div className="or">Ou</div>

                    <button
                      type="submit"
                      className="btn btn-primary generalBtn"
                    >
                      {"S'inscrire Avec Google"}
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      {openForgetPasswordModel && (
        <div
          className={`modal fade editAddressModal ${
            openForgetPasswordModel ? "show" : ""
          }`}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setOpenForgetPasswordModal(false)}
                ></button>
              </div>
              <Formik
                initialValues={{ email: "", error: "" }}
                validationSchema={Yup.object().shape({
                  email: Yup.string()
                    .email("Invalid email")
                    .required("Required"),
                })}
                onSubmit={async (values, actions) => {
                  actions.setSubmitting(true);
                  delete values.error;
                  const response = await userForgetPassword(values);
                  actions.setSubmitting(false);
                  console.log({ response });
                  if (!response.error) {
                    setOpenForgetPasswordModal(false);
                  } else {
                    actions.setFieldError("error", response?.message);
                  }
                }}
              >
                {({
                  values,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  errors,
                  touched,
                }) => {
                  return (
                    <form onSubmit={handleSubmit}>
                      <div className="modal-body">
                        <h3>RÉINITIALISER VOTRE MOT DE PASSE</h3>
                        <p>
                          {`Veuillez saisir l'adresse e-mail associée à votre
                          compte ci-dessous. Un lien pour changer votre mot de
                          passe vous sera envoyé.`}
                        </p>
                        <div className="col-md-12">
                          <input
                            placeholder="E-mail ou code magasin*"
                            name="email"
                            type="email"
                            className={`form-control ${
                              errors.email && touched.email
                                ? "border border-danger"
                                : ""
                            }`}
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
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
                            RÉINITIALISER
                          </button>
                        </div>
                      </div>
                    </form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
