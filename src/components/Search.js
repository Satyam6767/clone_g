import React, { useState, useEffect } from "react";
import { FaSistrix, FaMicrophone } from "react-icons/fa";
import { key, cx } from "../API";
import axios from "axios";
import Show from "./Show";

const Search = (props) => {
  const [query, setQuery] = useState(
    props.location.state ? props.location.state : ""
  );
  const [results, setResults] = useState([]);
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const goBack = () => {
    props.history.push("/");
  };

  const searchGoogle = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.get(
        `https://www.googleapis.com/customsearch/v1?key=${key}&cx=${cx}&q=${query}`
      );
      setResults(response.data.items);
      setInfo(response.data.searchInformation);
      setLoading(false);
    } catch (error) {
      setError("Error fetching search results. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    async function getPosts() {
      if (props.location.state) {
        try {
          setLoading(true);
          const response = await axios.get(
            `https://www.googleapis.com/customsearch/v1?key=${key}&cx=${cx}&q=${query}`
          );
          setResults(response.data.items);
          setInfo(response.data.searchInformation);
          setLoading(false);
        } catch (error) {
          setError("Error fetching search results. Please try again.");
          setLoading(false);
        }
      }
    }
    getPosts();
  }, [props.location.state, query]);

  
  return (
    <div className="search">
      <div className="search__form">
        <div className="search__form-logo">
          <img src="/images/small.png" alt="logo" onClick={goBack} />
        </div>
        <div className="search__form-input">
          <form className="home__form" onSubmit={searchGoogle}>
            <input
              type="text"
              className="home__input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              required
            />
            <FaSistrix className="search__icon" />
            <FaMicrophone className="microphone" />
          </form>
        </div>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && <Show results={results} info={info} />}
    </div>
  );
};

export default Search;
