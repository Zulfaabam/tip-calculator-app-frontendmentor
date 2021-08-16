// Frontend Mentor challenge - Tip Calculator App - Abam

// DOM Selector //
const billEl = document.querySelector('#bill-el')
const totalPeople = document.querySelector('#people-el')
const displayTotalAmt = document.querySelector('.output-number-total')
const displayTotalTip = document.querySelector('.output-number-tip')

const inputBox = Array.from(document.querySelectorAll('.input__box'))

const billLabel = document.querySelector('.amt--label')
const peopleLabel = document.querySelector('.people--label')
const customLabel = document.querySelector('.custom--label')

const customEl = document.querySelector('#custom-el')
const formTips = document.querySelector('.tip-btn-container')
const tipBtn = document.querySelectorAll('.tip-btn')

const resetBtn = document.querySelector('.reset-btn')

// Variables //
const numberRegex = /^\s*[+-]?(\d+|\.\d+|\d+\.\d+|\d+\.)(e[+-]?\d+)?\s*$/ //NUMBER VALIDATION

const classArr = ['wrong__format', 'correct__format']
let totalPerPerson = 0
let tipPerPerson = 0
let tip = 0
let evt

// Methods //

// Validate Inputs
const validator = function (num, lbl, val, e) {
  evt = e.target.closest('.input__box')
  evt.classList.remove(...classArr)
  console.log(val.max)

  if (num) {
    if (Number(val.value) <= 0) {
      evt.classList.add('wrong__format')
      lbl.style = 'visibility: visible'
      lbl.textContent = "Can't be zero or less"
      resetDisplay()
      resetBtn.disabled = true
    } else if (Number(val.value) > val.max) {
      evt.classList.add('wrong__format')
      resetBtn.disabled = true
      resetDisplay()
    } else {
      evt.classList.add('correct__format')
      lbl.style = 'visibility: hidden'
      calculator(Number(billEl.value), Number(totalPeople.value))
    }
  } else {
    evt.classList.add('wrong__format')
    lbl.style = 'visibility: visible'
    lbl.textContent = 'Not a Number'
    resetBtn.disabled = true
    resetDisplay()
  }
}

// calulate Bill
const calculator = (bill, person) => {
  if (person > 0) {
    tipPerPerson = (bill * (tip / 100)) / person
    totalPerPerson = bill / person + tipPerPerson

    display(Math.abs(tipPerPerson), totalPerPerson)

    resetBtn.disabled = false
  }
}

// display Bill
const display = (tip, bill) => {
  displayTotalTip.textContent = formatter(tip)
  displayTotalAmt.textContent = formatter(bill)
}

// format Values
const formatter = (val) => {
  return new Intl.NumberFormat('en-us', {
    style: 'currency',
    currency: 'USD',
    currencySign: 'accounting',
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 2,
  }).format(val)
}

// reset Everything
const resetDisplay = () => {
  displayTotalAmt.textContent = '$0.00'
  displayTotalTip.textContent = '$0.00'
}

const resetAll = () => {
  totalPerPerson = 0
  tipPerPerson = 0
  billEl.value = ''
  totalPeople.value = ''
  customEl.value = ''
  resetBtn.disabled = true
  tipBtn.forEach((btn) => btn.classList.remove('active'))
  inputBox.forEach((box) => box.classList.remove(...classArr))
  resetDisplay()
}

// Event Handler //

// form tip selector
formTips.addEventListener('click', (e) => {
  const clicked = e.target.closest('.tip-btn')

  if (!clicked) return

  tipBtn.forEach((btn) => btn.classList.remove('active'))

  clicked.classList.add('active')
  customEl.value = ''
  tip = parseInt(clicked.textContent)

  calculator(Number(billEl.value), Number(totalPeople.value))
})

// custom tip
customEl.addEventListener('input', (e) => {
  e.preventDefault()

  tipBtn.forEach((btn) => btn.classList.remove('active'))

  const inputNum = numberRegex.test(customEl.value)

  tip =
    Number(customEl.value) < 0 || Number(customEl.value) > customEl.max
      ? 0
      : Number(customEl.value)
  validator(inputNum, customLabel, customEl, e)

  calculator(Number(billEl.value), Number(totalPeople.value))
})

// bill input
billEl.addEventListener('input', (e) => {
  e.preventDefault()
  const inputNum = numberRegex.test(billEl.value)

  validator(inputNum, billLabel, billEl, e)
})

// people input
totalPeople.addEventListener('input', (e) => {
  e.preventDefault()
  const inputNum = numberRegex.test(totalPeople.value)

  validator(inputNum, peopleLabel, totalPeople, e)
})

resetBtn.addEventListener('click', resetAll)
