import React, { useState, useEffect } from "react";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("https://cities-qd9i.onrender.com/agents");
      const agents = await response.json();
      setData(agents);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
}