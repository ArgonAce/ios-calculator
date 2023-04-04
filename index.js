const numbers = document.querySelectorAll('.numbers');
const result = document.querySelector('.result span');
const signs = document.querySelectorAll('.sign');
const equals = document.querySelector('.equals');
const clear = document.querySelector('.clear');
const negative = document.querySelector('.negative');
const percent = document.querySelector('.percent');
const comma = document.querySelector('.comma');

let firstValue = "";
let isFirstValue = false;
let secondValue = "";
let isSecondValue = false;
let sign = "";
let resultValue = 0;

//pembuka comma
for (let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener("click", (e) => {
    let atr = e.target.getAttribute("value");
    if (atr === ".") {
      if (isFirstValue === false) {
        getFirstValue(".");
      }
      if (isSecondValue === false && sign !== "") {
        getSecondValue(".");
      }
    } else {
      if (isFirstValue === false) {
        getFirstValue(atr);
      }
      if (isSecondValue === false && sign !== "") {
        getSecondValue(atr);
      }
    }
  });
}

comma.addEventListener("click", (e) => {
  if (isFirstValue === false) {
    getFirstValue(".");
  }
  if (isSecondValue === false && sign !== "") {
    getSecondValue(".");
  }
});

function getFirstValue(el) {
  result.innerHTML = "";
  if (el === ".") {
    if (firstValue.includes(".")) {
      return;
    } else if (firstValue === "") {
      firstValue = "0";
    }
  }
  firstValue += el;
  result.innerHTML = formatNumber(firstValue);
}

function getSecondValue(el) {
  if (firstValue !== "" && sign !== "") {
    result.innerHTML = "";
    if (el === ".") {
      if (secondValue.includes(".")) {
        return;
      } else if (secondValue === "") {
        secondValue = "0";
      }
    }
    secondValue += el;
    result.innerHTML = formatNumber(secondValue);
  }
}

//pemutup comma

function getSign() {
  for (let i = 0; i < signs.length; i++) {
    signs[i].addEventListener("click", (e) => {
      sign = e.target.getAttribute("value");
      isFirstValue = true;
    });
  }
}
getSign();

equals.addEventListener("click", () => {
  result.innerHTML = "";
  if (sign === "+") {
    resultValue = Number(firstValue) + Number(secondValue);
  } else if (sign === "-") {
    resultValue = Number(firstValue) - Number(secondValue);
  } else if (sign === "x") {
    resultValue = Number(firstValue) * Number(secondValue);
  } else if (sign === "/") {
    resultValue = Number(firstValue) / Number(secondValue);
  }
  result.innerHTML = formatNumber(resultValue);
  firstValue = resultValue.toString();
  secondValue = "";

  checkResultLength();
});

function formatNumber(number) {
  const stringNumber = number.toString();
  const parts = stringNumber.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return parts.join(",");
}


function checkResultLength() {
  resultValue = JSON.stringify(resultValue);

  if (resultValue.length >= 8) {
    resultValue = JSON.parse(resultValue);
    result.innerHTML = formatNumber(resultValue.toFixed(2));
  }
}

negative.addEventListener("click", () => {
  result.innerHTML = "";
  if (firstValue != "") {
    resultValue = -Number(firstValue);
    firstValue = resultValue.toString();
  }
  if(firstValue != "" && secondValue != "" && sign !=""){
    resultValue = -resultValue;
  }

    result.innerHTML = resultValue;
})

percent.addEventListener('click', () => {
    result.innerHTML = "";
    if(firstValue != "") {
        resultValue = firstValue / 100;
        firstValue = resultValue;
    }
    if(firstValue != "" && secondValue != "" && sign !=""){
        resultValue = resultValue /100;
    }

    result.innerHTML = resultValue;
})

clear.addEventListener('click', () => {
    result.innerHTML = 0;

    firstValue = "";
    isFirstValue = "";
    secondValue = "";
    isSecondValue = false;
    sign = "";
    resultValue = 0;
})

