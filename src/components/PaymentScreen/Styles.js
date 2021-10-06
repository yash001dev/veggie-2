import styled from "styled-components";

export const PaymentContainer = styled.div`
  .payment-options {
    padding: 0.2rem 0;
    display: flex;

    .pay-icon {
      display: flex;
      align-items: center;

      .icon-two {
        display: flex;
        align-items: center;

        .cardImg {
          height: 1.5rem;
          margin: 0 0.2rem;
        }

        .upiImg {
          height: 0.7rem;
          margin: 0 0.2rem;
        }

        .paytmImg {
          height: 1.1rem;
          margin: 0 0.2rem;
        }

        .rsIcon {
          height: 1.3rem;
          margin: 0 0.6rem;
        }

        .phonepayImg {
          height: 1.3rem;
          margin: 0 0.2rem;
        }
      }
    }

    > button {
      margin-top: 1.5rem;
      border: none;
      outline: none;
      background-color: #50c85e;
      padding: 0.4rem 0.7rem;
      color: white;
      font-size: 1.1rem;
      font-weight: bold;
      cursor: pointer;
    }
  }
`;
