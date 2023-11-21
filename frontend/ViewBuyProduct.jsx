import React, {useState, useEffect} from 'react'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import CustomerNavbar from "./CustomerNavbar";
import Footer from './Footer';
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBRow,
  MDBContainer,
  MDBCol,
} from 'mdb-react-ui-kit';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader


// import { Link } from 'react-router-dom';


export default function CustomerViewProduct()  {

  const [data,setData]= useState([]);
  
  const [UserId,SetUserId] = useState(0);
  useEffect(()=>{
    SetUserId(localStorage.getItem("UserId"));
  },[])

  
  useEffect(()=>{
      async function getData() {
          try {
            const response = await fetch(`http://localhost:4000/customerViewProduct/buy?userID=${localStorage.getItem("UserId")}`);
            const responseData = await response.json();
            console.log(responseData); 
            setData(responseData);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }
      getData();
  },[])
  if (data.length === 0) {
      return <div style={{paddingTop:'300px'}}><center>There is nothing to view</center></div>; // or any other fallback UI
    }


  return (
    <div>
     <CustomerNavbar/>
      <br /><br />
<br /><br /><br />
    <MDBContainer fluid className="my-5" >
  <MDBRow className="justify-content-center" style={{marginLeft:'20px', marginRight:'20px'}}>
    {data.map((item, index) => (
      <MDBCol md="3" key={index}>
        <MDBCard className="text-black" style={{marginBottom:'20px'}}>
          <MDBCardImage
            src={`http://localhost:4000/images/${item.ProductPic}`}
            position="top"
            alt="Apple Computer"
            style={{ height: '250px', objectFit: "contain" }} // Adjust the height as needed
          />
          <MDBCardBody>
            <div className="text-center">
              <MDBCardTitle>{item.ProductName}</MDBCardTitle>
              <p className="text-muted mb-4">{item.ProductCategory}</p>
            </div>
            <div>
            <div className="d-flex justify-content-between">
                <span style={{paddingLeft:'30px'}}>Buy Quantity</span>
                <span style={{paddingRight:'30px'}}>{item.Quantity} PKR</span>
              </div>
              <div className="d-flex justify-content-between">
                <span style={{paddingLeft:'30px'}}>Unit Price</span>
                <span style={{paddingRight:'30px'}}>{item.UnitPrice} PKR</span>
              </div>
              <div className="d-flex justify-content-between">
                <span style={{paddingLeft:'30px'}}>Total Price</span>
                <span style={{paddingRight:'30px'}}>{item.TotalPrice} PKR</span>
              </div>

            </div>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    ))}
  </MDBRow>
</MDBContainer>
<Footer />
    </div>
  )
}





