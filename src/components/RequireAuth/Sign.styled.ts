import styled from "styled-components";
import { Weight } from "tabler-icons-react";

export const LogoName = styled.p`
  font-size: 24px;
  color: #000000;
  font-family: "Inter";
  font-style: normal;
  font-weight: 300;
  line-height: 35px;
  text-align: center;
  padding: 0px 0px 50px 0px;
  flex: none;
  order: 2;
  flex-grow: 0;
`;

export const NamePage = styled.h1`
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 44px;
  line-height: 28px;
  text-align: center;
  color: #101828;
  padding-bottom: 49px;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`;

export const LogoImg = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
  padding-top: 39px;
  width: 75px;
  height: 89.95px;
  flex: none;
  order: 1;
  flex-grow: 0;
`;

export const Input = styled.input`
  box-sizing: border-box;
  display: flex;
  margin-left: 131px;
  align-items: end;
  padding: 10px 14px;
  gap: 8px;
  /* Auto layout */

  width: 320px;
  height: 44px;

  /* White */

  background: #ffffff;
  /* Gray/300 */

  border: 1px solid #d0d5dd;
  /* Shadow/xs */

  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 8px;

  /* Inside auto layout */

  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
`;

export const Label = styled.label`
  margin-left: 131px;

  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #344054;
  padding: 0px 6px 0px 0px;
`;

export const Button = styled.button`
  margin: 0 auto;
  display: block;
  margin-top: 79px;
  gap: 8px;
  width: 161px;
  height: 48px;
  background: #020246;
  border: 1px solid #020246;
  box-shadow: 8px 8px 24px rgba(2, 2, 70, 0.15);
  border-radius: 8px;
`;

export const LinkName = styled.p`
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 28px;
  text-align: center;
  color: #101828;
`;

export const PageInfo = styled.div`
  display: flex;
  position: absolute;
  width: 1600px;
  height: 840px;
  left: 0px;
  top: 0px;

  /* Secondary */

  background: #eff0f7;
  opacity: 0.8;
`;

export const PageImg = styled.div``;

/* export const Link = styled.Link`
  font-family: "Inter";
`; */

export const MainImg = styled.div`
  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`;

export const ImgMain = styled.img`
  /* Inside auto layout */
  width: 764px;
  height: 764px;

  flex: none;
  order: 0;
  flex-grow: 0;
`;

export const MainInfo = styled.div`
  width: 582px;
  height: 839px;

  background: #ffffff;
  /* Shadow field */

  box-shadow: 8px 8px 24px rgba(2, 2, 70, 0.05);
  border-radius: 31.2294px;

  /* Inside auto layout */
`;

export const TextString = styled.p`
  text-align: center;
`;
