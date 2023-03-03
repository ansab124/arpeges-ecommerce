import { FifthSection } from "../components/FifthSection";
import { FourthSection } from "../components/FourthSection";
import { SecondSection } from "../components/SecondSection";
import { SliderSlick } from "../components/SliderSlick";
import { SliderSlickTwo } from "../components/SliderSlickTwo";
import { ThirdSection } from "../components/ThirdSection";
import { getHomePageProductsRelated, getMostSellingProduct } from '@actions';


export async function getStaticProps() {
  const products = await getHomePageProductsRelated();
  const sellingProducts = await getMostSellingProduct()
  return {
    props: {
      products: products || [],
      mostSelling: sellingProducts?.data || []
    },
    revalidate: 10
  }
}


export default function Home({ products, mostSelling }) {
  console.log({ products, mostSelling })
  return (
    <>

      <div className="w-100">
        <SliderSlick />
        <SliderSlickTwo />
        <SecondSection />
        <ThirdSection />
        <FourthSection related={products} sellingProducts={mostSelling} />
        <FifthSection />
      </div>

    </>
  );
}
