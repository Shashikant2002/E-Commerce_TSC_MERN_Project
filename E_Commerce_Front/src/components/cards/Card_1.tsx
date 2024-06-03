import { Link } from "react-router-dom";
import { CategoryType } from "../../types/categoryTypes";
import { baseUrl } from "../../../config";

const Card_1 = ({ data }: { data: CategoryType }) => {
  return (
    <div className="card_1">
      <Link to={"/"}>
        <img src={`${baseUrl}/${data.photo}`} alt="" />
        <h5 className="title">{data.name}</h5>
      </Link>
    </div>
  );
};

export default Card_1;
