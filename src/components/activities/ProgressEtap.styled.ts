import { Link } from "react-router-dom";
import styled from "styled-components";

interface StagesLinksProps {
  to: string;
}

export const ProgressWraper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  justify-content: center;
  margin: 30px auto 15px;
`;

export const DonutChart = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const EtapsIcon = styled.img`
  filter: brightness(0) saturate(100%) invert(97%) sepia(97%) saturate(0%)
    hue-rotate(46deg) brightness(102%) contrast(105%);
`;

export const StagesLinks = styled(Link)<StagesLinksProps>`
  height: 40px;
  width: 126px;
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  /* font-size: 1em; */
  font-weight: 500;
  font-family: inherit;
  background-color: var(--primary-1);
  cursor: pointer;
  transition: border-color 0.25s;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
`;
