import React, {useState, useEffect} from 'react'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import CustomerNavbar from "./CustomerNavbar";
import Footer from './Footer';
import Categories from './Categories';
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
import { Carousel } from 'react-responsive-carousel';



import { Link } from 'react-router-dom';


export default function CustomerViewProduct()  {

  const [data,setData]= useState([]);
  
  const [UserId,SetUserId] = useState(0);
  useEffect(()=>{
    SetUserId(localStorage.getItem("UserId"));
  },[])

  
  useEffect(()=>{
      async function getData() {
          try {
            const response = await fetch("http://localhost:4000/customerViewProduct/all");
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
    
    const handleCartSubmit = async (event, productId) => {
      event.preventDefault();
    
      const requestData = {
        userId: UserId,
        productId: productId,
      };
    
      try {
        const response = await fetch('http://localhost:4000/customerAddToCart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });
    
        if (response.status === 200) {
          alert('Product Added to cart successfully');
        } else if (response.status === 400) {
          const responseBody = await response.json();
          if (responseBody.error === 'Duplicate entry') {
            alert('This product is already in the cart.');
          } else {
            alert('Database Error');
          }
        } else {
          alert('Database Error');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('Database Error');
      }
    };
    


  return (
    <div>
     <CustomerNavbar/>
      <br /><br />
<br /><br /><br />
<Carousel autoplay={true} interval={3000}>
                <div>
                <img src="/Assets/1.jpg" alt='a'/>
                    <p className="legend">Welcome to Shop Ease! Explore a World of Exciting Products and Deals.</p>
                </div>
                <div>
                    <img src="/Assets/4.jpg" alt='b'/>
                    <p className="legend">Welcome to Shop Ease! Explore a World of Exciting Products and Deals.</p>
                </div>
                <div>
                    <img src="/Assets/5.jpg" alt='b'/>
                    <p className="legend">Welcome to Shop Ease! Explore a World of Exciting Products and Deals.</p>
                </div>
            </Carousel>
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
                <span style={{paddingLeft:'30px'}}>Price</span>
                <span style={{paddingRight:'30px'}}>{item.ProductPrice} PKR</span>
              </div>


            </div>
            <center>
            <button className="btn btn-success" type="submit" style={{  marginTop:'10px' }} >
              <Link to={`/Customer/CustomerViewProduct/CustomerViewSpecificProduct/?productId=${item.ProductId}`} style={{ color: 'white', textDecoration:"None" }}>Details</Link>
              </button>       
            <button className="btn btn-primary" type="submit" style={{ marginLeft:"5px", marginTop:'10px' }} onClick={(event) => handleCartSubmit(event, item.ProductId)}> Add to Cart</button>       
            {/* <Link to={`/AddCart/?productId=${item.ProductId}`} style={{ color: 'white', textDecoration:"None"}}>Add Cart </Link>        */}
            </center>

          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    ))}
  </MDBRow>
</MDBContainer>
<Categories/>
<Footer />
    </div>
  )
}





