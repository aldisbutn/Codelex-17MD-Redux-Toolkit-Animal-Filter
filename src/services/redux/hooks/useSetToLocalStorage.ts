const useSetToLocalStorage = (state: { animals: { id: string; name: string; photoURL: string }[] }) => {
  try {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem('ANIMALS', serialisedState);
  } catch (e) {
    console.warn(e);
  }
};

export default useSetToLocalStorage;
