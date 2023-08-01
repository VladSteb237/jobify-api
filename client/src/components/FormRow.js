import React from 'react';

const FormRow = (props) => {
    const { type, name, value, handleChange, labelText } = props;
    return (
        <div className='form-row'>
            <label htmlFor={name} className='form-label'>
                {labelText || name}
            </label>

            <input
                type={type}
                name={name}
                value={value}
                className='form-input'
                onChange={handleChange}
            />
        </div>
    );
};

export default FormRow;
