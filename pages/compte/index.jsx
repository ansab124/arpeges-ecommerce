import { useState, useEffect } from "react";
import Breadcrumb, { BreadcrumbItem } from "../../components/BreadCrumb";
import Sidebar from "../../components/dashboard/SideBar";
import IntlTelInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { getActivitiesAndCountriesList, updatePassword, updateUserProfile } from "@actions";
import Select from "react-select";
import * as Yup from "yup";
import { handleGetUserData } from "@store/thunk";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import userAuthentication from "@components/UserAuthentication";
import { commonActions } from "@store/slices/common";

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

const Compte = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [showModalSuccessMsg, setShowModalSuccessMsg] = useState(false);
  const [userActivities, setUserActivities] = useState([]);
  const userData = useSelector((state) => state.user.info);
  const router = useRouter();

  // console.log("user-token", userData)

  // useEffect(()=>{
  //   if (userData == null) {
  //     router.push('/');
  //   }

  // },[])

  const getUserActivities = async () => {
    const response = await getActivitiesAndCountriesList();
    setUserActivities(
      response?.list_activities?.map((activity) => {
        return {
          label: activity?.title,
          value: activity?.list_activity_id,
        };
      }) || []
    );
  };

  useEffect(() => {
    getUserActivities();
  }, []);

  return (
    <div className="container my-3 my-sm-5 dashboardPage">
      <div className="my-4">
        <Breadcrumb>
          <BreadcrumbItem>Mon compte</BreadcrumbItem>
        </Breadcrumb>
      </div>

      <div className="compteContainer">
        <div className="row">
          <Sidebar />

          <div className="col-md-8 compteDetails infos">
            <h1> Mes informations </h1>

            <Formik
              enableReinitialize
              initialValues={{
                activity_id: userActivities?.filter(
                  (item) => item?.value == userData?.activity_id
                )[0],
                company_name: userData?.company_name || "",
                first_name: userData?.first_name || "",
                last_name: userData?.last_name || "",
                email: userData?.email || "",

                gender: userData?.gender || 1,
                telephone: userData?.telephone || "",
                telephone_portable: userData?.telephone_portable || "",
                date_of_birth: userData?.date_of_birth || "",
                error: "",
                siret: userData?.siret || "",
                tva: userData?.tva || "",
                eori: userData?.eori || "",
              }}
              validationSchema={Yup.object().shape({
                activity_id: Yup.object().shape({
                  label: Yup.string().required(),
                  value: Yup.string().required(),
                }),
                company_name: Yup.string().required("Required"),
                first_name: Yup.string().required("Required"),
                last_name: Yup.string().required("Required"),
                telephone: Yup.string().required("Required"),
                telephone_portable: Yup.string().required("Required"),
                date_of_birth: Yup.string().required("Required"),
                gender: Yup.number().required("Required"),
                siret: Yup.string().required("Required"),
                tva: Yup.string().required("Required"),
                eori: Yup.string().required("Required"),
              })}
              onSubmit={async (values, actions) => {
                const { setSubmitting, setFieldError } = actions;
                setSubmitting(true);

                const payload = {
                  ...values,
                  activity_id: values.activity_id.value,
                };
                const response = await updateUserProfile(payload);
                setSubmitting(false);
                if (response.error) {
                  setFieldError("error", response.message);
                } else {
                  dispatch(handleGetUserData());
                }
              }}
            >
              {({
                values,
                setFieldValue,
                handleBlur,
                handleChange,
                errors,
                touched,
                handleSubmit,
                isSubmitting,
              }) => {
                return (
                  <form onSubmit={handleSubmit}>
                    <div className="infosMainFields">
                      <div className="row ">
                        <div className="col-md-4">
                          <label htmlFor=""> Activité* </label>
                          <Select
                            className={` ${errors.activity_id && touched.activity_id
                                ? "border border-danger"
                                : ""
                              }`}
                            styles={styles}
                            options={userActivities}
                            onChange={(event) =>
                              setFieldValue("activity_id", event)
                            }
                            value={values.activity_id}
                            onBlur={handleBlur}
                            name="activity_id"
                            placeholder="Votre Activité*"
                          />
                        </div>
                        <div className="col-md-4">
                          <label htmlFor=""> {"Nom de l'entreprise*"} </label>
                          <input
                            type="text"
                            placeholder="Nom du magasin"
                            name="company_name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`form-control ${errors.company_name && touched.company_name
                                ? "border border-danger"
                                : ""
                              }`}
                            value={values.company_name}
                          />
                        </div>

                        <div className="col-md-4">
                          <label htmlFor=""> SIRET </label>
                          <input
                            type="text"
                            placeholder="N° de SIRET (14 shiffres)"
                            name="siret"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`form-control ${errors.siret && touched.siret
                                ? "border border-danger"
                                : ""
                              }`}
                            value={values.siret}
                          />
                        </div>
                        <div className="col-md-8">
                          <label htmlFor=""> TVA Intracommunautaire* </label>
                          <input
                            type="text"
                            placeholder="N° de TVA (2 lettres + 9 chiffres)"
                            name="tva"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`form-control ${errors.tva && touched.tva
                                ? "border border-danger"
                                : ""
                              }`}
                            value={values.tva}
                          />
                        </div>
                        <div className="col-md-4">
                          <label htmlFor=""> N° EORI* </label>
                          <input
                            type="text"
                            placeholder="N° EORI"
                            name="eori"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`form-control ${errors.eori && touched.eori
                                ? "border border-danger"
                                : ""
                              }`}
                            value={values.eori}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="contactPrincipal">
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

                      <div className="row">
                        <div className="col-md-4">
                          <label htmlFor=""> Nom* </label>
                          <input
                            type="text"
                            placeholder="Dubois"
                            name="last_name"
                            className={`form-control ${errors.last_name && touched.last_name
                                ? "border border-danger"
                                : ""
                              }`}
                            // placeholder="Nom*"
                            value={values.last_name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </div>

                        <div className="col-md-4">
                          <label htmlFor=""> Prénom* </label>
                          <input
                            type="text"
                            placeholder="Prénom"
                            name="first_name"
                            className={`form-control ${errors.first_name && touched.first_name
                                ? "border border-danger"
                                : ""
                              }`}
                            // placeholder="Nom*"
                            value={values.first_name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </div>

                        <div className="col-md-4">
                          <label htmlFor=""> Date de naissance </label>
                          <input
                            type="date"
                            id="birthday"
                            name="date_of_birth"
                            className={`form-control ${errors.date_of_birth && touched.date_of_birth
                                ? "border border-danger"
                                : ""
                              }`}
                            // placeholder="Nom*"
                            value={values.date_of_birth}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-4">
                          <label htmlFor=""> Adresse email* </label>
                          <input
                            type="text"
                            placeholder="monemail@email.fr"
                            name="email"
                            // placeholder="Nom*"
                            value={values.email}
                            disabled
                          />
                        </div>

                        <div className="col-md-4">
                          <label htmlFor=""> Téléphone* </label>

                          <IntlTelInput
                            containerClass="w-full"
                            inputClass="w-full "
                            country={"fr"}
                            preferredCountries={["fr"]}
                            placeholder="Telephone*"
                            onChange={(value) =>
                              setFieldValue("telephone", value)
                            }
                            onBlur={handleBlur}
                            name="telephone"
                            className={`form-control ${errors.telephone && touched.telephone
                                ? "border border-danger"
                                : ""
                              }`}
                            value={values.telephone}
                          />
                        </div>

                        <div className="col-md-4">
                          <label htmlFor=""> Téléphone portable </label>
                          <IntlTelInput
                            preferredCountries={["fr"]}
                            country={"fr"}
                            placeholder="Telephone Portable*"
                            onChange={(value) =>
                              setFieldValue("telephone_portable", value)
                            }
                            onBlur={handleBlur}
                            name="telephone_portable"
                            className={`form-control ${errors.telephone_portable &&
                                touched.telephone_portable
                                ? "border border-danger"
                                : ""
                              }`}
                            value={values.telephone_portable}
                          />
                        </div>
                      </div>

                      <div className="checkboxWrap newsletterSubscribe">
                        <label>
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="newsletter"
                            name="newsletter"
                            value="newsletter"
                          />
                          Profitez de nos{" "}
                          <strong> offers grace a notre newsletter </strong>
                        </label>
                      </div>

                      <div className="confirmValidate">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                        // onClick={() => setShowModalSuccessMsg(true)}
                        >
                          {isSubmitting && <AiOutlineLoading3Quarters />}
                          <span className="ms-2">
                            VALIDER LES MODIFICATIONS{" "}
                          </span>
                        </button>
                      </div>
                    </div>
                  </form>
                );
              }}
            </Formik>

            <Formik
              initialValues={{
                old_password: '',
                new_password: '',
                confrimPassword: ''

              }}
              validationSchema={Yup.object().shape({
                old_password: Yup.string().required("Required"),
                new_password: Yup.string().required("Required"),
                confrimPassword: Yup.string().required("Required").oneOf([Yup.ref("new_password", "")], "Password must match"),

              })}

              onSubmit={async (values, actions) => {

                const { setSubmitting, setFieldValue } = actions;
                setSubmitting(true);



                delete values.confrimPassword


                const response = await updatePassword(values);
                setSubmitting(false);


                if (response.status === false) {
                  dispatch(commonActions.showToast({ message: response?.msg, type: "error" }))

                } else {
                  dispatch(commonActions.showToast({ message: response?.msg, type: "success" }))
                  setFieldValue('old_password', "")
                  setFieldValue('new_password', "")
                  setFieldValue('confrimPassword', "")

                }
              }}
            >
              {({
                handleBlur,
                handleChange,
                handleSubmit,
                errors,
                values,
                touched,
                isSubmitting,


              }) =>

              (
                <form onSubmit={handleSubmit}>
                  <div className="changePassword">
                    <h3> Changer de mot de passe</h3>
                    <div className="row">
                      <div className="col-lg-4 col-md-12">
                        <label htmlFor=""> Mot de passe actuel* </label>
                        <input type="password"
                          name="old_password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`form-control ${errors.old_password && touched.old_password
                            ? "border border-danger"
                            : ""
                            }`}
                          value={values.old_password} />
                      </div>
                      <div className="col-lg-4 col-md-12">
                        <label htmlFor=""> Nouveau mot de passe* </label>
                        <input type="password" placeholder=""
                          name="new_password"
                          onChange={handleChange}

                          onBlur={handleBlur}
                          className={`form-control ${errors.new_password && touched.new_password
                            ? "border border-danger"
                            : ""
                            }`}
                          value={values.new_password} />
                      </div>
                      <div className="col-lg-4 col-md-12">
                        <label htmlFor=""> Confirmation mot de passe* </label>
                        <input type="password" placeholder=""
                          name="confrimPassword"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`form-control ${errors.confrimPassword && touched.confrimPassword
                            ? "border border-danger"
                            : ""
                            }`}
                          value={values.confrimPassword} />
                      </div>

                      <div className="col-md-12 passwordNote">
                        Le mot de passe doit contenir min. 6 caratères dont 1
                        majuscule, 1 chiffre et 1 caractère spécial parmi # ? ! @ - $
                        % ^ & *
                      </div>

                      <div className="col-md-12 confirmValidate">
                        <button type="submit"

                          disabled={isSubmitting}
                        >
                          {isSubmitting && <AiOutlineLoading3Quarters />}
                          <span className="ms-2">
                            ENREGISTRER NOUVEAU MOT DE PASSE
                          </span>
                        </button>

                      </div>
                    </div>
                  </div>
                </form>
              )}

            </Formik>

            <div className="contactDetails">
              <h3> Contact(s) associé(s) </h3>

              <button type="button" onClick={() => setShowModal(true)}>
                AJOUTER UN COMPTE ASSOCIÉ
              </button>

              <ul className="row contactList">
                <li className="col-md-6">
                  <div className="addressWrap">
                    <div className="details">
                      <div className="name">Jean-Louis DUPONT </div>
                      <div className="email"> jldupont@email.com </div>
                      <div className="function"> Fonction : Comptable </div>
                      <div className="role">Rôle : COMMERCIAL </div>
                      <div className="status"> Statut : VALIDÉ </div>
                    </div>
                    <button className="modify">MODIFIER</button>
                  </div>
                </li>

                <li className="col-md-6">
                  <div className="addressWrap">
                    <div className="details">
                      <div className="name">Jean-Louis DUPONT </div>
                      <div className="email"> jldupont@email.com </div>
                      <div className="function"> Fonction : Comptable </div>
                      <div className="role">Rôle : COMMERCIAL </div>
                      <div className="status"> Statut : VALIDÉ </div>
                    </div>
                    <button className="modify">MODIFIER</button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Modal edit address UI */}
      <div
        className={`modal fade editAddressModal dashboardAddress ${showModal ? "show" : ""
          }`}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowModal(false)}
              ></button>
            </div>

            <div className="modal-body">
              <div className="modalPadding">
                <h2> {"Demande d'ajout de compte associe"}</h2>
                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="">
                      N° Client*
                      <span>(Prerempli - As400)</span>
                    </label>
                    <input type="text" name="" id="" placeholder="XXXXXXXXXX" />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <h3> Personne a ajouter</h3>
                    <div className="radioWrap">
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
                  </div>

                  <div className="col-md-6">
                    <input type="text" placeholder="NOM*" />
                  </div>

                  <div className="col-md-6">
                    <input type="text" placeholder="Prenom*" />
                  </div>

                  <div className="col-md-6">
                    <input
                      type="email"
                      name=""
                      id=""
                      placeholder="monemail@email.fr*"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor=""> Téléphone* </label>

                    <IntlTelInput
                      containerClass="w-full"
                      inputClass="w-full"
                      preferredCountries={["fr"]}
                      country={"fr"}
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="">
                      {" "}
                      Téléphone Portable <span> (Suivi livraison) </span>{" "}
                    </label>

                    <IntlTelInput
                      containerClass="w-full"
                      inputClass="w-full"
                      country={"fr"}
                      preferredCountries={["fr"]}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor=""> Fonction* </label>
                    <input type="text" name="" id="" placeholder="NOM" />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor=""> Role a attribuer* </label>

                    <select name="" id="">
                      <option value=""> Selectionner</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-primary">
                Annuler
              </button>

              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => setShowModal(false)}
              >
                Enregister
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Success MSG UI */}
      <div
        className={`modal fade editAddressModal dashboardAddress successMsg ${showModalSuccessMsg ? "show" : ""
          }`}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowModalSuccessMsg(false)}
              ></button>
            </div>

            <div className="modal-body">
              <div className="modalPadding">
                <h2>
                  {" "}
                  {"Votre demande d'ajout de compte associe est enregistree!"}
                </h2>
                <div className="row">
                  <div className="col-md-12">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Saepe quidem, vitae velit ad excepturi nobis officiis
                      provident suscipit.{" "}
                      <span>
                        {" "}
                        Quo necessitatibus labore nam temporibus id quos{" "}
                      </span>{" "}
                      a laborum officiis animi nobis.
                      <br />
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Saepe quidem, vitae velit ad excepturi nobis officiis
                      provident suscipit.{" "}
                      <span>
                        {" "}
                        Quo necessitatibus labore nam temporibus id quos{" "}
                      </span>{" "}
                      a laborum officiis animi nobis.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => showModalSuccessMsg(false)}
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compte;
