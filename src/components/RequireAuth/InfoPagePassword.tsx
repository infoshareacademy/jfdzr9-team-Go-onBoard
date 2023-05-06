import { Link, useNavigate } from "react-router-dom";
import { useState, FormEvent } from "react";
import { auth } from "../../utils/firebase/firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Card, Card2, Cards, ImgMain, LinkName, LogoImg, LogoName, NamePage, TextString } from "./Sign.styled";

export const InfoPagePassword = () => {
  return (
    <>
      <Cards>
        <Card2>
          <ImgMain src="/assets/Chlopak.png"></ImgMain>
        </Card2>
        <Card>
          <LogoImg src="/assets/Asset.png"></LogoImg>

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
    </>
  );
};
