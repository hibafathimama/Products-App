import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import './about.css';

function About() {

    // const navigate = useNavigate();
    // const { user } = useAuth();

    // useEffect(() => {
    //     if (!user) {
    //         navigate("/Login");
    //     }
    // }, [user, navigate]);

  
  return (
    <>
      <Navbar />

      {/* <section className="about-hero">
        <div className="about-content">
          <p className="about-small-title">WELCOME TO OUR STORE</p>

          <h1 className="welcome">
            Quality Products.<br />
            Affordable Prices.
          </h1>

          <p className="provide">
            We provide quality products at affordable prices,
            making online shopping simple and reliable.
          </p>
        </div>
      </section> */}

      <section className="mission-section">

        <p className="section-label">OUR MISSION</p>

        <h2 className="mission-title">
          Shopping Made Simple
        </h2>

        <p className="quality">
          Quality • Affordable • Reliable
        </p>

        <p className="mission-text">
          Our mission is to provide customers with quality products
          at prices they can afford. We focus on making your shopping
          experience simple, convenient, and trustworthy.
        </p>

      </section>

      <section className="why-section">

        <p className="section-label">WHY CHOOSE US?</p>

        <div className="about-cards">

          <div className="about-card">
            <div className="card-icon">✓</div>
            <h3>Quality</h3>
            <p>
              We focus on providing products that meet
              high-quality standards.
            </p>
          </div>

          <div className="about-card">
            <div className="card-icon">₹</div>
            <h3>Affordable</h3>
            <p>
              Get great products at prices that fit
              your budget.
            </p>
          </div>

          <div className="about-card">
            <div className="card-icon">★</div>
            <h3>Reliable</h3>
            <p>
              We aim to provide a smooth and trustworthy
              shopping experience.
            </p>
          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default About;