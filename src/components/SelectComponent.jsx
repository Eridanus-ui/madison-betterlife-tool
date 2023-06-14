import React, { memo } from "react";
import Select from "react-select";
import { useState } from "react";
// import { extractValues } from "../ExtractValues";
import IntersectionValueComponent from "../xlsx/IntersectionValue";
import { Age } from "../xlsx/data";
import TotalValueComponent from "./TotalValueComponent";
// import ReadData from "../xlsx/readData";

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
    // const [totalAmount, setTotalAmount] = useState(44500);

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

    return (
      <div className="flex flex-col justify-between items-center">
        <div className="w-full md:w-1/2 flex items-center space-x-2 pt-8">
          <h1 className="mr-14 w-1/4 text-lg text-white">Number of Members</h1>
          <div className="w-full flex items-center  space-x-2">
            <Select
              className="w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
              options={Members}
              value={numberOfMembers}
              onChange={handleNumberOfMembers}
            />
          </div>
        </div>

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

        <div className="w-full md:w-1/2 flex items-center space-x-2 pt-8">
          <h1 className="p-2 pr-4 text-lg text-white">Total Amount:</h1>
          <div className="flex-1 mr-8">
            <div className="w-26 p-2 pl-2 border-2 border-green-300 rounded-md bg-white">
              <TotalValueComponent
                inPatientAmount={intersectionInpatientValue}
                outPatientAmount={intersectionOutpatientValue}
                dentalAmount={intersectionDentaltValue}
                opticalAmount={intersectionOpticalValue}
                maternityAmount={intersectionMaternityValue}
              />
            </div>
          </div>
          <button
            className="p-2 bg-blue-500 text-white rounded-md"
            type="button"
          >
            Generate Report
          </button>
        </div>
      </div>
    );
  }
);

export default SelectComponent;
