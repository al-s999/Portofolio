import React from "react";

function Resume() {
    return (
        <section className="Contact" id="Contact">
            <div className="content">
                <div className="contact_title" data-aos="fade-up" data-aos-duration="1500">
                    <span>Contact Me</span>
                </div>
                <div className="text">
                    <div className="topic"  data-aos="fade-right" data-aos-duration="1500" data-aos-delay="200">Have Any Project</div>
                    <div className="con">
                        <ul>
                            <a href=""><li><i className="fab fa-whatsapp whatsapp-icon"></i><p>+6288292081326</p></li></a>
                            <a href=""><li><i className="fab fa-instagram instagram-icon"></i><p>Zarsyd.Al</p></li></a>
                            <a href=""><li><i className="fas fa-envelope email-icon"></i><p>ahmadrosyidalfualdi@gmail.com</p></li></a>
                        </ul>
                    <div className="button" data-aos="zoom-in" data-aos-duration="1500" data-aos-delay="400">
                        <a href="https://api.whatsapp.com/send/?phone=6288292081326&text&type=phone_number&app_absent=0" target="_blank"><button>Let's Chat</button></a>
                    </div>
                    </div>
                </div>
            </div>    
        </section>
    )
}

export default Resume;
