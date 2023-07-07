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
    const [deentalCheckbox, setDentalCheckbox] = useState(false);
    const [opticalCheckbox, setOpticalCheckbox] = useState(false);
    const [maternityCheckbox, setMaternityCheckbox] = useState(false);

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

    const handleGeneratePDF = () => {
      generatePDF();
    };

    const handleInputChange = (e) => {
      const value = e.target.value;
      setInputtedValue(value);
    };

    const setParams = () => {
      let setTotalValue;
      let totalNumberOf;
      let valuesRef;
      switch (numberOfMembers.value) {
        case "M":
          setTotalValue = setTotalValueofM;
          totalNumberOf = totalNumberOfM;

          break;
        // Add cases for other options if needed
        case "M+1":
          setTotalValue = setTotalValueofMplus1;
          totalNumberOf = totalNumberOfMplus1;
          break;
        case "M+2":
          setTotalValue = setTotalValueofMplus2;
          totalNumberOf = totalNumberOfMplus2;
          break;
        case "M+3":
          setTotalValue = setTotalValueofMplus3;
          totalNumberOf = totalNumberOfMplus3;
          break;
        case "M+4":
          setTotalValue = setTotalValueofMplus4;
          totalNumberOf = totalNumberOfMplus4;
          break;
        case "M+5":
          setTotalValue = setTotalValueofMplus5;
          totalNumberOf = totalNumberOfMplus5;
          break;
        case "M+6":
          setTotalValue = setTotalValueofMplus6;
          totalNumberOf = totalNumberOfMplus6;
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
      const { setTotalValue, totalNumberOf, valuesRef } = setParams();
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
    }, [
      totalValueOfM,
      totalValueOfMplus1,
      totalValueOfMplus2,
      totalValueOfMplus3,
      totalValueOfMplus4,
      totalValueOfMplus5,
      totalValueOfMplus6,
    ]);

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
