import { Button } from '@headlessui/react'
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import Field from "../components/generic/Field.tsx";
import { login } from "../services/auth.service.tsx";
import { setSubTitle } from "../utils/title.tsx";

const LoginPage = () => {
  useEffect(() => setSubTitle('Login'), []);

  const queryParameters = new URLSearchParams(window.location.search)
  const code = queryParameters.get("code") ?? queryParameters.get("joinCode")

  const navigate = useNavigate();

  const [ inputCode, setInputCode ] = useState("");
  const [ error, setError ] = useState("");

  const tryLogin = (loginCode: string) => {
    if (/^\d+$/.test(loginCode)) {
      login(loginCode).then(() => {
        // use react-router route to /team
        navigate("/team");
      }).catch(() => {
        setError("Wrong login code, please try again");
      });
    } else {
      setError("Invalid format for a login code, please only use numbers");
    }
  }

  if (code) tryLogin(code);

  if (code && !error) {
    return <></>
  }

  const submit = () => {
    if (inputCode) {
      tryLogin(inputCode);
    }
  }

  return (
    <>
      <Field
        label="Login Code"
        description="Enter your groups secret login code here"
        error={error}
        placeholder={"123456"}
        defaultValue={code ?? undefined}
        setValue={setInputCode}
      />

      <Button onClick={submit} className="mt-4 p-1 px-4 flex gap-2 items-center rounded-full bg-primary text-txt-contrast border-2 border-primary-border dark:bg-dark-primary dark:text-dark-txt-contrast dark:border-dark-primary-border">
        Log in!
      </Button>
    </>
  )
}

export default LoginPage;
