import React from 'react';

const InputField = ({ label, id, value, onChange, number }) => {
  return (
    <div className='flex flex-col  sm:text-start text-center w-full'> 
      <label htmlFor={id} className='py-2 pr-5 font-poppins font-normal text-[15px] text-black'>{label}</label>
      <input 
        type={number ? 'number' : 'text'}
        id={id}
        value={value}
        onChange={onChange}
        className='border-[1px] border-[#7A1848] rounded-md p-3 border-opacity-40'
      />
    </div>
  );
}

export default InputField;
