import React,{useEffect, useState} from 'react';
import  DealerNavbar from './DealerNavbar';
import Footer from './Footer';
import NotFoundPage from './404';


import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
}
from 'mdb-react-ui-kit';

function AddProduct() {
  const [selectedImage, setSelectedImage] = useState(
    'https://cdn-icons-png.flaticon.com/128/3114/3114633.png'
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };
  const [UserId,SetUserId] = useState(0);
  useEffect(()=>{
    SetUserId(localStorage.getItem("UserId"));
  },[])







    const handleSubmit = async (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      
      try {
        console.log(UserId);
        const response = await fetch(`http://localhost:4000/addProduct?UserId=${UserId}`, {
          method: "POST",
          body: formData,
        });
      
        if (response.status === 200) {
          alert("Product Added successfully");
          setSelectedImage(
            'https://cdn-icons-png.flaticon.com/128/3114/3114633.png'
          );
          document.getElementById("addProduct").reset();
        }
        else{
          alert("Database Error");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("Database Error");
      }
    };

  return (
    <>
      {localStorage.getItem('role') === '2' ?
    <div>
                <DealerNavbar/>
    <MDBContainer fluid className='p-4'>

      <MDBRow style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', marginTop: "6%"}}>
        <MDBCol md='7' >
        
          <MDBCard >
          <MDBCardBody>
            <h4 className="display-10 fw-bold"style={{marginBottom: "25px"}}>
            Add  Products to <br />
            <span className="text-primary">Shop Ease</span>
            </h4>
            <form enctype='multipart/from-data' action={`http://localhost:4000/addProduct?UserId=${UserId}`} method='post' id='addProduct' onSubmit={handleSubmit}>
            {
                <img
                  src={selectedImage}
                  alt="Selected"
                  style={{
                    width: "130px",
                    height: "130px",
                    borderRadius: "60px",
                    marginBottom: "30px",
                    marginRight: "30px",
                  }}
                />
              }
              <input type="file" name="img" onChange={handleImageChange}/>
              <MDBRow>
                <MDBCol lg='6' className="md-6">
                  <MDBInput wrapperClass='mb-4' label='Product Name' id='prodName' name='prodName' type='text' required/>
                </MDBCol>

                <MDBCol lg='6' className="md-6">
                  <MDBInput wrapperClass='mb-4' label='Product Price' min='150' id='ProdPrice' name='ProdPrice' type='number' required/>
                      
                </MDBCol>
              </MDBRow>

              <MDBRow>
                <MDBCol lg='6' className="md-6">
                  <MDBInput wrapperClass='mb-4' label='Product Quantity' id='ProdQuantity' min='1' name='ProdQuantity' type='number' required/>
                     
                </MDBCol>

                <MDBCol lg='6' className="md-6">
                  <MDBInput wrapperClass='mb-4' label='Threshold Quantity' id='ProdThreshold' min='1' name='ProdThreshold' type='number' required/>
                     
                </MDBCol>

              </MDBRow>
              <MDBRow>
              <MDBCol lg='12' className="md-6" >
              <select className="form-select" wrapperClass='mb-4' label='Product Category' id='prodCategory' name='prodCategory' required>
                      <option value="">Product Category</option>
                      <option value={"Health And Beauty"}>{'Health & Beauty'}</option>
                      <option value={"Men Fashion"}>{"Men's Fashion"}</option>
                      <option value={"Women Fashion"}>{"Women's Fashion"}</option>
                      <option value={"Mother And Baby"}>{'Mother & Baby'}</option>
                      <option value={"Groceries And Pets"}>{'Groceries & Pets'}</option>
                      <option value={"Sports And Outdoors"}>{'Sports & Outdoors'}</option>
                      <option value={"Electronic Devices"}>{'Electronic Devices'}</option>
                      <option value={"Electronic Accessories"}>{'Electronic Accessories'}</option>
                      <option value={"Home Appiliances"}>{'Home Appiliances'}</option>


                    </select>
                </MDBCol>
              </MDBRow>
              <MDBCol lg='12' className="md-6">

              <textarea
                class="form-control"
                id="prodDescription"
                name="prodDescription"
                placeholder='Product Description'
                rows="4"   
                required             
                style={{ backgroundColor: "white" ,marginTop:' 31px'}}></textarea>            
                </MDBCol>
                    <button style={{marginTop: "2%",width:"200px" ,padding: "0.25rem 0.5rem", fontSize: "1.0rem"}} type="submit" class="btn btn-primary btn-block mb-4" >Add Product</button>

              </form>

              </MDBCardBody>
          </MDBCard>

        </MDBCol>

      </MDBRow>
        
    </MDBContainer>
    <Footer/>
    </div>
    : <NotFoundPage />}
    </>
  );
}

export default AddProduct