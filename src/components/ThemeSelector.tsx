import { IconDeviceDesktop, IconMoon, IconSun } from "@tabler/icons-react";
import { getLocalStoredTheme, setTheme } from "../utils/theme.tsx";
import Listbox, { ListboxOption } from "./generic/Listbox.tsx";

const getHeaderIcon = () => {
  // check for "dark" class on html element
  if (document.documentElement.classList.contains('dark')) {
    return <IconMoon/>
  } else {
    return <IconSun/>
  }
}

const getCurrentOption = (option: string) => {
  return options.find((o) => o.option === option) || options[ 2 ];
}

const options: ListboxOption[] = [
  { id: 1, option: 'light' , name: 'Light', icon: <IconSun size="18px"/>, headerIcon: <IconSun aria-label="Light Mode"/> },
  { id: 2, option: 'dark', name: 'Dark', icon: <IconMoon size="18px"/>, headerIcon: <IconMoon aria-label="Dark Mode"/> },
  { id: 3, option: 'system', name: 'System', icon: <IconDeviceDesktop size="18px"/>, headerIcon: () => getHeaderIcon() },
]

const ThemeSelector = ({ large = false }) => {
  return (
    <Listbox
      defaultOption={getCurrentOption(getLocalStoredTheme())}
      options={options}
      onChange={setTheme}
      large={large}
    />
  )
}

export default ThemeSelector;
