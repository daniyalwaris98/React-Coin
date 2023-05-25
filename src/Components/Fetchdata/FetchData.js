import { useEffect, useState } from "react";
import "./FetchData.css";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { Pagination } from "../Paginaton/Pagination";

export function FetchData({ term }) {
  const [filterd, setFilterd] = useState([]);
  const [records, setRecords] = useState([]);
  const recordPerPage = 6;
  const [currentpage, setCurrentPage] = useState(1);
  const lastindex = currentpage * recordPerPage;
  const firstindex = lastindex - recordPerPage;

  function setpages(n) {
    setCurrentPage(n);
  }

  const getData = async () => {
    const { data } = await axios.get(`https://api.coinranking.com/v2/coins`);
    setRecords(data.data.coins);
    setFilterd(data.data.coins);
  };

  useEffect(() => {
    getData();
  }, []);
  let check = [];

  useEffect(() => {
    check = records.filter(
      (x) =>
        x.name.includes(term) ||
        x.name.includes(term.toUpperCase()) ||
        x.name.includes(term.charAt(0).toUpperCase() + term.slice(1))
    );
  }, [term]);
  useEffect(() => {
    if (check.length > 0) {
      setFilterd(check);
    }
  }, [check]);

  return (
    <div className="container">
      {records == "" ? (
        <div style={{ paddingTop: "100px" }}>
          <ClipLoader
            color="#0c2440"
            loading="true"
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        ""
      )}
      <div className="cards">
        <div className="inner-container">
          {filterd.slice(firstindex, lastindex).map((filter, i) => (
            <div className="card" key={i}>
              <img className="icon" src={filter.iconUrl}></img>
              <div className="content">
                <div>
                  <span>
                    <b>NAME:</b>
                  </span>
                  <span>
                    <b>BtcPRICE:</b>
                  </span>
                  <span>
                    <b>PRICE:</b>
                  </span>
                  <span>
                    <b>SYMBOL:</b>
                  </span>
                </div>
                <div>
                  <span>{filter.name}</span>
                  <span>{filter.btcPrice}</span>
                  <span>{filter.price}</span>
                  <span> {filter.symbol}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Pagination setpages={setpages} length={filterd.length} />
    </div>
  );
}
