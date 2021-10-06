import styled from "styled-components";

export const EmptyCartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  width: 50%;
  margin: auto;
  padding: 4rem;
  margin-top: 2rem;

  > h3 {
    margin: 2rem 0;
  }

  .empty-cart-btn > button {
    background-color: #4ac85d;
    border: none;
    outline: none;
    padding: 0.5rem 1rem;
    color: white;
    font-size: 1.1rem;
    font-weight: bold;
    cursor: pointer;
  }
`;
