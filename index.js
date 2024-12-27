document.querySelector(".last").addEventListener("click", function (e) {
  e.preventDefault();

  const main = document.querySelector(".main");

  // originali main kontenti
  const originalContent = main.innerHTML;

  // Inputs, chasaweri velebistvis
  const cardholderName = document.getElementById("input-text");
  const cardNumber = document.getElementById("input-text2");
  const month = document.getElementById("Month");
  const year = document.getElementById("Year");
  const cvc = document.getElementById("CVC");

  // Errorebi, araswori logikis shedegad gamochndes
  const nameError = document.getElementById("name-error");
  const numberError = document.getElementById("number-error");
  const dateError = document.getElementById("date-error");
  const cvcError = document.getElementById("cvc-error");

  // Clear all error messages and styles
  function clearErrors() {
    nameError.textContent = "";
    numberError.textContent = "";
    dateError.textContent = "";
    cvcError.textContent = "";

    cardholderName.classList.remove("input-error");
    cardNumber.classList.remove("input-error");
    month.classList.remove("input-error");
    year.classList.remove("input-error");
    cvc.classList.remove("input-error");
  }

  clearErrors();

  let valid = true; // rodesac yvela piroba dakmayopildeba

  // Validate cardholder name ( mxolod alphabeti.  da space)
  if (cardholderName.value.trim() === "") {
    nameError.textContent = "Can't be blank";
    cardholderName.classList.add("input-error");
    valid = false;
  } else if (!/^[a-zA-Z\s]+$/.test(cardholderName.value)) {
    nameError.textContent = "Wrong Format, Alphabet only";
    cardholderName.classList.add("input-error");
    valid = false;
  }

  // Validate card number ( mxolod 16 cipri)
  if (cardNumber.value.trim() === "") {
    numberError.textContent = "Can't be blank";
    cardNumber.classList.add("input-error");
    valid = false;
  } else if (!/^\d{16}$/.test(cardNumber.value.replace(/\s+/g, ""))) {
    numberError.textContent = "Wrong Format, 16 digits only";
    cardNumber.classList.add("input-error");
    valid = false;
  }

  // Validate expiration date ( tvisa da wlis pormats unda akmayopilbdes)
  if (month.value.trim() === "" || year.value.trim() === "") {
    dateError.textContent = "Can't be blank";
    if (month.value.trim() === "") month.classList.add("input-error");
    if (year.value.trim() === "") year.classList.add("input-error");
    valid = false;
  } else if (!/^\d{2}$/.test(month.value) || !/^\d{4}$/.test(year.value)) {
    dateError.textContent = "Wrong Format";
    month.classList.add("input-error");
    year.classList.add("input-error");
    valid = false;
  }

  // Validate CVC ( 3 cipri mxolod)
  if (cvc.value.trim() === "") {
    cvcError.textContent = "Can't be blank";
    cvc.classList.add("input-error");
    valid = false;
  } else if (!/^\d{3}$/.test(cvc.value)) {
    cvcError.textContent = "Wrong Format, 3 digits only";
    cvc.classList.add("input-error");
    valid = false;
  }

  // If everything is valid, update the card
  if (valid) {
    // Update cardholder name
    const cardNameDisplay = document.querySelector(".name");
    const cardNumberDisplay = document.querySelector(".ID");
    const cardDateDisplay = document.querySelector(".date");
    const cardCvcDisplay = document.querySelector(".card-back-text");

    cardNameDisplay.textContent =
      cardholderName.value.trim() || "JANE APPLESEED";

    // Format and update card number (16 digits with spaces)
    const formattedCardNumber = cardNumber.value
      .replace(/\D/g, "")
      .replace(/(\d{4})(?=\d)/g, "$1 ");
    cardNumberDisplay.textContent = formattedCardNumber.padEnd(19, "0");

    // Update expiration date (MM/YY format)
    const formattedMonth = month.value.trim().padStart(2, "0");
    const formattedYear = year.value.trim().slice(0, 2);
    cardDateDisplay.textContent = `${formattedMonth}/${formattedYear}`;

    // Update CVC (3 digits)
    cardCvcDisplay.textContent = cvc.value.trim().padEnd(3, "0");

    // anu gaketda
    alert("Card updated successfully!");

    if (valid) {
      // chaanacvlebs yvelapers
      main.innerHTML = `
        <div class="success-message" style="text-align: center;">
          <!-- SVG Icon -->
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-bottom: 20px; margin-left:20px;">
            <circle cx="40" cy="40" r="40" fill="url(#paint0_linear_0_318)"/>
            <path d="M28 39.9199L36.0801 48L52.0801 32" stroke="white" stroke-width="3"/>
            <defs>
              <linearGradient id="paint0_linear_0_318" x1="-23.0143" y1="11.5071" x2="1.03143e-06" y2="91.5071" gradientUnits="userSpaceOnUse">
                <stop stop-color="#6348FE"/>
                <stop offset="1" stop-color="#610595"/>
              </linearGradient>
            </defs>
          </svg>
          
          <!-- Thank You Text -->
          <p style="padding-left: 20px ; margin: 10px 0; font-size: 25px; color: #21092f; font-weight: 600;">Thank You</p>
          
          <!-- Additional Text -->
          <p style="padding-left: 20px ; margin: 10px 0; font-weight: 700; font-size: 16px; color: #333;">We've added your card details</p>
          
          <!-- Continue Button -->
          <button class="continue-button" style="width: 380px; height: 50px; margin-top: 40px; background-color: #21092f; color: white; border: none; cursor: pointer; border-radius: 8px; font-size: 16px;">
            Continue
          </button>
        </div>
      `;

      // Add event listener to "Continue" button to restore original content
      document
        .querySelector(".continue-button")
        .addEventListener("click", function () {
          main.innerHTML = originalContent; // Restore original content
        });
    }
  }
});
