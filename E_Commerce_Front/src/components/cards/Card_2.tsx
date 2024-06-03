import { Link } from "react-router-dom";
import { baseUrl } from "../../../config";

const Card_2 = ({ data }: { data: any }) => {
  return (
    <div className="card_2">
      <Link to={"/"}>
        {data?.photo ? (
          <img src={`${baseUrl}/${data?.photo}`} alt="" />
        ) : (
          <img src="/cat_1.jpg" alt="" />
        )}
        <div className="ribbin">
          <h5>{50}% OFF</h5>
        </div>
        <div className="content flex alignCenter justifyContentBetween">
          <div className="mainContent">
            <p>{data?.category?.name}</p>
            <h4 className="title">{data?.name}</h4>
          </div>

          <h5 className="price">
            <del className="strike">₹{data?.salse_price + 100}</del>
            <br />
            {data?.salse_price}₹
          </h5>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus,
          voluptatibus?
        </p>
      </Link>
    </div>
  );
};

export default Card_2;
