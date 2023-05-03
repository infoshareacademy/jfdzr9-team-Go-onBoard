import styled from "styled-components";

export const CalendarBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  gap: 5px;
  width: 387px;
  min-height: 337px;
  max-height: 337px;
  box-shadow: rgb(0 0 0 / 15%) 4px 5px 10px;
  border-radius: 31.2294px;
  order: 1;
  flex-grow: 0;
  background-color: #ffffff;
`;

export const UserInfo = styled.span`
  display: flex;
  margin: 3px;
  align-items: center;
  align-content: center;
`;

export const CourseDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

export const UserInfoImgGift = styled.img`
  width: 35px;
  height: 35px;
  filter: none;
  margin-right: 15px;
`;

export const UserInfoResult = styled.img`
  width: 35px;
  height: 35px;
  filter: none;
  margin-right: 15px;
`;

export const UserInfoClock = styled.img`
  width: 35px;
  height: 35px;
  filter: none;
  margin-right: 15px;
`;
