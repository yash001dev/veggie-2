import styled from "styled-components";

export const PlaceOrderContainer = styled.div`
  display: flex;
  margin: 0 3rem;

  .accordian-container {
    flex: 0.75;
    margin: 1rem;
  }

  .price-summary-container {
    flex: 0.25;
    background-color: white;
    padding: 1rem;
    margin: 1rem;
    height: fit-content;
    position: sticky;
    top: 4.5rem;
    width: 20.4%;
    line-height: 1.7rem;
    box-shadow: 0px 5px 15px 1px lightgray;
    border-radius: 5px;
  }

  @media (max-width: 720px) {
    flex-direction: column;
    width: 100%;
    margin: -1rem;

    .price-summary-container {
      width: 100%;
    }
  }
`;
