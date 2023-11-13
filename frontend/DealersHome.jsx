

import React, { useState, useEffect } from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import DealerNavbar from "./DealerNavbar";
import Footer from './Footer';
import Chart from "react-apexcharts";
import NotFoundPage from './404';


export default function ViewRooms() {
  const [data, setData] = useState(0);
  const [data1, setData1] = useState(0);
  const [data2, setData2] = useState(0);
  const [data3, setData3] = useState(0);
  const [data4, setData4] = useState(0);
  const [data5, setData5] = useState(0);

  useEffect(() => {
    async function getData() {
      try {
        const userId = localStorage.getItem('UserId');
        const response = await fetch(`http://localhost:4000/dashboard/all?userId=${userId}`);
        const responseData = await response.json();
        console.log(responseData[0].Count);
        setData(responseData[0].Count);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getData();
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        const userId = localStorage.getItem('UserId');
        const response = await fetch(`http://localhost:4000/dashboard/active?userId=${userId}`);
        const responseData = await response.json();
        console.log(responseData[0].Count);
        setData1(responseData[0].Count);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getData();
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        const userId = localStorage.getItem('UserId');
        const response = await fetch(`http://localhost:4000/dashboard/inactive?userId=${userId}`);
        const responseData = await response.json();
        console.log(responseData[0].Count);
        setData2(responseData[0].Count);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getData();
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        const userId = localStorage.getItem('UserId');
        const response = await fetch(`http://localhost:4000/dashboard/threshold?userId=${userId}`);
        const responseData = await response.json();
        console.log(responseData[0].Count);
        setData3(responseData[0].Count);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getData();
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        const userId = localStorage.getItem('UserId');
        const response = await fetch(`http://localhost:4000/dashboard/buy?userId=${userId}`);
        const responseData = await response.json();
        console.log(responseData[0].Count);
        setData4(responseData[0].Count);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getData();
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        const userId = localStorage.getItem('UserId');
        const response = await fetch(`http://localhost:4000/dashboard/stock?userId=${userId}`);
        const responseData = await response.json();
        console.log(responseData[0].Count);
        setData5(responseData[0].Count);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getData();
  }, []);



  return (
    <>
     {localStorage.getItem('role') === '2' ?


    <div>
      <DealerNavbar />
      <br /><br /><br /><br /> <br />
      <center><h1 style={{ color: 'darkblue' }}> Dashboard</h1></center>
      <Barchart data={[data, data1, data2, data3, data4,data5]} />
      <Footer />
    </div>
                : <NotFoundPage />}
                </>
            
  );
}

function Barchart({ data }) {
  return (
    <React.Fragment>
      <div className="container-fluid mb-5" style={{paddingLeft:"5%",paddingRight:"5%"}}>
        <Chart
          type="bar"
          width="100%"
          height={500}
          series={[
            {
              name: "Data",
              data: data,
            },
          ]}
          options={{
            xaxis: {
              tickPlacement: "on",
              categories: [
                "Total Products",
                "Active Products",
                "Inactive Products",
                "Threshold Products",
                "Buy Products",
                "Total Stock",
              ],
              title: {
                text: "Product Statistics",
                style: { color: "#f90000", fontSize: 20 },
              },
            },
            yaxis: {
              labels: {
                formatter: (val) => {
                  return `${val}`;
                },
                style: { fontSize: "15", colors: ["#f90000"] },
              },
              title: {
                text: "Product Count",
                style: { color: "#f90000", fontSize: 15 },
              },
            },
            legend: {
              show: true,
              position: "right",
            },
            dataLabels: {
              formatter: (val) => {
                return `${val}`;
              },
              style: {
                colors: ["#f4f4f4"],
                fontSize: 15,
              },
            },
          }}
        ></Chart>
      </div>
    </React.Fragment>
    
  );
}





