import {  MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import DealerNavbar from "./DealerNavbar";
import Footer from './Footer';
import React, { useState, useEffect } from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from 'axios';
import NotFoundPage from './404';
import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalFooter,
  MDBModalBody,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from 'mdb-react-ui-kit';

export default function App() {
  const [data, setData] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [customerEmail, setCustomerEmail] = useState('');
  const [submit, setSubmit] = useState('');


  useEffect(() => {
    async function getData() {
      try {
        const userId = localStorage.getItem('UserId');
        const response = await fetch(`http://localhost:4000/viewSupportRequest?userId=${userId}`);
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getData();
  }, []);

  const closeModal = () => {
    setShowUpdateModal(false);
  };




// const handleUpdateProduct = async (e) => {
//     e.preventDefault();
//     setSubmit(true);
//     const subject = document.getElementById("subject").value;
//     const message = document.getElementById("body").value;
//     const data = {
//       subject: subject,
//       message: message,
//       email: customerEmail,
//       id:selectedProductId,
//     };

//     try {
//       const response = await axios.post("http://localhost:4000/dealerReply", data, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       setCustomerEmail("");
//     //   setSubject("");
//     //   setReply("");
//     //   setId("");
//       setSubmit(false);
//       setShowUpdateModal(false);
//       getData();
//     } catch (error) {
//       console.error("Error:", error.message);
//       setSubmit(false);
//     }
//   };


const handleUpdateProduct = async (e) => {
  e.preventDefault();
  setSubmit(true);
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("body").value;
  const data = {
    subject: subject,
    message: message,
    email: customerEmail,
    id: selectedProductId,
  };

  try {
    await axios.post("http://localhost:4000/dealerReply", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    setCustomerEmail("");
    setSubmit(false);
    setShowUpdateModal(false);

    async function getData() {
      try {
        const userId = localStorage.getItem('UserId');
        const response = await fetch(`http://localhost:4000/viewSupportRequest?userId=${userId}`);
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getData();
  } catch (error) {
    console.error("Error:", error.message);
    setSubmit(false);
  }
};

  

  const handleUpdateClick = (CSId, customerEmail) => {
    setSelectedProductId(CSId);
    setCustomerEmail(customerEmail); // Set the customer email in the state
    setShowUpdateModal(true);
  };


  if (data.length === 0) {
    return <div style={{ paddingTop: '300px' }}><center>Loading..................</center></div>;
  }

  return (
      <>
        {localStorage.getItem('role') === '2' ?
    <div>
      <DealerNavbar />
      <div style={{ overflowX: 'auto' }}>
        <MDBTable align='middle' style={{ marginTop: '150px' }}>
          <MDBTableHead>
            <tr style={{ color: 'darkblue', fontWeight: 'bold' }}>
              <th scope='col'>From</th>
              <th scope='col'>Title</th>
              <th scope='col'>Message</th>
              <th scope='col'>Status</th>
              <th scope='col'>Respond</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {data.map((item, index) => (
              <tr key={item.CustomerSupportId} >
                <td>
                  <p className='fw-normal mb-1'>{item.CustomerEmail}</p>
                </td>
                <td>
                  <p className='fw-normal mb-1'>{item.Title}</p>
                </td>
                <td>
                  <p className='fw-normal mb-1'>{item.Description}</p>
                </td>
                <td>
                <p className={`fw-normal mb-1 ${item.Active === 1 ? 'text-success' : 'text-danger'}`}>
                    {item.Active === 1 ? 'Replied' : 'Not Replied'}
                  </p>
                  {/* <p className='fw-normal mb-1'>{item.Active}</p> */}
                </td>
                <td>
                  <button type="button" className="btn btn-success" onClick={() => handleUpdateClick(item.CustomerSupportId, item.CustomerEmail)}>
                    Reply
                  </button>
                </td>

              </tr>
            ))}
          </MDBTableBody>
          <p style={{ marginTop: '70px' }}></p>
        </MDBTable>
      </div>

      <MDBModal show={showUpdateModal} onHide={setShowUpdateModal} tabIndex="-1">
        <MDBModalDialog style={{ maxWidth: '900px' }}>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Reply to Customer</MDBModalTitle>
              <button className="btn-close" color="none" onClick={closeModal}></button>
            </MDBModalHeader>
            <MDBModalBody>
              <MDBRow className="d-flex justify-content-center align-items-center h-100">
                <MDBCol col="12" className="m-5">
                  <MDBCard className="card-registration card-registration-2" style={{ borderRadius: '15px' }}>
                    <form onSubmit={handleUpdateProduct} encType='multipart/form-data'>
                      <MDBCardBody className="p-0">
                            <MDBInput
                              wrapperClass="mb-4"
                              label="Title"
                              size="lg"
                              id="subject"
                              type="text"
                              name="subject"
                            />
                            <textarea
                              className="form-control"
                              id="body"
                              name="message"
                              placeholder='Message'
                              rows="4"
                              style={{ backgroundColor: "white", marginTop: ' 31px' }}
                            ></textarea>


                      </MDBCardBody>
                      <MDBModalFooter>
                        <button className="btn btn-danger" type="button" onClick={closeModal}>
                          Close
                        </button>
                        <button className="btn btn-success" type="submit" onClick={handleUpdateProduct}>
                              Respond To Customer
                        </button>
                      </MDBModalFooter>
                    </form>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

      <Footer />
    </div>
        : <NotFoundPage />}
        </>
  );
}
