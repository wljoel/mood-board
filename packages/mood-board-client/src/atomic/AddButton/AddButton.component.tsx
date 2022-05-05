import React from 'react';

interface AddButtonProps {
  onClick: () => void;
  disabled: boolean;
}

const AddButton: React.FC<AddButtonProps> = ({ onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${
        disabled ? 'bg-zinc-400' : 'bg-emerald-400'
      }  flex h-14 w-14 items-center justify-center rounded-full border-0  p-10 text-3xl drop-shadow-xl`}
    >
      +
    </button>
  );
};

export default AddButton;
