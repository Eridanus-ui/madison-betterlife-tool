const generatePDF = () => {
  // Create a new jsPDF instance
  const doc = new jsPDF();

  // Add logo
  const logoImg = new Image();
  logoImg.src =
    "data:image/png;base64,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";
  // Add logo
  doc.addImage(logoImg, "PNG", 10, 10, 60, 40); // Adjust the width to 60
  function checkValue(value) {
    const val = parseInt(value);
    if (parseInt(val) === 0 || val === false) return "Not Applicable";
    else return parseInt(value);
  }

  function checkInput(val, variable) {
    if (parseInt(val) === 0 || val === false) return "Not Applicable";
    else {
      return variable.label.toLocaleString();
    }
  }

  // Add current date and time
  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();

  doc.setFontSize(12);
  doc.text(`Date: ${currentDate}`, 140, 30);

  // Add content to the PDF document

  doc.setFontSize(12);
  doc.text(`Number of Members: ${numberOfMembers.label}`, 10, 70);
  doc.text(`Principal Member Age: ${ageValue.label}`, 10, 80);

  // Add rate options
  const rateOptions = [
    {
      label: "Inpatient Amount",
      amount: inPatientValue.label,
      value: intersectionInpatientValue.toLocaleString(),
    },
    {
      label: "Outpatient Amount",
      amount: checkInput(intersectionOutpatientValue, outPatientValue),
      value: checkValue(intersectionOutpatientValue).toLocaleString(),
    },
    {
      label: "Dental Amount",
      amount: checkInput(intersectionDentaltValue, dentalValue),
      value: checkValue(intersectionDentaltValue).toLocaleString(),
    },
    {
      label: "Optical Amount",
      amount: checkInput(intersectionOpticalValue, opticalValue),
      value: checkValue(intersectionOpticalValue).toLocaleString(),
    },
    {
      label: "Maternity Amount",
      amount: checkInput(intersectionMaternityValue, maternityValue),
      value: checkValue(intersectionMaternityValue).toLocaleString(),
    },
  ];
  doc.setFontSize(14);
  doc.text("Rate Options:", 10, 110);
  doc.text("Selected Option:", 70, 110);
  doc.text("Amount:", 140, 110);

  doc.setFontSize(12);
  let y = 120;
  rateOptions.forEach((option, index) => {
    doc.text(option.label, 10, y);
    doc.text(option.amount, 105, y, { align: "right" });
    doc.text(option.value, 158, y, { align: "right" });
    y += 10;
  });

  doc.setFontSize(18);
  doc.text("Total Premium: ", 63, 175);
  doc.text(
    `${(
      intersectionDentaltValue +
      intersectionInpatientValue +
      intersectionMaternityValue +
      intersectionOpticalValue +
      intersectionOutpatientValue
    ).toLocaleString()}.`,
    138,
    175
  );

  const advImg = new Image();
  advImg.src = "image007.jpg";
  // Add logo
  doc.addImage(advImg, "PNG", 10, 220, 190, 40); // Adjust the width to 60

  // Add lines
  const endOfPageY = doc.internal.pageSize.height - 10;
  doc.line(10, 50, doc.internal.pageSize.width - 10, 50); // Line below the image
  doc.line(10, endOfPageY, doc.internal.pageSize.width - 10, endOfPageY); // Line above the end of the page

  // Save the PDF document
  doc.save(`report-${currentDate}_${hours}:${minutes}:${seconds}.pdf`);
};
