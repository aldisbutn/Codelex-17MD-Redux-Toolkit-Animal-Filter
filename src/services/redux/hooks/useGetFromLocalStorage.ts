const useGetFromLocalStorage = () => {
  try {
    const serialisedState = localStorage.getItem('ANIMALS');
    if (serialisedState === null) return undefined;
    return JSON.parse(serialisedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
};

export default useGetFromLocalStorage;
