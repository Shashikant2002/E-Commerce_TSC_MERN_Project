import Banner from "../components/Banner";
import Categorys from "../components/Categorys";
import NewArrivals from "../components/NewArrivals";
import SaleingProduct from "../components/SaleingProduct";
import TrendingProd from "../components/TrendingProd";

const Home = () => {
  return (
    <div className="home_page">
      <Banner />
      <Categorys />
      <NewArrivals />
      <TrendingProd />
      <SaleingProduct />
    </div>
  );
};

export default Home;
