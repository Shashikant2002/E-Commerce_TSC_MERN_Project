import { useState } from "react";
import BreadCrum from "../components/BreadCrum";
import Card_2 from "../components/cards/Card_2";

const Products = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const searchQuery = queryParams.get("search");
  const categoryQuery = queryParams.get("category");
  const max_priceQuery = queryParams.get("max_price");
  const pageQuery = queryParams.get("page");

  const [category, setCategory] = useState<string>(categoryQuery ? categoryQuery : "");
  const [maxPrice, setMaxPrice] = useState<number>(Number(max_priceQuery) ? Number(max_priceQuery) : 100000);
  const [sort, setSort] = useState<string>("asc_price");
  const [search, setSearch] = useState<string>(searchQuery ? searchQuery : "");
  const [page, setPage] = useState<number>(Number(pageQuery) ? Number(pageQuery) : 1);

  console.log("search", search, "category", category, "maxPrice", maxPrice, "page", page, "sort", sort);


  return (
    <>
      <BreadCrum title={"All Products"} />

      <div className="productsPage commonSection">
        <div className="container_flud flex">
          <div className="aside">
            <div className="filters">
              <div className="filter">
                <h4 className="heading">Sort</h4>
                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                  <option selected={sort == "" ? true : false} value="">None</option>
                  <option selected={sort == "asc_price" ? true : false} value="asc_price">Price (Low to High)</option>
                  <option selected={sort == "dsc_price" ? true : false} value="dsc_price">Price (High to Low)</option>
                </select>
              </div>
              <div className="filter">
                <h4 className="heading">Max Price: - ₹{maxPrice}</h4>
                <input type="range" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} min={1} max={100000} />
              </div>

              <div className="filter">
                <h4 className="heading">Categories</h4>
                <div className="categories flex flexDirCol">
                  <button onClick={() => setCategory("")} className={`globalBtn_2 ${category == "" ? "active" : ""}`}>All</button>
                  <button onClick={() => setCategory("category")} className={`globalBtn_2 ${category == "category" ? "active" : ""}`} >category</button>
                </div>
              </div>
            </div>
          </div>

          <div className="prodListing">
            <h4>Total Products: - 40</h4>
            <div className="productsList flex flexWrap">
              <div className="card">
                <Card_2 />
              </div>
              <div className="card">
                <Card_2 />
              </div>
              <div className="card">
                <Card_2 />
              </div>
              <div className="card">
                <Card_2 />
              </div>
              <div className="card">
                <Card_2 />
              </div>
              <div className="card">
                <Card_2 />
              </div>
              <div className="card">
                <Card_2 />
              </div>
              <div className="card">
                <Card_2 />
              </div>
            </div>

            <div className="loadmore flex justifyContentCenter">
              <button className="globalBtn">Load More</button>
            </div>
          </div>

        </div>
      </div >
    </>
  );
};

export default Products;
