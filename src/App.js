import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("https://randomuser.me/api");
      const data = response.data.results[0];
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
    }

    const cachedData = localStorage.getItem("user");
    if (cachedData) {
      setUser(JSON.parse(cachedData));
    } else {
      fetchData();
    }
  }, []);

  function refreshUser() {
    localStorage.removeItem("user");
    setUser(null);
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  const { name, email } = user;

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{`${name.title} ${name.first} ${name.last}`}</td>
            <td>{email}</td>
          </tr>
        </tbody>
      </table>

      <button onClick={refreshUser}>Refresh</button>
    </div>
  );
}

export default App;
