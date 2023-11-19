// import {
//     MDBCard,
//     MDBCardBody,
//     MDBCardImage,
//     MDBContainer,
//     MDBRow, 
//     MDBCol, 
//     MDBRipple,
//     MDBTypography,
//     MDBInput 
//     } from "mdb-react-ui-kit";
// import CustomerNavbar from "./CustomerNavbar";
// import Footer from './Footer';
// import React, {useState, useEffect} from 'react'
// import axios from 'axios';
    
//     export default function Cart() {
//         const [data,setData]= useState([]);
//         const [quantity, setQuantity] = useState(1); 

//         useEffect(() => {
//           async function getData() {
//             try {
//               const userId = localStorage.getItem('UserId');
//               const response = await fetch(`http://localhost:4000/customerViewCart?UserId=${userId}`);
//               const responseData = await response.json();
//               setData(responseData);
//             } catch (error) {
//               console.error("Error fetching data:", error);
//             }
//           }
//           getData();
//         }, []);

//         const handleRemoveFromCart = async (ProductId) => {
//           try {
//             const isConfirmed = window.confirm("Are you sure you want to delete this product?");
//             const userId = localStorage.getItem('UserId');
//             if (isConfirmed) {
//               const response = await fetch(`http://localhost:4000/customerRemoveFromCart?productId=${ProductId}&userId=${userId}`, {
//                 method: 'DELETE',
//               });
        
//               if (response.ok) {
//                 // alert("Product Deleted Successfully");
//                 const updatedData = data.filter(item => item.ProductId !== ProductId);
//                 setData(updatedData);
//               } else {
//                 console.error('Error deleting Cart Item');
//                 alert("Error deleting Cart Item");
//               }
//             } else {
//               // If the user cancels, do nothing
//               console.log("Deletion canceled by the user");
//             }
//           } catch (error) {
//             console.error('Error deleting Product:', error);
//             alert("Error in deletion");
//           }
//         };  
//         const handleBuy = async (image, price, pId) => {
//           const UserId = localStorage.getItem('UserId');
//           const data = {
//             userId: UserId,
//             productId: pId,
//             // image: image,
//             price: price,
//             quantity: quantity, 
//           };
      
//           try {
//             const response = await axios.post(
//               "http://localhost:4000/buyProduct",
//               data,
//               {
//                 headers: {
//                   "Content-Type": "application/json",
//                 },
//               }
//             );
      
//             const responseData = response.data;
//             if (responseData.message === "outofstock") {
//               alert("Product is out of stock");
//             } else {
//               window.location.href = responseData.sessionUrl;
//             }
//           } catch (error) {
//             console.error("Error:", error.message);
//           }
//         };
      
//     return (
//         <div>
//             <CustomerNavbar/>
//             <br /><br /><br /> <br /><br />
// {/* 
//       <MDBContainer className="py-5 h-100" style={{marginLeft:"300px"}}>


//                     {data.map((item, index) => (
//   <MDBCard className="mb-3" key={index}>
//     <MDBCardBody>
//       <div className="d-flex justify-content-between">
//         <div className="d-flex flex-row align-items-center">
//           <div>
//             <MDBCardImage
//               src={`http://localhost:4000/images/${item.ProductPic}`}
//               fluid
//               className="rounded-3"
//               style={{ width: "65px" }}
//               alt={item.ProductName}
//             />
//           </div>
//           <div className="ms-3">
//             <MDBTypography tag="h5">{item.ProductName}</MDBTypography>
//             <p className="small mb-0">${item.ProductCategory}</p>
//           </div>
//         </div>
//         <div className="d-flex flex-row align-items-center">
//           <div style={{ width: "50px" }}>
//           <MDBInput type="number" min="0" defaultValue={1} size="sm" />
//           </div>
//           <div style={{ width: "80px" }}>
//             <MDBTypography tag="h5" className="mb-0">
//               ${item.ProductPrice}
//             </MDBTypography>
//           </div>
//           <button
//             // onClick={() => handleRemoveFromCart(item.ProductId)} // Implement your remove from cart logic
//             style={{ color: "#cecece", background: "none", border: "none" }}
//           >
//             <MDBIcon fas icon="trash-alt" />
//           </button>
//         </div>
//       </div>
//     </MDBCardBody>
//   </MDBCard>
// ))}
// </MDBContainer> */}

// <MDBContainer fluid>
//         <MDBRow className="justify-content-center mb-0">
//           {data.map((item, index) => (
//             <MDBCol md="12" xl="10" key={index}>
//               <MDBCard className="shadow-0 border rounded-3 mt-5 mb-3">
//                 <MDBCardBody>
//                   <MDBRow>
//                     <MDBCol md="12" lg="3" className="mb-4 mb-lg-0">
//                       <MDBRipple
//                         rippleColor="light"
//                         rippleTag="div"
//                         className="bg-image rounded hover-zoom hover-overlay"
//                       >
//                         <MDBCardImage
//                           src={`http://localhost:4000/images/${item.ProductPic}`}
//                           fluid
//                           className="w-100"
//                         />
//                       </MDBRipple>
//                     </MDBCol>
//                     <MDBCol md="6">
//                       <h3 style={{ color: 'blue' }}>{item.ProductName}</h3>
//                       <h4>{item.ProductCategory}</h4>
//                       <div className="d-flex flex-row align-items-center">
//                         <div style={{ width: "50px" }}>
//                           <MDBInput
//                             type="number"
//                             min="0"
//                             value={quantity} // Use quantity from state
//                             size="sm"
//                             onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
//                           />
//                         </div>
//                         <div style={{ width: "80px" }}>
//                           <MDBTypography tag="h5" className="mb-0">
//                             PKR {item.ProductPrice}
//                           </MDBTypography>
//                         </div>
//                       </div>
//                       <center>
//                         <p style={{ fontSize: '18px' }}>
//                           {item.ProductDescription}
//                         </p>
//                       </center>
//                     </MDBCol>
//                     <MDBCol md="6" lg="3" className="border-sm-start-none border-start">
//                       <div className="d-flex flex-row align-items-center mb-1">
//                         <h4 className="mb-1 me-1" style={{ color: 'blue' }}>
//                           Total: PKR {item.ProductPrice * quantity}
//                         </h4>
//                       </div>
//                       <div className="d-flex flex-column mt-4">
//                         <button
//                           type="button"
//                           size="sm"
//                           className="btn bg-primary btn-block mb-4 mt-20"
//                           onClick={() => handleBuy(item.ProductPic, item.ProductPrice, item.ProductId)}
//                           style={{ fontSize: '15px' }}
//                         >
//                           Buy Product
//                         </button>
//                         <button
//                           type="button"
//                           size="sm"
//                           className="btn bg-warning btn-block mb-4 mt-20"
//                           style={{ fontSize: '15px' }}
//                           onClick={() => handleRemoveFromCart(item.ProductId)}
//                         >
//                           Remove From Cart
//                         </button>
//                       </div>
//                     </MDBCol>
//                   </MDBRow>
//                 </MDBCardBody>
//               </MDBCard>
//             </MDBCol>
//           ))}
//         </MDBRow>
//       </MDBContainer>
//     <Footer/>
//         </div>
    
//     );
//     }


import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBRipple,
  MDBTypography,
  MDBInput,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";
import CustomerNavbar from "./CustomerNavbar";
import Footer from "./Footer";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Cart() {
  const [data, setData] = useState([]);
  const [quantities, setQuantities] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const userId = localStorage.getItem("UserId");
        const response = await fetch(
          `http://localhost:4000/customerViewCart?UserId=${userId}`
        );
        const responseData = await response.json();
        setData(responseData);
        // Initialize quantities array with default values
        setQuantities(responseData.map(() => 1));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getData();
  }, []);

  const handleRemoveFromCart = async (ProductId) => {
    try {
      const isConfirmed = window.confirm(
        "Are you sure you want to delete this product?"
      );
      const userId = localStorage.getItem("UserId");
      if (isConfirmed) {
        const response = await fetch(
          `http://localhost:4000/customerRemoveFromCart?productId=${ProductId}&userId=${userId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          const updatedData = data.filter(
            (item) => item.ProductId !== ProductId
          );
          const updatedQuantities = quantities.filter(
            (_, index) => index !== ProductId
          );
          setData(updatedData);
          setQuantities(updatedQuantities);
        } else {
          console.error("Error deleting Cart Item");
          alert("Error deleting Cart Item");
        }
      } else {
        console.log("Deletion canceled by the user");
      }
    } catch (error) {
      console.error("Error deleting Product:", error);
      alert("Error in deletion");
    }
  };

  const handleQuantityChange = (value, index) => {
    const newQuantities = [...quantities];
    newQuantities[index] = parseInt(value, 10);
    setQuantities(newQuantities);
  };

  // const handleBuy = async (image, price, pId, index) => {
  //   const UserId = localStorage.getItem("UserId");
  //   const data = {
  //     userId: UserId,
  //     productId: pId,
  //     price: price,
  //     quantity: quantities[index],
  //   };

  //   try {
  //     const response = await axios.post(
  //       "http://localhost:4000/buyProduct",
  //       data,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     const responseData = response.data;
  //     if (responseData.message === "outofstock") {
  //       alert("Product is out of stock");
  //     } else {
  //       window.location.href = responseData.sessionUrl;
  //     }
  //   } catch (error) {
  //     console.error("Error:", error.message);
  //   }
  // };
  const handleBuy = async (image, price, pId, index) => {
    const UserId = localStorage.getItem("UserId");
    const requestData = {
      userId: UserId,
      productId: pId,
      price: price,
      quantity: quantities[index],
    };
  
    try {
      const response = await axios.post(
        "http://localhost:4000/buyProduct",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      const responseData = response.data;
      if (responseData.message === "outofstock") {
        alert("Product is out of stock");
      } else {
        window.location.href = responseData.sessionUrl;
        // await axios.delete(
        //   `http://localhost:4000/customerRemoveFromCart?productId=${pId}&userId=${UserId}`,
        //   {
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //   }
        // );
  
        // Redirect to the payment page
        // window.location.href = responseData.sessionUrl;
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  

  return (
    <div>
      <CustomerNavbar />
      <br /><br /><br /> <br /><br />
      <MDBContainer fluid>
        <MDBRow className="justify-content-center mb-0">
          {data.map((item, index) => (
            <MDBCol md="12" xl="10" key={index}>
              <MDBCard className="shadow-0 border rounded-3 mt-5 mb-3">
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol md="12" lg="3" className="mb-4 mb-lg-0">
                      <MDBRipple
                        rippleColor="light"
                        rippleTag="div"
                        className="bg-image rounded hover-zoom hover-overlay"
                      >
                        <MDBCardImage
                          src={`http://localhost:4000/images/${item.ProductPic}`}
                          fluid
                          className="w-100"
                          style={{ maxHeight: "20rem", objectFit: "fit" }}
                        />
                      </MDBRipple>
                    </MDBCol>
                    <MDBCol md="12" lg="6">
                      <h3 style={{ color: "blue" }}>{item.ProductName}</h3>
                      <h4>{item.ProductCategory}</h4>
                      <div className="d-flex flex-row align-items-center">
                        {/* <div style={{ width: "100px" }}>
                          <MDBInput
                            type="number"
                            min="1"
                            value={quantities[index]}
                            size="sm"
                            onChange={(e) =>
                              handleQuantityChange(e.target.value, index)
                            }
                          />
                        </div> */}
                      </div>
                      <center>
                        <p style={{ fontSize: "18px" }}>
                          {item.ProductDescription}
                        </p>
                      </center>
                    </MDBCol>
                    <MDBCol
                      md="6"
                      lg="3"
                      className="border-sm-start-none border-start"
                    >
                      <div className="d-flex flex-row align-items-center mb-1">
                        <center>
                        <h4 className="mb-1 me-1" style={{paddingLeft:'50px'}}>
                          Total: PKR {item.ProductPrice * quantities[index]}
                        </h4>
                        </center>

                      </div>
                      <div className="d-flex flex-column mt-4">
                      <div className="d-flex flex-row align-items-center">
                  

                      <div style={{ width: "300px" }}>
                          <MDBInput
                            type="number"
                            label="Quantity"
                            min="1"
                            value={quantities[index]}
                            size="sm"
                            onChange={(e) =>
                              handleQuantityChange(e.target.value, index)
                            }
                          />
                        </div>
                  <div >
                          <MDBTypography tag="h6" className="mb-0">
                            PKR {item.ProductPrice}
                          </MDBTypography>
                        </div>
                  </div>
                        <button
                          type="button"
                          size="sm"
                          className="btn bg-primary btn-block mb-1 mt-20"
                          onClick={() =>
                            handleBuy(
                              item.ProductPic,
                              item.ProductPrice,
                              item.ProductId,
                              index
                            )
                          }
                          style={{ fontSize: "15px" }}
                        >
                          Buy Product
                        </button>
                        <button
                          type="button"
                          size="sm"
                          className="btn bg-warning btn-block mb-4 mt-20"
                          style={{ fontSize: "15px" }}
                          onClick={() => handleRemoveFromCart(item.ProductId)}
                        >
                          Remove From Cart
                        </button>
                      </div>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          ))}
        </MDBRow>
      </MDBContainer>
      <Footer />
    </div>
  );
}
