import React, { useRef, useEffect } from 'react';
import Select from 'react-select';
import Async from 'react-select/async';
import PropTypes from 'prop-types';

import { useField } from '@rocketseat/unform';

export default function SelectInput({
  name,
  label,
  options,
  multiple,
  ...rest
}) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  function parseSelectValue(selectRef) {
    const selectValue =
      typeof options === 'function'
        ? selectRef.select.state.value
        : selectRef.state.value;
    if (!multiple) {
      return selectValue ? selectValue.value : '';
    }
    return selectValue ? selectValue.map(option => option.value) : [];
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'state.value',
      parseValue: parseSelectValue,
      clearValue: selectRef => {
        selectRef.select.clearValue();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  return (
    <>
      {label && <label htmlFor={fieldName}>{label}</label>}
      {typeof options === 'function' ? (
        <Async
          className="react-select-container"
          classNamePrefix="react-select"
          name={fieldName}
          aria-label={fieldName}
          loadOptions={options}
          isMulti={multiple}
          defaultValue={defaultValue}
          ref={ref}
          {...rest}
        />
      ) : (
        <Select
          className="react-select-container"
          classNamePrefix="react-select"
          name={fieldName}
          aria-label={fieldName}
          options={options}
          isMulti={multiple}
          defaultValue={defaultValue}
          ref={ref}
          {...rest}
        />
      )}

      {error && <span>{error}</span>}
    </>
  );
}

SelectInput.propTypes = {
  multiple: PropTypes.bool,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.func, PropTypes.array]).isRequired,
};

SelectInput.defaultProps = {
  multiple: false,
  label: '',
};
