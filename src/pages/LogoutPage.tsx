import { Navigate } from "react-router";

const LogoutPage = () => {
  localStorage.removeItem('token');
  window.dispatchEvent(new Event('storage'));
  return (<Navigate to='/'/>);
}

export default LogoutPage;
