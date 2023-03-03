import React from "react";
import { ContactusCard } from "../../components/ContactusCard";
import { AntButton } from "../../components/controls/AntButton";
import { AdContent, CardTextComponent } from "../../components/ExtraContent";
import { FourthSection } from "../../components/FourthSection";
import { SliderSlickTwo } from "../../components/SliderSlickTwo";
import Breadcrumb, { BreadcrumbItem } from "../../components/BreadCrumb";
import Link from "next/link";
import BreadcrumbSelect from "../../components/controls/BreadcrmbSelect";

const OccasionsFamily = () => {
  const CardContainers = ({ ctxtOne, txtTwo, imgName }) => (
    <div className="col-12 col-sm-6 col-md-6 col-lg-3 ps-0 ps-sm-3 pb-3">
      <div className="sub_category_container">
        <Link href={"/occasions/family/" + ctxtOne} passHref>
          <a className=" text-decoration-none">
            <div className="ms-4 ms-xl-2 me-0 me-xl-2 d-flex align-items-center justify-content-between h-100">
              <img
                src={`/assets/boisPngs/${imgName}`}
                alt=""
                width={150}
                className="h-100"
              />
              <div className="card_content_container h-100 w-100">
                <div className="d-flex align-items-center h-100">
                  <CardTextComponent
                    cardClass="align-items-end ms-3 card_content_container-text"
                    ctxtOne={ctxtOne}
                    txtTwo={txtTwo}
                  />
                </div>
              </div>
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
  return (
    <div className="instrument__container container my-3 my-sm-5">
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbSelect />
        </BreadcrumbItem>
        <BreadcrumbItem isLast>
          <BreadcrumbSelect />
        </BreadcrumbItem>
      </Breadcrumb>

      <div className="col-12 d-flex flex-wrap">
        <div className="col-12 col-lg-9">
          <div className="image__container w-100 flex-column p-3 p-sm-5 d-flex justify-content-center">
            <div className="image_heading mb-4 text-uppercase">
              occasions bois
            </div>
            <div className="image_sub_heading text-uppercase">
              occasions INSTRUMENTS DE MUSIQUE & ACCESSOIRES
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-3 ps-0 ps-sm-3">
          <ContactusCard ContactusCardHeight="h-100" />
        </div>
      </div>

      <div className="col-12 mt-5 d-flex flex-wrap">
        <CardContainers
          ctxtOne="BASSONS"
          txtTwo="FAGGOTS"
          imgName="calque_102.png"
        />
        <CardContainers
          ctxtOne="ACCESSOIRES"
          txtTwo="BASSONS/FAGGOTS"
          imgName="calque_103.png"
        />
        <CardContainers ctxtOne="SAXOPHONE" imgName="calque_104.png" />
        <CardContainers
          ctxtOne="ACCESSOIRES"
          txtTwo="SAXOPHONE"
          imgName="calque_105.png"
        />
        <CardContainers ctxtOne="FLûtes à bec" imgName="calque_106.png" />

        <CardContainers
          ctxtOne="ACCESSOIRES"
          txtTwo="flûte à bec"
          imgName="calque_107.png"
        />

        <CardContainers ctxtOne="hautbois" imgName="calque_108.png" />

        <CardContainers
          ctxtOne="ACCESSOIRES"
          txtTwo="hautbois"
          imgName="calque_109.png"
        />

        <CardContainers ctxtOne="clarinettes" imgName="calque_110.png" />

        <CardContainers
          ctxtOne="ACCESSOIRES"
          txtTwo="clarinette"
          imgName="calque_111.png"
        />

        <CardContainers ctxtOne="flûte" imgName="calque_112.png" />
        <CardContainers
          ctxtOne="ACCESSOIRES"
          txtTwo="flûte"
          imgName="calque_113.png"
        />
        <CardContainers
          ctxtOne="ACCESSOIRES"
          txtTwo="bois"
          imgName="calque_114.png"
        />
      </div>

      <FourthSection isHideContent={true} />
      <AdContent />

      <SliderSlickTwo slidesToShowNum={6} />
      <div className="d-flex justify-content-center mt-4 align-items-center">
        <AntButton btnTxt="VOIR TOUTES LES MARQUES" />
      </div>
    </div>
  );
};

export default OccasionsFamily;
