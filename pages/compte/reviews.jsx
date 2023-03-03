import { FaStar } from "react-icons/fa";
import Breadcrumb, { BreadcrumbItem } from "../../components/BreadCrumb";
import Sidebar from "../../components/dashboard/SideBar";


const Reviews = () => {
    return (
        <div className=" container my-3 my-sm-5 dashboardPage reviewsPage">
            <div className="my-4">
                <Breadcrumb>
                    <BreadcrumbItem>Mon compte</BreadcrumbItem>
                    <BreadcrumbItem>DONNEZ VOTRE AVIS !</BreadcrumbItem>
                </Breadcrumb>
            </div>


            <div className="compteContainer">
                <div className="row">
                    <Sidebar />


                    <div className="col-md-8 compteDetails Reviews">
                        <h1> DONNEZ VOTRE AVIS ! </h1>
                        

                        <h3> Votre avais sur ARPEGES nous intresse</h3>
                        <ul className="row ratings rateOurService">
                            <li className="col-md-10">
                                <div className="ratingContent">
                                    <div className="productImg">
                                        <img src="/assets/icons/logo.gif" alt="" />
                                    </div>
                                    
                                    <div className="details">
                                        <p>
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae expedita quaerat cumque molestiae omni....
                                        </p>

                                        <div className="rate">
                                            <div className="stars">
                                                <FaStar />
                                                <FaStar />
                                                <FaStar />
                                                <FaStar />
                                                <FaStar />
                                            </div>
                                            <button> Ok </button>
                                        </div>
                                    </div>
                                
                                </div>
                            </li>
                        </ul>



                        <h3> Notez vous produits, votre avais nous interesse</h3>
                        
                        <ul className="row ratings rateProducts">
                            <li className="col-md-6">
                                <h4>
                                    Yamaha [Marque] 
                                    <span> YCL 250SUK [TITRE_1]</span>
                                </h4>
                                <div className="ratingContent">
                                    <div className="productImg">
                                        <img src="/assets/icons/logo.gif" alt="" />
                                    </div>
                                    <div className="details">
                                        <p>
                                         Lorem ipsum dolor sit amet.... 
                                        </p>
                                        <div className="rate">
                                            <div className="stars">
                                                <FaStar />
                                                <FaStar />
                                                <FaStar />
                                                <FaStar />
                                                <FaStar />
                                            </div>
                                            <button> Ok </button>
                                        </div>
                                    </div>
                                
                                </div>
                            </li>

                            <li className="col-md-6">
                                <h4>
                                    Yamaha [Marque] 
                                    <span> YCL 250SUK [TITRE_1]</span>
                                </h4>
                                <div className="ratingContent">
                                    
                                    <div className="productImg">    
                                        <img src="/assets/icons/logo.gif" alt="" />
                                    </div>
                                    <div className="details">
                                        <p>
                                        Lorem ipsum dolor sit amet....                                        </p>

                                        <div className="rate">
                                            <div className="stars">
                                                <FaStar />
                                                <FaStar />
                                                <FaStar />
                                                <FaStar />
                                                <FaStar />
                                            </div>
                                            <button> Ok </button>
                                        </div>
                                    </div>
                                
                                </div>
                            </li>



                            <li className="col-md-6">
                            <h4>
                                    Yamaha [Marque] 
                                    <span> YCL 250SUK [TITRE_1]</span>
                                </h4>
                                <div className="ratingContent">
                                    <div className="productImg">
                                        <img src="/assets/icons/logo.gif" alt="" />
                                    </div>
                                    <div className="details">
                                        <p>
                                        Lorem ipsum dolor sit amet....                                        </p>

                                        <div className="rate">
                                            <div className="stars">
                                                <FaStar />
                                                <FaStar />
                                                <FaStar />
                                                <FaStar />
                                                <FaStar />
                                            </div>
                                            <button> Ok </button>
                                        </div>
                                    </div>
                                
                                </div>
                            </li>


                            <li className="col-md-6">
                                <h4>
                                        Yamaha [Marque] 
                                        <span> YCL 250SUK [TITRE_1]</span>
                                </h4>

                                    <div className="ratingContent">
                                        <div className="productImg">
                                        <img src="/assets/icons/logo.gif" alt="" />
                                        </div>
                                        <div className="details">
                                            <p>
                                                Lorem ipsum dolor sit amet....
                                            </p>

                                            <div className="rate">
                                                <div className="stars">
                                                    <FaStar />
                                                    <FaStar />
                                                    <FaStar />
                                                    <FaStar />
                                                    <FaStar />
                                                </div>
                                                <button> Ok </button>
                                            </div>
                                        </div>
                                    
                                    </div>
                            </li>
                        </ul>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Reviews