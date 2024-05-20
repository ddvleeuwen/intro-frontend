import { Button, Description, Field, Input, Label } from '@headlessui/react'
import { Navigate } from "react-router";


const LoginPage = () => {
  const queryParameters = new URLSearchParams(window.location.search)
  const code = queryParameters.get("code")

  if (code && /^\d+$/.test(code)) {
    document.cookie = "token=" + code;
    return <Navigate to="/team"/>;
  }

  return (
    <div className="">
      <Field>
        <Label className="text-md font-bold text-txt-primary dark:text-dark-txt-primary">Login Code</Label>
        <Description className="mt-1 text-sm text-txt-secondary dark:text-dark-txt-secondary">
          Enter your groups secret login code here
        </Description>
        <Input
          className="mt-4 px-2 py-1 bg-bg-secondary text-txt-primary border-2 rounded-lg dark:bg-dark-bg-secondary dark:text-dark-txt-primary"
          placeholder="1234567890"
        />
      </Field>

      <Button className="mt-4 p-1 px-4 flex gap-2 items-center rounded-full bg-primary text-txt-contrast border-2 border-primary-border dark:bg-dark-primary dark:text-dark-txt-contrast dark:border-dark-primary-border">
        Log in!
      </Button>
    </div>
  )
}

export default LoginPage;
