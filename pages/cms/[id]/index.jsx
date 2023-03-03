import React, { useEffect, useStat } from "react";
import { getCmsPage } from "@actions";
import Breadcrumb, { BreadcrumbItem } from "@components/BreadCrumb";

export async function getServerSideProps(context) {
  console.log();
  const { id } = context.params;
  const data = await getCmsPage(id);
  console.log(data);
  return {
    props: {
      data: data?.data || {},
    },
  };
}

const CmsPage = ({ data }) => {
  console.log({ data });

  return (
    <div className="container">
      <div>
        <Breadcrumb>
          <BreadcrumbItem>services</BreadcrumbItem>
          <BreadcrumbItem isLast>{data?.meta_title}</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div className="standard my-3">
        <div
          style={{ backgroundImage: `url(${data?.cover_image}) !important` }}
          className="standard_hero w-100 flex-column p-3 p-sm-5 d-flex justify-content-center"
        >
          <h1 className="standard_hero-h1 mb-4 text-light  text-uppercase">
            {data?.meta_title}
          </h1>
          <h2 className="standard_hero-h2 text-light text-uppercase">
            {data?.sub_title}
          </h2>
        </div>
        <div
          className=" my-5"
          dangerouslySetInnerHTML={{ __html: data?.description }}
        ></div>

        {/* <div className="standard_intro my-5">
          <div>
            <h3 className="standard_intro-h3">
              {"DÉCOUVREZ L'ATELIER ARPÈGES"}
            </h3>
            <p className="standard_intro-p">
              Un petit ennui mécanique ou un accident vous empêche de profiter
              pleinement des avantages de votre instrument. Lorem ipsum dolor
              sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.
              Aliquam erat volutpat. Donec placerat nisl magna, et faucibus arcu
              condimentum sed.
            </p>
          </div>
        </div>

        <div className="standard_content">
          <div className="standard_content_section row">
            <div className="col-md-8 col-lg-8 col-sm-12">
              <div className="mb-5 ">
                <h4 className="jost_font">
                  NOS SPÉCIALISTES, À VOTRE DISPOSITION 6 JOURS / 7
                </h4>
                <p>
                  Six jours par semaine nos spécialistes sont à votre
                  disposition pour vous conseiller et vous apporter un service
                  soigné et rapide.
                </p>
                <p>
                  <b>Du lundi au samedi (inclus) : 9h-13h / 14h-19h</b>
                </p>
              </div>
              <div>
                <h4 className="jost_font">
                  LUTHERIE, VENT, BOIS, CUIVRE, PIANO & ÉLÉCTRONIQUE{" "}
                </h4>
                <p>
                  {
                    "Les mains expertes de nos 4 luthiers spécialisés (lutherie, vent, bois, cuivre, piano et électronique) vous attendent pour régler, fixer, réviser, nettoyer, accorder, restaurer ou améliorer vos instruments d'études, professionnels ou de collection."
                  }
                </p>
              </div>
            </div>
            <div className="col-md-4 col-lg-4 col-sm-12">
              <img src="/assets/calque_144.png" />
            </div>
          </div>
          <div className="standard_content_section">
            <p>
              {
                "Son équipe de luthiers spécialisés (bois, vents, cuivres, électroniques) saura vous conseiller et réaliser les réparations, "
              }
              <b>modifications et restaurations soignées et rapides</b>{" "}
              {
                "dont ont besoin vos instruments. Arpèges c'est l'assurance d'avoir le prix juste, le conseil adapté, la garantie d'un service après-vente, la possibilité d'assurer ses instruments sur la durée souhaitée en toute sérénité, le financement idéal..."
              }
            </p>
            <p>
              {
                "Son équipe de luthiers spécialisés (bois, vents, cuivres, électroniques) saura vous conseiller et réaliser les réparations, "
              }
              <b>modifications et restaurations soignées et rapides</b>{" "}
              {
                "dont ont besoin vos instruments. Arpèges c'est l'assurance d'avoir le prix juste, le conseil adapté, la garantie d'un service après-vente, la possibilité d'assurer ses instruments sur la durée souhaitée en toute sérénité, le financement idéal..."
              }
            </p>
            <ul>
              <li>Aliquam at porttitor sem.</li>
              <li>Aliquam erat volutpat.</li>
              <li>
                Donec placerat nisl magna, et faucibus arcu condimentum sed.
              </li>
              <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
            </ul>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              at porttitor sem. Aliquam erat volutpat. Donec placerat nisl
              magna, et faucibus arcu condimentum sed. Lorem ipsum
            </p>
          </div>
        </div> */}
        <div className="standard_card p-4">
          <h2 className="jost_font my-3 text-dark">
            SERVICES ARPÈGES, À DÉCOUVRIR ÉGALEMENT...
          </h2>
          <ul className="text-dark d-flex align-items-center justify-content-around flex-column   flex-sm-row mt-5 mb-3">
            <li className="my-2">LOCATION</li>
            <li className="my-2">FINANCEMENT</li>
            <li className="my-2 active">ASSURANCE</li>
            <li className="my-2">SAV & GARANTIE</li>
            <li className="my-2">FAQ</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CmsPage;
