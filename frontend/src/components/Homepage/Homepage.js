import React, {useEffect} from "react";
import Slider from "react-slick";
import logogreen from "../../images/street_lite_logo_green.png";
import logoyellow from "../../images/street_lite_logo_yellow.png";
import './homepage.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchOpenStreets } from "../../store/openstreet";
import { useLoggedIn } from "../../util/ApiUtil";
import LogoutButton from "../SessionForms/LogoutButton";

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
        prevArrow: true,
        nextArrow: true,
        prevArrow: <BackArrow />,
        nextArrow: <NextArrow />
      };
    
    return (
        <div className="homepage">
            <h1>Welcome to Street_Lite</h1>
            {
            useLoggedIn() && <LogoutButton />
            }
            <div className="carousel">
                <Slider {...sliderSettings}>
                    <div>
                        <img src={logogreen} className="carousel-image" alt="Green Logo" />
                    </div>
                    <div>
                        <img src={logoyellow} className="carousel-image" alt="Yellow Logo" />
                    </div>
                </Slider>  
                
            </div>
        </div>
    )
}

export default Homepage;