import { ReactNode } from "react";
import {
  IconCamera,
  IconClipboardList,
  IconHomeCheck,
} from "@tabler/icons-react";
import LandingPage from "./pages/LandingPage.tsx";

export type RouteType = {
  name: string;
  path: string;
  component: ReactNode;
  icon?: ReactNode;
}

export const navigation: RouteType[] =
[
  {
    component: <LandingPage/>,
    name: "Home",
    path: "/",
    icon: <IconHomeCheck size="18px"/>
  },
  {
    component: <h1>About</h1>,
    name: "Spelregels",
    path: "/regels",
    icon: <IconClipboardList size="18px"/>
  },
]

export const actionRoute: RouteType | undefined = {
  component: <h1>Team overview</h1>,
  name: "Speel",
  path: "/speel",
  icon: <IconCamera size="18px"/>
}

export const combined = [
  ...navigation,
  ...(actionRoute ? [actionRoute] : [])
]