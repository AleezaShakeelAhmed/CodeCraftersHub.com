import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {useState, useEffect} from 'react'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardHeader,
  MDBCol,
  MDBRow,
  MDBCardImage,
  MDBContainer,
} from 'mdb-react-ui-kit';

const CategoryPage = ({ match }) => {
  const category = match.params.category;
  const [data,setData]= useState([]);
  const [UserId,SetUserId] = useState(0);
  useEffect(()=>{
    SetUserId(localStorage.getItem("UserId"));
  },[])
  
  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(`http://localhost:4000/customerViewProduct/category?category=${category}`);
        const responseData = await response.json();
        console.log(responseData);
        setData(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getData();
  }, [category]);

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
      <h2>{category}</h2>
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
            <button className="btn btn-primary" type="submit" style={{ marginLeft:"5px", marginTop:'10px' }} onClick={(event) => handleCartSubmit(event, item.ProductId)}> Add to Cart</button>       
            {/* <Link to={`/AddCart/?productId=${item.ProductId}`} style={{ color: 'white', textDecoration:"None"}}>Add Cart </Link>        */}
            </center>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    ))}
  </MDBRow>
</MDBContainer>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div>
        <MDBCard style={{ marginLeft: '20px', marginRight: '20px', marginBottom: '10px' }}>
          <h1>Popular Categories</h1>
          <MDBRow className="justify-content-center">
            <MDBCol md="3">
              <Link to="/category/Health And Beauty" style={{textDecoration:"None"}}>
                <MDBCard shadow='0' border='primary' background='white' className='mb-3'>
                  <MDBCardHeader>Health & Beauty</MDBCardHeader>
                  <MDBCardBody className='text-primary'>
                    <MDBCardTitle>Diverse Shopping Delights</MDBCardTitle>
                    <MDBCardText style={{textAlign:'justify'}}>
                    Uncover an array of categories in our online haven, where choices abound. From fashion to electronics, explore a curated selection for every desire.
                    </MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              </Link>
            </MDBCol>
            <MDBCol md="3">

              <Link to="/category/Men Fashion" style={{textDecoration:"None"}}>
                <MDBCard
                  shadow='0'
                  border='secondary'
                  background='white'
                  className='mb-3'
                >
                  <MDBCardHeader>Men's Fashion</MDBCardHeader>
                  <MDBCardBody className='text-secondary'>
                  <MDBCardTitle>Diverse Shopping Delights</MDBCardTitle>
                    <MDBCardText style={{textAlign:'justify'}}>
                    Uncover an array of categories in our online haven, where choices abound. From fashion to electronics, explore a curated selection for every desire.
                    </MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              </Link>
            </MDBCol>
            <MDBCol md="3">
              <Link to="/category/Women Fashion" style={{textDecoration:"None"}}>
                <MDBCard shadow='0' border='success' background='white' className='mb-3'>
                  <MDBCardHeader>Women's Fashion</MDBCardHeader>
                  <MDBCardBody className='text-success'>
                  <MDBCardTitle>Diverse Shopping Delights</MDBCardTitle>
                    <MDBCardText style={{textAlign:'justify'}}>
                    Uncover an array of categories in our online haven, where choices abound. From fashion to electronics, explore a curated selection for every desire.
                    </MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              </Link>
            </MDBCol>

            <MDBCol md="3">
              <Link to="/category/Mother And Baby" style={{textDecoration:"None"}}>
                <MDBCard shadow='0' border='danger' background='white' className='mb-3'>
                  <MDBCardHeader>Mother & Baby</MDBCardHeader>
                  <MDBCardBody className='text-danger'>
                  <MDBCardTitle>Diverse Shopping Delights</MDBCardTitle>
                    <MDBCardText style={{textAlign:'justify'}}>
                    Uncover an array of categories in our online haven, where choices abound. From fashion to electronics, explore a curated selection for every desire.
                    </MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              </Link>
            </MDBCol>
            <MDBCol md="3">
              <Link to="/category/Groceries And Pets" style={{textDecoration:"None"}}>
                <MDBCard shadow='0' border='warning' background='white' className='mb-3'>
                  <MDBCardHeader>Groceries & Pets</MDBCardHeader>
                  <MDBCardBody className='text-warning'>
                  <MDBCardTitle>Diverse Shopping Delights</MDBCardTitle>
                    <MDBCardText style={{textAlign:'justify'}}>
                    Uncover an array of categories in our online haven, where choices abound. From fashion to electronics, explore a curated selection for every desire.
                    </MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              </Link>
            </MDBCol>
            <MDBCol md="3">
              <Link to="/category/Sports And Outdoors" style={{textDecoration:"None"}}>
                <MDBCard shadow='0' border='green' background='white' className='mb-3'>
                  <MDBCardHeader>Sports & Outdoors</MDBCardHeader>
                  <MDBCardBody className='text-black'>
                  <MDBCardTitle>Diverse Shopping Delights</MDBCardTitle>
                    <MDBCardText style={{textAlign:'justify'}}>
                    Uncover an array of categories in our online haven, where choices abound. From fashion to electronics, explore a curated selection for every desire.
                    </MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              </Link>
            </MDBCol>
            <MDBCol md="3">
              <Link to="/category/Electronic Devices" style={{textDecoration:"None"}}>
                <MDBCard shadow='0' border='info' background='white' className='mb-3'>
                  <MDBCardHeader>Electronic Devices</MDBCardHeader>
                  <MDBCardBody className='text-info'>
                  <MDBCardTitle>Diverse Shopping Delights</MDBCardTitle>
                    <MDBCardText style={{textAlign:'justify'}}>
                    Uncover an array of categories in our online haven, where choices abound. From fashion to electronics, explore a curated selection for every desire.
                    </MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              </Link>
            </MDBCol>
            <MDBCol md="3">
              <Link to="/category/Home Appiliances" style={{textDecoration:"None"}}>
                <MDBCard shadow='0' border='dark' background='white'>
                  <MDBCardHeader>Home Appiliances</MDBCardHeader>
                  <MDBCardBody className='text-dark'>
                  <MDBCardTitle>Diverse Shopping Delights</MDBCardTitle>
                    <MDBCardText style={{textAlign:'justify'}}>
                    Uncover an array of categories in our online haven, where choices abound. From fashion to electronics, explore a curated selection for every desire.
                    </MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              </Link>
            </MDBCol>
          </MDBRow>
        </MDBCard>

        <Route path="/category/:category" component={CategoryPage} />
      </div>
    </Router>
  );
};

export default App;
