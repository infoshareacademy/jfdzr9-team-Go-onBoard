import styled from "styled-components";

export const BuddyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  max-width: 400px;
  height: 300px;
  box-shadow: rgb(0 0 0 / 15%) 4px 5px 10px;
  border-radius: 31.2294px;
  background-color: #ffffff;
  padding: 15px;
  margin: 10px;
  margin-top: 75px;
`;

export const BuddyNameBlock = styled.div`
  display: flex;
  align-items: flex-start;
  width: 385px;
`;

export const BuddyImgContainer = styled.div`
  /* width: 100px; */
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const BuddyImg = styled.img`
  width: 105px;
  height: 105px;
  filter: none;
`;
