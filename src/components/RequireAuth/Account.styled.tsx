import styled from "styled-components";

export const AccountContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: min-content;
`;

export const LogOutBlock = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 5px;
  height: 60px;
`;

export const BtnLogOut = styled.button`
  background-image: url("/src/assets/pliki-svg-dashboard/logout-svgrepo-com.svg");
  background-size: cover;
  background-color: white;
  width: 40px;
  height: 40px;
  margin-right: 8px;
  margin-top: 8px;
`;

export const AccountBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 387px;
`;

export const AccountInfo = styled.p`
  margin: 3px;
`;
