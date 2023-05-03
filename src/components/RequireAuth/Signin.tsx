import { Link, useNavigate } from "react-router-dom";
import { useState, FormEvent } from "react";
import { auth } from "../../utils/firebase/firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  Button,
  ImgMain,
  Input,
  Label,
  LinkName,
  LogoImg,
  LogoName,
  MainImg,
  MainInfo,
  NamePage,
  PageInfo,
  TextString,
} from "./Sign.styled";

type FirebaseErrorCode =
  | "auth/email-already-in-use"
  | "auth/invalid-email"
  | "auth/user-not-found"
  | "auth/wrong-password"
  | "auth/weak-password";

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
      <PageInfo>
        <MainImg>
          <ImgMain src="/assets/Chlopak.png"></ImgMain>
        </MainImg>
        <MainInfo>
          <LogoImg src="/assets/Asset.png"></LogoImg>

          <LogoName>
            <b>GO!</b> onBoard
          </LogoName>
          <NamePage>Zarejestruj się</NamePage>
          <form onSubmit={handleSubmit}>
            <div>
              <Label>Email</Label>
              <br />
              <Input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Wpisz swój email"
              />
            </div>
            <div>
              <Label>Hasło</Label>
              <br />
              <Input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Wpisz swoje hasło"
              />
              <TextString>{error}</TextString>
            </div>
            <div>
              <Button type="submit">Zaloguj</Button>
            </div>
          </form>
          <div>
            <LinkName>
              <Link to="/signup">Zarejestruj się</Link>
            </LinkName>
            <LinkName>
              <a href="/signpassword">Nie pamiętam hasła</a>
            </LinkName>
          </div>
        </MainInfo>
      </PageInfo>
    </>
  );
};
