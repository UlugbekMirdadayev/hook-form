import { useState } from "react";

export const useForm = ({ dafaultValues = {}, dafaultErrors = {} }) => {
  const [values, setValues] = useState(dafaultValues);
  const [errors, setErrors] = useState(dafaultErrors);

  const Register = (name, { max, min } = { max: 100, min: 0 }) => {
    const [value, setValue] = useState(dafaultValues[name]);
    const [error, setError] = useState(dafaultErrors[name] || false);
    const onChange = (e) => {
      const newValue = e.target.value;
      setValue(max < newValue.length ? values[name] : newValue);
      if (max && max < newValue.length) {
        setError(true);
        setErrors((err) => {
          err[name] = true;
          return err;
        });
      } else if (max && max >= newValue.length) {
        setError(false);
        setErrors((err) => {
          err[name] = false;
          return err;
        });
      }

      setValues((v) => {
        v[name] = max < newValue.length ? values[name] : newValue;
        return v;
      });
    };

    return { onChange, value, "data-error": error };
  };

  return { values, register: Register, errors };
};
