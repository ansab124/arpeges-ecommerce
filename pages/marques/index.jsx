import React, { useState, useEffect } from "react";
import Breadcrumb, { BreadcrumbItem } from "../../components/BreadCrumb";
import Link from "next/link";
import { getBrandsList, getBrandsMenu } from "@actions";
import { useRouter } from "next/router";

const renderResultItems = (results = []) => {
  const columns = Math.ceil(results?.length / 12);
  let renderedResults = [];
  for (let i = 0; i < columns; i++) {
    let sliced = results.slice(i * 12, (i + 1) * 12);
    renderedResults.push(
      <ul>
        {sliced.map((item, index) => {
          return (
            <li key={index}>
              <Link href={"/marques/" + item?.slug} passHref>
                <a>{item?.name}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }
  return renderedResults?.map((item, index) => (
    <div key={index} className="col-6 col-md-4 col-lg-3 mt-5">
      {item}
    </div>
  ));
};

export async function getServerSideProps(context) {
  let query = context.query;
  const response = await getBrandsMenu();
  const brands = await getBrandsList(query?.brand || "");
  return {
    props: {
      menu: response,
      brands: brands?.data || [],
    },
  };
}

const AllBrands = ({ menu, brands }) => {
  console.log(brands);
  const router = useRouter();
  const [selectAlphabet, setSelectedAlphabet] = useState("");
  return (
    <div className="container mb-5">
      <Breadcrumb>
        <BreadcrumbItem isLast>fabricants</BreadcrumbItem>
      </Breadcrumb>
      <div className="brands">
        <div className="brands_hero mb-5 w-100 flex-column p-3 p-sm-5 d-flex justify-content-center">
          <h1 className="brands_hero-h1 mb-4 text-light  text-uppercase">
            fabricants
          </h1>
          <h2 className="brands_hero-h2 text-light text-uppercase">
            intruments de musique & accessories
          </h2>
        </div>

        <div className="brands_search d-flex align-items-center justify-content-start">
          <div className={`brands_search-alphabets `}>
            <button
              className={` text-uppercase me-4 ${
                !router.query?.brand && "selected"
              }`}
              onClick={() =>
                router.push({
                  pathname: "/marques",
                })
              }
            >
              tous
            </button>
            {menu?.map((alphabet, index) => {
              return (
                <button
                  key={alphabet + index}
                  className={`text-uppercase ${
                    router.query?.brand == alphabet.toLowerCase() && "selected"
                  }`}
                  onClick={() =>
                    router.push({
                      pathname: "/marques",
                      query: {
                        brand: alphabet.toLowerCase(),
                      },
                    })
                  }
                >
                  {alphabet}
                </button>
              );
            })}
          </div>
        </div>

        <div className="brands_results mt-5">
          <div className="brands_results-query">
            <span className="">#</span>
            <span className="mx-2">
              {selectAlphabet ? selectAlphabet : "TOUS"}
            </span>
          </div>
          <div className="brands_results-list row">
            {
              renderResultItems(brands)
              // <div className="col-6 col-md-4 col-lg-3">
              //   <ul>{renderResultItems(brands)}</ul>
              // </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllBrands;
