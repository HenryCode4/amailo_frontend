import React from 'react';
import InputContainer from '../InputContainer/InputContainer';
import classes from './input.module.css';

function Input(
  { label, type, defaultValue, onChange, onBlur, name, error, imageUrlTags }, // Add imageUrlTags to props
  ref
) {
  const getErrorMessage = () => {
    if (!error) return;
    if (error.message) return error.message;
    //defaults
    switch (error.type) {
      case 'required':
        return 'This Field Is Required';
      case 'minLength':
        return 'Field Is Too Short';
      default:
        return '*';
    }
  };

  return (
    <InputContainer label={label}>
      <input
        defaultValue={defaultValue}
        className={classes.input}
        type={type}
        placeholder={label}
        ref={ref}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
      />
      {imageUrlTags && ( // Render imageUrlTags if it exists
        <img src={imageUrlTags} alt="imgUrl Tag" className={classes.tagImage} />
      )}
      {error && <div className={classes.error}>{getErrorMessage()}</div>}
    </InputContainer>
  );
}

export default React.forwardRef(Input);
