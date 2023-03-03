import React, { useState, useEffect } from "react";
import { ContactusCard } from "../../../components/ContactusCard";
import { AntButton } from "../../../components/controls/AntButton";
import { AdContent, CardTextComponent } from "../../../components/ExtraContent";
import { FourthSection } from "../../../components/FourthSection";
import { SliderSlickTwo } from "../../../components/SliderSlickTwo";
import Breadcrumb, { BreadcrumbItem } from "../../../components/BreadCrumb";
import Link from "next/link";
import BreadcrumbSelect from "../../../components/controls/BreadcrmbSelect";

import {
  getIntrumentsGroups,
  getIntrumentsFamilies,
  getIntrumentsRelated,
} from "@actions";
import Image from "next/image";
import { useRouter } from "next/router";

export async function getStaticPaths() {
  const data = await getIntrumentsGroups();

  const paths =
    data &&
    data.data.length > 0 &&
    data.data.map((item) => ({
      params: {
        family: item.slug,
      },
    }));

  return {
    paths: paths,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const family = context.params.family;
  const data = await getIntrumentsFamilies(family);
  const related = await getIntrumentsRelated(family);
  console.log();
  return {
    props: {
      families: (data && data?.categories) || [],
      title: data?.group_title,
      groups:
        (data &&
          data?.dropdownsGroup?.map((group) => ({
            label: group?.name,
            value: group?.slug,
          }))) ||
        [],
      query: family,
      related: related || {},
    },
    revalidate: 10,
  };
}

const CardContainers = ({ ctxtOne, txtTwo, imageSrc, slug, query }) => (
  <div className="col-12 col-sm-6 col-md-6 col-lg-3 ps-0 ps-sm-3 pb-3">
    <div className="sub_category_container">
      <Link href={`/instruments/${query}/${slug}`} passHref>
        <a className=" text-decoration-none">
          <div className="ms-4 ms-xl-2 me-0 me-xl-2 d-flex align-items-center justify-content-between h-100">
            <Image
              alt={ctxtOne}
              src={imageSrc}
              height={120}
              width={90}
              loading="eager"
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

const InstrumentFamily = ({ families, query, related, groups, title }) => {
  const router = useRouter();

  return (
    <div className="instrument__container container my-3 my-sm-5">
      <Breadcrumb>
        <BreadcrumbItem href="/instruments">INSTRUMENTs</BreadcrumbItem>
        <BreadcrumbItem isLast>
          <BreadcrumbSelect
            options={groups}
            placeholder="INSTRUMENTs"
            value={groups?.filter((item) => item.value == query)[0]}
            getSlug={(slug) => router.push("/instruments/" + slug.value)}
          />
        </BreadcrumbItem>
      </Breadcrumb>

      <div className="col-12 d-flex flex-wrap">
        <div className="col-12 col-lg-9">
          <div className="image__container w-100 flex-column p-3 p-sm-5 d-flex justify-content-center">
            <div className="image_heading mb-4 text-uppercase">{title}</div>
            <div className="image_sub_heading">
              INSTRUMENTS DE MUSIQUE & ACCESSOIRES
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-3 ps-0 ps-sm-3">
          <ContactusCard ContactusCardHeight="h-100" />
        </div>
      </div>

      <div className="col-12 mt-5 d-flex flex-wrap">
        {families && families?.length > 0 ? (
          families?.map((family, index) => {
            return (
              <CardContainers
                key={family?.name + index}
                ctxtOne={family?.name}
                // txtTwo={family?.name.split("/")[1]}
                imageSrc={family?.image_url}
                slug={family?.slug}
                query={query}
              />
            );
          })
        ) : (
          <h4 className="text-dark">No families Found</h4>
        )}
      </div>

      <FourthSection isHideContent={true} related={related} />
      <AdContent />

      <SliderSlickTwo slidesToShowNum={6} />
      <div className="d-flex justify-content-center mt-4 align-items-center">
        <AntButton btnTxt="VOIR TOUTES LES MARQUES" />
      </div>
    </div>
  );
};

export default InstrumentFamily;
