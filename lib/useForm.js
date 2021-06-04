import { useEffect, useState } from 'react';

export default function useForm(initial = {}) {
  // Create a state object for our inputs
  const [inputs, setInputs] = useState(initial);
  const initialValues = Object.values(initial).join('');

  useEffect(() => {
    // This function runs when the things we are watching change
    setInputs(initial);
  }, [initialValues]);

  function handleChange(e) {
    let { value, name, type } = e.target;
    // console.log(value, name, type);
    if (name.includes('-')) {
      const values = name.split('-');
      // console.log(`Values: ${JSON.stringify(values)}`);
      const [id, property] = values;
      const data = inputs[id];
      // console.log(`Data: ${JSON.stringify(data)}`);
      // console.log(`Value: ${JSON.stringify(value)}`);
      // console.log(`Property: ${JSON.stringify(property)}`);
      data[property] = value;

      if (property === 'rsvpStatus' && value !== 'accepted') {
        // console.log('Setting plus one to false');
        data.plusOne = false;
      }

      setInputs({
        ...inputs,
        [id]: data,
      });
    } else {
      if (type === 'number') {
        value = parseInt(value);
      }
      if (type === 'file') {
        value[0] = e.target.files;
      }

      setInputs({
        // Copy the existing state
        ...inputs,
        [name]: value,
      });
    }

    // console.log(`Inputs after: ${JSON.stringify(inputs)}`);
  }

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ''])
    );
    setInputs(blankState);
  }

  // Return the things we want to surface from this custom hook
  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
}
