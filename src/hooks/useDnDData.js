import { useState, useEffect } from "react";

export function useDnDList(endpoint) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://www.dnd5eapi.co/api/2014/${endpoint}`)
      .then((res) => res.json())
      .then((json) => setData(json.results))
      .catch(setError);
  }, [endpoint]);
  return { data, error };
}

export function useDnDDetail(endpoint, selected) {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    if (!selected) return;

    fetch(`https://www.dnd5eapi.co/api/2014/${endpoint}/${selected}`)
      .then((res) => res.json())
      .then(setDetails)
      .catch((error) => console.error(`Error fetching ${endpoint} details`, err));
  }, [endpoint, selected]);
  return details;
}
