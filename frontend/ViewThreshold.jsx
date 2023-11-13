import {MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import DealerNavbar from "./DealerNavbar";
import Footer from './Footer';
import React, { useState, useEffect } from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import NotFoundPage from './404';

export default function ViewThreshold() {
  const [data, setData] = useState([]);



  useEffect(() => {
    async function getData() {
      try {
        const userId = localStorage.getItem('UserId');
        const response = await fetch(`http://localhost:4000/viewThreshold?userId=${userId}`);
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getData();
  }, []);







  if (data.length === 0) {
    return <div style={{ paddingTop: '300px' }}><center>Loading..................</center></div>;
  }

  return (
    <>
    {localStorage.getItem('role') === '2' ?
    <div>
      <DealerNavbar />
      <div style={{ overflowX: 'auto' }}>
        <MDBTable align='middle' style={{ marginTop: '150px'}}>
          <MDBTableHead>
            <tr style={{ color: 'darkblue', fontWeight: 'bold' }}>
             <th scope='col' style={{ paddingRight: '30px' }}>Image</th>
              <th scope='col'>Product</th>
              <th scope='col'>Price</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Category</th>
              <th scope='col'>Description</th>
              <th scope='col' style={{ paddingRight: '30px' }}>Status</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {data.map((item, index) => (
              <tr key={item.ProductId} >
                <td>
                    <img
                      src={`http://localhost:4000/images/${item.ProductPic}`}
                      alt=''
                      style={{ width: '150px', height: '150px' }}
                      className='rounded-circle'
                    />
                </td>
                <td>
                <p className='fw-bold mb-1' style={{ paddingLeft: '30px' }}>{item.ProductName}</p>
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
                  <p className={`fw-normal mb-1 ${item.Active === 1 ? 'text-success' : 'text-danger'}`} style={{ paddingRight: '30px' }}>
                    {item.Active === 1 ? 'Active' : 'Inactive'}
                  </p>
                </td>



              </tr>
            ))}
          </MDBTableBody>
          <p style={{ marginTop: '70px' }}></p>
        </MDBTable>
      </div>
      <Footer />
    </div>
        : <NotFoundPage />}
        </>
  );
}
