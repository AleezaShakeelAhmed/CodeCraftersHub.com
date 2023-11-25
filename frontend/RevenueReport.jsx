// import "jspdf-autotable";
// import React, { useEffect, useState } from "react";
// import { Button, FormControl, InputGroup } from "react-bootstrap";
// import  DealerNavbar from './DealerNavbar';
// import Footer from './Footer';

// const DealerReports = () => {

//   const [Product, setProduct] = useState([]);
//   const [Title, setTitle] = useState(false);

//   async function fetchData() {
//     setProduct([]);
//     if(document.getElementById("selectedItem").value === "Revenue Report"){
//       try {
//         const response =await fetch(`http://localhost:4000//viewRevenue?userId=${localStorage.getItem('UserId')}`);
//         const data =await response.json();
//         setProduct(data);
//         setTitle(true)
//         console.log(data)
//       } catch (error) {
//       console.error(error);
//       }
//     }

//   }

//       const [selectedItem, setSelectedItem] = useState("Select an item"); 

//   return (
//     <div>
//       <DealerNavbar/>
//       <br/><br/><br/><br/><br/>

//       <div style={{ width: "100%", display: "flex" }}>
//       <div style={{ width: "10%" }}></div>
//         <div style={{ width: "80%" }}>

//           {/* <Adminnavbar /> */}
//           <div style={{ margin: "35px" }}>
//             <h3 style={{ marginTop: "25px",color:'' }}>Revenue Reports</h3>
//             <div style={{ marginTop: "25px" }}>
//               <InputGroup>
//                 <FormControl
//                   as="select"
//                   value={selectedItem}
//                   id="selectedItem"
//                 >
//                   <option>Select an item</option>
//                   <option>Revenue Report</option>
//                 </FormControl>
//               </InputGroup>

//               <br/><br/>
//               <Button variant="primary" className="mt-3" onClick={()=>{fetchData();}}>
//                 Generate Report
//               </Button>
//             </div>
            
//           </div>
//         </div>
//       </div>
//       <div style={{ width: "10%" }}></div>

//       <Footer/>
//     </div>
//   )
// }

// export default DealerReports;



import "jspdf-autotable";
import React, { useEffect, useState } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import DealerNavbar from './DealerNavbar';
import Footer from './Footer';
import jsPDF from 'jspdf';
import NotFoundPage from "./404";

const DealerReports = () => {
  const [Product, setProduct] = useState([]);
  const [Title, setTitle] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Select an item");

  async function fetchData() {
    setProduct([]);
    const selectedValue = document.getElementById("selectedItem").value;
      try {
        const response = await fetch(`http://localhost:4000/viewRevenue?userId=${localStorage.getItem('UserId')}`);
        const data = await response.json();
        setProduct(data);
        setTitle(true);
        console.log(data);
        generatePDF(data);
      } catch (error) {
        console.error(error);
      }
    setSelectedItem(selectedValue);
  }

  // const generatePDF = (data) => {
  //   const doc = new jsPDF();
  //   doc.text("Revenue Report", 15, 15);
  //   doc.autoTable({
  //     head: [['Name', 'Date', 'Unit Price', 'Buyer', 'Buy Quantity', 'Revenue']],
  //     body: data.map(row => [row.ProductName, row.DateCreated, row.ProductPrice, row.FirstName + ' ' + row.LastName, row.Quantity, row.TotalPrice]),
  //     startY: 20,
  //   });
  //   doc.save('revenue_report.pdf');
  // };

  const generatePDF = (data) => {
    const doc = new jsPDF();
    const reportTitle = "Revenue Report";
    const columns = ['Name', 'Date', 'Unit Price', 'Buyer', 'Buy Quantity', 'Revenue'];
  
    // Set title in the center
    const titleWidth = doc.getStringUnitWidth(reportTitle) * doc.internal.getFontSize() / 2;
    const pageWidth = doc.internal.pageSize.width;
    const x = (pageWidth - titleWidth) / 2;
    doc.text(reportTitle, x, 15);
  
    // Generate autoTable
    doc.autoTable({
      head: [columns],
      body: data.map(row => [row.ProductName, row.DateCreated, row.ProductPrice, row.FirstName + ' ' + row.LastName, row.Quantity, row.TotalPrice]),
      startY: 25, // Adjusted startY to leave space for the title
    });
  
    // Calculate total and display in the last row
    const total = data.reduce((acc, row) => acc + row.TotalPrice, 0);
    const lastRow = [null, null, null, null, 'Total:', total.toFixed(2)]; // Assuming TotalPrice is a float
  
    doc.autoTable({
      body: [lastRow],
      startY: doc.autoTable.previous.finalY + 10, // Adjusted startY to leave space after the table
    });
  
    doc.save('revenue_report.pdf');
  };
  

  return (
    <>
    {localStorage.getItem('role') === '2' ?
    <div>
      <DealerNavbar />
      <br/><br/><br/><br/><br/>

      <div style={{ width: "100%", display: "flex" }}>
        <div style={{ width: "10%" }}></div>
        <div style={{ width: "80%" }}>
          <div style={{ margin: "35px" }}>
            <h3 style={{ marginTop: "25px", color: '' }}>Revenue Reports</h3>
            <div style={{ marginTop: "25px" }}>
              <InputGroup>
                <FormControl
                  as="select"
                  value={selectedItem}
                  id="selectedItem"
                >
                  <option>Revenue Report</option>
                </FormControl>
              </InputGroup>

              <br/><br/>
              <Button variant="primary" className="mt-3" onClick={() => fetchData()}>
                Generate Report
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div style={{ width: "10%" }}></div>

      <Footer/>
    </div>
            : <NotFoundPage />}
            </>
  );
}

export default DealerReports;

