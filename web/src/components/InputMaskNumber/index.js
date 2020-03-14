import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

import { useField } from '@rocketseat/unform';

export default function InputMaskNumber({
  name,
  onChange,
  decimalScale,
  decimalSeparator,
  thousandSeparator,
  ...rest
}) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [value, setValue] = useState(defaultValue);
  const defaultValueMask =
    decimalSeparator === '.'
      ? defaultValue
      : String(defaultValue).replace('.', decimalSeparator);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.input',
      clearValue: pickerRef => {
        pickerRef.clear();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  return (
    <>
      <NumberFormat
        defaultValue={defaultValueMask}
        ref={ref}
        input={value}
        onValueChange={v => {
          setValue(v.value);
          if (onChange) onChange(v.value);
        }}
        decimalScale={decimalScale}
        decimalSeparator={decimalSeparator}
        thousandSeparator={thousandSeparator}
        allowedDecimalSeparators={['.', ',']}
        {...rest}
      />
      {error && <span>{error}</span>}
    </>
  );
}

InputMaskNumber.propTypes = {
  name: PropTypes.string.isRequired,
  decimalSeparator: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  thousandSeparator: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onChange: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  decimalScale: PropTypes.number,
};

InputMaskNumber.defaultProps = {
  decimalSeparator: ',',
  thousandSeparator: '.',
  onChange: null,
  decimalScale: 2,
};
