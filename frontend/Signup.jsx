import React,{useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from "formik";
import * as Yup from "yup";

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
}
from 'mdb-react-ui-kit';

function Signup() {
  const [role,setrole] = useState();
  const [error,seterror] = useState(false);
  const [users,setUsers] = useState([]);
  const [link, setlink]=useState();
  useEffect(()=>{
    const urlParams = new URLSearchParams(window.location.search);
    let role = urlParams.get('role');
    setrole(role);
    console.log(role);

    if (urlParams.get('role')==='Dealer'){
      console.log('Umar')
      setlink('http://localhost:4000/registerDealer?role=2');
    }
    else if(urlParams.get('role')==='Customer') {
      console.log('Mahnoor')
      setlink('http://localhost:4000/registerCustomer?role=3');
    }
    console.log(link);
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:4000/Login");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  },[role])
  const signupSchema = Yup.object({
    firstname: Yup.string().min(3).max(25).required("Please enter your name"),
    lastname: Yup.string().max(25),
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string().min(6).required("Please enter your password"),
    confirm_password: Yup.string()
      .required()
      .oneOf([Yup.ref("password"), null], "Password must match"),
  });

  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirm_password: "",
  };

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: signupSchema,
      validateOnChange: true,
      validateOnBlur: false,
      //// By disabling validation onChange and onBlur formik will validate on submit.
      onChange:()=>{
        
      },
      onSubmit: (values, action) => {
        document.getElementById('signup').submit();
        action.resetForm();
      },
    });




  return (
    <MDBContainer fluid className='p-4'>

      <MDBRow>

        <MDBCol md='7' className='text-center text-md-start d-flex flex-column justify-content-center'>

        <h1 className="my-5 display-3 fw-bold ls-tight px-3">
        Shopease System:  <br />
            <span className="text-primary">Your Path to Effortless Shopping!</span>
          </h1>

          <p className='px-3' style={{color: 'hsl(217, 10%, 50.8%)'}}>
          Shopease is your go-to e-commerce website for a streamlined and hassle-free shopping experience. Our platform offers a diverse range of products, from fashion to electronics, all in one place. With a user-friendly interface and a focus on user satisfaction, we make it easy for you to discover, compare, and purchase your desired items. Our secure payment options ensure your transactions are safe, and our helpful review system empowers you to make well-informed choices. Join Shopease today and enjoy a convenient and enjoyable online shopping journey!
          
          </p>

        </MDBCol>

        <MDBCol md='4'>

          <MDBCard className='my-5 d-flex'>
            <MDBCardBody className='p-5'>
            <h4 className="display-10 fw-bold"style={{marginBottom: "25px"}}>
            Building Material <br />
            <span className="text-primary">Records System</span>
            </h4>
            <form  action={link} method='post' id='signup'>
              <MDBRow>
                <MDBCol lg='6' className="md-6">
                  <MDBInput wrapperClass='mb-4' label='First name' id='firstname' name='firstname' type='text'value={values.firstname}
                      onChange={handleChange}
                      onBlur={handleBlur}/>
                      {errors.firstname && touched.firstname ? (
                      <p className="form-error" style={{color:"red", marginTop: "-25px"}}>{errors.firstname}</p>
                    ) : null}
                </MDBCol>

                <MDBCol lg='6' className="md-6">
                  <MDBInput wrapperClass='mb-4' label='Last name' id='lastname' name='lastname' type='text'value={values.lastname}
                      onChange={handleChange}
                      onBlur={handleBlur}/>
                      {errors.lastname && touched.lastname ? (
                      <p className="form-error" style={{color:"red", marginTop: "-25px"}}>{errors.lastname}</p>
                    ) : null}
                </MDBCol>
              </MDBRow>

              <MDBInput wrapperClass='mb-4' label='Email' id='email' name='email' type='email'value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}/>
                      {errors.email && touched.email ? (
                      <p className="form-error" style={{color:"red", marginTop: "-25px"}}>{errors.email}</p>
                    ) : null}
              <MDBInput wrapperClass='mb-4' label='Password' id='password' name='password' type='password'value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}/>
                      {errors.password && touched.password ? (
                      <p className="form-error" style={{color:"red", marginTop: "-25px"}}>{errors.password}</p>
                    ) : null}
              <MDBInput wrapperClass='mb-4' label='Confirm Password' id='confirm_password' name='confirm_password' type='password' value={values.confirm_password}
                      onChange={handleChange}
                      onBlur={handleBlur}/>
                      {errors.confirm_password && touched.confirm_password ? (
                      <p className="form-error" style={{color:"red", marginTop: "-25px"}}>{errors.confirm_password}</p>
                    ) : null}

              <div className='d-flex justify-content-center mb-4'>
              <p>
                      Already Have an Account?{" "}
                      <Link
                        to="/"
                        style={{
                          textDecoration: "none",
                          marginRight: "8px",
                        }}
                      >
                        Login
                      </Link>
                    </p></div>
                    {console.log(error)}
                    {{error}?(<button type="button" class="btn btn-primary btn-block mb-4" onClick={handleSubmit} onSubmit={handleSubmit}>Signup</button>):<p className="form-error" style={{color:"red", marginTop: "-25px"}}>User Already Exists</p>}

              </form>

            </MDBCardBody>
          </MDBCard>

        </MDBCol>

      </MDBRow>

    </MDBContainer>
  );
}

export default Signup;