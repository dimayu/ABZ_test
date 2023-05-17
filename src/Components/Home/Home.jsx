import './Home.scss';

export const Home = () => {
  return (
    <section className="section section-home">
      <div className="section-home__bg">
        <picture className="section-home__bg--img" data-alt="bg">
          <source type="image/webp" srcSet="img/bg-home.webp"/>
          <img src="img/bg-home.jpg" alt="bg" width="1024" height="650"/>
        </picture>
      </div>
      <div className="section-home__content">
        <h1 className="section-home__content__title">Test assignment for front-end developer</h1>
        <h2 className="section-home__content__subtitle">What defines a good front-end developer is one that has skilled
          knowledge of HTML, CSS, JS with a vast
          understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They
          should also be excited to learn, as the world of Front-End Development keeps evolving.</h2>
        <a href="#sign" className="btn">Sign up</a>
      </div>
    </section>
  );
};