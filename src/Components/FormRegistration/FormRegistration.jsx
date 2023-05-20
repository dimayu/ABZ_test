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
  
  const [nameDirty, setNameDirty] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);
  const [phoneDirty, setPhoneDirty] = useState(false);
  const [photoDirty, setPhotoDirty] = useState(false);
  const [nameError, setNameError] = useState('The field cannot be empty');
  const [emailError, setEmailError] = useState('The field cannot be empty');
  const [phoneError, setPhoneError] = useState('The field cannot be empty');
  const [photoError, setPhotoError] = useState('The field cannot be empty');
  
  const [success, setSuccess] = useState(null);
  
  const blurHandler = (event) => {
    switch (event.target.name) {
      case 'name':
        setNameDirty(true);
        break;
      case 'email':
        setEmailDirty(true);
        break;
      case 'phone':
        setPhoneDirty(true);
        break;
    }
  };
  
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
        if (value.length < 3 || value.length > 60) {
          setNameError('Username should contain 2-60 characters');
        } else {
          setNameError('');
        }
        return setName(value);
      
      case "email":
        const reEmail = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
        
        if (!reEmail.test(String(value).toLowerCase())) {
          setEmailError('User email, must be a valid email according to RFC2822');
        } else setEmailError('');
        return setEmail(value);
      
      case "phone":
        const rePhone = /^[\+]{0,1}380([0-9]{9})$/;
        
        if (!rePhone.test(String(event.target.value).toLowerCase())) {
          setPhoneError('User phone number. Number should start with code of Ukraine +380');
        } else setPhoneError('');
        return setPhone(value);
      
      case "position":
        return setValueRadio(value);
      
      default:
        return;
    }
  };
  
  const handleFile = async (e) => {
    const file = e?.size;
    if (file > 5242880) {
      setPhotoError("Please upload file less than 5mb");
    } else {
      setImg(e);
      setPhotoError('');
      setPhotoDirty(true);
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
    
    addUser(newUser).then(data => setSuccess(data.success));
    
    setName('');
    setEmail('');
    setPhone('');
    setImg('');
    setSuccess(false);
  };
  
  const isValid = !(nameDirty && emailDirty && phoneDirty && photoDirty && nameError === "" && phoneError === "" && emailError === "" && photoError === "");
  
  return (
    (success && success !== null)
      ? <div className="wrapper">
          <div className="success-ok">
            <h2 className="section__title">User successfully registered</h2>
            <img src="img/success-image.svg" alt="success-image" className="success-ok__img"/>
          </div>
      </div>
      : <div className="section section-form-registration" id="sign">
        <div className="wrapper">
          <h2 className="section__title">Working with POST request</h2>
          <div className="form-registration">
            <div className={(nameDirty && nameError) ? `custom-input custom-input--error` : `custom-input`}>
              <input type="input"
                     className="custom-input__input"
                     name="name"
                     id="name"
                     placeholder="Your name"
                     value={name}
                     onChange={handleChange}
                     onBlur={blurHandler}
                     required/>
              <label htmlFor="name"
                     className="custom-input__label">Your name</label>
              {(nameDirty && nameError) && <div className="custom-input__error-text">{nameError}</div>}
            </div>
            <div className={(emailDirty && emailError) ? `custom-input custom-input--error` : `custom-input`}>
              <input type="input"
                     className="custom-input__input"
                     name="email"
                     id="email"
                     placeholder="Email"
                     value={email}
                     onChange={handleChange}
                     onBlur={blurHandler}
                     required/>
              <label htmlFor="email"
                     className="custom-input__label">Email</label>
              {(emailDirty && emailError) && <div className="custom-input__error-text">{emailError}</div>}
            </div>
            <div className={(phoneDirty && phoneError) ? `custom-input custom-input--error` : `custom-input`}>
              <input type="input"
                     className="custom-input__input"
                     name="phone"
                     id="phone"
                     placeholder="Phone"
                     value={phone}
                     onChange={handleChange}
                     onBlur={blurHandler}
                     required/>
              <label htmlFor="phone"
                     className="custom-input__label">Phone</label>
              {(phoneDirty && phoneError) && <div className="custom-input__error-text">{phoneError}</div>}
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
            <div className={(photoDirty && photoError) ? `upload-img custom-input__error-text` : `upload-img`}>
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
                onBlur={blurHandler}
                ref={inputFileRef}
                hidden/>
              {(photoDirty && photoError) && <div className="custom-input--error">{photoError}</div>}
            </div>
            <button className="btn"
                    onClick={handleSubmit}
                    disabled={isValid}
            >Sign up
            </button>
            {!success && success !== null &&
              <div className="success-error">User with this phone or email already exist</div>}
          </div>
        </div>
      </div>
  );
};