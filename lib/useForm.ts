import { useEffect, useState, ChangeEvent } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FormInputs = Record<string, any>;

interface UseFormReturn {
  inputs: FormInputs;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  resetForm: () => void;
  clearForm: () => void;
}

export default function useForm(initial: FormInputs = {}): UseFormReturn {
  // Create a state object for our inputs
  const [inputs, setInputs] = useState<FormInputs>(initial);
  const initialValues = Object.values(initial).join('');

  useEffect(() => {
    // This function runs when the things we are watching change
    setInputs(initial);
  }, [initialValues]);

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const target = e.target as HTMLInputElement;
    const { value, name, type } = target;
    if (name.includes('_')) {
      const values = name.split('_');
      // console.log(`Values: ${JSON.stringify(values)}`);
      const [id, property] = values;
      const data = { ...inputs[id] };
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
      let parsedValue: string | number | FileList | null = value;
      if (type === 'number') {
        parsedValue = Number.parseInt(value);
      }
      if (type === 'file') {
        parsedValue = target.files;
      }

      setInputs({
        // Copy the existing state
        ...inputs,
        [name]: parsedValue,
      });
    }

    // console.log(`Inputs after: ${JSON.stringify(inputs)}`);
  }

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key]) => [key, ''])
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
