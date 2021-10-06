import styled from "styled-components";

export const CartContainer = styled.div`
  display: flex;
  margin: 1rem 2rem;

  .cart-left {
    flex-basis: 75%;
    background-color: white;
    margin: 0 1rem;
    padding: 1rem;
    border-radius: 5px;
  }

  .cart-right {
    flex-basis: 25%;
    background-color: white;
    margin: 0 1rem;
    padding: 1rem;
    height: fit-content;
    line-height: 2rem;
    position: sticky;
    top: 4.5rem;
    box-shadow: 0px 5px 15px 1px lightgray;
    border-radius: 5px;

    > .place-order-btn {
      border: none;
      padding: 0.5rem 1rem;
      background-color: #50c85e;
      color: white;
      font-size: 1.2rem;
      font-weight: bold;
      cursor: pointer;
      border-radius: 5px;
    }
  }

  .cart-inner-container {
    display: flex;
    border-bottom: 1px solid lightgray;

    .cart-item-img {
      flex-basis: 25%;
      display: flex;
      justify-content: center;
      align-items: center;

      > img {
        height: 85%;
        width: 85%;
        object-fit: contain;
      }
    }

    .cart-item-details {
      flex-basis: 55%;
      padding: 1rem;

      > button {
        border: 1px solid gray;
        border-radius: 20%;
        outline: none;
        background-color: white;
        color: black;
        font-size: 1.3rem;
        padding: 0 0.5rem;
        margin: 0 0.5rem;
        cursor: pointer;
      }

      > span {
        font-weight: bold;
      }
    }

    .cart-item-delivery-details {
      flex-basis: 20%;
      padding: 2rem 1rem;
      color: green;

      > p {
        font-weight: bold;
      }
    }
  }

  @media (max-width: 720px) {
    margin: 1rem 0.2rem;
    flex-direction: column;

    .cart-left {
      margin-bottom: 1rem;
    }

    .cart-inner-container {
      flex-direction: column;

      .cart-item-img {
        margin-top: 1rem;
        > img {
          height: 50%;
          width: 50%;
          object-fit: contain;
        }
      }

      .cart-item-delivery-details {
        padding: 0 1rem;

        p {
          margin-top: -1rem;
        }
      }
    }
  }
`;
