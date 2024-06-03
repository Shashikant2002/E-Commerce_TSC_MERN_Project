import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Banner = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <div className="banner">
      <Carousel infinite={true} responsive={responsive}>
        <div className="item">
          <img src="/banner/banner_1.jpg" alt="" />
        </div>
        <div className="item">
          <img src="/banner/banner_2.jpg" alt="" />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
