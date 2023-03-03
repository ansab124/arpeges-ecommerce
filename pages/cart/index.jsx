import Breadcrumb, { BreadcrumbItem } from "../../components/BreadCrumb";
import Panier from "../../components/cart/panier";

const Cart = () => {
  return (
    <div className="instrument__container container my-3 my-sm-5 cartPage">
      <div className="my-4">
        <Breadcrumb>
          <BreadcrumbItem>Panier</BreadcrumbItem>

        </Breadcrumb>
      </div>


      <div className="cartContainer">
        <Panier />
      </div>
    </div>
  )
}

export default Cart