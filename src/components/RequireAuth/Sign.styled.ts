import styled from "styled-components";
import { Weight } from "tabler-icons-react";

export const LogoName = styled.p`
  font-size: 24px;
  font-weight: 300;
  text-align: center;
  padding: 0px 0px 50px 0px;
`;

export const NamePage = styled.h1`
  font-weight: 500;
  font-size: 180%;
  text-align: center;
  padding-bottom: 25px;
`;

export const LogoImg = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
  padding-top: 39px;
  width: 75px;
  height: 89.95px;
`;

export const Input = styled.input`
  box-sizing: border-box;

  padding: 10px 14px;

  width: 18rem;
  height: 44px;

  border: 1px solid #d0d5dd;

  border-radius: 8px;
`;

export const Label = styled.label`
  font-weight: 500;
  font-size: 14px;
`;

export const FormSign = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Button = styled.button`
  margin: 0 auto;
  display: block;
  margin-top: 79px;
  gap: 8px;
  width: 161px;
  height: 48px;
  background: var(--primary-1);
  border: 1px solid #020246;
  box-shadow: 8px 8px 24px rgba(2, 2, 70, 0.15);
  border-radius: 8px;
`;

export const LinkName = styled.p`
  font-size: 18px;
  text-align: center;
`;

export const ImgMain = styled.img`
  width: 40rem;
  height: 40rem;
`;

export const TextString = styled.p`
  text-align: center;
  color: red;
`;

export const Card = styled.div`
  padding: 1rem;
  min-height: 839px;
  height: auto;

  box-shadow: rgba(2, 2, 70, 0.05) 8px 8px 24px;
  border-radius: 31.2294px;
  background-color: white;
  @media (max-width: 1200px) {
    width: 470px;
  }
`;

export const Card2 = styled.div`
  padding: 1rem;
  min-height: 839px;
  height: auto;

  @media (max-width: 1200px) {
    display: none;
  }
`;

export const Cards = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
