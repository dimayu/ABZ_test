import './Header.scss';

export const Header = () =>{
  return (
    <header className="header">
      <div className="wrapper">
        <div className="header__items">
          <a href="/" className="header__items__logo">
            <img src="img/logo.svg" alt="logo" width="104" height="26"/>
          </a>
          <div className="header__items__btns">
            <a href="#users" className="btn header__items__btns__btn">Users</a>
            <a href="#sign" className="btn header__items__btns__btn">Sign up</a>
          </div>
        </div>
      </div>
    </header>
  );
}