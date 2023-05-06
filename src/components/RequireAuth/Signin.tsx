import { Link, useNavigate } from "react-router-dom";
import { useState, FormEvent } from "react";
import { auth } from "../../utils/firebase/firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";

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

type FirebaseErrorCode = "auth/email-already-in-use" | "auth/invalid-email" | "auth/user-not-found" | "auth/wrong-password" | "auth/weak-password";

type FirebaseErrorMessages = {
  [key in FirebaseErrorCode]: string;
};

const firebaseErrors: FirebaseErrorMessages & { [key: string]: string } = {
  "auth/email-already-in-use": "E-mail jest już zarejestrowany.",
  "auth/invalid-email": "Wprowdź poprawny e-mail",
  "auth/user-not-found": "E-mail nie został zarejestrowany",
  "auth/wrong-password": "Niepoprawne hasło",
  "auth/weak-password": "Hasło powinno zawierać conajmniej 6 znaków",
};

export const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      auth.onAuthStateChanged((user) => {
        if (user) {
          navigate(`/dashboard/${user.uid}`);
        }
      });
    } catch (e: any) {
      setError(firebaseErrors[e.code]);
      console.log(e.message);
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
          <NamePage>Zaloguj się</NamePage>

          <FormSign onSubmit={handleSubmit}>
            <div>
              <Label>Email</Label>
              <br />
              <Input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Wpisz swój email" />
            </div>
            <div>
              <Label>Hasło</Label>
              <br />
              <Input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Wpisz swoje hasło" />
              <TextString>{error}</TextString>
            </div>
            <div>
              <Button type="submit">Zaloguj</Button>
            </div>
          </FormSign>
          <div>
            <LinkName>
              <Link to="/signup">Zarejestruj się</Link>
            </LinkName>
            <LinkName>
              <a href="/signpassword">Nie pamiętam hasła</a>
            </LinkName>
          </div>
        </Card>
      </Cards>
      <Footer>
        <LogoImgFooter src={imgLogo} alt="logo"></LogoImgFooter>
        <LogoNameFooter>
          <b>GO!</b> onBoard
        </LogoNameFooter>
        <a href="https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcRzDDHzcpblDzkgQvCFwsgbGgZWNZmQvQHdVkVXTQCpztCghcmgVsNkDkRjlVBpkZkGBtCXw">
          Napisz do nas
        </a>
        <p>Design © Grupa2 2023</p>
      </Footer>
    </>
  );
};
