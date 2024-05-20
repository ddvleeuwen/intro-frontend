import { Button } from '@headlessui/react'
import { Navigate } from "react-router";
import { useState } from "react";
import Field from "../components/generic/Field.tsx";


const LoginPage = () => {
  const queryParameters = new URLSearchParams(window.location.search)
  const code = queryParameters.get("code")

  const [ inputCode, setInputCode ] = useState("")

  if (code && /^\d+$/.test(code)) {
    document.cookie = "token=" + code;
    return <Navigate to="/team"/>;
  }

  return (
    <>
      <Field
        label="Login Code"
        description="Enter your groups secret login code here"
        error=""
        placeholder="1234567890"
        setValue={setInputCode}
      />

      {inputCode}

      <Button className="mt-4 p-1 px-4 flex gap-2 items-center rounded-full bg-primary text-txt-contrast border-2 border-primary-border dark:bg-dark-primary dark:text-dark-txt-contrast dark:border-dark-primary-border">
        Log in!
      </Button>
    </>
  )
}

export default LoginPage;
