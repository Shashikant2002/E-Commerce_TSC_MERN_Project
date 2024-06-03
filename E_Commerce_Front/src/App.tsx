import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy, useState } from "react";
import Loading from "./components/Loading.tsx";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCategory } from "./redux/asyncThunk/categoryAsync";
import { AppDispatch, RootState } from "./redux/store";
import { fetchMe } from "./redux/asyncThunk/userAsync.ts";
import {
  fetchNewArrivalProduct,
  fetchSellingProduct,
  fetchTrendingProduct,
} from "./redux/asyncThunk/productAsync.ts";

// Page Called
const Home = lazy(() => import("./pages/Home.tsx"));
const Cart = lazy(() => import("./pages/Cart.tsx"));
const Products = lazy(() => import("./pages/Products.tsx"));
const AboutUS = lazy(() => import("./pages/AboutUS.tsx"));
const Contact = lazy(() => import("./pages/Contact.tsx"));
const Orders = lazy(() => import("./pages/Orders.tsx"));
const Login = lazy(() => import("./pages/Login.tsx"));
const Profile = lazy(() => import("./pages/Profile.tsx"));

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userReduxData = useSelector((state: RootState) => state?.userSlice);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchAllCategory());
    dispatch(fetchMe({}));
    dispatch(fetchSellingProduct({ page: 1, limit: 8 }));
    dispatch(fetchTrendingProduct());
    dispatch(fetchNewArrivalProduct());
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? <Loading /> : ""}
      <BrowserRouter>
        <Header />
        <Suspense fallback={<Loading />}>
          <Routes>
            {userReduxData?.auth ? (
              <>
                <Route path="/my_profile" element={<Profile />} />
                <Route path="/orders" element={<Orders />} />
              </>
            ) : (
              <>
                <Route path="/login_register" element={<Login />} />
              </>
            )}
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<AboutUS />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/products" element={<Products />} />

            <Route path="/*" element={<Home />} />
          </Routes>
        </Suspense>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
