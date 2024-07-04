import { Navigate } from "react-router";

const LogoutPage = () => {
  localStorage.removeItem('token');
  return (<Navigate to='/'/>);
}

export default LogoutPage;
