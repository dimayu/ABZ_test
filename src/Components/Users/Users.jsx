import { useSelector } from 'react-redux';

import { User } from '../index';

import './Users.scss';

export const Users = () => {
  const users = useSelector(state => state.users.users.items.users);
  
  return (
    <section className="section section__users" id="users">
      <div className="wrapper">
        <h2 className="section__title">Working with GET request</h2>
        <div className="users">
          {users?.map(item => (
            <User key={item.id} item={item}/>
          ))}
        </div>
      </div>
    </section>
  );
};