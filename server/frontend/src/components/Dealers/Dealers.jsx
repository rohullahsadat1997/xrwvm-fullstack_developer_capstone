
import React, { useState, useEffect } from 'react';
import "./Dealers.css";
import "../assets/style.css";
import Header from '../Header/Header';
import review_icon from "../assets/reviewicon.png";

const Dealers = () => {
  const [dealersList, setDealersList] = useState([]);
  const [states, setStates] = useState([]);

const dealer_url = "/djangoapp/get_dealers";
const dealer_url_by_state = "/djangoapp/get_dealers/";

  const filterDealers = async (state) => {
    try {
      if (!state || state === "All") {
        await get_dealers();
        return;
      }

      const url = dealer_url_by_state + encodeURIComponent(state);
      const res = await fetch(url, { method: "GET" });

      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`);
      }

      const retobj = await res.json();

      if (retobj.status === 200) {
        setDealersList(Array.isArray(retobj.dealers) ? retobj.dealers : []);
      }
    } catch (error) {
      console.error("Error filtering dealers:", error);
    }
  };

  const get_dealers = async () => {
    try {
      console.log("Dealer API URL:", dealer_url);

      const res = await fetch(dealer_url, { method: "GET" });

      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`);
      }

      const retobj = await res.json();
      console.log("Dealers API response:", retobj);

      if (retobj.status === 200 && Array.isArray(retobj.dealers)) {
        const all_dealers = retobj.dealers;
        setDealersList(all_dealers);

        const uniqueStates = [
          ...new Set(all_dealers.map((dealer) => dealer.state).filter(Boolean))
        ];

        setStates(uniqueStates);
      } else {
        setDealersList([]);
        console.error("Unexpected dealers response:", retobj);
      }
    } catch (error) {
      console.error("Error fetching dealers:", error);
    }
  };

  useEffect(() => {
    get_dealers();
  }, []);

  const isLoggedIn = sessionStorage.getItem("username") !== null;

  return (
    <div>
      <Header />

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Dealer Name</th>
            <th>City</th>
            <th>Address</th>
            <th>Zip</th>
            <th>
              <select
                name="state"
                id="state"
                defaultValue=""
                onChange={(e) => filterDealers(e.target.value)}
              >
                <option value="" disabled>
                  State
                </option>
                <option value="All">All States</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </th>
            {isLoggedIn && <th>Review Dealer</th>}
          </tr>
        </thead>

        <tbody>
          {dealersList.map((dealer) => (
            <tr key={dealer.id}>
              <td>{dealer.id}</td>
              <td>
                <a href={`/dealer/${dealer.id}`}>
                  {dealer.full_name}
                </a>
              </td>
              <td>{dealer.city}</td>
              <td>{dealer.address}</td>
              <td>{dealer.zip}</td>
              <td>{dealer.state}</td>
              {isLoggedIn && (
                <td>
                  <a href={`/postreview/${dealer.id}`}>
                    <img
                      src={review_icon}
                      className="review_icon"
                      alt="Post Review"
                    />
                  </a>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dealers;