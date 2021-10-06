import styled from "styled-components";

export const BannerContainer = styled.div`
  width: 100%;
  height: 85vh;
  /* margin-top: 3vh; */
  margin-left: auto;
  margin-right: auto;
  position: relative;
  /* margin-bottom: 10rem; */

  .banner-img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    z-index: -1;
    /* margin-bottom: -12rem; */
    /* fade image */
    mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
  }

  .cab-card {
    display: flex;
    z-index: 1;
    margin: 0 5px;
    position: absolute;
    top: 10rem;
  }

  @media (max-width: 720px) {
    width: 100%;
    height: 45vh;
    /* margin-top: 0; */
    margin-bottom: 27rem;

    .cab-card {
      top: 10rem;
    }

    .banner-img {
      /* margin-bottom: -9rem; */
    }
  }
  @media (min-width:720px) and (max-width: 768px) {
    margin-bottom: 5rem;
  }

  @media (min-width:769px) and (max-width: 1024px) {
    margin-bottom: -12rem;
  }
`;
