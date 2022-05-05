import { useState } from 'react';

const useInput = (initialValue = '') => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    reset: () => setValue(''),
    bind: {
      value,
      onChange: (event: { target: { value: any } }) => {
        setValue(event.target.value);
      },
    },
  };
};

export default useInput;
