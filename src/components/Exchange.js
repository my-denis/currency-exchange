function Exchange ({value, onChangeValue}){

  return (
      <input 
        onChange={(e) => onChangeValue(e.target.value)}
        value={value}
        type="number"
        placeholder={0}
      />
  )
};
export default Exchange
