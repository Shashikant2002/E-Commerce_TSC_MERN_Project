import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Heading from "./Heading";
import Card_2 from "./cards/Card_2";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";

const TrendingProd = () => {
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

  const tranding = useSelector((state: RootState) => state?.productSlice);

  return (
    <div className="trending commonSection pt_0">
      <div className="container">
        <Heading title="Trending Products" view_all="/" />
        {tranding?.trendingProduct?.products?.length > 0 ? (
          <Carousel infinite={true} responsive={responsive}>
            {tranding?.trendingProduct?.products?.map((ele: any) => {
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

export default TrendingProd;
