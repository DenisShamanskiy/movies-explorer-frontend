import "./Main.css";
import Promo from "../Promo/Promo";
import Header from "../Header/Header";

function Main() {
  return (
    <>
      <Header />
      <main className="app__content">
        <Promo />
      </main>
    </>
  );
}

export default Main;
