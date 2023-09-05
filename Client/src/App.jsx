import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const { i18n, t } = useTranslation(["common"]);

  const [emailInput, setEmailInput] = useState("");
  const [formError, setFormError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleEmailChange = (e) => {
    setEmailInput(e.target.value);
  };

  const handleLangChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  useEffect(() => {
    if (localStorage.getItem("i18nextLng")?.length > 2) {
      i18n.changeLanguage("en");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailInput) {
      setFormError(true);
      setErrorMessage(t("email-missing"));
      return;
    } else {
      try {
        const sent = await axios.post("http://localhost:8080/email", {
          email: emailInput,
          lang: localStorage.getItem("i18nextLng"),
        });
        console.log(sent);
        if (sent.status === 200) {
          setFormSuccess(true);
          setSuccessMessage(t("success"));
        } else {
          setFormError(true);
          setErrorMessage(t("fail1"));
        }
      } catch (error) {
        setFormError(true);
        setErrorMessage(t("fail2"));
      }
    }
  };

  return (
    <>
      <div>
        {t("title")}
        <select
          value={localStorage.getItem("i18nextLng")}
          onChange={(event) => handleLangChange(event)}
          name=""
          id=""
        >
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
        </select>
        <form onSubmit={handleSubmit} action="">
          <input
            onChange={handleEmailChange}
            value={emailInput}
            type="text"
            placeholder={t("placeholder")}
          />
          <button>{t("submit")}</button>
        </form>
        {formError && <p>{errorMessage}</p>}
        {formSuccess && <p>{successMessage}</p>}
      </div>
    </>
  );
}

export default App;
