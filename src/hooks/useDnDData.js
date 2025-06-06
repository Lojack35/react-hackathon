import { useState, useEffect } from "react";

/**
 * Custom Hook: useDnDList
 * ------------------------
 * Fetches a list of items (like races, classes, or backgrounds)
 * from the DnD 5e API based on the provided endpoint.
 *
 * @param {string} endpoint - The specific endpoint to fetch (e.g., "races").
 * @returns {object} - Contains the data array and error (if any).
 */
export function useDnDList(endpoint) {
  const [data, setData] = useState([]); // Holds the fetched list of items.
  const [error, setError] = useState(null); // Captures any error during fetch.

  useEffect(() => {
    // Runs every time the endpoint changes.
    fetch(`https://www.dnd5eapi.co/api/2014/${endpoint}`)
      .then((res) => res.json()) // Converts the response to JSON.
      .then((json) => setData(json.results)) // Stores the 'results' array in state.
      .catch(setError); // If an error occurs, store it.
  }, [endpoint]);

  return { data, error }; // Expose the fetched data and any error.
}

/**
 * Custom Hook: useDnDDetail
 * --------------------------
 * Fetches detailed data for a single selected item from a given endpoint.
 *
 * @param {string} endpoint - API section to pull from (e.g., "races").
 * @param {string} selected - Specific item identifier (e.g., "elf").
 * @returns {object|null} - The detailed object fetched from the API, or null if not ready.
 */
export function useDnDDetail(endpoint, selected) {
  const [details, setDetails] = useState(null); // Holds detailed info of selected item.

  useEffect(() => {
    if (!selected) return; // Exit early if nothing is selected.

    fetch(`https://www.dnd5eapi.co/api/2014/${endpoint}/${selected}`)
      .then((res) => res.json()) // Converts the response to JSON.
      .then(setDetails) // Stores the result in state.
      .catch(
        (error) => console.error(`Error fetching ${endpoint} details`, error) // Logs any error.
      );
  }, [endpoint, selected]); // Re-run if either the endpoint or selected item changes.

  return details; // Return the fetched detail data.
}
