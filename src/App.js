import React, { useState, useEffect } from 'react';
import  {Exchange}  from './components/Exchange';
import { Header } from './components/Header';
import './scss/index.scss';


function App() {

  const [firstCurrency, setFirstCurrency] = useState('UAH')
  const [secondCurrency, setSecondCurrency] = useState('USD')

  const [firstPrice, setFirstPrice] = useState()
  const [secondPrice, setSecondPrice] = useState()

  const [course, setCourse] = useState({})

  const [ifValueDownload, setIfValueDownload] = useState(false)

  useEffect(() => {
    setIfValueDownload(true)
    fetch("https://cdn.cur.su/api/nbu.json")
      .then(response => response.json())
      .then(json => {
        setCourse(json.rates)
      })
      .catch(err => console.log(err))
    setIfValueDownload(false)
  }, [])
  
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
        headerUSD = {isNaN(currentUSD.toFixed(2)) ? '...' : currentUSD.toFixed(2)} 
        headerEUR = {isNaN(currentEUR.toFixed(2)) ? '...' : currentEUR.toFixed(2)} 
        headerGBP = {isNaN(currentGBP.toFixed(2)) ? '...' : currentGBP.toFixed(2)} 
        />
      <Exchange 
        value={firstPrice} 
        currency={firstCurrency} 
        onChangeCurrency={(cur) => changeFirstInput(cur)}
        onChangeValue = {changeFirstNumber}
        defaultCurrencies = {['UAH', 'USD', 'EUR', 'GBP']}
        />
      <Exchange 
        value={secondPrice} 
        currency={secondCurrency} 
        onChangeCurrency={(cur) => setSecondCurrency(cur)}
        onChangeValue = {changeSecondNumber}
        defaultCurrencies = {['USD', 'UAH', 'EUR', 'GBP']}
      />
    </div>
  )
}

export default App;
