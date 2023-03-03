import React from 'react';
import { useRouter } from "next/router"

const ServerErrorPage = () => {
        const router = useRouter();
        return (
                <div className="container notFoundPage text-dark d-flex align-items-center flex-column justify-content-center">
                        <div className="h-full w-full text-center ">
                                <h1>500</h1>
                                <h2>Internal Server Error</h2>
                                {/* <p>{"La ressource que vous recherchez n'existe pas. Vous pouvez cliquer sur le bouton ci-dessous pour revenir à la page d'accueil."}
                                </p> */}
                                <button onClick={() => router.push("/")} className="btn green text-uppercase">accueil</button>
                        </div>
                </div>
        )
}

export default ServerErrorPage