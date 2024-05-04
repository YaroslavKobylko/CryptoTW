import React from 'react';
import './Footer.css'

const Footer = () => {
  return (
    <footer>
      <div className='footer'>
        <div className='footer-text'>
            <p>© 2024 Ukraine, Lviv. All rights reserved</p>
        </div>
        <div className='footer-links'>
        <p>Contact us</p>
          <a href="#"><img src="/svg/links/instagram.svg" alt="instagram" /></a>
          <a href="#"><img src="/svg/links/github.svg" alt="git hub" /></a>
          <a href="#"><img src="/svg/links/telegram.svg" alt="telegram" /></a>
          <a href="#"><img src="/svg/links/linkedin.svg" alt="linkedin" /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;