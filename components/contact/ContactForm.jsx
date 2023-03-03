import React from 'react'
import Input from '../controls/Input'
import { AntSelectDropDown } from '../controls/AntSelectDropDown';
import { AntButton } from "../controls/AntButton";
import { CheckboxComp } from '../controls/CheckboxComp';
import Select from '../controls/Select';
import { Formik } from 'formik';
import * as Yup from "yup";

const ContactForm = () => {
    return (

        <Formik
            initialValues={{
                first_name: "",
                phone_no: "",
                name: "",
                email: "",
                company: "",
                client: "",
                message: ""

            }}
            validationSchema={Yup.object().shape({
                first_name: Yup.string().required("Required"),
                phone_no: Yup.string().required("Required"),
                name: Yup.string().required("Required"),
                email: Yup.string().email("Invalid email").required("Required"),
                company: Yup.string().required("Required"),
                client: Yup.string().required("Required"),
                message: Yup.string().required("Required"),

            })}
            onSubmit={async (values) => {
                console.log(values)
            }}
        >
            {({
                handleBlur,
                handleChange,
                handleSubmit,
                errors,
                values,
                touched,

            }) => (
                <form onSubmit={handleSubmit}>

                    <div className='row '>
                        <div className='col-12 col-md-6 mt-3'>
                            <input
                                type="text"
                                placeholder="Prénom*"
                                name='first_name'
                                value={values.first_name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`form-control ${errors.first_name && touched.first_name
                                    ? "border border-danger"
                                    : ""
                                    }`} /></div>
                        <div className='col-12 col-md-6 mt-3'>
                            <input
                                placeholder="Téléphone*"
                                value={values.phone_no}
                                name="phone_no"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`form-control ${errors.phone_no && touched.phone_no
                                    ? "border border-danger"
                                    : ""
                                    }`} /></div>
                        <div className='col-12 col-md-6 mt-3'>
                            <input
                                placeholder="Nom*"
                                value={values.name}
                                name="name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`form-control ${errors.name && touched.name
                                    ? "border border-danger"
                                    : ""
                                    }`} /></div>
                        <div className='col-12 col-md-6 mt-3'>
                            <input
                                placeholder="Email*"
                                value={values.email}
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`form-control ${errors.email && touched.email
                                    ? "border border-danger"
                                    : ""
                                    }`} /></div>
                        <div className='col-12 col-md-6 mt-3'>
                            <input
                                placeholder="Société/Ecole"
                                value={values.company}
                                name="company"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`form-control ${errors.company && touched.company
                                    ? "border border-danger"
                                    : ""
                                    }`} /></div>
                        <div className='col-12 col-md-6 mt-3'>
                            <input
                                placeholder="N Client"
                                value={values.client}
                                onChange={handleChange}
                                name="client"
                                onBlur={handleBlur}
                                className={`form-control ${errors.client && touched.client
                                    ? "border border-danger"
                                    : ""
                                    }`} /></div>
                        <div className='col-12 col-md-6 mt-3'><Select /></div>
                        <div className='col-12 mt-3'>
                            <textarea

                                placeholder="Votre message*"
                                value={values.message}
                                onChange={handleChange}
                                name="message"
                                onBlur={handleBlur}
                                className={`form-control ${errors.message && touched.message
                                    ? "border border-danger"
                                    : ""
                                    }`}
                            />

                        </div>
                        <div className='mt-3 col-12'><CheckboxComp checkTxt="En soumettant ce formulaire, j'accepte que les informations saisies soient exploitées pour réspondre a ma demande. Consultez notre politique de confidentialité.  " /></div>
                        <div className='mt-3 d-flex justify-content-center mb-3'><AntButton btnTxt="Envoyer" /></div>

                    </div>
                </form>
            )}
        </Formik>
    )
}

export default ContactForm