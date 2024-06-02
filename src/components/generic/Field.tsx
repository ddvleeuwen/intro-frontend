import { Field as UIField, Description, Input, Label } from "@headlessui/react";
import { IconExclamationCircle } from "@tabler/icons-react";

export type FieldProps = {
  error: string;
  label: string,
  defaultValue?: string;
  description: string,
  placeholder: string,
  setValue: (value: string) => void,
}

const Field = (props: FieldProps) => {
  return (
    <UIField>
      <Label className="text-md font-bold text-txt-primary dark:text-dark-txt-primary">
        {props.label}
      </Label>
      <Description className="mt-1 text-sm text-txt-secondary dark:text-dark-txt-secondary">
        {props.description}
      </Description>
      <Input
        className="mt-4 px-2 py-1 bg-bg-secondary text-txt-primary border-2 rounded-lg dark:bg-dark-bg-secondary dark:text-dark-txt-primary"
        placeholder={props.placeholder}
        onChange={(e) => props.setValue(e.target.value)}
        defaultValue={props.defaultValue}
      />
      {props.error && (
        <p className="mt-2 text-red-400 text-sm flex gap-1 items-center">
          <IconExclamationCircle size="18px"/>
          {props.error}
        </p>
      )}
    </UIField>
  )
}

export default Field;
