import styled from "styled-components";

export const PrimaryNavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;

  .nav-logo {
    flex: 0.1;
    margin-left: 2rem;
  }

  .nav-items {
    flex: 0.9;
    display: flex;
    align-items: center;

    .primary_serach_box {
      flex: 1;
    }
  }

  .nav-links {
    display: flex;
    align-items: center;

    .nav-specific-link {
      margin-right: 2rem;
      display: flex;
      align-items: center;
      text-decoration: none;
      color: black;
    }

    .user-profile {
      position: relative;
      margin-right: 2rem;
      display: flex;
      align-items: center;
      text-decoration: none;
      color: black;

      .profile-options {
        display: none;
      }

      .no-profile-options {
        display: none;
      }
    }

    .user-profile:hover {
      .profile-options {
        display: inline;
        position: absolute;
        top: 1.5rem;
        left: -3rem;
        background-color: white;
        width: 18vw;
        z-index: 1;
        border-radius: 5px;
      }

      .profile-options > p {
        padding: 0.6rem 0 1rem 0;
        display: flex;
        justify-content: center;
        align-items: center;
        /* border-bottom: 1px solid gray; */
      }
    }
  }

  @media (max-width: 1024px) and (min-width: 725px) {
    .nav-logo > h1 {
      font-size: 1.3rem;
    }
  }
  @media (max-width: 769px) {
    display: none;
  }
`;

export const Demo = styled.div`
  text-align: center;
  background-color: #4ac85d;
  color: white;
  padding: 1.2rem 0;
  font-weight: bold;
  position: relative;

  .sub-cata {
    position: absolute;
    background: white;
    top: 9.3vh;
    z-index: 10;
    display: flex;
    justify-content: center;
    width: 20vw;
  }
`;
