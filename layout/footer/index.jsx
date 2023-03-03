import React from "react";
import { FaPhone, FaFacebookF } from "react-icons/fa";
import { HiOutlineBookOpen } from "react-icons/hi";
import { SiInstagram } from "react-icons/si";
import { AiOutlineTag, AiFillYoutube } from "react-icons/ai";
import { CheckboxComp } from "../../components/controls/CheckboxComp";

const Footer = () => {
  const ColComponent = ({ icon, heading, sub_heading }) => {
    return (
      <div className="col-6 col-md-3 my-3 my-md-1 d-flex justify-content-center justify-content-md-start align-items-center">
        {icon ? icon : ""}
        <div className="ps-3">
          <div className="footer_top_container-heading mb-1">
            {heading ? heading : ""}
          </div>
          <div className="footer_top_container-sub_heading">
            {sub_heading ? sub_heading : ""}
          </div>
        </div>
      </div>
    );
  };

  const ColSecComponent = ({
    text,
    boldTxt,
    img,
    imgSec,
    colClass,
    imgHeight,
    paddingTopImg,
  }) => (
    <div className={`${colClass} d-flex h-100 flex-column align-items-center`}>
      <div className="footer__second_container-heading_text pb-4 d-flex align-items-end h-50 jost_font">
        {text ? text : ""}
        <b className="text-light ms-1 fw-bold">{boldTxt ? boldTxt : ""}</b>
      </div>
      <span className="border-bottom-1"></span>
      <div
        className={`d-flex h-50 align-items-center 
       ${imgSec ? "flex-column flex-lg-row" : ""}
     `}
      >
        <img
          src={img ? img : ""}
          alt="image"
          className="mb-4 mt-3 mt-md-0"
          height={imgHeight ? imgHeight : ""}
        />
        {imgSec ? (
          <img
            src={imgSec ? imgSec : ""}
            alt="another image"
            height={imgHeight ? imgHeight : ""}
            className="ms-2 mb-4"
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );

  return (
    <div className="w-100">
      <div className="footer__container d-flex flex-row align-items-center">
        <div className="container">
          <div className="col-12 footer_top_container d-flex flex-wrap">
            <ColComponent
              icon={
                <img src="/assets/footerSvgs/footerTop/home.svg" alt="image" />
              }
              heading="Parris & Arras"
              sub_heading="Nos magasins"
            />
            <ColComponent
              icon={
                <img
                  src="/assets/footerSvgs/footerTop/setting.svg"
                  alt="image"
                />
              }
              heading="Réparation"
              sub_heading="d’instruments"
            />
            <ColComponent
              icon={
                <img
                  src="/assets/footerSvgs/footerTop/location.svg"
                  alt="image"
                />
              }
              heading="Location"
              sub_heading="d'instruments"
            />
            <ColComponent
              icon={<FaPhone />}
              heading="+33(1) 53 06 39 40"
              sub_heading="Contactez-nous"
            />
          </div>
        </div>
      </div>
      <div className="footer__second_container d-flex flex-row align-items-center">
        <div className="container h-100 px-3 px-md-0">
          <div className="col-12 h-100 footer_top_container d-flex flex-wrap">
            <ColSecComponent
              img="/assets/footerSvgs/footer1.svg"
              boldTxt="sécurisé"
              text="Paiement"
              colClass="p-3 px-2 px-sm-1 col-6 col-md-3"
              imgHeight="32px"
            />
            <ColSecComponent
              img="/assets/footerSvgs/footer2.svg"
              boldTxt="paiement"
              text="facilité"
              colClass="p-3 px-1 col-6 col-md-3"
              imgHeight="32px"
            />
            <ColSecComponent
              img="/assets/footerSvgs/footer3.svg"
              imgSec="/assets/footerSvgs/footer4.svg"
              boldTxt="rapide"
              text="livraison"
              colClass="p-3 px-2 px-sm-1 col-6 col-md-3"
              imgHeight="23px"
            />
            <ColSecComponent
              img="/assets/footerSvgs/picto-cac1.svg"
              boldTxt="boutique"
              text="retrait"
              colClass="p-3 col-6 px-1 col-md-3"
              imgHeight="40px"
              paddingTopImg="pt-3"
            />
          </div>
        </div>
      </div>
      <div className="footer__third_container pb-5 d-flex flex-row align-items-center ">
        <div className="container h-100">


          <div className="col-12 d-flex h-100 flex-wrap my-2">
            <div className="col-3 d-none d-md-inline-block h-lg-100 d-flex align-items-center px-2 footerLogo">
              <img src="/assets/Arpeges_logo.png" alt="logo" />
            </div>

            <div className="col-12 col-md-6 py-3 d-flex flex-column justify-content-center align-items-center footerSearchWrap">
              <div className="d-flex flex-row w-100 w-sm-auto justify-content-center">
                <input
                  name="input-content"
                  className="header__logo-top_right_container-input_box input_container_width"
                  value=""
                  placeholder="Newsletter | votre email..."
                />
                <div className="footer__third_container-search_button d-flex flex-row align-items-center justify-content-center">
                  <img
                    src="/assets/footerSvgs/footerThird/search copie.svg"
                    alt="logo"
                  />
                </div>
              </div>
              {/* <div className="form-check d-flex mt-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckChecked"
                />
                <label
                  className="form-check-label d-flex flex-column flex-sm-row ms-2 jost_font"
                  htmlFor="flexCheckChecked"
                >
                  J’accepte que mon email soit collecté par ARPEGES.
                  <div className="checkbox_blue_text ms-0 ms-sm-1 mt-1 mt-sm-0">
                    Politique de confidentialité
                  </div>
                </label>
              </div> */}

              <CheckboxComp>
                <div className="form-check d-flex mt-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckChecked"
                  />
                  <label
                    className="form-check-label d-lg-flex flex-column flex-sm-row ms-2 jost_font"
                    htmlFor="flexCheckChecked"
                  >
                    J’accepte que mon email soit collecté par ARPEGES.
                    <div className="checkbox_blue_text ms-0 ms-sm-1 mt-1 mt-sm-0 d-md-block">
                      Politique de confidentialité
                    </div>
                  </label>
                </div>
              </CheckboxComp>
            </div>
            <div className="col-12 col-md-3 h-100 footer_button_container d-flex ps-0 ps-lg-5 ps-md-1 flex-row flex-md-column align-items-center justify-content-center">
              <span className="footer_button_container-btn_span d-none d-md-block"></span>
              <button className="footer_button_container-top_button text-light jost_font mb-0 mb-md-3 me-2 me-md-0 text-uppercase fw-bold d-flex flex-row align-items-center ps-2 ps-sm-4">
                <HiOutlineBookOpen className="me-2" /> éditions imd
              </button>
              <button className="footer_button_container-bottom_button text-light jost_font text-uppercase fw-bold d-flex flex-row align-items-center ps-2 ps-sm-4">
                <AiOutlineTag className="me-2" />
                location arpèges
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="footer__fourth_container pt-5 d-flex flex-row align-items-center">
        <div className="container h-100 mt-4">
          <div className="col-12 d-flex h-100 flex-wrap">
            <div className="col-12 col-sm-6 col-lg-3 h-100 d-flex flex-column mb-3 mb-lg-0">
              <div>
                <div className="footer__fourth_container-heading_container text-uppercase mb-4">
                  Arpèges
                </div>
                <div className="normal_text">123 rue Lamarck</div>
                <div className="normal_text">75018 Paris - FRANCE</div>
                <div className="normal_text">Tél : +33 (0)1 53 06 39 40</div>
                <div className="normal_text">Lun au sam : 9h-13h 14h-19h</div>

                <div className="normal_text">contact@arpeges.fr</div>
              </div>
              <div className="mt-4 social-icons">
                <FaFacebookF className="me-4" />
                <SiInstagram className="me-4" />
                <AiFillYoutube className="me-4" />
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-4 h-100 d-flex flex-column mb-3 mb-lg-0">
              <div>
                <div className="footer__fourth_container-heading_container text-uppercase mb-4">
                  produits
                </div>
                <div className="col-12 d-flex">
                  <div className="col-4">
                    <div className="normal_text text-underline">Bois</div>
                    <div className="normal_text text-underline">Cuivres</div>
                    <div className="normal_text text-underline">Guitares</div>
                    <div className="normal_text text-underline">Sono</div>
                  </div>
                  <div className="col-4">
                    <div className="normal_text text-underline">Accordéons</div>
                    <div className="normal_text text-underline">Claviers</div>
                    <div className="normal_text text-underline">
                      Eveil Musical
                    </div>
                    <div className="normal_text text-underline">
                      Percussions
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="normal_text text-underline">Batteries</div>
                    <div className="normal_text text-underline">Cordes</div>
                    <div className="normal_text text-underline">
                      Accessoires{" "}
                    </div>
                    <div className="normal_text text-underline">Partitions</div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="footer__fourth_container-heading_container text-uppercase mb-4">
                  BONS PLANS
                </div>
                <div className="col-12 d-flex">
                  <div className="col-4">
                    <div className="normal_text text-underline">Nouveautés</div>
                  </div>
                  <div className="col-4">
                    <div className="normal_text text-underline">Occasions</div>
                  </div>
                  <div className="col-4">
                    <div className="normal_text text-underline">Promotions</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-4 h-100 d-flex flex-column mb-3 mb-lg-0 px-0 px-lg-4">
              <div>
                <div className="footer__fourth_container-heading_container text-uppercase mb-4">
                  services
                </div>
                <div className="col-12 d-flex">
                  <div className="col-4">
                    <div className="normal_text text-underline">Boutiques</div>
                    <div className="normal_text text-underline">Location</div>
                    <div className="normal_text text-underline">
                      Financement{" "}
                    </div>
                    <div className="normal_text text-underline">
                      Recrutement
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="normal_text text-underline">CGV-CGU </div>
                    <div className="normal_text text-underline">Livraison</div>
                    <div className="normal_text text-underline">
                      SAV & Garantie
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="normal_text text-underline">FAQ </div>
                    <div className="normal_text text-underline">
                      {" "}
                      Réparation
                    </div>
                    <div className="normal_text text-underline">Paiement</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer__five_container bg-dark d-flex flex-row align-items-center">
        <div className="container d-flex justify-content-sm-between flex-wrap py-2">
          <div className="footer_top_container-footer_text text-uppercase d-flex me-3">
            Copyright ARPEGES
          </div>
          <div className="footer_top_container-footer_text text-uppercase d-flex me-3">
            Création EANET
          </div>
          <div className="footer_top_container-footer_text text-uppercase d-flex me-3">
            Plan du site
          </div>
          <div className="footer_top_container-footer_text text-uppercase d-flex me-3">
            Mentions légales
          </div>
          <div className="footer_top_container-footer_text text-uppercase d-flex me-3">
            Politique de confidentialité
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
