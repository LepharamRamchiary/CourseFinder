import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./header.css";

function Header() {
  const [data, setData] = useState([]);
  const [getCourse, setCourse] = useState();
  const [getChild, setChild] = useState([]);
  const [selectedChild, setSelectedChild] = useState();
  const [dates, setDates] = useState([]);
  // const [getDate] = useState();
  const [selfs, setSelf] = useState([]);

  useEffect(() => {
    axios
      .get(`https://nut-case.s3.amazonaws.com/coursessc.json`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const courseid = [...new Set(data.map((item) => item["Course Name"]))];
  courseid.sort();

  const handleCourse = (e) => {
    let childs = data.filter(
      (child) => child["Course Name"] === e.target.value
    );
    childs = [...new Set(childs.map((item) => item["Child Subject"]))];

    setChild(childs);
  };

  const handleChild = (e) => {
    let dates = data.filter((date) => date["Child Subject"] === e.target.value);
    dates = [...new Set(dates.map((item) => item["Next Session Date"]))];

    setDates(dates);
  };

  const handleDate = (e) => {
    let selfs = data.filter(
      (self) => self["Next Session Date"] === e.target.value
    );

    console.log(selfs);
    setSelf(selfs);
  };

  return (
    <div>
      <div className="tag">
        <h2>Course Finder</h2>

        <h4>Course Found:{}</h4>
      </div>

      <form className="course1">
        <div className="from">
          <div className="react"></div>

          <select className="tag3" onChange={(e) => handleCourse(e)}>
            <option value="">Course</option>

            {courseid.map((items) => (
              <option key={items} value={getCourse}>
                {items}
              </option>
            ))}
          </select>

          <select className="tag4" onChange={(e) => handleChild(e)}>
            <option value="">Child-Subject</option>
            {getChild.map((items) => (
              <option key={items} value={selectedChild}>
                {items}
              </option>
            ))}
          </select>

          <select className="tag5" onChange={(e) => handleDate(e)}>
            <option value="">MM/DD/YYYY</option>
            {dates.map((items) => (
              <option key={items} value={["Next Session Date"]}>
                {items}
              </option>
            ))}
          </select>
        </div>
        <div className="input">
          <div className="box">
            <input type="checkbox" className="for" />
            <label className="from1">Self Paced</label>
          </div>
          <div className="box2">
            <button className="btn">Search</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Header;
