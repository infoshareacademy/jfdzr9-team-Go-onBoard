import styled from "styled-components";

export const BuddyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 40px 5px;

  width: 387px;
  min-height: 217px;
  max-height: 217px;
  box-shadow: rgb(0 0 0 / 15%) 4px 5px 10px;
  border-radius: 31.2294px;
  flex: none;
  order: 1;
  flex-grow: 0;
  background-color: #ffffff;
`;

export const BuddyNameBlock = styled.div`
  width: 380px;
  display: flex;
  align-items: flex-start;
  margin-left: 30px;
`;

export const BuddyImgContainer = styled.div`
  width: 380px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const BuddyImg = styled.img`
  width: 105px;
  height: 105px;
  filter: none;
`;
