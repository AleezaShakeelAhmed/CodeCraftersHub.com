import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBIcon,
} from "mdb-react-ui-kit";
import './success.css';


export default function App() {
  return (
    <div >

<MDBContainer fluid className="py-5 gradient-custom" >
      <MDBRow className="d-flex justify-content-center py-5">
        <MDBCol md="4" lg="5" xl="8" style={{ width: "100vh", height:'100vh',paddingTop:'150px' }}>
          <MDBCard style={{ borderRadius: "15px" }}>
            <MDBCardBody className="p-4" >
              <h1>Thanks for Buying Product</h1>
              
            <button type="submit" className="btn btn-success"style={{marginTop:'30px'}} 
            onClick={() => {
              window.location.href = "/Customer/CustomerViewProduct";
            }}  >
            <MDBIcon fas icon="arrow-left"/>
               Go to Home Page</button>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>

    </div>

  );
}