import React, { useEffect } from "react";
import data from "./data";
import { TestinomialContainer } from "./Styles";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";

function Testinomial() {
  const [index, setIndex] = React.useState(0);

  useEffect(() => {
    const lastIndex = data.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index]);

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 5000);
    return () => {
      clearInterval(slider);
    };
  }, [index]);

  return (
    <div>
      <TestinomialContainer>
        <div className="main-container">
          <div className="title">
            <h2>Testinomials</h2>
          </div>
          <div className="section-center">
            {data.map((person, personIndex) => {
              const { id, image, name, title, quote } = person;

              let position = "nextSlide";
              if (personIndex === index) {
                position = "activeSlide";
              }
              if (
                personIndex === index - 1 ||
                (index === 0 && personIndex === data.length - 1)
              ) {
                position = "lastSlide";
              }

              return (
                <article className={position} key={id}>
                  <img src={image} alt={name} className="person-img" />
                  <h4>{name}</h4>
                  <p className="title">{title}</p>
                  <p className="text">{quote}</p>
                  <FormatQuoteIcon
                    fontSize="large"
                    style={{ color: "#4ac85d" }}
                  />
                </article>
              );
            })}
            <button className="prev" onClick={() => setIndex(index - 1)}>
              <span>
                <ArrowBackIosIcon fontSize="small" />
              </span>
            </button>
            <button className="next" onClick={() => setIndex(index + 1)}>
              <span>
                <ArrowForwardIosIcon fontSize="small" />
              </span>
            </button>
          </div>
        </div>
      </TestinomialContainer>
    </div>
  );
}

export default Testinomial;
