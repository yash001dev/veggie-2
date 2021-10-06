import styled from "styled-components";

export const TestinomialContainer = styled.div`
  width: 90vw;
  margin: 4rem auto;
  /* margin-bottom: -5rem; */
  max-width: 1170px;
  height: fit-content;
  background-color: white;
  margin-bottom: -1rem;
  /* display: flex;
  align-items: center; */

  .main-container {
    height: 100%;
    width: 100%;
  }

  @media (max-width: 1020px) {
    /* width: 95vw; */
    height: auto;
  }

  .title {
    text-align: center;
    margin-bottom: 2rem;
  }
  .title h2 {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    /* padding-top: 2rem; */
  }

  .section-center {
    margin: 0 auto;
    margin-top: 2rem;
    width: 80vw;
    height: 370px;
    max-width: 800px;
    text-align: center;
    position: relative;
    display: flex;
    overflow: hidden;
  }
  .person-img {
    border-radius: 50%;
    margin-bottom: 1rem;
    width: 150px;
    height: 150px;
    object-fit: cover;
    border: 4px solid hsl(210, 31%, 80%);
    box-shadow: rgba(0, 0, 0, 0.2);
  }
  article h4 {
    text-transform: uppercase;
    color: #4ac85d;
    margin-bottom: 0.25rem;
  }
  .title {
    text-transform: capitalize;
    margin-bottom: 0.75rem;
    color: hsl(209, 34%, 30%);
  }
  .text {
    max-width: 35em;
    margin: 0 auto;
    margin-top: 1rem;
    line-height: 2;
    color: hsl(210, 22%, 49%);
  }
  .prev,
  .next {
    position: absolute;
    top: 200px;
    transform: translateY(-50%);
    background: #4ac85d;
    color: #fff;
    width: 1.75rem;
    height: 1.65rem;
    display: grid;
    text-align: center;
    place-items: center;
    border-color: transparent;
    font-size: 1.25rem;
    border-radius: 0.25rem;
    cursor: pointer;
    transition: all 0.3s linear;
  }
  .prev:hover,
  .next:hover {
    background: hsl(21, 62%, 45%);
  }
  .prev {
    left: 0;
  }
  .next {
    right: 0;
  }

  @media (max-width: 720px) {
    margin-bottom: 4rem;

    .section-center {
      height: 420px;
    }

    .text {
      max-width: 45em;
    }
    .prev,
    .next {
      width: 2rem;
      height: 1.8rem;
      font-size: 1.5rem;
    }
  }
  article {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: all 0.3s linear;
  }
  article.activeSlide {
    opacity: 1;
    transform: translateX(0);
  }
  article.lastSlide {
    transform: translateX(-100%);
  }
  article.nextSlide {
    transform: translateX(100%);
  }

  .icon {
    display: none;
  }
`;
