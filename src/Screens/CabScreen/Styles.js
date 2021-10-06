import styled from "styled-components";

export const CabContainer = styled.div`
  background-color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 60%;
  margin: auto;
  margin-top: 2.5rem;
  border-radius: 5px;
  box-shadow: 0px 1px 7px 1px lightgray;
  .cab-left{
    height: 18rem;
    overflow-y: auto;
    /* .truck-table{
      width: 400;
    } */
    .truckimg{
      height: 3rem;
      width: 3rem;
    }
  }
  .cab-left::-webkit-scrollbar {
    width: 5px; 
}

.cab-left::-webkit-scrollbar-track {
    background: grey;
}

.cab-left::-webkit-scrollbar-thumb {
    margin-right: 5px;
    border-radius: 5px;
    background: black;
}
  .sub-sec {
    display: flex;
    flex-direction: column;
    margin: 2rem 0;

     .cabbtn {
      border: none;
      outline: none;
      padding: 0.5rem;
      background-color: #4ac85d;
      color: white;
      font-size: 1.1rem;
      border-radius: 5px;
      cursor: pointer;
    }

     .cabbtn:hover {
      background-color: #3eab4e;
    }
  }

  @media (max-width: 720px) {
    .cab-left {
      /* display: none; */
      margin-top: 1rem;
    .truck-table{
      width: auto !important;
    }
    }

    flex-direction: column;
    width: 90%;
    .cab-right {
      .sub-sec > h1 {
        text-align: center;
      }
    }
  }
`;
