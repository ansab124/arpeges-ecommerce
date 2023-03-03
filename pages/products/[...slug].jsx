import React from "react";
import Breadcrumb, { BreadcrumbItem } from "../../components/BreadCrumb";
import ProductDetailSection from "../../components/product/ProductDetailSection";
import VideoSection from "../../components/product/VideoSection";
import ProductRelated from "../../components/product/ProductRelated";
import ProductSuggestion from "../../components/product/ProductSuggestion";
import {
  getIntrumentProductDetails,
  getIntrumentProductRelated,
} from "@actions";
import BreadcrumbSelect from "@components/controls/BreadcrmbSelect";

export async function getServerSideProps(context) {
  let slug = context.params.slug;
  const response = await getIntrumentProductDetails(slug?.join("/"));
  const related = await getIntrumentProductRelated(slug?.join("/"));
  return {
    props: {
      details: response?.data || {},
      related,
      instrumentGroups:
        response?.dropdownsGroup?.map((group) => ({
          label: group?.name,
          value: group?.slug,
        })) || [],
      instrumentFamilies:
        response?.categoryMenu?.map((group) => ({
          label: group?.name,
          value: group?.slug,
        })) || [],
      breadcrumbs: response?.bread_crumb || [],
      query: slug,
    },
  };
}

const ProductDetails = ({
  details,
  related,
  instrumentGroups,
  instrumentFamilies,
  breadcrumbs,
  query,
}) => {
  console.log({ details, related });

  return (
    <div className="text-dark">
      <div className="container">
        <Breadcrumb>
          <BreadcrumbItem href="/instruments">INSTRUMENTs</BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbSelect
              value={
                instrumentGroups?.filter((item) => item.value == query[0])[0]
              }
              placeholder="Instruments"
              options={instrumentGroups}
              getSlug={(slug) => router.push("/instruments/" + slug.value)}
            />
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbSelect
              value={
                instrumentFamilies?.filter((item) => item.value == query[1])[0]
              }
              placeholder="families"
              options={instrumentFamilies}
            />
          </BreadcrumbItem>
          {breadcrumbs?.map((item, index) => {
            return <BreadcrumbItem key={index}>{item?.title}</BreadcrumbItem>;
          })}
          <BreadcrumbItem isLast>{details?.title}</BreadcrumbItem>
        </Breadcrumb>
      </div>

      <ProductDetailSection type="instrument" details={details} />
      <VideoSection videos={details?.videos} />
      <ProductRelated details={details} />

      <div className="container">
        {related &&
        related?.product_instrument &&
        related?.product_instrument?.data?.length > 0 ? (
          <ProductSuggestion
            title={related?.product_instrument?.category?.title}
            subTitle={`VOIR LES OCCASIONS ${related?.product_instrument?.category?.title}`}
            isPartition
            products={related?.product_instrument?.data || []}
          />
        ) : null}

        {related && related?.product_acces ? (
          <ProductSuggestion
            title="ACCESSOIRES RECOMMANDés"
            products={related?.product_acces || []}
            isPartition
          />
        ) : null}
        {related && related?.product_partitons ? (
          <ProductSuggestion
            title="nos partitions CLARINETTES SIB"
            subTitle="VOIR LES PARTITIONS"
            products={related?.product_partitons || []}
          />
        ) : null}
      </div>
    </div>
  );
};

export default ProductDetails;
