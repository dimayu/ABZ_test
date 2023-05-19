import { useState, useRef, useEffect } from 'react';

import { getPositions, addUser } from '../../API/API';
import { Loader } from '../index';

import './FormRegistration.scss';

export const FormRegistration = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [positions, setPositions] = useState(false);
  const [valueRadio, setValueRadio] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [img, setImg] = useState('');
  
  useEffect(() => {
    getPositions().then(data => {
        if (data) {
          setPositions(data.positions);
          setIsLoaded(true);
        }
      }
    );
  }, []);
  
  const handleChange = (e) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    
    switch (name) {
      case "name":
        return setName(value);
      
      case "email":
        return setEmail(value);
      
      case "phone":
        return setPhone(value);
  
      case "position":
        return setValueRadio(value);
      
      default:
        return;
    }
  }
  
  const handleFile = async (e) => {
    const file = e?.size;
    if (file > 5242880) {
      setImg("Please upload file less than 5mb");
    } else {
      setImg(e);
    }
  };
  
  const inputFileRef = useRef(null);
  
  const handleSubmit = () => {
    const newUser = new FormData();
    
    newUser.append('position_id', Number(valueRadio));
    newUser.append('name', name);
    newUser.append('email', email);
    newUser.append('phone', phone);
    newUser.append('photo', img);
    
    addUser (newUser);
  };
  
  return (
    <div className="section section-form-registration" id="sign">
      <div className="wrapper">
        <h2 className="section__title">Working with POST request</h2>
        <div className="form-registration">
          <div className="custom-input">
            <input type="input"
                   className="custom-input__input"
                   name="name"
                   id="name"
                   placeholder="Your name"
                   // value={name}
                   onChange={handleChange}
                   required/>
            <label htmlFor="name"
                   className="custom-input__label">Your name</label>
          </div>
          <div className="custom-input">
            <input type="input"
                   className="custom-input__input"
                   name="email"
                   id="email"
                   placeholder="Email"
                   onChange={handleChange}
                   required/>
            <label htmlFor="email"
                   className="custom-input__label">Email</label>
          </div>
          <div className="custom-input">
            <input type="input"
                   className="custom-input__input"
                   name="phone"
                   id="phone"
                   placeholder="Phone"
                   onChange={handleChange}
                   required/>
            <label htmlFor="phone"
                   className="custom-input__label">Phone</label>
          </div>
          <h4 className="form-registration__subtitle">Select your position</h4>
          {
            isLoaded
              ? positions.map(item => (
                <div className="custom-radio" key={item.id}>
                  <input type="radio"
                         id={item.id}
                         className="custom-radio__input"
                         name="position"
                         value={item.id}
                         checked={Number(valueRadio) === item.id}
                         onChange={handleChange}
                  />
                  <label htmlFor={item.id}
                         className="custom-radio__label"
                  ><span></span>{item.name}</label>
                </div>
              ))
              : <Loader/>
          }
          <div className="upload-img">
            <input
              className=""
              onChange={(e) => handleFile(e.target.files[0])}
              type="file"
              name="photo"
              id="photo"
              accept="image/jpeg, image/png image/jpg"
              width={70}
              required
              hidden
            />
            <label htmlFor="photo" className="upload-img__block">
              <div className="upload-img__block__btn">Upload</div>
              <div className="upload-img__block__input">
                {img ? img?.name?.slice(0, 20) : <p>Upload your photo</p>}
              </div>
            </label>
            <input
              type="file"
              onChange={(e) => handleFile(e.target.files[0])}
              ref={inputFileRef}
              hidden/>
          </div>
          <button className="btn" onClick={handleSubmit}>Sign up</button>
        </div>
      </div>
    </div>
  );
};