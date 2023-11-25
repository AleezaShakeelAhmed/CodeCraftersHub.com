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
        const response = await fetch(`http://localhost:4000/viewRevenue?userId=${userId}`);
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
              <th scope='col'>Date</th>
              <th scope='col'>Unit Price</th>
              <th scope='col'>Buy Quantity</th>
              <th scope='col'>Buyer</th>
              <th scope='col'>Revenue</th>

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
                  <p className='fw-normal mb-1'>{item.DateCreated}</p>
                </td>
                <td>
                  <p className='fw-normal mb-1'>{item.ProductPrice}</p>
                </td>
                <td>
                  <p className='fw-normal mb-1'>{item.FirstName +''+ item.LastName}</p>
                </td>
                <td>
                  <p className='fw-normal mb-1'>{item.Quantity}</p>
                </td>

                <td>
                  <p className='fw-normal mb-1'>{item.TotalPrice}</p>
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
