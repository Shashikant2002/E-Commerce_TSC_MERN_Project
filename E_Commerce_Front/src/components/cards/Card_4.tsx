import { useState } from "react";
import { FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Card_4 = () => {


  return (
    <div className="card_4">
      <div className="flex justifyContentBetween">
        <div className="date">
          <h5>Order On: <span className="orderon"><b>05-10-2024</b></span></h5>
        </div>
        <div className="status">
          <h5>Status: <span className="delivered"><b>Delivered</b></span></h5>
        </div>
      </div>

      <div className="prod">
        <div className="head flex justifyContentBetween">
          <div className="col">
            <h5><b>Product</b></h5>
          </div>
          <div className="col">
            <h5><b>Quantity</b></h5>
          </div>
          <div className="col">
            <h5><b>Price</b></h5>
          </div>
        </div>
        <div className="body flex justifyContentBetween alignCenter">
          <div className="col">
            <img src="/cat_1.jpg" alt="" />
          </div>
          <div className="col">
            <h5>X 20</h5>
          </div>
          <div className="col">
            <h5>₹3000</h5>
          </div>
        </div>
      </div>

      <div className="data flex justifyContentBetween alignCenter">
        <h5><b>Total</b></h5>
        <h5><b>₹3000</b></h5>
      </div>
      <div className="address flex">
        <h5><b>Address: </b></h5>
        <h5>E-2/972-C, Pusta 4, Sonia Vihar Delhi 110094</h5>
      </div>
    </div>
  );
};

export default Card_4;
