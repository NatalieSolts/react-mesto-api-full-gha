import React from "react";

function Footer() {
  const currentYear = new Date();

  return (
    <footer className="footer">
      <p className="footer__text">{`© ${currentYear.getFullYear()} Mesto Russia`}</p>
    </footer>
  );
}

export default Footer;
