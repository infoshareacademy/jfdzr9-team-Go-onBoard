import { Link, useNavigate } from "react-router-dom";
import { useState, FormEvent } from "react";
import { auth } from "../../utils/firebase/firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Card, Card2, Cards, Footer, ImgMain, LinkName, LogoImg, LogoImgFooter, LogoName, LogoNameFooter, NamePage, TextString } from "./Sign.styled";
import imgLogo from "../../assets/signin/Logo.png";

export const InfoPagePassword = () => {
  return (
    <>
      <Cards>
        <Card2>
          <ImgMain src="/src/assets/signin/Chlopak.png"></ImgMain>
        </Card2>
        <Card>
          <LogoImg src="/src/assets/signin/Logo.png"></LogoImg>

          <LogoName>
            <b>GO!</b> onBoard
          </LogoName>
          <NamePage>Hasło zrestartowane</NamePage>
          <TextString>Na Twój adres e-mail wysłaliśmy link resetujący hasło</TextString>
          <p>
            <LinkName>
              <a href="/">Logowanie</a>
            </LinkName>
          </p>
        </Card>
      </Cards>
      <Footer>
        <LogoImgFooter src={imgLogo} alt="logo"></LogoImgFooter>
        <LogoNameFooter>
          <b>GO!</b> onBoard
        </LogoNameFooter>
        <a href="https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcRzDDHzcpblDzkgQvCFwsgbGgZWNZmQvQHdVkVXTQCpztCghcmgVsNkDkRjlVBpkZkGBtCXw">
          Kontakt z supportem
        </a>
        <p>Design © Grupa2 2023</p>
      </Footer>
    </>
  );
};
