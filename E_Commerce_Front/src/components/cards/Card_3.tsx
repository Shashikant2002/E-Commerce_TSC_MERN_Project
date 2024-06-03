import { useState } from "react";
import { FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Card_3 = () => {

  const [qut, setQut] = useState<number>(1)

  const qutInc = () => {
    if (qut === 10) {
      return
    } else {
      setQut((prev) => prev + 1)
    }
  }
  const qutDec = () => {
    if (qut <= 1) {
      return
    } else {
      setQut((prev) => prev - 1)
    }
  }

  return (
    <div className="card_3 flex alignCenter">
      <div className="box">
        <Link to={"/"}>
          <img src="/cat_1.jpg" alt="" />
        </Link>
      </div>
      <div className="box">
        <p><del>₹500.00</del></p>
        <p>₹400.00</p>
      </div>
      <div className="box quan">
        <div className="mainQuan flex alignCenter">
          <button onClick={() => { qutDec() }}><FaMinus /></button>
          <p>{qut}</p>
          <button onClick={() => { qutInc() }}><FaPlus /></button>
        </div>
      </div>
      <div className="box">
        <h5>₹900</h5>
      </div>
      <div className="box">
        <button className="iconButton"><FaTrashAlt /></button>
      </div>
    </div>
  );
};

export default Card_3;
