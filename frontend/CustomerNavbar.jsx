import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from 'mdb-react-ui-kit';
import Cookies from 'js-cookie';

export default function DealerNavbar() {
  const [showNavColorSecond, setShowNavColorSecond] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setUsers(localStorage.getItem('UserId'));
    }

    fetchData();
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div style={{ backgroundColor: 'darkblue', color: 'white', padding: '10px', paddingTop: '3px', position: 'fixed', width: '100%', zIndex: '1000' }}>
        <h3 style={{ fontSize: '20px' }}>Welcome to Shop Ease</h3>
      </div>
      <MDBNavbar expand="lg" bgColor="light" style={{ position: 'fixed', width: '100%', zIndex: '999', padding: '30px', backgroundColor: 'rgb(46, 46, 87)', marginTop: '45px' }}>
        <MDBContainer fluid>
          <MDBNavbarToggler
            type="button"
            data-target="#navbarColor02"
            aria-controls="navbarColor02"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setShowNavColorSecond(!showNavColorSecond)}
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>
          <MDBCollapse show={showNavColorSecond} navbar id="navbarColor02">
            <MDBNavbarNav className="me-auto mb-2 mb-lg-0">
              <MDBNavbarItem>
                <MDBNavbarLink tag={Link} to="/Customer/CustomerViewProduct" >
                  Home
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink tag={Link} to="/Customer/AddCart" >
                  Cart 
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink tag={Link} to="/Customer/BuyProduct" >
                  Buy Products
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBDropdown>
                  <MDBDropdownToggle tag="a" className="nav-link" role="button">
                  Log Out
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdownItem link 
                    onClick={()=>{
                      if(window.confirm("Are you sure you want to logout?")){
                        Cookies.remove("token");
                        window.location.href="/";
                      }
                    }}
                    style={{textDecoration:"None"}}>
                      Log Out
                    </MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </div>
  );
}
