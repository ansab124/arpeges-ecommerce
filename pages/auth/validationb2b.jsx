import Breadcrumb, { BreadcrumbItem } from "../../components/BreadCrumb";

const validationb2b = () => {
  return (
    <div className="instrument__container container my-3 my-sm-5 validation">
      <div className="my-4">
        <Breadcrumb>
          
          <BreadcrumbItem>Connexion-Inscription</BreadcrumbItem>
          <BreadcrumbItem>Inscription</BreadcrumbItem>
          <BreadcrumbItem>Validation BtoB</BreadcrumbItem>
        </Breadcrumb>
      </div>

      <div className="validationContainer">
        <h1> COMPTE BTOB EN COURS DE VALIDATION </h1>

        <p className="validationIntro">
          Nous vous remercions de votre inscription sur le site, <span> votre compte
          est en cours de validation par Arpèges.</span> Une fois validé, vous recevrez
          alors <span> un e-mail contenant vos identifiants.</span> Vous pourrez alors vous
          connecter ensuite sur le site pour accéder à vos informations et
          passer commande.
        </p>
      </div>
    </div>
  );
};

export default validationb2b;
