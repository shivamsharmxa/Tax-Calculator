$(document).ready(function() {
  // Function to toggle error icon visibility
  function toggleErrorIcon(inputField, errorIcon) {
    if (inputField.val() === "" || isNaN(inputField.val())) {
      errorIcon.show();
    } else {
      errorIcon.hide();
    }
  }

  // Function to validate form inputs
  function validateForm() {
    let isValid = true;

    // Validate Gross Annual Income
    let grossIncomeField = $("#grossIncome");
    let grossIncomeErrorIcon = $("#grossIncomeErrorIcon");
    toggleErrorIcon(grossIncomeField, grossIncomeErrorIcon);
    if (grossIncomeField.val() === "" || isNaN(grossIncomeField.val())) {
      isValid = false;
    }

    // Validate Extra Income
    let extraIncomeField = $("#extraIncome");
    let extraIncomeErrorIcon = $("#extraIncomeErrorIcon");
    toggleErrorIcon(extraIncomeField, extraIncomeErrorIcon);

    // Validate Deductions
    let deductionsField = $("#deductions");
    let deductionsErrorIcon = $("#deductionsErrorIcon");
    toggleErrorIcon(deductionsField, deductionsErrorIcon);

    // Validate Age
    let ageField = $("#age");
    let ageErrorIcon = $("#ageErrorIcon");
    toggleErrorIcon(ageField, ageErrorIcon);
    if (ageField.val() === "") {
      isValid = false;
    }

    return isValid;
  }

  // Function to calculate tax
  function calculateTax() {
    if (validateForm()) {
      // Get input values
      let grossIncome = parseFloat($("#grossIncome").val());
      let extraIncome = parseFloat($("#extraIncome").val() || 0);
      let deductions = parseFloat($("#deductions").val() || 0);
      let age = $("#age").val();

      // Calculate overall income
      let overallIncome = grossIncome + extraIncome - deductions;

      // Calculate tax based on age group
      let taxRate;
      if (age === "below40") {
        taxRate = 0.3;
      } else if (age === "40to60") {
        taxRate = 0.4;
      } else if (age === "above60") {
        taxRate = 0.1;
      }

      // Calculate tax amount
      let taxAmount = (overallIncome > 800000) ? (overallIncome - 800000) * taxRate : 0;

      // Display result in modal
      $("#taxAmount").text("₹" + taxAmount.toFixed(2));
      $("#taxModal").modal("show");
    }
  }

  // Event listener for Calculate Tax button click
  $("#calculateBtn").click(calculateTax);
});
