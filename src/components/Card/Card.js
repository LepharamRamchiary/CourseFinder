import React, { Component } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";

// if i use splide then, show the problem in page loading. its a Aw,snap Error. i try to solved this problem but i not get solution because of my bad laptop condition

class Aard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    };
  }

  componentDidMount() {
    fetch(`https://nut-case.s3.amazonaws.com/coursessc.json`)
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          isLoaded: true,
          items: json,
        });
      });
  }

  render() {
    var { isLoaded, items } = this.state;
    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          {items.map((course) => {
            return (
              <Wrapper>
                <Splide>
                  <SplideSlide>
                    <Card>
                      <div key={course["Course Id"]}>
                        <p>{course["Course Id"]}</p>
                        <p>{course["Next Session Date"]}</p>
                        <p>
                          Provider<br></br> {course.Provider}
                        </p>
                        <p>
                          Course Name<br></br>
                          {course["Course Name"]}
                        </p>
                        <p>
                          Universities/Institutions <br></br>
                          {course["Universities/Institutions"]}
                        </p>
                        <p>
                          Parent Subject<br></br>
                          {course["Parent Subject"]}
                        </p>
                        <p>
                          Child Subject<br></br>
                          {course["Child Subject"]}
                        </p>
                      </div>
                    </Card>
                  </SplideSlide>
                </Splide>
              </Wrapper>
            );
          })}
        </div>
      );
    }
  }
}

const Wrapper = styled.div`
  margin: 1rem 0rem;
`;
const Card = styled.div`
  min-height: 24rem;
  border-radius: 2rem;
}
`;
export default Aard;
