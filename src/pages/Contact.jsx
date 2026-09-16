import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import '../styles/contact.css';


function Contact() {


    return (
        <>
            <Navbar />

            <section className="contact-page">

                <div className="contact-header">
                    <p>GET IN TOUCH</p>
                    <h1>Contact Us</h1>
                    <h6>
                        Have a question or need help? We'd love to hear from you.
                    </h6>
                </div>

                <div className="contact-container">

                    <div className="contact-info">

                        <h2>Let's Talk</h2>

                        <p>
                            Feel free to contact us for any questions,
                            suggestions, or support.
                        </p>

                        <div className="contact-item">
                            <span>📧</span>
                            <div>
                                <h4>Email</h4>
                                <p>support@yourstore.com</p>
                            </div>
                        </div>

                        <div className="contact-item">
                            <span>📞</span>
                            <div>
                                <h4>Phone</h4>
                                <p>+91 98765 43210</p>
                            </div>
                        </div>

                        <div className="contact-item">
                            <span>📍</span>
                            <div>
                                <h4>Address</h4>
                                <p>Kerala, India</p>
                            </div>
                        </div>

                    </div>


                    <div className="contact-form">

                        <h2>Send Us a Message</h2>

                        <form>

                            <div className="input-group">
                                <label>Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                />
                            </div>

                            <div className="input-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                />
                            </div>

                            <div className="input-group">
                                <label>Subject</label>
                                <input
                                    type="text"
                                    placeholder="Enter subject"
                                />
                            </div>

                            <div className="input-group">
                                <label>Message</label>
                                <textarea
                                    placeholder="Write your message..."
                                    rows="5"
                                ></textarea>
                            </div>

                            <button type="submit" className="contact-btn">
                                Send Message
                            </button>

                        </form>

                    </div>

                </div>

            </section>

            <Footer />
        </>
    );
}

export default Contact;