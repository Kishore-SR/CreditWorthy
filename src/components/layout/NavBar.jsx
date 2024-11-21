import "remixicon/fonts/remixicon.css";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import "./NavBar.css";

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const drawerRef = useRef(null);
  const linksRef = useRef([]);
  const animationRef = useRef(null);

  const toggleNavbar = () => {
    if (mobileDrawerOpen) {
      // Animate closing
      const timeline = gsap.timeline({
        onComplete: () => setMobileDrawerOpen(false),
      });
      timeline.to(drawerRef.current, {
        y: "-100%",
        opacity: 1,
        duration: 0.5,
        ease: "power2.in",
      });
    } else {
      setMobileDrawerOpen(true);
    }
  };

  useEffect(() => {
    if (mobileDrawerOpen) {
      const ctx = gsap.context(() => {
        const timeline = gsap.timeline();

        // Animating nav bar background
        timeline.fromTo(
          drawerRef.current,
          { y: "-100%", opacity: 0 },
          { y: "0%", opacity: 1, duration: 0.5, ease: "power2.out" }
        );

        // Animating each nav links <li>
        timeline.fromTo(
          linksRef.current,
          { y: -20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.3,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.2" // animation slight delay for nav links
        );
      });

      animationRef.current = ctx;
    } else if (animationRef.current) {
      animationRef.current.revert();
    }

    return () => animationRef.current?.revert();
  }, [mobileDrawerOpen]);

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <div className="text-container">
          <a href="/"><h1 className="logo-text"> 
              Credit<i class="ri-money-rupee-circle-fill"></i>Worthy
            </h1></a>
          </div>
          <ul className="nav-items">
          <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/Services">Services</a>
            </li>
            <li>
              <a href="/HowItWorks">How It Works</a>
            </li>
            <li>
              <a href="/Contact">Contact</a>
            </li>
          </ul>
          <div className="auth-buttons">
            <a href="/Login" className="navbtn navbtn-border">
              Login
            </a>
            <a href="/Register" className="navbtn navbtn-gradient">
              Create Account
            </a>
          </div>
          <div className="mobile-menu">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? (
                <i className="ri-close-large-fill"></i>
              ) : (
                <i className="ri-menu-3-fill"></i>
              )}
            </button>
          </div>
        </div>
        {mobileDrawerOpen && (
          <div className="mobile-drawer" ref={drawerRef}>
            <ul>
              {[
                { text: "Home", icon: "ri-home-smile-line", href: "/" },
                {
                  text: "Services",
                  icon: "ri-shield-flash-line",
                  href: "/Services",
                },
                {
                  text: "How It Works",
                  icon: "ri-user-star-line",
                  href: "/HowItWorks",
                },
                { text: "Contact", icon: "ri-mail-ai-line", href: "/Contact" },
              ].map((item, index) => (
                <li
                  key={item.text}
                  ref={(el) => (linksRef.current[index] = el)}
                >
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : "_self"}
                  >
                    <i className={item.icon}></i> {item.text}
                  </a>
                </li>
              ))}
            </ul>
            <div className="drawer-buttons">
              <a href="/Login" className="navbtn navbtn-border">
                Login
              </a>
              <a href="/Register" className="navbtn navbtn-gradient">
                Create Account
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
