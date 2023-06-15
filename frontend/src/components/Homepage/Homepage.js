import React, { useEffect } from "react";
import Slider from "react-slick";
import logogreen from "../../images/street_lite_logo_green.png";
import logoyellow from "../../images/street_lite_logo_yellow.png";
import './homepage.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchOpenStreets } from "../../store/openstreets";
import { useLoggedIn } from "../../util/ApiUtil";
import SignupForm from "../SessionForms/SignupForm";
import LoginForm from "../SessionForms/LoginForm";
import LogoutButton from "../SessionForms/LogoutButton";
import LoginFormModal from "../SessionForms/LoginFormModal";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import img1 from '../../images/open-streets/1.jpg';
import img2 from '../../images/open-streets/2.webp';
import img3 from '../../images/open-streets/3.jpg';
import img4 from '../../images/open-streets/4.jpeg';
import img5 from '../../images/open-streets/5.jpg';
import img6 from '../../images/open-streets/6.jpg';
import img7 from '../../images/open-streets/7.jpeg';
import img8 from '../../images/open-streets/8.jpeg';
import img9 from '../../images/open-streets/9.jpeg';
import img10 from '../../images/open-streets/10.jpeg';
import img11 from '../../images/open-streets/11.jpeg';

function Homepage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOpenStreets());
  }, [dispatch]);

  const BackArrow = (props) => {
    return (
      <div className="back-arrow" onClick={props.onClick}>
        {"<"}
      </div>
    )
  }

  const NextArrow = (props) => {
    return (
      <div className="next-arrow" onClick={props.onClick}>
        {">"}
      </div>
    )
  }

  let sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    stopOnHover: true,
    prevArrow: <BackArrow />,
    nextArrow: <NextArrow />
  };

  return (
    <div className="homepage">
      <div className="carousel">
        <a href="/events"><h1 className="homepage-title">explore events</h1></a>
        <Slider {...sliderSettings}>
          {/* <div className="pic-container">
              <img src={img1} className="carousel-image" alt="" />
          </div>
          <div className="pic-container">
              <img src={img3} className="carousel-image" alt="" />
          </div> */}
          <div className="pic-container">
            <img src={img4} className="carousel-image" alt="" />
          </div>
          <div className="pic-container">
            <img src={img5} className="carousel-image" alt="" />
          </div>
          <div className="pic-container">
            <img src={img6} className="carousel-image" alt="" />
          </div>
          <div className="pic-container">
            <img src={img7} className="carousel-image" alt="" />
          </div>
          <div className="pic-container">
            <img src={img8} className="carousel-image" alt="" />
          </div>
          <div className="pic-container">
            <img src={img9} className="carousel-image" alt="" />
          </div>
          <div className="pic-container">
            <img src={img10} className="carousel-image" alt="" />
          </div>
          <div className="pic-container">
            <img src={img11} className="carousel-image" alt="" />
          </div>
          <div className="pic-container">
            <img src={img2} className="carousel-image" alt="" />
          </div>
          {/* <div>
              <img src={logogreen} className="carousel-image" alt="Green Logo" />
          </div>
          <div>
              <img src={logoyellow} className="carousel-image" alt="Yellow Logo" />
          </div> */}
        </Slider>
      </div>
      <div className="events-link">
      </div>
    </div>
  )
}

export default Homepage;
