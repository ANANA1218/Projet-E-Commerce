import React, { useEffect, useState } from "react";

function Footer() {

  const [footerPosition, setFooterPosition] = useState("fixed");

  useEffect(() => {
    const handleScroll = () => {
      const isScrollable =
        document.body.scrollHeight > window.innerHeight;
      const isContentEnough =
        window.innerHeight >= document.body.scrollHeight;

      if (isScrollable || isContentEnough) {
        setFooterPosition("static");
      } else {
        setFooterPosition("fixed");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer
      className="mt-auto py-5 bg-dark"
      style={{
        bottom: 0,
        width: "100%",
        position: footerPosition,
      }}
    >
      <div className="container d-flex justify-content-center">
        <span className="text-muted">Copyright &copy; Website 2023</span>
      </div>
    </footer>
  );

}

export default Footer;
