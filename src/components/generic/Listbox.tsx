import { Fragment, ReactElement, useEffect, useState } from "react";
import { Listbox as UIListbox } from "@headlessui/react";

export type ListboxOption = {
  id: number;
  option: string;
  name: string;
  icon: ReactElement;
  headerIcon?: ReactElement | (() => ReactElement);
}

export type OnListBoxChange = (option: string) => void;

export type ListboxProps = {
  defaultOption: ListboxOption;
  options: ListboxOption[];
  onChange: OnListBoxChange;
  large: boolean;
}

const Listbox = (props: ListboxProps) => {
  const [ selectedOption, setSelectedOption ] = useState(props.defaultOption);

  useEffect(() => {
    props.onChange(selectedOption.option);
  }, [ selectedOption, props ])

  return (
    <div className="relative">
      <UIListbox value={selectedOption} onChange={setSelectedOption}>
        <UIListbox.Button
          className={`flex items-center text-txt-secondary dark:text-dark-txt-secondary hover:bg-stone-200 focus:bg-stone-200 dark:hover:bg-stone-800 dark:focus:bg-stone-800 ${props.large ? 'w-full gap-2 justify-between rounded-lg border-border border-2 px-4 h-[60px]' : 'h-9 w-9 justify-center rounded-full'}`}
          aria-label={`Select a theme, currently selected: ${selectedOption.name}`}
        >
          {props.large && ("Select a theme")}
          {typeof selectedOption.headerIcon === 'function' ? selectedOption.headerIcon() : selectedOption.headerIcon}
        </UIListbox.Button>
        <UIListbox.Options
          className={`${props.large ? "bottom-16 w-full" : "top-full right-0"} absolute mt-2 py-1 text-txt-secondary dark:text-dark-txt-secondary border border-border dark:border-dark-border rounded-lg shadow-3d-sm bg-bg-primary dark:bg-dark-bg-primary overflow-hidden`}>
          {props.options.map((option) => (
            <UIListbox.Option key={option.id} value={option} as={Fragment}>
              {({ active }) => (
                <li
                  className={`flex items-center gap-2 w-full py-1 px-4 ${active ? 'bg-bg-secondary text-txt-primary dark:bg-dark-bg-secondary dark:text-dark-txt-primary' : ''}`}>
                  <p>{option.icon}</p>
                  {option.name}
                </li>
              )}
            </UIListbox.Option>
          ))}
        </UIListbox.Options>
      </UIListbox>
    </div>
  )
}

export default Listbox;
