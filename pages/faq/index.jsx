import React,{useState} from 'react'
import Breadcrumb, { BreadcrumbItem } from "../../components/BreadCrumb";
import { CiSearch } from "react-icons/ci";
import QuestionAccordions from '../../components/faq/QuestionAccordions';
import QuestionAnswer from '../../components/faq/QuestionAnswer';



const FAQPage = () => {
    const [activeQuestion,setActiveQuestion]=useState(0)
    return (
        <div className='faq container my-5'>
            <Breadcrumb>
                <BreadcrumbItem >Services</BreadcrumbItem>
                <BreadcrumbItem isLast>FAQ</BreadcrumbItem>
            </Breadcrumb>
            <div className='faq_header d-flex align-items-center justify-content-center flex-column'>
                <h1 className='text-dark'>{"FAQ & AIDE ARPèGES"}</h1> 
                <p className='text-center mt-3'>{"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing"}</p>
            </div>

            <div className='faq_search row text-dark my-5 flex-wrap '>
                <div className='faq_search_section col-xs-12 col-sm-12 col-lg-6 col-xl-6 d-flex  justify-content-center flex-column gap-3'>
                    <label  >Recherchez une question/réponse:</label>
                    <div className='faq_search_section-input position-relative '>
                        <span className='position-absolute right-0'><CiSearch /> Retour</span>
                        <input placeholder='(Saisir le terme de recherche,chargement résultats a la saisie)' />
                    </div>
                </div>
                <div className='faq_search-contact d-flex flex-column align-items-center mt-3 mt-lg-0 col-xs-12 col-xl-6 col-sm-12 col-lg-6'>
                    <p>
                        {"Si vous n'obtenez pas de reponse a vos questions, "}<a>contactez-nous par mail</a> ou par telephone du <b>lundi au samedi (9h-13h/14h-19h)</b>
                    </p>
                    <span className='text-dark'>01 53 06 39 40</span>
                </div>
            </div>
            <div className='faq_accodions my-3'>
                {[1, 2, 3, 4, 5].map((item, index) => <QuestionAccordions key={index} />)}
            </div>
            <div className='faq_questions  my-5'>
                <span className='mb-4'>questions les plus fréquentes</span>
                {[1, 2, 3, 4, 5].map((item, index) => <QuestionAnswer active={index+1==activeQuestion} setActive={setActiveQuestion} key={index} number={index + 1} />)}
            </div>
            <div className='faq_card p-4'>
                <div className='faq_card_header'>
                    <div className='faq_card_header-dots'>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <h2 className='jost_font my-3 text-dark'>SERVICES ARPÈGES, À DÉCOUVRIR ÉGALEMENT...</h2>
                </div>
                <ul className='text-dark d-flex align-items-center justify-content-around flex-column   flex-sm-row mt-5 mb-3'>
                    <li className='my-2' >LOCATION</li>
                    <li className='my-2'>FINANCEMENT</li>
                    <li className='my-2 active'>ASSURANCE</li>
                    <li className='my-2'>SAV & GARANTIE</li>
                    <li className='my-2'>FAQ</li>
                </ul>
            </div>

        </div>
    )
}

export default FAQPage