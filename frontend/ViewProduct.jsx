import { MDBSwitch, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import DealerNavbar from "./DealerNavbar";
import Footer from './Footer';
import React, { useState, useEffect } from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
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

  const [productData, setProductData] = useState({
    ProductName: '',
    ProductPic: '',
    ProductPrice: 0,
    ProductQuantity: 0,
    ThresholdQuantity: 0,
    ProductCategory: '',
    ProductDescription: '',
    img: null,
  });

  useEffect(() => {
    async function getData() {
      try {
        const userId = localStorage.getItem('UserId');
        const response = await fetch(`http://localhost:4000/viewProduct/all?userId=${userId}`);
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

  useEffect(() => {
    async function fetchProductData() {
      try {
        const response = await fetch(`http://localhost:4000/viewProduct/specific?productid=${selectedProductId}`);
        const responseData = await response.json();
        const productObject = responseData[0];
        setProductData(productObject);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    }

    if (selectedProductId) {
      fetchProductData();
    }
  }, [selectedProductId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setProductData({ ...productData, img: file });
  };

  const handleProductUpdate = (updatedProductData) => {
    const updatedData = data.map(item => {
      if (item.ProductId === updatedProductData.ProductId) {
        return updatedProductData;
      }
      return item;
    });

    setData(updatedData);
  };

  const handleUpdateProduct = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('ProductName', productData.ProductName);
      formData.append('ProductPrice', productData.ProductPrice);
      formData.append('ProductQuantity', productData.ProductQuantity);
      formData.append('ThresholdQuantity', productData.ThresholdQuantity);
      formData.append('ProductCategory', productData.ProductCategory);
      formData.append('ProductDescription', productData.ProductDescription);
      formData.append('img', productData.img);
      
      const response = await fetch(`http://localhost:4000/updateproduct?productid=${selectedProductId}&userId=${localStorage.getItem('UserId')}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        // Fetch the updated product data immediately after the update
        const updatedResponse = await fetch(`http://localhost:4000/viewProduct/specific?productid=${selectedProductId}`);
        const updatedProductData = await updatedResponse.json();
        handleProductUpdate(updatedProductData[0]);
        
        alert('Product Updated Successfully');
        closeModal();
      } else {
        console.error('Error updating product');
        alert('Error in Update');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Error in Update');
    }
  };

  const handleSwitchChange = async (productId, newStatus) => {
    try {
      if (newStatus === 1) {
        newStatus = 0;
      } else if (newStatus === 0) {
        newStatus = 1;
      }
      const response = await fetch(`http://localhost:4000/updateStatus?productId=${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        const updatedData = data.map(item => {
          if (item.ProductId === productId) {
            return { ...item, Active: newStatus };
          }
          return item;
        });

        setData(updatedData);
      } else {
        console.error('Error updating product status');
      }
    } catch (error) {
      console.error('Error updating product status:', error);
    }
  };

  // const handleDelete = async (ProductId) => {
  //   try {
  //     const response = await fetch(`http://localhost:4000/deleteProduct?productId=${ProductId}`, {
  //       method: 'DELETE',
  //     });

  //     if (response.ok) {
  //       alert("Product Deleted Successfully");
  //       const updatedData = data.filter(item => item.ProductId !== ProductId);
  //       setData(updatedData);
  //     } else {
  //       console.error('Error deleting Product');
  //       alert("Error in Deletion");
  //     }
  //   } catch (error) {
  //     console.error('Error deleting Product:', error);
  //     alert("Error in deletion");
  //   }
  // };

  const handleDelete = async (ProductId) => {
    try {
      const isConfirmed = window.confirm("Are you sure you want to delete this product?");
  
      if (isConfirmed) {
        const response = await fetch(`http://localhost:4000/deleteProduct?productId=${ProductId}&userId=${localStorage.getItem('UserId')}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          // alert("Product Deleted Successfully");
          const updatedData = data.filter(item => item.ProductId !== ProductId);
          setData(updatedData);
        } else {
          console.error('Error deleting Product');
          alert("Error in Deletion");
        }
      } else {
        // If the user cancels, do nothing
        console.log("Deletion canceled by the user");
      }
    } catch (error) {
      console.error('Error deleting Product:', error);
      alert("Error in deletion");
    }
  };
  

  const handleUpdateClick = (ProductId) => {
    setSelectedProductId(ProductId);
    setShowUpdateModal(true);
  };

  // const handleProductUpdate = (updatedProductData) => {
  //   const updatedData = data.map(item => {
  //     if (item.ProductId === updatedProductData.ProductId) {
  //       return updatedProductData;
  //     }
  //     return item;
  //   });

  //   setData(updatedData);
  // };

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
              <th scope='col'>Product</th>
              <th scope='col'>Price</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Category</th>
              <th scope='col'>Description</th>
              <th scope='col'>Status</th>
              <th scope='col'>Action</th>
              <th scope='col'>Update</th>
              <th scope='col'>Delete</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {data.map((item, index) => (
              <tr key={item.ProductId} >
                <td>
                  <div className='d-flex align-items-center'>
                    <img
                      src={`http://localhost:4000/images/${item.ProductPic}`}
                      alt=''
                      style={{ width: '100px', height: '100px' }}
                      className='rounded-circle'
                    />
                    <div className='ms-3'>
                      <p className='fw-bold mb-1' style={{ paddingLeft: '30px' }}>{item.ProductName}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <p className='fw-normal mb-1'>{item.ProductPrice}</p>
                </td>
                <td>
                  <p className='fw-normal mb-1'>{item.ProductQuantity}</p>
                </td>
                <td>
                  <p className='fw-normal mb-1'>{item.ProductCategory}</p>
                </td>
                <td>
                  <p className='fw-normal mb-1'>{item.ProductDescription}</p>
                </td>
                <td>
                  <p className={`fw-normal mb-1 ${item.Active === 1 ? 'text-success' : 'text-danger'}`}>
                    {item.Active === 1 ? 'Active' : 'Inactive'}
                  </p>
                </td>
                <td>
                  <MDBSwitch
                    defaultChecked={item.Active === 1}
                    id={`flexSwitchCheckChecked-${item.ProductId}`}
                    onChange={() => handleSwitchChange(item.ProductId, item.Active)} />
                </td>
                <td>
                  <button type="button" className="btn btn-success" onClick={() => handleUpdateClick(item.ProductId)}>
                    Update
                  </button>
                </td>
                <td>
                  <button type="button" className="btn btn-warning" onClick={() => handleDelete(item.ProductId)}>
                    Delete
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
              <MDBModalTitle>Update Product</MDBModalTitle>
              <button className="btn-close" color="none" onClick={closeModal}></button>
            </MDBModalHeader>
            <MDBModalBody>
              <MDBRow className="d-flex justify-content-center align-items-center h-100">
                <MDBCol col="12" className="m-5">
                  <MDBCard className="card-registration card-registration-2" style={{ borderRadius: '15px' }}>
                    <form onSubmit={handleUpdateProduct} encType='multipart/form-data'>
                      <MDBCardBody className="p-0">
                        <MDBRow>
                          <MDBCol md="6" className="p-5 bg-white">
                            <MDBInput
                              wrapperClass="mb-4"
                              label="Product Name"
                              size="lg"
                              id="ProductName"
                              type="text"
                              name="ProductName"
                              value={productData.ProductName}
                              onChange={handleInputChange}
                            />

                            <MDBInput
                              wrapperClass="mb-4"
                              label=""
                              size="lg"
                              id="form1"
                              type="file"
                              name="img"
                              onChange={handleFileChange}
                            />
                            <MDBInput
                              wrapperClass="mb-4"
                              label="Product Price"
                              size="lg"
                              id="form2"
                              type="number"
                              name="ProductPrice"
                              value={productData.ProductPrice}
                              onChange={handleInputChange}
                            />
                            <MDBInput
                              wrapperClass="mb-4"
                              label="Product Quantity"
                              size="lg"
                              id="form3"
                              type="number"
                              name="ProductQuantity"
                              value={productData.ProductQuantity}
                              onChange={handleInputChange}
                            />
                          </MDBCol>

                          <MDBCol md="6" className="bg-indigo p-5">
                            <MDBInput
                              wrapperClass="mb-4"
                              label="Product Threshold"
                              size="lg"
                              id="form4"
                              type="number"
                              name="ThresholdQuantity"
                              value={productData.ThresholdQuantity}
                              onChange={handleInputChange}
                            />
                            <select
                              className="form-select"
                              wrapperClass='mb-4'
                              label='Product Category'
                              id='prodCategory'
                              name='ProductCategory'
                              value={productData.ProductCategory}
                              onChange={handleInputChange}>
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
                            <textarea
                              className="form-control"
                              id="prodDescription"
                              name="ProductDescription"
                              placeholder='Product Description'
                              rows="4"
                              style={{ backgroundColor: "white", marginTop: ' 31px' }}
                              value={productData.ProductDescription}
                              onChange={handleInputChange}
                            ></textarea>
                          </MDBCol>
                        </MDBRow>
                      </MDBCardBody>
                      <MDBModalFooter>
                        <button className="btn btn-danger" type="button" onClick={closeModal}>
                          Close
                        </button>
                        <button className="btn btn-success" type="submit" onClick={handleUpdateProduct}>
                          Update
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
