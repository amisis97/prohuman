import React, { useId } from 'react';
import styles from './Select.module.scss';

interface SelectProps {
  id?: string;
  name: string;
  label?: string;
  options: { value: string; label?: string }[];
  value: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
}

export const Select = ({ id, label, name, value, options, onChange }: SelectProps) => {
  const generatedId = useId();
  const elementId = id ?? generatedId;

  return (
    <div className={styles.select}>
      {!!label && <label htmlFor={elementId}>{label}</label>}

      <select name={name} id={elementId} onChange={onChange} value={value}>
        <option value=''>Mindegy</option>
        {options.map(({ label, value }) => (
          <option key={value} value={value}>
            {label ?? value}
          </option>
        ))}
      </select>
    </div>
  );
};
