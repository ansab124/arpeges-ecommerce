import React from "react";
import Breadcrumbs, { BreadcrumbItem } from "../../components/BreadCrumb";
import ProductDetailSection from "../../components/product/ProductDetailSection";
import VideoSection from "../../components/product/VideoSection";
import ProductRelated from "../../components/product/ProductRelated";
import ProductSuggestion from "../../components/product/ProductSuggestion";
import {
  getPartitionProductDetails,
  getPartitionProductRelated,
} from "@actions";

export async function getServerSideProps(context) {
  const response = await getPartitionProductDetails(context.params.slug[0]);
  const partitionRelated = await getPartitionProductRelated(
    context.params.slug[0]
  );
  if (response?.data) {
    return {
      props: {
        details: response || {},
        related: partitionRelated,
      },
    };
  } else {
    return {
      notFound: true,
    };
  }
}




const MarquesProductDetail = ({ details, related }) => {

  return (
    <div className="text-dark">
      <div className="container">
        <Breadcrumbs>
          <BreadcrumbItem>PARTITIONS</BreadcrumbItem>
          {/* <BreadcrumbItem>INSTRUMENTS</BreadcrumbItem> */}
          <BreadcrumbItem isLast>{details?.data?.title}</BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <ProductDetailSection details={details?.data} />
      <VideoSection videos={details?.data?.videos} />
      <ProductRelated details={details} isPartition={true} />
      <div className="container">
        <ProductSuggestion
          products={related?.partiton_composer || []}
          title="AUTRES PARTITIONS DE PETIT J."
          subTitle="PARTITIONS DE PETIT J."
        />
        <ProductSuggestion
          products={related?.product_acces || []}
          title="NOS ACCESSOIRES RECOMMANDés"
          isPartition={true}
        />
        <ProductSuggestion
          products={related?.partiton_instrument || []}
          title="nos partitions trompette"
          subTitle="PARTITIONS trompette"
          isPartition
        />
      </div>
    </div>
  );
};

export default MarquesProductDetail;
