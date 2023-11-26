import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Cookies from 'js-cookie';

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from 'mdb-react-ui-kit';


function Login() {
  const [error, setError] = useState('');
  const loginSchema = Yup.object({
    email: Yup.string().email().required('Please enter your email'),
    password: Yup.string().min(6).required('Please enter your password'),
  });

  const initialValues = {
    email: '',
    password: '',
  };

  const { handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      // try {
        const response = await fetch('http://localhost:4000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
console.log("Response"+ response.ok);

        if (response.ok) {
          const data = await response.json();
          console.log("data"+ data);
          // localStorage.setItem('token', data.token);
          Cookies.set('token', data.token);
          Cookies.set('role',data.role);
          console.log("token"+ data.token);
          localStorage.setItem('UserId', data.UserId);
          localStorage.setItem('role', data.role);
          console.log("userId" + data.UserId);
          setError('');
          // console.log("sss" +data.role,data.UserId,data.email);
          // Redirect based on the user's role
          if (data.role === 2) {
            window.location.href = `/Dealer/DealerHome?UserId=${data.UserId}`;
          } else if (data.role === 3) {
            window.location.href = `/Customer/CustomerViewProduct`;
          }

        } else {
          const { message } = await response.json();
          setError(message);
          alert('Invalid email or password. Please try again.');
        }
      // } catch (error) {
      //   console.error(error);
      //   setError('An error occurred during login.');
      // }
    },
  });

  return (
    <MDBContainer fluid className='p-4'>
      <MDBRow>
        <MDBCol md='7' className='text-center text-md-start d-flex flex-column justify-content-center'>
          <h1 className='my-5 display-3 fw-bold ls-tight px-3'>
          Shopease System:<br />
            <span className='text-primary'>Your Path to Effortless Shopping!</span>
          </h1>
          <p className='px-3' style={{ color: 'hsl(217, 10%, 50.8%)' }}>
          Shopease is your go-to e-commerce website for a streamlined and hassle-free shopping experience. Our platform offers a diverse range of products, from fashion to electronics, all in one place. With a user-friendly interface and a focus on user satisfaction, we make it easy for you to discover, compare, and purchase your desired items. Our secure payment options ensure your transactions are safe, and our helpful review system empowers you to make well-informed choices. Join Shopease today and enjoy a convenient and enjoyable online shopping journey!

          </p>
        </MDBCol>
        <MDBCol md='5'>
          <MDBCard className='my-5 '>
            <MDBCardBody className='p-5'>
              <h4 className='display-10 fw-bold' style={{ marginBottom: '25px' }}>
                Shop Ease <br />
                <span className='text-primary'>Login Here</span>
              </h4>
              <form onSubmit={handleSubmit}>
                <MDBInput
                  wrapperClass='mb-4'
                  label='Email'
                  id='email'
                  name='email'
                  type='email'
                  onChange={handleChange}
                />
                <MDBInput
                  wrapperClass='mb-4'
                  label='Password'
                  id='password'
                  name='password'
                  type='password'
                  onChange={handleChange}
                />
                <div className='d-flex justify-content-center mb-4'>
                  <p>
                    Don't Have Account?{' '}
                    <Link to='/Roles' style={{ textDecoration: 'none', marginRight: '8px' }}>
                      Signup
                    </Link>
                  </p>
                </div>
                {error && <p className='form-error' style={{ color: 'red', marginTop: '-25px' }}>{error}</p>}
                <button type='submit' className='btn btn-primary btn-block mb-4'>
                  Login
                </button>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;
