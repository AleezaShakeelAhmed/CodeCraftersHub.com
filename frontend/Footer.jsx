import React from 'react';
import { FaFacebookF, FaInstagram,  FaTwitter, FaGooglePlus, FaLinkedin } from 'react-icons/fa';

const Footer = () => {

  return (
    <footer>
        <div class="container">
            <div class="row">
            <div class="col-md-6 col-sm-6">
                <div class="widget">
                <div class="logo"><img src="https://i.pinimg.com/564x/15/96/e3/1596e3b738d6e32dbd700844ed062488.jpg" alt="" width="100" height="100" /></div>
                <p  >
          Shopease is your go-to e-commerce website for a streamlined and hassle-free shopping experience. Our platform offers a diverse range of products, from fashion to electronics, all in one place. With a user-friendly interface and a focus on user satisfaction, we make it easy for you to discover, compare, and purchase your desired items.

                </p>
             </div>
            </div>

            <div class="col-md-6 col-sm-6">
                <div class="widget my-quicklinks">
                <h5>Shop Ease System</h5>
                <ul>
                    <li><a href="/DealerHome" class="white-link" style={{textDecoration:"None"}}>Home</a></li>
                    <li><a href="AddProduct" class="white-link" style={{textDecoration:"None"}}>Add Products</a></li>
                    <li><a href="ViewProduct" class="white-link" style={{textDecoration:"None"}}>Manage Products</a></li>
                    <li><a href="/Re" class="white-link" style={{textDecoration:"None"}}>Reports</a></li>
                </ul>
                </div>
            </div>



                </div>
                </div>
        </footer>
  );
};

export default Footer;