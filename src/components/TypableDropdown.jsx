import React, { useState, useEffect, useRef } from "react";

const TypableDropdown = ({ inputValue, options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const wrapperRef = useRef(null);

  useEffect(() => {
    console.log("rerender?");
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* useEffect(() => {
    console.log("editvalue: ", editValue);
    if (editValue) setInputValue(editValue);
    else setInputValue("");
  }, [editValue, justSaved]); */

  useEffect(() => {
    let appliedFilter;
    if (typeof options[0] === "string") {
      appliedFilter = options.filter((option) =>
        option.toLowerCase().includes(inputValue.toLowerCase()),
      );
    } else {
      appliedFilter = options.filter((option) =>
        option.toString().includes(inputValue.toString()),
      );
    }
    setFilteredOptions(appliedFilter);
  }, [inputValue, options]);

  const handleSelect = (value) => {
    setIsOpen(false);
    onChange(value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && filteredOptions.length > 0) {
      handleSelect(filteredOptions[0]);
    }
  };

  useEffect(() => {
    // This snippet covers edge case where user completely types out valid option
    // Then save the state
    let searchValue = inputValue;
    if (typeof options[0] === typeof 0) {
      searchValue = parseInt(inputValue);
    }
    if (options.indexOf(searchValue) !== -1) {
      onChange(searchValue);
    }
  }, [inputValue]);

  return (
    <div className="relative w-64" ref={wrapperRef}>
      <input
        type="text"
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={inputValue}
        onChange={(e) => {
          onChange(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder="Type or select..."
      />
      {isOpen && (
        <ul className="absolute z-10 w-full max-h-48 overflow-auto bg-white border border-gray-300 rounded shadow">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <li
                key={index}
                className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
                onClick={() => handleSelect(option)}
              >
                {option}
              </li>
            ))
          ) : (
            <li className="px-3 py-2 text-gray-400">No options found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default TypableDropdown;
