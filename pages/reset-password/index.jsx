import React from 'react'
import { Formik } from 'formik';
import * as Yup from "yup";
import { userResetPassword } from '@actions';

const index = () => {
  return (
    <Formik

      initialValues={{
        password: '',
        confirmPassword: '',
      }}

      validationSchema={Yup.object().shape({
        password: Yup.string().required("Required"),
        confirmPassword: Yup.string().required("Required").oneOf([Yup.ref("password", "")], "Password must match"),

      })}
      onSubmit={async (values) => {

        const response = await userResetPassword({ password: values.password, confirmPassword: values.confirmPassword });

        console.log(response);

      }}
    >

      {({
        handleBlur,
        handleChange,
        handleSubmit,
        errors,
        values,
        touched,

      }) =>

      (
        <div className='justify-content-center d-flex p-5 m-5 '>

          <form className='p-5  ' onSubmit={handleSubmit}>
            <div className='text-center'>
              <h3 className='text-dark'>CRÉER VOTRE NOUVEAU MOT DE PASSE</h3>
              <p>
                Veuillez saisir un nouveau mot de passe pour
                accéder à votre compte, dans le formulaire
                ci-dessous.
              </p>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              placeholder='Password'
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-control ${errors.password && touched.password
                ? "border border-danger"
                : ""
                }`}
              value={values.password}
            />
            <br />
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder='Confirm Password'
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-control ${errors.confirmPassword && touched.confirmPassword
                ? "border border-danger"
                : ""
                }`}
              value={values.confirmPassword}
            />
            <br />
            <div className="justify-content-center d-flex">
              <button className='btn btn-primary ' type="submit">Submit</button>
            </div>
          </form>
        </div>
      )}
    </Formik>

  )
}

export default index
