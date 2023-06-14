import React, { useEffect, useState, useRef } from "react";
import * as XLSX from "xlsx";
import AnimatedNumbers from "react-animated-numbers";
import { isEqual } from "lodash";

function IntersectionValueComponent({
  limitValue,
  colValue,
  sheetNumber,
  onIntersectionValueChange,
  uniqueId, // Unique identifier for each instance
}) {
  // Function to get the initial intersection value based on the sheetNumber
  const getInitialIntersectionValue = (sheetNumber) => {
    switch (sheetNumber) {
      case 0:
        return 44500; // Initial value for sheetNumber 0
      case 1:
        return 53400;
      default:
        return 0; // Default initial value if sheetNumber doesn't match any case
    }
  };

  // State variables
  const [intersectionValue, setIntersectionValue] = useState(
    getInitialIntersectionValue(sheetNumber) // Set the initial intersection value based on the sheetNumber
  );

  // Refs to store previous values of props
  const prevLimitValueRef = useRef(limitValue);
  const prevColValueRef = useRef(colValue);
  const prevSheetNumberRef = useRef(sheetNumber);
  const prevUniqueIdRef = useRef(uniqueId);

  useEffect(() => {
    // Check if any of the relevant props have changed
    if (
      limitValue !== prevLimitValueRef.current ||
      colValue !== prevColValueRef.current ||
      sheetNumber !== prevSheetNumberRef.current ||
      uniqueId !== prevUniqueIdRef.current
    ) {
      // Update the previous values with the current prop values
      prevLimitValueRef.current = limitValue;
      prevColValueRef.current = colValue;
      prevSheetNumberRef.current = sheetNumber;
      prevUniqueIdRef.current = uniqueId;

      async function fetchData() {
        try {
          // Fetch the Excel file
          const response = await fetch(
            "/MADISON-BETTERLIFE-SME-RATE-CARD.xlsx"
          );

          // Handle 404 error if the file is not found
          if (response.status === 404) throw new Error("404 File Not Found");

          // Read the Excel file into a workbook
          const buffer = await response.arrayBuffer();
          const workbook = XLSX.read(buffer, { type: "buffer" });

          // Get the name of the sheet based on the sheetNumber
          const sheetName = workbook.SheetNames[sheetNumber];
          const sheet = workbook.Sheets[sheetName];

          // Convert the sheet data to JSON
          const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 2 });

          // Filter out rows with empty values
          const filteredData = jsonData.filter((row) =>
            Object.values(row).some(
              (value) => value !== undefined && value !== ""
            )
          );

          // Function to get the value at the intersection of limitValue and colValue
          const getValueAtIntersection = (limitValue, colValue) => {
            if (!Array.isArray(filteredData)) return null;

            // Find the row object that matches the limitValue
            const rowObject = filteredData.find(
              (row) => row.Limit === limitValue
            );
            if (!rowObject) return null;

            // Get the value at the colValue for the found row
            const numberOfMembersValue = rowObject[colValue];
            if (
              numberOfMembersValue === undefined ||
              numberOfMembersValue === null
            )
              return null;

            return numberOfMembersValue;
          };

          // Get the intersection value for the current limitValue and colValue
          const intersectionValue = Math.round(
            getValueAtIntersection(limitValue, colValue)
          );

          // Update the intersectionValue state and call the callback function
          setIntersectionValue(intersectionValue || 0);
          onIntersectionValueChange(intersectionValue || 0, uniqueId); // Pass the intersection value and unique identifier to the parent component
        } catch (error) {
          console.error("Error loading Excel file:", error.message);

          // Set the intersectionValue state to null and call the callback function with null
          setIntersectionValue(null);
          onIntersectionValueChange(null, uniqueId); // Pass null and unique identifier to the parent component in case of an error
        }
      }

      // Fetch the data when any of the relevant props have changed
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limitValue, colValue, sheetNumber, uniqueId]); // Only re-run the effect when these specific dependencies change

  // Render the AnimatedNumbers component with the intersectionValue as the animateToNumber prop
  return (
    <AnimatedNumbers
      includeComma
      animateToNumber={intersectionValue}
      fontStyle={{ fontSize: 20 }}
      locale="en-US"
    ></AnimatedNumbers>
  );
}

// Function to compare the relevant prop values (limitValue, colValue, and sheetNumber) using isEqual from Lodash
const arePropsEqual = (prevProps, nextProps) => {
  const {
    limitValue: prevLimitValue,
    colValue: prevColValue,
    sheetNumber: prevSheetNumber,
  } = prevProps;
  const {
    limitValue: nextLimitValue,
    colValue: nextColValue,
    sheetNumber: nextSheetNumber,
  } = nextProps;

  return isEqual(
    [prevLimitValue, prevColValue, prevSheetNumber],
    [nextLimitValue, nextColValue, nextSheetNumber]
  );
};

export default React.memo(IntersectionValueComponent, arePropsEqual);
