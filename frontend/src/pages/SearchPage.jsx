import React, { useState } from "react";
import Scroll from "../components/Search/Scroll";
import SearchList from "../components/Search/SearchList";
import LoggedInContainer from "@/containers/LoggedInContainer";

function SearchPage({ details }) {
  const [searchField, setSearchField] = useState("");
  const [searchShow, setSearchShow] = useState(true);

  // Check if details is defined and is an array before using filter
  const filteredPersons = Array.isArray(details)
    ? details.filter((person) => {
        return (
          person.name.toLowerCase().includes(searchField.toLowerCase()) ||
          person.email.toLowerCase().includes(searchField.toLowerCase())
        );
      })
    : [];

  const handleChange = (e) => {
    setSearchField(e.target.value);
    if (e.target.value === "") {
      setSearchShow(false);
    } else {
      setSearchShow(true);
    }
  };

  function searchList() {
    if (searchShow) {
      return (
        <Scroll>
          <SearchList filteredPersons={filteredPersons} />
        </Scroll>
      );
    }
    return null;
  }

  return (
    <LoggedInContainer>
      <section className="garamond">
        <div className="navy georgia ma0 grow">
          <h2 className="f2">Search your music</h2>
        </div>
        <div className="pa2">
          <input
            className="placeholder-red-500 bb br3 grow b--none bg-lightest-blue ma3"
            type="search"
            placeholder="Search People"
            onChange={handleChange}
            style={{ color: "black" }}
          />
        </div>
        {searchList()}
      </section>
    </LoggedInContainer>
  );
}

export default SearchPage;
