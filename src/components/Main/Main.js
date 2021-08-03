import "./Main.css";
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Header from "../Header/Header";

function Main() {
  return (
    <>
      <Header />
      <main className="app__content">
        <Promo />
        <AboutProject />
      </main>
    </>
  );
}

export default Main;
