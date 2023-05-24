import { useState } from "react";
import { FetchData } from "../Fetchdata/FetchData";
import "./Search.css";

export function Search() {
  const [term, setTerm] = useState("");
  console.log("Onchange", term);

  const clickEvent = (e) => {
    e.preventDefault();
  };

  const HandleChange = (e) => {
    setTerm(e.target.value);
  };
  return (
    <div>
      <div className="searchbar">
        <h1>List Of Coins</h1>

        <form onSubmit={clickEvent}>
          <input
            onChange={HandleChange}
            placeholder="Search for digital coins "
            autoCapitalize="words"
            type="text"
          ></input>
        </form>
      </div>
      <FetchData term={term} />
    </div>
  );
}
