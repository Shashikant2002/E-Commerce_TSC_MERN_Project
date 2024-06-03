import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Heading from "./Heading";
import Card_2 from "./cards/Card_2";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const NewArrivals = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  const newArrivals = useSelector((state: RootState) => state?.productSlice);

  return (
    <div className="arrival commonSection pt_0">
      <div className="container">
        <Heading title="New Arrivals" view_all="/" />
        {newArrivals?.newArrivalsProduct?.products?.length > 0 ? (
          <Carousel infinite={true} responsive={responsive}>
            {newArrivals?.newArrivalsProduct?.products?.map((ele: any) => {
              return (
                <div className="card" key={ele?._id}>
                  <Card_2 data={ele} />
                </div>
              );
            })}
          </Carousel>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default NewArrivals;
