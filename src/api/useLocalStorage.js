import { useState } from "react";

export default function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  /*const setValue = useCallback(
    (value) => {
      try {
        console.log(key, value);
        // Allow value to be a function so we have same API as useState
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        // Save state
        setStoredValue(valueToStore);
        // Save to local storage
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        // A more advanced implementation would handle the error case
        console.log(error);
      }
    },
    [key, storedValue]
  );*/

  const setValue = (value) => {
    try {
      console.log(key, value);
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  const createItem = (item, data) => {
    if (data && Array.isArray(data) && item) {
      setValue([...data, item]);
    } else if (!data && item) {
      setValue([item]);
    } else {
      throw new Error("missing or wrong parameters");
    }
  };

  const updateItem = (item, data) => {
    if (data && Array.isArray(data) && item) {
      setValue([...data.filter((element) => element.id !== item.id), item]);
    } else {
      throw new Error("missing or wrong parameters");
    }
  };

  const deleteItem = (item, data) => {
    if (data && Array.isArray(data) && item) {
      setValue(data.filter((element) => element.id !== item.id));
    } else {
      throw new Error("missing or wrong parameters");
    }
  };

  return [
    storedValue,
    {
      createItem, //: useCallback(createItem, [setValue]),
      updateItem, //: useCallback(updateItem, [setValue]),
      deleteItem, //: useCallback(deleteItem, [setValue]),
    },
  ];
}
