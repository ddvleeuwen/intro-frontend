import Header from "./components/Header.tsx";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { combined, navigation, actionRoute } from "./routes.tsx";
import Sidebar from "./components/Sidebar.tsx";

const AppRoot = () => {
  const [ prevScrollPos, setPrevScrollPos ] = useState(0);
  const [ visible, setVisible ] = useState(false);
  const [ sidebarHidden, setSidebarHidden ] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      if (Math.abs(prevScrollPos - currentScrollPos) > 16) {
        setVisible(prevScrollPos > currentScrollPos && currentScrollPos > 112);
        setPrevScrollPos(currentScrollPos);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [ prevScrollPos, visible ]);

  useEffect(() => {
    if (sidebarHidden) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }, [ sidebarHidden ]);

  return (
    <Router>
      <div className="w-full fixed z-50 top-0 h-0.5 bg-primary dark:bg-dark-primary-border">
        <div className="w-fit py-1 px-4 ml-10 bg-primary scale-0 rounded focus-within:scale-100 dark:bg-dark-primary">
          <a href="#main" className="text-txt-contrast dark:text-dark-txt-contrast">Skip to content</a>
        </div>
      </div>
      <div className={`p-8 max-md:px-4 sticky transition-all ${visible ? 'top-0' : 'top-[-100%]'}`}>
        <Header routes={navigation} actionRoute={actionRoute} setSidebarHidden={setSidebarHidden}/>
      </div>
      <Sidebar setHidden={setSidebarHidden} hidden={sidebarHidden}/>
      <main id="main" className="mx-8 px-6 max-md:px-0">
        <Routes>
          {combined.map((route, index) => (
            <Route key={index} path={route.path} element={route.component} />
          ))}
        </Routes>
      </main>
      <div className="footer"></div>
    </Router>
  )
}

export default AppRoot
