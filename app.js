
 //apikey:3bfdaa704d1dd59c38d49708
 // https://v6.exchangerate-api.com/v6/3bfdaa704d1dd59c38d49708/latest/USD


const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  const apikey = "3bfdaa704d1dd59c38d49708";
  const URL = `https://v6.exchangerate-api.com/v6/${apikey}/latest/${fromCurr.value}`;
  let response = await fetch(URL);
  let data = await response.json();

  if (data.result === "success") {
    let rate = data.conversion_rates[toCurr.value];
    let convertedAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${convertedAmount.toFixed(2)} ${toCurr.value}`;
  } else {
    msg.innerText = "Failed to fetch exchange rate";
  }
};

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});



const swapIcon = document.querySelector(".dropdown i");

swapIcon.addEventListener("click", () => {
  // Swap selected currency codes
  let temp = fromCurr.value;
  fromCurr.value = toCurr.value;
  toCurr.value = temp;

  // Update flags after swap
  updateFlag(fromCurr);
  updateFlag(toCurr);

  // Update exchange rate message
  updateExchangeRate();
});
