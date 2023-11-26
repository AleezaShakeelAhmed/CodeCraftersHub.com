import React, {useState,useEffect} from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import CustomerNavbar from "./CustomerNavbar";
import Footer from './Footer';
import './SpecicProduct.css';
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';



export default function ViewSpecificProduct() {
    const urlParams = new URLSearchParams(window.location.search);
    let productId=urlParams.get('productId');
    console.log(urlParams.get('productId'));
  const [data, setData] = useState([]); 

  useEffect(() => {
    async function fetchProductDetails() {
      try {
        console.log(urlParams.get('productId'));
        const response = await fetch(`http://localhost:4000/customerViewProduct/specific?productID=${productId}`);

        const responseData = await response.json();
        console.log(responseData);
        setData(responseData);
      } catch (error) {
        console.error("Error fetching Product details:", error);
      }
    }

    fetchProductDetails();
  }, [productId]);

  if (!data) {
    return <div style={{paddingTop:'300px'}}><center>There is nothing to view or Loading.............</center></div>; // or any other fallback UI
  }




  return (
<div>
      <CustomerNavbar />
      
      <div className="myProduct" >
      {data.map((item, index) => (
          <MDBCard key={index}>
            <MDBCardImage
              src={`http://localhost:4000/images/${item.ProductPic}`}
              position="top"
              alt="..."
              style={{ maxHeight: "20rem", objectFit: "contain" }}
            />
            <MDBCardBody>
              <center>
                <h1 style={{color:'darkblue'}}>{item.ProductName}</h1>
                <p>{item.ProductDescription}</p>
              </center>
              <div style={{marginLeft:'50px', marginRight:'50px'}}>
                <div className="d-flex justify-content-between">
                  <span style={{ fontWeight: 'bold' }}>Category</span>
                  <span>{item.ProductCategory} </span>
                </div>
                <div className="d-flex justify-content-between">
                  <span style={{fontWeight:'bold'}}>Price</span>
                  <span>{item.ProductPrice} PKR</span>
                </div>

              </div>
              <center>
              <center>
            <button className="btn btn-success" style={{width:'100%',marginTop:'10px'}}type="submit" ><Link to={`/Customer/CustomerSupport/?productId=${item.ProductId}&userId=${item.UserId}`} style={{ color: 'white', textDecoration:"None"  }}>Customer Support</Link></button>       
            {/* <button className="btn btn-primary" type="submit" style={{ marginLeft:"20px" , paddingLeft:'10px', paddingRight:'10px' }}><Link to={`/BuyProduct/?productId=${item.ProductId}`} style={{ color: 'white', textDecoration:"None"}}>Buy Product</Link></button>        */}
            
            </center>
              </center>
            </MDBCardBody>
          </MDBCard>
             ))}
      </div>
      <br /><br />
      <Footer />
    </div>
  );
}