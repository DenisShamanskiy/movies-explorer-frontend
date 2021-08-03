import "./Main.css";
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import Header from "../Header/Header";

function Main() {
  return (
    <>
      <Header />
      <main className="app__content">
        <Promo />
        <AboutProject />
        <Techs />
      </main>
    </>
  );
}

export default Main;
