import styled from "styled-components";

export const SecondaryNavContainer = styled.div.attrs((props) => ({
  className: props.className,
}))`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #212121;
  color: white;
  z-index: 1000;

  &.active {
    position: fixed;
    top: 0;
    width: 100%; //if there comes extra space then put 100% here;
    .cart-icon-secondary {
      display: inline;
    }
  }

  .nav-items {
    flex: 0.8;
    display: flex;
    align-items: center;
    margin-left: 3rem;

    p {
      margin-right: 3rem;
      position: relative;
    }

    .about-us-p {
      margin-right: 3rem;
      position: relative;
      cursor: pointer;
    }

    .about-us-p > .inner-item {
      display: none;
    }

    .about-us-p > .inner-item-active {
      display: block;
      background-color: #212121;
      position: absolute;
      top: 100%;
      z-index: 1;
    }

    .about-us-p > .inner-item-active > p {
      padding: 0.7rem 0.4rem;
    }

    .not-show {
      display: none;
    }

    .search-container {
      flex: 1;
      display: flex;
      align-items: center;
      position: relative;
      // margin: 0 2rem;

      .primary_serach_box {
        flex: 1;
        width: 100%;
        position: absolute;
      }

      > input {
        width: 100%;
        border: none;
        outline: none;
        padding: 0 0.5rem;
      }

      > button {
        border: none;
        color: white;
        font-weight: bold;
        font-size: 1rem;
        background-color: #4ac85d;
        padding: 0.3rem 1rem;
      }
    }
  }

  .s-logo {
    flex: 0.2;
    text-align: center;
    background-color: #4ac85d;
    color: white;
    padding: 1.2rem 0;
    font-weight: bold;
    position: relative;

    .sub-cata {
      display: none;
    }
  }

  .s-logo:hover {
    cursor: pointer;
    .sub-cata {
      position: absolute;
      background: white;
      top: 100%;
      z-index: 10;
      display: flex;
      justify-content: center;
      width: 20vw;

      .cata {
        padding: 0.7rem 2rem;
        margin: 0.7rem 0;
        color: black;
        font-weight: bold;
        display: flex;
        justify-content: center;
      }

      .cata:hover {
        background-color: whitesmoke;
      }
    }
  }

  .cart-icon-secondary {
    display: none;
  }

  .mobile-nav-container {
    display: none;
  }

  @media (max-width: 769px) {
    .nav-items {
      display: none;
    }

    .s-logo {
      display: none;
    }

    .mobile-nav-container {
      display: flex;
      flex-direction: column;
      width: 100vw;
      font-weight: bold;
      background-color: #4ac85d;

      .mobile-nav-logo .upper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 1rem;
        height: 8vh;

        > button {
          background-color: #4ac85d;
          color: white;
          border: none;
          font-size: 2rem;
          outline: none;
        }
        .mobile-right {
          display: flex;
          align-items: center;

          /* > button {
            background-color: #4ac85d;
            color: white;
            border: none;
            font-size: 2rem;
            outline: none;
          } */
        }
      }

      .mobile-nav-logo .down .mobile-search-container {
        flex: 1;
      }

      /* .mobile-nav-items-no-show {
        display: none;
      }

      .mobile-nav-items {
      } */
    }
  }
`;

export const MobileVisibility = styled.div.attrs((props) => ({
  className: props.className,
}))`
  &.active {
    background-color: #4ac85d;
    /* padding-top: 0; */
    height: 900px;
    text-align: center;
    animation: nav-amination 0.7s;
    /* position: absolute; */
    width: 100%;
    z-index: 10000;
    /* margin-top: 0; */
    display: block;
    /* margin-top: calc(100vh - 82vh); */

    p {
      padding: 1rem 0;
    }
  }

  display: none;
`;
