import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./components/Sidebar";

export const NewsContext = createContext();

export const NewsContextProvider = (props) => {
  const [data, setData] = useState();
  const apiKey = "2fd2af8e25d9463894f10eb25ec86373";

  const { category, search } = props; // Access the category and search props

  useEffect(() => {
    if (search) { // Check if search has a value
      axios
        .get(`https://newsapi.org/v2/everything?q=${search}&pageSize=100&apiKey=${apiKey}`)
        .then((response) => setData(response.data))
        .catch((error) => console.log(error));

    } else {
      // Call a different axios.get request when search is empty

      axios
        .get(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=100&apiKey=${apiKey}`)
        .then((response) => setData(response.data))
        .catch((error) => console.log(error));
    }
  }, [category, search]); // Add category and search as dependencies

  return (
    <NewsContext.Provider value={{ data }}>
      {props.children}
    </NewsContext.Provider>
  );
};