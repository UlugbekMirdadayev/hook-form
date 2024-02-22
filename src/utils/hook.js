import { useEffect, useState } from "react";

const validationDefault = { max: 100, min: 0, required: false };

export const useForm = ({
  dafaultValues = {},
  dafaultErrors = {},
  onSubmit,
}) => {
  const [values, setValues] = useState(dafaultValues);
  const [errors, setErrors] = useState(dafaultErrors);

  const Register = (name, { max, min, required } = validationDefault) => {
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

    return { onChange, value, "data-error": error, required };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  return {
    values,
    register: Register,
    errors,
    handleSubmit,
  };
};

export const useMousePosition = () => {
  const [position, setPosition] = useState();

  useEffect(() => {
    const setUpdatePostion = (e) => {
      setPosition({ left: e.clientX, top: e.clientY, scale: e.scale });
    };
    window.addEventListener("mousemove", setUpdatePostion);
    window.addEventListener("mouseup", (e) =>
      setUpdatePostion({ clientX: e.clientX, clientY: e.clientY, scale: "1" })
    );
    window.addEventListener("mousedown", (e) =>
      setUpdatePostion({ clientX: e.clientX, clientY: e.clientY, scale: "0.8" })
    );

    return () => {
      window.removeEventListener("mousemove", setUpdatePostion);
    };
  }, []);

  return { position };
};
