import { ChangeEvent } from "react";
import { setTheme } from "./themeSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooksRedux";

const ThemeView = () => {
  const theme = useAppSelector((state) => state.theme.theme);
  const dispatch = useAppDispatch();

  const toggleSwitch = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.checked);

    dispatch(setTheme());
  };

  return (
    <div className="toggle-switch">
      <label>
        <input
          type="checkbox"
          checked={theme === "light"}
          onChange={toggleSwitch}
        />
        <span className="slider"></span>
      </label>
    </div>
  );
};

export default ThemeView;
