import { ChangeEvent, useState } from "react";
import { languagesAvailable, setLanguage } from "./languageSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooksRedux";

const LanguageView = () => {
  const language = useAppSelector((state) => state.language.language);
  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();

    dispatch(setLanguage(e.target.value));
  };

  return (
    <select value={language} onChange={handleChange}>
      <option value="en">EN</option>
      <option value="ro">RO</option>
    </select>
  );
};

export default LanguageView;
