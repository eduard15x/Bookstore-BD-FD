import { Outlet, Link } from "react-router-dom";
import { useAppSelector } from "./app/hooksRedux";
import LanguageView from "./features/language/LanguageView";
import ThemeView from "./features/theme/ThemeView";

function App() {
  const language = useAppSelector(state => state.language.language);
  const theme = useAppSelector(state => state.theme.theme);

  return (
    <div>
      <h1>React Project</h1>

      <h2>Language switch dropdown menu</h2>
      <LanguageView />
      { language === 'en' ? <p>This is parent component</p> : <p>Aceasta este componenta parinte</p> }


      <h2>Theme switch button</h2>
      <ThemeView />
      { theme === 'dark' ? <p>This is a dark theme</p> : <p>This is a light theme</p> }

      <Outlet />
      <Link to={`about`}>Your about</Link>
      <Link to={`account`}>Your account</Link>
      <Link to={`cart`}>Your cart</Link>
    </div>
  );
}

export default App;
