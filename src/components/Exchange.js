export function Exchange ({value, onChangeValue, onChangeCurrency, defaultCurrencies}){

  return (
    <div className="exchange">
      <div className="currencies">
        <select 
          className="currencies"
          onChange={(e) => onChangeCurrency(e.target.value)}
          >
            {defaultCurrencies.map((cur) => 
              <option
                value={cur}>
                 {cur}
              </option>
            )}
          </select>
      </div>
      <input 
        onChange={(e) => onChangeValue(e.target.value)}
        value={value}
        type="number"
        placeholder={0}
      />
    </div>
  )
};
