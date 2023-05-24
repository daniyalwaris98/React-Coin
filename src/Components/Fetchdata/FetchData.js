import { useEffect, useState } from "react";
import "./FetchData.css";
import axios from "axios";
import { ClipLoader } from "react-spinners";

export function FetchData({ term }) {
  const [seacrhterm, setSearch] = useState("");
  const [records, setRecords] = useState([]);

  // useEffect(() => {
  //   fetch("https://api.coinranking.com/v2/coins")
  //     .then((response) => response.json())
  //     .then((data) => setRecords(data.data.coins));
  //   console.log(records);
  // }, []);
  const getData = async () => {
    const { data } = await axios.get(`https://api.coinranking.com/v2/coins`);
    setRecords(data.data.coins);
  };
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    setSearch(term);
    console.log("Fetch", term, seacrhterm);
  }, [term]);

  return (
    <div className="container">
      {records == "" ? (
        <ClipLoader
          color="#0c2440"
          loading="true"
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        ""
      )}
      <div className="cards">
        <div className="inner-container">
          {records
            .filter(
              seacrhterm == ""
                ? (x) => x
                : (x) =>
                    x.name.includes(seacrhterm) ||
                    x.name.includes(seacrhterm.toUpperCase()) ||
                    x.name.includes(
                      seacrhterm.charAt(0).toUpperCase() + seacrhterm.slice(1)
                    )
            )
            .map((filterd, i) => (
              <div className="card" key={i}>
                <img className="icon" src={filterd.iconUrl}></img>
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
                    <span>{filterd.name}</span>
                    <span>{filterd.btcPrice}</span>
                    <span>{filterd.price}</span>
                    <span> {filterd.symbol}</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
