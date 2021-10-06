import styled from "styled-components";

export const AboutContainer = styled.div`
  display: flex;
  padding: 3rem;
  position: relative;

  .left-side {
    flex: 0.4;
    > .img-main {
      height: 100%;
      width: 100%;
    }

    > .img-secondary {
      position: absolute;
      width: 20%;
      height: 40%;
      top: 12rem;
      left: 30rem;
    }
  }

  .right-side {
    flex: 0.6;

    > .right-sub {
      margin-left: 15rem;
      text-align: justify;
      padding: 1rem;

       .aboutbtn {
        padding: 0.8rem;
        color: green;
        font-size: 1.2rem;
        border: 1px solid green;
        background-color: white;
      }

       .aboutbtn:hover {
        color: white;
        border: none;
        background-color: #4ac85d;
        cursor: pointer;
      }
    }
  }

  @media (max-width: 720px) {
    flex-direction: column;

    .left-side {
      > .img-secondary {
        display: none;
      }
    }

    .right-side {
      > .right-sub {
        margin: 0;
        padding: 0;
      }
    }
  }
`;
