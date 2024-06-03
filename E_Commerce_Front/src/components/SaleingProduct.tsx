import "react-multi-carousel/lib/styles.css";
import Heading from "./Heading";
import Card_2 from "./cards/Card_2";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import { addInProduct } from "../redux/slices/ProductSlice";
import { baseUrl } from "../../config";
import axios from "axios";

const SaleingProduct = () => {
  const sellingProduct = useSelector((state: RootState) => state?.productSlice);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(8);

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const fetchNextPage = async (pageNo: number) => {
    setLoading(true);
    if (pageNo !== 1) {
      const url: string = `${baseUrl}/api/v1/product/all?limit=${limit}&page=${2}`;
      const res = await axios.get(url);

      if (res.data.success) {
        console.log(res.data.products);

        dispatch(addInProduct(res.data.products));
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchNextPage(page);
  }, [page]);

  return (
    <>
      {loading ? <Loading /> : ""}
      <div className="allProducts commonSection pt_0">
        <div className="container">
          <Heading title="All Selling Products" view_all="/products" />

          <div className="products flex flexWrap">
            {sellingProduct?.sellingProduct?.products?.map((ele: any) => {
              return (
                <div className="card" key={ele?._id}>
                  <Card_2 data={ele} />
                </div>
              );
            })}
          </div>

          {sellingProduct?.sellingProduct?.page <= page ? (
            ""
          ) : (
            <div className="loadmore flex justifyContentCenter">
              <button
                className="globalBtn"
                onClick={() => setPage((prev) => prev + 1)}
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SaleingProduct;
