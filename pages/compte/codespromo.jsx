import Breadcrumb, { BreadcrumbItem } from "../../components/BreadCrumb";
import Sidebar from "../../components/dashboard/SideBar";

const codespromo = () => {
  return (
    <div className="instrument__container container my-3 my-sm-5 dashboardPage promoCodesPage">
            <div className="my-4">
                <Breadcrumb>
                    <BreadcrumbItem>Mon compte</BreadcrumbItem>
                    <BreadcrumbItem>MES CODES PROMO</BreadcrumbItem>
                </Breadcrumb>
            </div>

            <div className="compteContainer">
                <div className="row">
                    <Sidebar />
                    
                    
                    <div className="col-md-8 compteDetails">
                        <h1> MES CODES PROMO / CHÈQUES CADEAU </h1>

                        <h2>Codes promo (ou Aucun code promo) </h2>

                        <ul className="row codesList">
                            <li className="col-md-6 col-lg-4">
                                <div className="promoWrap">
                                    <p><span>Code</span> FID10232</p>
                                    <p><span>Description </span> Fidélisation conservatoire</p>
                                    <p><span>Quantité </span> 1</p>
                                    <p><span>Valeur </span> 50€</p>
                                    <p><span>Minimum </span> 100€</p>
                                    <p><span>Cumulable </span> Non</p>
                                    <p><span>Date expiration</span> 05/07/2023</p>
                                </div>
                            </li>

                            <li className="col-md-6 col-lg-4">
                                <div className="promoWrap">
                                    <p><span>Code</span> FID10232</p>
                                    <p><span>Description </span> Fidélisation conservatoire</p>
                                    <p><span>Quantité </span> 1</p>
                                    <p><span>Valeur </span> 50€</p>
                                    <p><span>Minimum </span> 100€</p>
                                    <p><span>Cumulable </span> Non</p>
                                    <p><span>Date expiration</span> 05/07/2023</p>
                                </div>
                            </li>

                            <li className="col-md-6 col-lg-4">
                                <div className="promoWrap">
                                    <p><span>Code</span> FID10232</p>
                                    <p><span>Description </span> Fidélisation conservatoire</p>
                                    <p><span>Quantité </span> 1</p>
                                    <p><span>Valeur </span> 50€</p>
                                    <p><span>Minimum </span> 100€</p>
                                    <p><span>Cumulable </span> Non</p>
                                    <p><span>Date expiration</span> 05/07/2023</p>
                                </div>
                            </li>
                        </ul>



                        <h2>Codes promo / chèques cadeaux utilisés </h2>
                        <div className="responsiveTable">
                        <table className="promoUsed">
                            <thead>
                                <tr>
                                <th> CODE / CHÈQUE </th>
                                <th>EXPIRATION</th>
                                <th>VALEUR</th>
                                <th>UTILISÉ LE </th>
                                <th>N° COMMANDE</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td className="title">FID10445533</td>
                                <td>01/07/2022</td>
                                <td>10%</td>
                                <td>30/05/2022</td>
                                <td>C7895544667</td>
                                </tr>
                                <tr>
                                <td className="title">FID10445533</td>
                                <td>01/07/2022</td>
                                <td>75€</td>
                                <td>17/12/2021</td>
                                <td>C7894487655</td>
                                </tr>
                               
                            </tbody>
                        </table>

                        </div>


                    </div>
                </div>
            </div>
    </div>
  )
}

export default codespromo