import { Link, useNavigate } from "react-router-dom";
import { useState, FormEvent } from "react";
import { auth } from "../../utils/firebase/firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Button, ImgMain, Input, Label, LinkName, LogoImg, LogoName, MainImg, MainInfo, NamePage, PageInfo, TextString } from "./Sign.styled";

export const InfoPagePassword = () => {
  return (
    <>
      <PageInfo>
        <MainImg>
          <ImgMain src="/assets/Chlopak.png"></ImgMain>
        </MainImg>
        <MainInfo>
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
        </MainInfo>
      </PageInfo>
    </>
  );
};
