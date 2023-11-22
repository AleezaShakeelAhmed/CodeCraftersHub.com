import React from 'react';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBTextArea,
  MDBBtn,
  MDBSpinner,
}
from 'mdb-react-ui-kit';
import CustomerNavbar from "./CustomerNavbar";
import Footer from './Footer';
import {useEffect, useState} from 'react';

function ContactForm() {


    const [UserId,SetUserId] = useState(0);
    const [cTitle, setcTitle] = useState('');
    const [cEmail, setcEmail] = useState('');
    const [cDescription, setcDescription] = useState('');
    const [submit, setSubmit] = useState('');


    const urlParams = new URLSearchParams(window.location.search);
    let ProductId=urlParams.get('productId');
    console.log(urlParams.get('productId'));

  useEffect(()=>{
    SetUserId(localStorage.getItem("UserId"));
  },[])

  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('cTitle', cTitle);
    formData.append('cEmail', cEmail);
    formData.append('cDescription', cDescription);


    try {
      console.log(UserId);
      const response = await fetch(`http://localhost:4000/customerSupport?productId=${ProductId}&userId=${UserId}`, {
        method: 'POST',
        body: formData,
      });

      console.log(response);

      if (response.status === 200) {
        alert('Your Issue is recorded, We will Contact back to You.');
        document.getElementById('addSupport').reset();
      } else {
        alert('Database Error');
      }
    } catch (error) {
      console.error('Error submitting Issue Data:', error);
      alert('Database Error is');
    }
  };


  const handleSupport = async (event) => {
    event.preventDefault();
    setSubmit(true);
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const body = document.getElementById("body").value;

    const data = {
      email: email,
      subject: subject,
      body: body,
    };

    await fetch(`http://localhost:4000/customerSupport?productId=${ProductId}&userId=${UserId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Request failed.");
        }
        alert("Request Sent To Dealer");
        document.getElementById("email").value = "";
        document.getElementById("subject").value = "";
        document.getElementById("body").value = "";
        return response.json();
        setSubmit(false);
      })
      .then((data) => {
        setSubmit(false);
        if (data.message === "added") {
          document.getElementById("email").value = "";
          document.getElementById("subject").value = "";
          document.getElementById("body").value = "";
        }
      })
      .catch((error) => {
        setSubmit(false);
        console.error("Error:", error);
      });
  };



  return (
    <div>
        <CustomerNavbar/>
<MDBContainer fluid>

<div className="p-5 bg-image" style={{backgroundImage: 'url(https://mdbootstrap.com/img/new/textures/full/171.jpg)', height: '300px'}}></div>

<MDBCard className='mx-5 mb-5 p-5 shadow-5' style={{marginTop: '-100px', background: 'hsla(0, 0%, 100%, 0.8)', backdropFilter: 'blur(30px)'}}>
  <MDBCardBody className='p-5 text-center'>
  
  <form onSubmit={handleSupport}>
                <MDBCardBody>
                  <MDBInput
                    type="email"
                    label="Email address"
                    v-model="email"
                    wrapperClass="mb-4"
                    id="email"
                    name="email"
                    required
                  />

                  <MDBInput
                    label="Subject"
                    v-model="subject"
                    wrapperClass="mb-4"
                    id="subject"
                    name="subject"
                    required
                  />

                  <MDBTextArea
                    wrapperClass="mb-4"
                    label="Message"
                    id="body"
                    name="message"
                    rows="4"
                    required
                  />
                  <span id="msg"></span>
                  <button
                  style={{width:'100%'}}
                    type="submit"
                    block
                    className="btn btn-primary"
                  >
                    
                      <span>Send</span>
                  </button>
                </MDBCardBody>
              </form>
  </MDBCardBody>
</MDBCard>

</MDBContainer>
<Footer/>
    </div>
    
  );
}

export default ContactForm;