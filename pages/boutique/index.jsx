import React from 'react';
import Breadcrumb, { BreadcrumbItem } from "../../components/BreadCrumb"
import { FaMusic } from "react-icons/fa";




const BoutiqueListing = () => {

    return (
        <>
            <div className='container'>
                <Breadcrumb>
                    <BreadcrumbItem>accueil</BreadcrumbItem>
                    <BreadcrumbItem>accueil</BreadcrumbItem>
                </Breadcrumb>
                <div>
                    <div className='boutique_content '>
                        <div className="boutique_content_hero  w-100 flex-column py-3 p-sm-5 d-flex justify-content-center">
                            {/* <div className="image_heading mb-4">TOUS NOS INSTRUMENTS</div>
                        <div className="image_sub_heading">
                            INSTRUMENTS DE MUSIQUE & ACCESSOIRES
                        </div> */}
                        </div>

                        {/* Intro Section */}
                        <div className='boutique_content_intro my-5'>
                            <div className='boutique_content_intro-content'>
                                <h1>DÉCOUVREZ NOS BOUTIQUES ARPÈGES</h1>
                                <p>
                                    Installé depuis 40 ans dans le 18ème arrondissement de Paris au pied de la Butte Montmartre, Arpèges offre tout son savoir faire au service des musiciens amateurs et professionnels.​​​​ Arpèges c’est aussi un spécialiste de la vente, de la réparation et la fabrication d’instruments traditionnels !
                                </p>
                            </div>
                        </div>

                        {/* Address Cards */}

                        <div className='boutique_content_address '>
                            <div className='address_card '>
                                <div className='address_card_section-title'>
                                    <h1>ARPEGES PARIS</h1>
                                    <span>01 53 06 39 40</span>
                                </div>


                                <div className='address_card_section'>
                                    <p className='address_card_section-timing fw-bold' >
                                        Du lundi au samedi (inclus) : <br />
                                        de 9h à 13h et de 14h à 19h
                                    </p>
                                </div>
                                <div className='address_card_section'>
                                    <div className='address_card_section-info'>
                                        <p>123 rue Lamarck, 75018 Paris - <a> Contact</a></p>
                                        <p>Fax : 01.42.29.03.04​​​​​​​</p>
                                    </div>
                                </div>
                                <div className='address_card_section'>
                                    <div className='address_card_section-info'>
                                        <p>BUS :  95 - 31 - 81</p>
                                        <p>METRO : ​​​​​​​</p>
                                        <p>Ligne 13 : Arrêt Guy Moquet (Sortie rue Lamarck)</p>
                                        <p>Ligne 12 : Arrêt Lamarck - Caulaincourt</p>

                                    </div>
                                </div>
                            </div>

                            <div className='address_card '>
                                <div className='address_card_section-title'>
                                    <h1>ARPEGES ARRAS</h1>
                                    <span>01 53 06 39 40</span>
                                </div>


                                <div className='address_card_section'>
                                    <p className='address_card_section-timing fw-bold' >
                                        Du mardi au samedi : <br />
                                        de 9h à 12h et de 14h à 19h
                                    </p>
                                </div>
                                <div className='address_card_section'>
                                    <div className='address_card_section-info'>
                                        <p>7 rue aux Ours, 62000 Arras - <a> Contact</a></p>
                                    </div>
                                </div>
                                <div className='address_card_section'>
                                    <div className='address_card_section-info'>
                                        <p>{"A 4 min. à pied de la Grande Place d'Arras"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='boutique_content_description d-flex justify-content-around flex-column flex-lg-row align-items-center'>
                            <div className='pe-5' >
                                <h4>UNE ÉQUIPE DE SPÉCIALISTES, À VOTRE ÉCOUTE {"<H4>"}</h4>
                                <p>
                                    Son équipe commerciale est à votre écoute pour vous conseiller dans l’achat d’instruments neufs ou d’occasions (vents, cuivres, bois, électroniques, percussions, claviers…), de partitions (80 000 titres en stock), de logiciels musicaux et d’accessoires. Ensemble nous étudierons vos projets et trouverons la solution adaptée à vos besoins et surtout à votre budget par le biais de conseils et de financement sur mesure.
                                </p>
                                <p>
                                    Son équipe de luthiers spécialisés (bois, vents, cuivres, électroniques) saura vous conseiller et réaliser les réparations, modifications et restaurations soignées et rapides dont ont besoin vos instruments. Arpèges c’est l’assurance d’avoir le prix juste, le conseil adapté, la garantie d’un service après-vente, la possibilité d’assurer ses instruments sur la durée souhaitée en toute sérénité, le financement idéal...
                                </p>
                            </div>
                            <div className='w-100  d-flex align-items-center justify-content-center '>
                                <img className='' src='/assets/calque_71.svg' />
                            </div>
                        </div>



                        <div className="boutique_content_images  d-flex justify-content-around flex-column flex-lg-row align-items-center">
                            <div className="card_container_one position-relative mt-5 mt-lg-0">
                                <img
                                    src="/assets/fifthSectionImages/calque_74.svg"
                                    className=""
                                    alt=""
                                />
                                <div className="text_container text-uppercase ms-4 text-light fw-bold position-absolute">
                                    <img
                                        src="/assets/fifthSectionImages/setting.svg"
                                        className="mb-2 me-2"
                                        alt=""
                                    />
                                    atelier
                                    <br />
                                    réparation
                                </div>
                            </div>
                            <div className="card_container_two position-relative mt-5 mt-lg-0">
                                <img src="/assets/fifthSectionImages/calque_14.svg" alt="" />
                                <div className="text_container text-uppercase ms-4 text-light fw-bold position-absolute">
                                    <FaMusic /> location
                                    <br />
                                    instruments
                                </div>
                            </div>

                            <div className="card_container_three position-relative my-5 my-lg-0"></div>
                        </div>


                    </div>
                </div>
            </div>
        </>
    )
};
export default BoutiqueListing