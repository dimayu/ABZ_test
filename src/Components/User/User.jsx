import './User.scss';

export const User = ({item}) => {
  const phone = item.phone.replace(/(\d{2})(\d{3})(\d{3})(\d{2})(\d{2})/, "$1 ($2) $3 $4 $5");
  
  return (
    <div className="users__item">
      <img className="users__item__photo" src={item.photo} alt={item.name}/>
      <h4 className="users__item__name">{item.name}</h4>
      <div className="users__item__description">
        <p className="users__item__description--position">{item.position}</p>
        <p className="users__item__description--email">{item.email}</p>
        <p className="users__item__description--phone">{phone}</p>
      </div>
    </div>
  );
}