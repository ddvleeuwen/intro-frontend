import { cst } from "../constants.tsx";

export const setSubTitle = (subTitle: string) => {
  document.title = `${cst.title} - ${subTitle}`
}
