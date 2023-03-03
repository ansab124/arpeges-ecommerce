import Breadcrumb, { BreadcrumbItem } from "../../components/BreadCrumb";


const validation = () => {
  return (
    <div className="instrument__container container my-3 my-sm-5 validation">
      <div className="my-4">
        <Breadcrumb>
          <BreadcrumbItem>Connexion-Inscription</BreadcrumbItem>
          <BreadcrumbItem>Inscription</BreadcrumbItem>
          <BreadcrumbItem>Validation</BreadcrumbItem>
        </Breadcrumb>
      </div>

      <div className="validationContainer">
        <h1> VALIDATION DU COMPTE </h1>

        <p className="validationIntro">
          {"Vous avez presque terminé ! Un message a été envoyé à l'adresse e-mail renseignée afin de la valider."}
          <span> {"Cliquez sur le lien dans l'e-mail pour finaliser la création de votre compte."} </span> {"Vous pourrez alors vous connecter ensuite sur le site Arpèges."}
        </p>

      </div>

    </div>
  )
}

export default validation