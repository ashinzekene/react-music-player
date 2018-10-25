export default store => next => (action) => {
  console.group(action.type,);
  console.info('PREVIOUS STATE', store.getState());
  const result = next(action);
  console.log('ACTION', action);
  console.log('NEXT STATE', store.getState());
  console.groupEnd();
  return result;
};
