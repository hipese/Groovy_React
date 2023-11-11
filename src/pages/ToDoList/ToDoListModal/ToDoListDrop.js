import React, { useState, useRef, useEffect } from 'react';
import styles from './ToDoListModal.module.css';

const Dropdown = ({ options }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isFocused, setIsFocused] = useState(false);
    const dropdownRef = useRef(null);

    const toggling = () => setIsOpen(!isOpen);

    const onOptionClicked = value => () => {
        setSelectedOption(value);
        setIsOpen(false);
    };
    const handleFocus = () => {
        setIsFocused(true);
    }
    const handleBlur = () => {
        setIsFocused(false);
    }

  useEffect(() => {
    const clickOutsideHandler = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', clickOutsideHandler);
    return () => {
      document.removeEventListener('mousedown', clickOutsideHandler);
    };
  }, []);

  return (
      <div className={styles.dropdown} ref={dropdownRef}>
        <div className={`${styles[`dropdown-header`]} ${isFocused ? styles.focused : ''}`} tabIndex={0} onFocus={handleFocus} onBlur={handleBlur} onClick={toggling}>
        {selectedOption || options[0]} <span className={styles.arrow}><img src={`/TDL/down.svg`} alt="" /></span>
      </div>
      {isOpen && (
        <div className={styles[`dropdown-list`]}>
          {options.map(option => (
            <div
                className={styles[`dropdown-listitem`]}
                onClick={onOptionClicked(option)}
                key={option}
            >
            {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;