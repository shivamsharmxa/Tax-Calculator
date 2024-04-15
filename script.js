
// Function to calculate tax based on income and age
function calculateTax(grossIncome, extraIncome, ageGroup, deductions) {
  let totalIncome = parseFloat(grossIncome) + parseFloat(extraIncome) - parseFloat(deductions);
  let tax = 0;

  if (totalIncome > 800000) {
      switch (ageGroup) {
          case "<40":
              tax = 0.3 * (totalIncome - 800000);
              break;
          case ">=40 & <60":
              tax = 0.4 * (totalIncome - 800000);
              break;
          case ">=60":
              tax = 0.1 * (totalIncome - 800000);
              break;
          default:
              break;
      }
  }

  return tax;
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("income-form");
  const modal = document.getElementById("results-modal");
  const closeButton = document.querySelector(".close-button");
  const resultAmount = document.getElementById("result-amount");

  form.addEventListener("submit", function (event) {
      event.preventDefault();

      const grossIncome = document.getElementById("gross-income").value;
      const extraIncome = document.getElementById("extra-income").value;
      const ageGroup = document.getElementById("age-group").value;
      const deductions = document.getElementById("deductions").value;

      if (!grossIncome || !extraIncome || !ageGroup || !deductions) {
          alert("Please fill in all the fields.");
          return;
      }

      const tax = calculateTax(grossIncome, extraIncome, ageGroup, deductions);
      const overallIncome = (parseFloat(grossIncome) + parseFloat(extraIncome) - parseFloat(deductions)) - tax;

      resultAmount.textContent = overallIncome.toFixed(2);
      modal.style.display = "block";
  });

  closeButton.addEventListener("click", function () {
      modal.style.display = "none";
  });

  window.addEventListener("click", function (event) {
      if (event.target === modal) {
          modal.style.display = "none";
      }
  });
});

