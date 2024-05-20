import { ReactNode } from "react";
import {
  IconCamera,
  IconClipboardList,
  IconHomeCheck,
  IconLogin2,
} from "@tabler/icons-react";
import LandingPage from "./pages/LandingPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import TeamOverviewPage from "./pages/team/TeamOverviewPage.tsx";

export type RouteType = {
  name: string;
  path: string;
  component: ReactNode;
  icon?: ReactNode;
}

export const navigation: RouteType[] = [
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
  component: <TeamOverviewPage/>,
  name: "Speel",
  path: "/team",
  icon: <IconCamera size="18px"/>
}

export const buttonRoutes: RouteType[] = [
  {
    component: <LoginPage/>,
    name: "Login",
    path: "/login",
    icon: <IconLogin2/>
  }
]

export const combined = [
  ...navigation,
  ...(actionRoute ? [ actionRoute ] : []),
  ...buttonRoutes,
]
