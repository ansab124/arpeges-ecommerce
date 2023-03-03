import Link from 'next/link';
import React from 'react';
import Breadcrumb, { BreadcrumbItem } from "../../components/BreadCrumb";
import ConatctForm from '../../components/contact/ContactForm';

const Contactez = () => {
    return (
        <div className='container contact'>
            <Breadcrumb>
                <BreadcrumbItem isLast>
                    Contact
                </BreadcrumbItem>
            </Breadcrumb>
            <div className='contact_container text-dark'>
                <div className='contact_container-header'>
                    <h1 className='text-uppercase '>contactez arpéges</h1>
                    <p>
                        {"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop"}
                    </p>
                </div>

                <div className='contact_container-content row'>
                    <div className='col-12 col-md-6'>
                        <ConatctForm />
                    </div>

                    <div className='col-12 col-md-6'>
                        <div className='contact_container-content_card '>
                            <div className='contact_container-content_card-section'>
                                <h4>SERVICE Client:</h4>
                                <p>
                                    Notre service client est également à votre disposition par téléphone du <b>lundi au samedi (9h-13h/14h-19h)</b>.
                                </p>
                            </div>

                            <h3 className='phone'>01 53 06 39 40</h3>
                           
                            <div className='contact_container-content_card-section'>
                                <h4>{"BESOIN D'AIDE:"}</h4>
                                <p>
                                    Consulter notre rubrique <Link href={"/faq"}><a>Aide et FAQ</a></Link> pour obtenir toutes les réponses à vos questions
                                </p>
                            </div>
                            <div className='contact_container-content_card-section'>
                                <h4>{"BOUTIQUES:"}</h4>
                                <p>
                                    Ou venez nous rendre visite dans nos  <Link href={"/faq"}><a>boutiques Arpèges.</a></Link>
                                </p>
                            </div>


                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Contactez