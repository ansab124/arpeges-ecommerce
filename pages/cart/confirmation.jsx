import Breadcrumb, { BreadcrumbItem } from "../../components/BreadCrumb";


const Confirmation = () => {
    return (
        <div className="instrument__container container my-3 my-sm-5 orderConfirmation">
            <div className="my-4">
                <Breadcrumb>
                    <BreadcrumbItem>Accueil</BreadcrumbItem>
                    <BreadcrumbItem>Confirmation commande</BreadcrumbItem>

                </Breadcrumb>
            </div>


            <div className="confirmationContainer">
                <h1> VOTRE COMMANDE N° XXXXXX EST VALIDÉE </h1>

                <p className="intro"> Nous vous remercions pour votre commande, u​​​​​n e-mail de confirmation vous a été envoyé.
                    Votre commande est en cours de préparation, vous retrouverez le détail de votre commande depuis votre compte. </p>



                <div className="orderSummary">
                    <h3>RÉCAPITULATIF DE VOTRE COMMANDE</h3>
                    <p>Numéro de commande : XXXXXXX </p>
                    <p>Référence de la transaction : XXXXXXX</p>
                    <p>Date et heure : 00/00/0000 à 00h00 </p>
                    <div className="orderAmount">
                    Montant de la commande : 000.00 € TTC
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Confirmation