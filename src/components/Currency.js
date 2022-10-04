
function Currency({onChangeCurrency, defaultCurrencies,}) {
  return (
  
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
  )
}

export default Currency