import React, { memo, useEffect, useRef } from "react";
import Select from "react-select";
import { useState } from "react";
// import { extractValues } from "../ExtractValues";
import IntersectionValueComponent from "./IntersectionValue";
import { Age, outPatient } from "../xlsx/data";
import TotalValueComponent from "./TotalValueComponent";
// import ReadData from "../xlsx/readData";
import jsPDF from "jspdf";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import setTotal from "../xlsx/handleSubmit";

const SelectComponent = memo(
  ({ inPatient, outPatient, dental, maternity, optical, Members }) => {
    const [inPatientValue, setInPatientValue] = useState({
      value: 5000000,
      label: "5,000,000",
    });
    const [numberOfMembers, setNumberOfMembers] = useState({
      value: "M",
      label: "M",
    });
    const [ageValue, setAgeValue] = useState({
      value: 0,
      label: "18-50 Yrs",
    });
    const [outPatientValue, setOutPatientValue] = useState({
      value: 250000,
      label: "250,000",
    });
    const [dentalValue, setDentalValue] = useState({
      value: 50000,
      label: "50,000",
    });
    const [opticalValue, setOpticalValue] = useState({
      value: 50000,
      label: "50,000",
    });
    const [maternityValue, setMaternityValue] = useState({
      value: 200000,
      label: "200,000",
    });

    const [intersectionInpatientValue, setIntersectionInpatientValue] =
      useState(44500);
    const [intersectionOutpatientValue, setIntersectionOutpatientValue] =
      useState(0);
    const [intersectionDentaltValue, setIntersectionDentalValue] = useState(0);
    const [intersectionOpticalValue, setIntersectionOpticalValue] = useState(0);
    const [intersectionMaternityValue, setIntersectionMaternityValue] =
      useState(0);

    const [outPatientSelected, setOutPatientSelected] = useState(false);
    const [dentalSelected, setDentalSelected] = useState(false);
    const [opticalSelected, setOpticalSelected] = useState(false);
    const [maternitySelected, setMaternitySelected] = useState(false);
    const [inputtedValue, setInputtedValue] = useState("");

    const [calculatedTotal, setCalculatedTotal] = useState(0);

    const [outPatientCheckbox, setOupatientCheckbox] = useState(false);

    const [totalValueOfM, setTotalValueofM] = useState(0);
    const [totalValueOfMplus1, setTotalValueofMplus1] = useState(0);
    const [totalValueOfMplus2, setTotalValueofMplus2] = useState(0);
    const [totalValueOfMplus3, setTotalValueofMplus3] = useState(0);
    const [totalValueOfMplus4, setTotalValueofMplus4] = useState(0);
    const [totalValueOfMplus5, setTotalValueofMplus5] = useState(0);
    const [totalValueOfMplus6, setTotalValueofMplus6] = useState(0);

    const totalNumberOfM = 0;
    const totalNumberOfMplus1 = 0;
    const totalNumberOfMplus2 = 0;
    const totalNumberOfMplus3 = 0;
    const totalNumberOfMplus4 = 0;
    const totalNumberOfMplus5 = 0;
    const totalNumberOfMplus6 = 0;

    const [setTotalNumberOfM, setNumberOfM] = useState(0);
    const [setTotalNumberOfMplus1, setNumberOfPlus1] = useState(0);
    const [setTotalNumberOfMplus2, setNumberOfPlus2] = useState(0);
    const [setTotalNumberOfMplus3, setNumberOfPlus3] = useState(0);
    const [setTotalNumberOfMplus4, setNumberOfPlus4] = useState(0);
    const [setTotalNumberOfMplus5, setNumberOfPlus5] = useState(0);
    const [setTotalNumberOfMplus6, setNumberOfPlus6] = useState(0);

    const customStyles = {
      menuPortal: (provided) => ({
        ...provided,
        zIndex: 9999, // Adjust the z-index to make sure the menu appears on top
      }),
      menu: (provided) => ({
        ...provided,
        position: "fixed", // Use fixed positioning to overlay the menu on top of the page
        top: "600px", // Position the menu at the top of the page
        left: "180px", // Position the menu at the left of the page
        width: "70%", // Set the width to cover the entire page
        zIndex: 9999, // Adjust the z-index to make sure the menu appears on top
      }),
    };

    const checkOutPatientCheckBox = () => {
      if (outPatientCheckbox === true) {
        return false;
      } else return true;
    };

    const handleReset = () => {
      setIntersectionInpatientValue(45000);
      window.location.reload();
    };

    const handleInPatientChange = (selectedOption) => {
      setInPatientValue(selectedOption);
    };

    const handleNumberOfMembers = (selectedOption) => {
      setNumberOfMembers(selectedOption);
    };
    const handleAgeValue = (selectedOption) => {
      setAgeValue(selectedOption);
    };

    const handleOutPatientChange = (selectedOption) => {
      setOutPatientValue(selectedOption);
    };

    const handleDentalChange = (selectedOption) => {
      setDentalValue(selectedOption);
    };

    const handleOpticalChange = (selectedOption) => {
      setOpticalValue(selectedOption);
    };

    const handleMaternityChange = (selectedOption) => {
      setMaternityValue(selectedOption);
    };

    const handleOutPatientCheckboxChange = (event) => {
      setOutPatientSelected(event.target.checked);
      setOupatientCheckbox(true);
      checkOutPatientCheckBox();
    };

    const handleDentalCheckboxChange = (event) => {
      setDentalSelected(event.target.checked);
    };

    const handleOpticalCheckboxChange = (event) => {
      setOpticalSelected(event.target.checked);
    };

    const handleMaternityCheckboxChange = (event) => {
      setMaternitySelected(event.target.checked);
    };

    const getSelectedValue = (selectedValue, isSelected) => {
      return isSelected ? selectedValue?.value || 0 : 0;
    };

    const handleIntersectionInpatientValue = (e) => {
      setIntersectionInpatientValue(e);
    };
    const handleIntersectionOutpatientValue = (e) => {
      setIntersectionOutpatientValue(e);
    };
    const handleIntersectionDentalValue = (e) => {
      setIntersectionDentalValue(e);
    };
    const handleIntersectionOpticalValue = (e) => {
      setIntersectionOpticalValue(e);
    };
    const handleIntersectionMaternityValue = (e) => {
      setIntersectionMaternityValue(e);
    };

    const outPatientFinalValue = getSelectedValue(
      outPatientValue,
      outPatientSelected
    );
    const dentalFinalValue = getSelectedValue(dentalValue, dentalSelected);
    const maternityFinalValue = getSelectedValue(
      maternityValue,
      maternitySelected
    );
    const opticalFinalValue = getSelectedValue(opticalValue, opticalSelected);

    const handleIntersectionOutpatientChange = (ageValue) => {
      switch (ageValue.value) {
        case 0:
          return 2;
        case 1:
          return 3;
        default:
          return 2;
      }
    };

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
      doc.text(`Number of Members:`, 10, 70);
      doc.text(`    M   Members: ${setTotalNumberOfM}`, 25, 80);
      doc.text(`M+1   Members: ${setTotalNumberOfMplus1}`, 25, 90);
      doc.text(`M+2   Members: ${setTotalNumberOfMplus2}`, 25, 100);
      doc.text(`M+3   Members: ${setTotalNumberOfMplus3}`, 25, 110);
      doc.text(`M+4   Members: ${setTotalNumberOfMplus4}`, 25, 120);
      doc.text(`M+5   Members: ${setTotalNumberOfMplus5}`, 25, 130);

      doc.text(`Principal Member Age: ${ageValue.label}`, 10, 150);

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
      doc.setFontSize(15);
      doc.text("Rate Options:", 10, 162);
      doc.text("Selected Option:", 70, 162);
      doc.text("Amount:", 142, 162);

      doc.setFontSize(12);
      let y = 175;
      rateOptions.forEach((option, index) => {
        doc.text(option.label, 10, y);
        doc.text(option.amount, 102, y, { align: "right" });
        doc.text(option.value, 161, y, { align: "right" });
        y += 10;
      });

      doc.setFontSize(18);
      doc.text("Total Premium: ", 63, 230);
      doc.text(`${calculatedTotal.toLocaleString()}.`, 138, 230, {
        align: "left",
      });

      const advImg = new Image();
      advImg.src = "image007.jpg";
      // Add logo
      doc.addImage(advImg, "PNG", 10, 240, 190, 40); // Adjust the width to 60

      // Add lines
      const endOfPageY = doc.internal.pageSize.height - 10;
      doc.line(10, 50, doc.internal.pageSize.width - 10, 50); // Line below the image
      doc.line(10, endOfPageY, doc.internal.pageSize.width - 10, endOfPageY); // Line above the end of the page

      // Save the PDF document
      doc.save(`report-${currentDate}_${hours}:${minutes}:${seconds}.pdf`);
    };

    const handleInputChange = (e) => {
      const value = e.target.value;
      setInputtedValue(value);
    };

    const setParams = () => {
      let setTotalValue;
      let totalNumberOf;
      // let valuesRef;
      switch (numberOfMembers.value) {
        case "M":
          setTotalValue = setTotalValueofM;
          totalNumberOf = totalNumberOfM;
          setNumberOfM(inputtedValue);
          break;
        // Add cases for other options if needed
        case "M+1":
          setTotalValue = setTotalValueofMplus1;
          totalNumberOf = totalNumberOfMplus1;
          setNumberOfPlus1(inputtedValue);
          break;
        case "M+2":
          setTotalValue = setTotalValueofMplus2;
          totalNumberOf = totalNumberOfMplus2;
          setNumberOfPlus2(inputtedValue);
          break;
        case "M+3":
          setTotalValue = setTotalValueofMplus3;
          totalNumberOf = totalNumberOfMplus3;
          setNumberOfPlus3(inputtedValue);
          break;
        case "M+4":
          setTotalValue = setTotalValueofMplus4;
          totalNumberOf = totalNumberOfMplus4;
          setNumberOfPlus4(inputtedValue);
          break;
        case "M+5":
          setTotalValue = setTotalValueofMplus5;
          totalNumberOf = totalNumberOfMplus5;
          setNumberOfPlus5(inputtedValue);
          break;
        case "M+6":
          setTotalValue = setTotalValueofMplus6;
          totalNumberOf = totalNumberOfMplus6;
          setNumberOfPlus6(inputtedValue);

          break;
        default:
          break;
      }
      return {
        setTotalValue,
        totalNumberOf,
      };
    };

    const handleSubmit = (variable) => {
      const { setTotalValue, totalNumberOf } = setParams();
      setTotalValue(() =>
        setTotal(
          inputtedValue,
          variable,
          totalNumberOf,
          intersectionInpatientValue,
          intersectionOutpatientValue,
          intersectionDentaltValue,
          intersectionOpticalValue,
          intersectionMaternityValue
          // valuesRef
        )
      );
    };

    useEffect(() => {
      const newCalculatedTotal =
        totalValueOfM +
        totalValueOfMplus1 +
        totalValueOfMplus2 +
        totalValueOfMplus3 +
        totalValueOfMplus4 +
        totalValueOfMplus5 +
        totalValueOfMplus6;
      setCalculatedTotal(newCalculatedTotal);
      console.log(`setTotalNumberOfM: ${setTotalNumberOfM}`);
    }, [
      totalValueOfM,
      totalValueOfMplus1,
      totalValueOfMplus2,
      totalValueOfMplus3,
      totalValueOfMplus4,
      totalValueOfMplus5,
      totalValueOfMplus6,
    ]);

    const handleGeneratePDF = () => {
      generatePDF();
      console.log(totalNumberOfM);
    };

    return (
      <div className="flex flex-col justify-between items-center">
        <div className="w-full md:w-1/2 flex items-center space-x-2 pt-8">
          <h1 className="mr-14 w-1/4 text-lg text-white">
            Principal Member Age
          </h1>
          <div className="w-full flex items-center  space-x-2">
            <Select
              className="w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              options={Age}
              value={ageValue}
              onChange={handleAgeValue}
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 flex items-center space-x-2 pt-8">
          <h1 className="mr-2 w-1/4 text-lg text-white">Inpatient</h1>
          <div className="w-full flex items-center  space-x-2">
            <Select
              className="w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              options={inPatient}
              value={inPatientValue}
              onChange={handleInPatientChange}
            />
          </div>

          <div className="w-28 mr-20">
            <div className="border border-gray-300 rounded-md p-2 pl-1 bg-white">
              <IntersectionValueComponent
                limitValue={inPatientValue.value}
                colValue={numberOfMembers.value}
                sheetNumber={ageValue.value}
                onIntersectionValueChange={handleIntersectionInpatientValue}
                uniqueId="component1"
              />
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex items-center space-x-2 pt-8">
          <h1 className="mr-2 w-1/4 text-lg text-white">Outpatient</h1>
          <div className="w-full flex items-center  space-x-2">
            <input
              type="checkbox"
              onChange={handleOutPatientCheckboxChange}
              checked={outPatientSelected}
              disabled={outPatientCheckbox}
            />
            <Select
              className="w-full py-2 px-3 border justify-end border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              options={outPatient}
              value={outPatientValue}
              onChange={handleOutPatientChange}
            />
          </div>
          <div className="w-28 mr-20">
            <div className="border border-gray-300 rounded-md pt-2 pb-2 pl-0.5 bg-white">
              <IntersectionValueComponent
                limitValue={outPatientFinalValue}
                colValue={numberOfMembers.value}
                sheetNumber={handleIntersectionOutpatientChange(ageValue)}
                onIntersectionValueChange={handleIntersectionOutpatientValue}
                uniqueId="component1"
              />
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex items-center space-x-2 pt-8">
          <h1 className="mr-2 w-1/4 text-lg text-white">Dental</h1>
          <div className="w-full flex items-center  space-x-2">
            <input
              type="checkbox"
              onChange={handleDentalCheckboxChange}
              checked={dentalSelected}
              disabled={checkOutPatientCheckBox()}
            />
            <Select
              options={dental}
              value={dentalValue}
              onChange={handleDentalChange}
              className="w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="w-28 mr-20">
            <div className="border border-gray-300 rounded-md p-2 pl-1 bg-white">
              <IntersectionValueComponent
                limitValue={dentalFinalValue}
                colValue={numberOfMembers.value}
                sheetNumber={4}
                onIntersectionValueChange={handleIntersectionDentalValue}
              />
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex items-center space-x-2 pt-8">
          <h1 className="mr-2  w-1/4 text-lg text-white">Optical</h1>
          <div className="w-full flex items-center  space-x-2">
            <input
              type="checkbox"
              onChange={handleOpticalCheckboxChange}
              checked={opticalSelected}
              disabled={checkOutPatientCheckBox()}
            />
            <Select
              options={optical}
              value={opticalValue}
              onChange={handleOpticalChange}
              className="w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="w-28 mr-20">
            <div className="border border-gray-300 rounded-md p-2 pl-1 bg-white">
              <IntersectionValueComponent
                limitValue={opticalFinalValue}
                colValue={numberOfMembers.value}
                sheetNumber={4}
                onIntersectionValueChange={handleIntersectionOpticalValue}
              />
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex items-center space-x-2 pt-8">
          <h1 className="mr-2 w-1/4 text-lg text-white">Maternity</h1>
          <div className="w-full flex items-center space-x-2">
            <input
              type="checkbox"
              onChange={handleMaternityCheckboxChange}
              checked={maternitySelected}
            />
            <Select
              options={maternity}
              value={maternityValue}
              onChange={handleMaternityChange}
              className="w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="w-28 mr-20">
            <div className="border border-gray-300 rounded-md p-2 pl-1 bg-white">
              <IntersectionValueComponent
                limitValue={maternityFinalValue}
                colValue={"Premiums"}
                sheetNumber={6}
                onIntersectionValueChange={handleIntersectionMaternityValue}
              />
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex items-center space-x-2 pt-8 md:flex-row sm:flex-row">
          <h1 className="mr-14 w-1/4 text-lg text-white">Number of Members</h1>
          <div className="w-full flex items-center  space-x-2">
            <Select
              styles={customStyles}
              className="w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
              options={Members}
              value={numberOfMembers}
              onChange={handleNumberOfMembers}
            />
          </div>
          <input
            placeholder="No. 1-15"
            type="number"
            min="1"
            max="15"
            value={inputtedValue}
            onChange={handleInputChange}
            className="py-2 px-1 border border-gray-300 rounded-md w-full"
          />
          <div className="flex justify-end ">
            <button
              onClick={() => {
                handleSubmit(numberOfMembers.value);
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Submit
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2 mx-2 bg-blue-500 text-white rounded-md"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex items-center space-x-2 pt-8">
          <h1 className="p-2 pr-4 text-lg text-white">Total Amount:</h1>
          <div className="flex-1 mr-8">
            <div className="w-26 p-2 pl-2 border-2 border-green-300 rounded-md bg-white">
              <TotalValueComponent calculatedTotal={calculatedTotal} />
            </div>
          </div>
          <button
            className="p-2 bg-blue-500 text-white rounded-md button"
            type="button"
            onClick={handleGeneratePDF}
          >
            Generate Report
          </button>
        </div>
        <ToastContainer />
      </div>
    );
  }
);

export default SelectComponent;
