import React from "react";
import oilImg from "../assets/images/oil.jpg";
import dalImg from "../assets/images/dal.jpg";
import riceImg from "../assets/images/rice.jpeg";
import snacksImg from "../assets/images/snacks.jpg";
import martHome from "../assets/images/mart-home.png";
import { FaEnvelope, FaLocationArrow, FaPhone } from "react-icons/fa";
import { NavLink } from "react-router-dom";
const Index = () => {
  return (
    <>
      <div className="home-page-container">
        <img
          src={martHome}
          alt="home"
          style={{ width: "100%", height: "500px", objectFit: "contain" }}
        ></img>
        <h1 style={{ marginTop: "20px", fontSize: "70px", fontWeight: "600" }}>
          Welcome to Ananda Mart
        </h1>
        <p>We provide quality products and services since August 19, 2019</p>
        <NavLink to={"/login"}>
          <button
            style={{
              padding: "10px 32px",
              border: "none",
              backgroundColor: "#6B50F6",
              color: "white",
              borderRadius: "10px",
              marginTop: "10px",
            }}
          >
            Login
          </button>
        </NavLink>
        <h2
          style={{
            marginTop: "80px",
            marginBottom: "30px",
            fontWeight: "600",
          }}
        >
          Our Products
        </h2>
        <div
          style={{
            display: "flex",
            gap: "30px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "300px",
              borderRadius: "20px",
            }}
          >
            <img
              src={snacksImg}
              alt="Snacks"
              style={{ borderRadius: "20px 20px 0 0", width: "100%" }}
            />

            <div
              style={{
                padding: "0 12px",
                fontSize: "12px",
                fontWeight: "500",
              }}
            >
              <h5 style={{ fontSize: "28px", fontWeight: "700" }}>Snacks</h5>
              Delicious snacks for all occasions
            </div>
          </div>
          <div
            style={{
              width: "300px",
              borderRadius: "20px",
            }}
          >
            <img
              src={riceImg}
              alt="Snacks"
              style={{ borderRadius: "20px 20px 0 0", width: "100%" }}
            />

            <div
              style={{
                padding: "0 12px",
                fontSize: "12px",
                fontWeight: "500",
              }}
            >
              <h5 style={{ fontSize: "28px", fontWeight: "700" }}>Rice</h5>
              We provide high quality of Rice
            </div>
          </div>
          <div
            style={{
              width: "300px",
              borderRadius: "20px",
            }}
          >
            <img
              src={dalImg}
              alt="Snacks"
              style={{ borderRadius: "20px 20px 0 0", width: "100%" }}
            />

            <div
              style={{
                padding: "0 12px",
                fontSize: "12px",
                fontWeight: "500",
              }}
            >
              <h5 style={{ fontSize: "28px", fontWeight: "700" }}>
                Dal & Pulses
              </h5>
              Fresh and nutritious lentils
            </div>
          </div>
          <div
            style={{
              width: "300px",
              borderRadius: "20px",
            }}
          >
            <img
              src={oilImg}
              alt="Snacks"
              style={{ borderRadius: "20px 20px 0 0", width: "100%" }}
            />

            <div
              style={{
                padding: "0 12px",
                fontSize: "12px",
                fontWeight: "500",
              }}
            >
              <h5 style={{ fontSize: "28px", fontWeight: "700" }}>
                Cooking Oil
              </h5>
              Pure and healthy cooking oil
            </div>
          </div>
        </div>
      </div>

      <footer className="text-center text-lg-start bg-white text-muted footer ">
        <section className="">
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  <i className="fas fa-gem me-3 text-secondary"></i>Aananda Mart
                </h6>
                <p></p>
              </div>

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <p className="white-color">
                  <FaLocationArrow />
                  Chandragiri, Kathmandu, Nepal
                </p>
                <p className="white-color">
                  <FaEnvelope />
                  info@aanandart.com
                </p>
                <p className="white-color">
                  <FaPhone />+ 977 9803031010
                </p>
              </div>
            </div>
          </div>
        </section>
        <div className="text-center p-4">
          © 2023 Copyright:
          <a className="text-reset fw-bold" href="/">
            Aananda Mart
          </a>
        </div>
      </footer>
    </>
  );
};

export default Index;
