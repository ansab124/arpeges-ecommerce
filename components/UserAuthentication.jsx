// import { useRouter } from "next/router";
// import { useState } from "react";
// import { useSelector } from "react-redux";

// const userAuthentication = (WrappedComponent) => {

//     return (props) => {

//         if (typeof window !== "undefined") {

//             const Router = useRouter();

//             const accessToken = localStorage.getItem("token");

//             if (!accessToken) {
//                 Router.replace("/");
//                 return null;
//             }

//             return <WrappedComponent {...props} />;
//         }

//         // If we are on server, return null
//         return null
//     };
// };


// export default userAuthentication;