import styled from "styled-components";
export const ActivitiesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;
  background: #ffffff;
  width: 300px;
  padding: 2rem;
  box-shadow: rgb(0 0 0 / 15%) 4px 5px 10px;
  border-radius: 31.2294px;
`;
export const ActivitiName = styled.div`
  font-family: "Inter";
  font-style: normal;
  font-size: 1rem;
  /* color: #020246; */
  font-weight: 700;
  text-align: start;
`;
export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 2rem;
`;
export const EtapContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  background: #ffffff;
  width: 50rem;
  height: 100%;
  padding: 2rem;
  box-shadow: 8px 8px 24px rgba(2, 2, 70, 0.05);
  border-radius: 31.2294px;
`;
export const Transparent = styled.button`
  background-color: transparent;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  /* filter: brightness(0) saturate(100%) invert(9%) sepia(34%) saturate(5579%)
    hue-rotate(234deg) brightness(90%) contrast(121%); */
`;
export const StyledH4 = styled.h4`
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 28px;
`;
export const StyledH3 = styled.h3`
  font-family: Inter;
  font-style: normal;
  font-weight: 800;
  font-size: 1.2rem;
  line-height: 20px;
`;

export const DetailsWraper = styled.div`
  width: 700px;

  display: flex;
  flex-direction: column;

  padding: 2rem;
  box-shadow: rgba(0, 0, 0, 0.15) 4px 5px 10px;
  border-radius: 31.2294px;
`;

export const LinkFetched = styled.div`
  box-sizing: border-box;
  margin-top: 10px;
`;

export const StyledLinkFetchedHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px 20px 16px 16px;
  gap: 4px;
  filter: brightness(0) saturate(100%) invert(9%) sepia(34%) saturate(5579%)
    hue-rotate(234deg) brightness(90%) contrast(121%);
`;

export const HeaderInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;

  border: 1px solid #e4e7ec;
  border-radius: 8px 8px 0px 0px;
`;

export const HeaderInfoButton = styled.div`
  border: 1px solid #e4e7ec;
  border-radius: 0px 0px 8px 8px;
  padding: 16px 12px;
`;
