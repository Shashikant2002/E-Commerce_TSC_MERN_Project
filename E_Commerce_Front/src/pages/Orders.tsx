import BreadCrum from "../components/BreadCrum";
import Card_4 from "../components/cards/Card_4";

const Orders = () => {


  return (
    <>
      <BreadCrum title={"Your Orders"} />

      <div className="orders_main commonSection">
        <div className="container">

          <div className="orders">

            <div className="order">
              <Card_4 />
            </div>
            <div className="order">
              <Card_4 />
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
