import React, { useState, useEffect } from 'react';
import Exchange from './components/Exchange';
import Header from './components/Header';
import useFetch from './components/hooks/useFetch'
import Currency from './components/Currency';
import './scss/index.scss';


function App() {

  const {course} = useFetch('https://cdn.cur.su/api/nbu.json')

  const [firstCurrency, setFirstCurrency] = useState('UAH')
  const [secondCurrency, setSecondCurrency] = useState('USD')

  const [firstPrice, setFirstPrice] = useState()
  const [secondPrice, setSecondPrice] = useState()

  
  const changeFirstNumber = (value) => {
    const price = value / course[firstCurrency]
    const result = price * course[secondCurrency]
    setSecondPrice(result.toFixed(2))
    setFirstPrice(value)
  }
  const changeSecondNumber = (value) => {
    const result = (course[firstCurrency] / course[secondCurrency]) * value
    setSecondPrice(value)
    setFirstPrice(result.toFixed(2))
  }
  
  const changeFirstInput = (cur) => {
    setFirstCurrency(cur)
    changeFirstNumber (firstPrice)
  }
  
  useEffect(() => {
    changeFirstNumber(firstPrice);
  }, [firstCurrency])
  
  useEffect(() => {
    changeSecondNumber(secondPrice);
  }, [secondCurrency])

  const currentUSD = Number(course.UAH)
  const currentEUR = Number(course.UAH / course.EUR * course.USD)
  const currentGBP = Number(course.UAH / course.GBP * course.USD)
  
  return (
    <div className="App">
      <Header 
        headerUSD = {isNaN(currentUSD) ? '...' : currentUSD.toFixed(2)} 
        headerEUR = {isNaN(currentEUR) ? '...' : currentEUR.toFixed(2)} 
        headerGBP = {isNaN(currentGBP) ? '...' : currentGBP.toFixed(2)} 
        />
      <div className='exchange'>
        <Currency 
          onChangeCurrency={(cur) => changeFirstInput(cur)}
          defaultCurrencies = {['UAH', 'USD', 'EUR', 'GBP']}
        />
        <Exchange 
          value={firstPrice} 
          currency={firstCurrency} 
          onChangeValue = {changeFirstNumber}
        />
      </div>
      <div className='exchange'>
        <Currency 
          onChangeCurrency={(cur) => changeFirstInput(cur)}
          defaultCurrencies = {['USD', 'USD', 'EUR', 'GBP']}
        />
        <Exchange 
          value={secondPrice} 
          currency={secondCurrency} 
          onChangeValue = {changeSecondNumber}
        />
      </div>
    </div>
  )
}

export default App;
