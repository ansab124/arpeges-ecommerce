import { FaListAlt, FaUserAlt } from "react-icons/fa";
import { IoIosBookmarks, IoIosBulb } from "react-icons/io";
import { GoStar } from "react-icons/go";
import { ImMusic } from "react-icons/im";
import { MdNoteAlt } from "react-icons/md";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from 'next/router';

const Sidebar = () => {

    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }, []);

    const router = useRouter();

    return (
        <div className="col-md-4 compteSideBar">
            <div className="clientBox">
                
            

                <h3> Prénom Nom <span> monemail@email.fr </span> </h3>
                <p className="clientID"> N° client : XXXXXXXX (AS400) </p>
                <button className="logout"> DÉCONNEXION </button>
            </div>


            <div className="navbar navbar-expand-md">
                
            <button className="navbar-toggler" 
                    type="button" data-bs-toggle="collapse" 
                    data-bs-target="#dashboardNav" 
                    aria-controls="dashboardNav" 
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="dashboardNav">
                    <ul className="navbar-nav dashBoardNav">
                    
                        <li className={router.pathname == "/compte" ? "active" : ""}>

                            <Link href="/compte" >
                            <a >
                                <FaUserAlt />
                                Mes informations
                            </a>
                            </Link>
                        </li>

                        <li className={router.pathname == "/compte/commandes" ? "active" : ""}>
                            <Link href="/compte/commandes">
                                <a >
                                    <FaListAlt />
                                    Mes commandes
                                </a>
                            </Link>
                        </li>


                        <li className={router.pathname == "/compte/addresses" ? "active" : ""}>
                            <Link href="/compte/addresses">
                            <a href="">
                                <IoIosBookmarks />
                                {"Mon carnet d'adresses"}
                            </a>
                            </Link>
                        </li>
                        <li className={router.pathname == "/compte/codespromo" ? "active" : ""}>
                        <Link href="/compte/codespromo">
                            <a href="">
                                <GoStar />
                                Codes promo / chèque cadeau
                            </a>
                        </Link>
                        </li>

                        <li>
                            <a href="">
                                <ImMusic />
                                Partitions numériques
                            </a>
                        </li>

                        <li className={router.pathname == "/compte/reviews" ? "active" : ""}>
                            <Link href="/compte/reviews">
                            <a href="">
                                <IoIosBulb />
                                Donnez votre avis !
                            </a>
                            </Link>
                        </li>

                        <li>
                            <a href="">
                                <MdNoteAlt />
                                Contactez le SAV
                            </a>
                        </li>

                        <div className="customerSupport">
                                        <img src="/assets/icons/chat.gif" />
                                        <div className="supportInfo">
                                            <h3> SERVICE CLIENT</h3>
                                            <h4> 01 53 06 39 40
                                                <span> Du lundi au samedi (9h -13h/14h -19h) </span>
                                            </h4>
                                        </div>
                        </div>
                    </ul>

                     

                </div>
            </div>

            


           
        </div>
    )
}

export default Sidebar