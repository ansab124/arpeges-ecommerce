import React from "react";
import { AccordeonSection } from "@components/AccordeonSection";
import { BestSellerCard } from "@components/BestSellerCard";
import { ContactusCard } from "@components/ContactusCard";
import { AntButton } from "@components/controls/AntButton";
import { AdContent } from "@components/ExtraContent";
import { FourthSection } from "@components/FourthSection";
import { RechercherPartition } from "@components/RechercherPartition";
import { SliderSlickTwo } from "@components/SliderSlickTwo";
import Breadcrumb, { BreadcrumbItem } from "@components/BreadCrumb";
import { getIntrumentsGroups } from "@actions";

export async function getStaticProps(context) {
  const data = await getIntrumentsGroups();

  return {
    props: {
      groups: data?.data || [],
      fallback: true,
    },
    revalidate: 10,
  };
}

const Instruments = ({ groups }) => {
  return (
    <div className="instrument__container container my-3 my-sm-5">
      <Breadcrumb>
        <BreadcrumbItem href="/instruments" isLast>
          INSTRUMENTs
        </BreadcrumbItem>
      </Breadcrumb>

      <div className="col-12 d-flex flex-wrap">
        <div className="col-12 col-lg-9">
          <div className="image__container w-100 flex-column p-3 p-sm-5 d-flex justify-content-center">
            <div className="image_heading mb-4">TOUS NOS INSTRUMENTS</div>
            <div className="image_sub_heading">
              INSTRUMENTS DE MUSIQUE & ACCESSOIRES
            </div>
          </div>

          <AccordeonSection
            customClassProp="col-12 col-sm-6 col-md-4 col-lg-4 pe-3 pb-3"
            AccordeonSectionMainCLass="col-12 accordeon_section_container d-flex flex-wrap mt-5 pt-3"
            routeQuery="instruments/"
            groups={groups}
          />
          <FourthSection
            isHideContent={true}
            fourth_section_className="instrument_slick_container"
          />
        </div>

        <div className="col-12 col-lg-3 ps-0 ps-lg-3 mt-5 mt-lg-0">
          <ContactusCard />
          <BestSellerCard />
          <RechercherPartition />
        </div>
      </div>
      <AdContent />

      <SliderSlickTwo slidesToShowNum={6} />
      <div className="d-flex justify-content-center mt-4 align-items-center">
        <AntButton btnTxt="VOIR TOUTES LES MARQUES" />
      </div>
    </div>
  );
};
export default Instruments;
