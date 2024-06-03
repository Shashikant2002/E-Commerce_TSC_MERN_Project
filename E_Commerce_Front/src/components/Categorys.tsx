import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Card_1 from "./cards/Card_1";
import Heading from "./Heading";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { CategoryType } from "../types/categoryTypes";

const Categorys = () => {
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

  const category = useSelector(
    (state: RootState) => state?.categorySlice?.allCategory
  );

  console.log(category);

  return (
    <div className="category commonSection">
      <div className="container">
        <Heading title="Shop By Category" view_all="/" />
        {category?.categorys ? (
          <Carousel infinite={true} responsive={responsive}>
            {category?.categorys?.map((ele: CategoryType) => {
              return (
                <div className="card" key={ele._id}>
                  <Card_1 data={ele} />
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

export default Categorys;
