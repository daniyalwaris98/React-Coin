import { useState } from "react";
import { FetchData } from "../Fetchdata/FetchData";
import "./Search.css";
import icon from "../Shared/search-icon.png";

export function Search() {
  const [term, setTerm] = useState("");

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

        <form onSubmit={clickEvent} autoComplete="off">
          <input
            id="search"
            onChange={HandleChange}
            placeholder="Search for digital coins "
            autoCapitalize="words"
            type="text"
          ></input>
          <button id="Btn">
            <img src={icon}></img>
          </button>
        </form>
      </div>
      <FetchData term={term.trimStart()} />
    </div>
  );
}
