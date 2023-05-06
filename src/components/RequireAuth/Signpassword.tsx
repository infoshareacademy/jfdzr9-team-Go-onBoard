import { Link, Navigate, useNavigate } from "react-router-dom";
import React, { useState, FormEvent } from "react";
import { auth, passwordReset } from "../../utils/firebase/firebase.config";
import { sendPasswordResetEmail } from "firebase/auth";
import { log } from "console";
import {
  Button,
  Card,
  Card2,
  Cards,
  Footer,
  FormSign,
  ImgMain,
  Input,
  Label,
  LinkName,
  LogoImg,
  LogoImgFooter,
  LogoName,
  LogoNameFooter,
  NamePage,
  TextString,
} from "./Sign.styled";
import imgProgrammer from "../../assets/signin/Chlopak.png";
import imgLogo from "../../assets/signin/Logo.png";

export const Signpassword = () => {
  const [email, setEmail] = useState("");
  const [emailMessage, setEmailMessage] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const resetField = () => {
    setEmail("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await passwordReset(email);
      setEmailMessage(true);
      resetField();
      navigate("/InfoPagePassword");
    } catch (error: any) {
      console.log({ error });

      if (error.code === "auth/user-not-found") {
        setError(
          "Nie znaleźliśmy podanego adresu e-mail w bazie danych. Upewnij się, że wprowadziłeś poprawny adres e-mail lub skontaktuj się z naszym działem wsparcia w celu uzyskania dalszej pomocy."
        );
        setEmail("");
      }
    }
  };
  return (
    <>
      <Cards>
        <Card2>
          <ImgMain src={imgProgrammer} alt="programista"></ImgMain>
        </Card2>
        <Card>
          <LogoImg src={imgLogo} alt="logo"></LogoImg>

          <LogoName>
            <b>GO!</b> onBoard
          </LogoName>

          <NamePage>Przypomnij hasło</NamePage>

          <FormSign onSubmit={handleSubmit}>
            <div>
              <Label>Email</Label>
              <br></br>
              <Input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Wpisz swój email" />
              <TextString>{error}</TextString>
            </div>
            <Button type="submit">Wyślij</Button>
          </FormSign>
          <div>
            <LinkName>
              <Link to="/signup">Rejestracja</Link>
            </LinkName>
            <LinkName>
              <a href="/">Logowanie</a>
            </LinkName>
          </div>
        </Card>
      </Cards>
      <Footer>
        <LogoImgFooter src={imgLogo} alt="logo"></LogoImgFooter>
        <LogoNameFooter>
          <b>GO!</b> onBoard
        </LogoNameFooter>
        <p>Design © Grupa2 2023</p>
      </Footer>
    </>
  );
};
