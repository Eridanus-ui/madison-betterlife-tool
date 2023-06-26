import React, { useEffect, useState, useRef } from "react";
import * as XLSX from "xlsx";
import AnimatedNumbers from "react-animated-numbers";
import { isEqual } from "lodash";

function IntersectionValueComponent({
  limitValue,
  colValue,
  sheetNumber,
  onIntersectionValueChange,
  uniqueId,
}) {
  const [intersectionValue, setIntersectionValue] = useState(null);
  const workerRef = useRef(null);

  useEffect(() => {
    // Create a new web worker when the component mounts
    const worker = new Worker("worker.js");
    workerRef.current = worker;

    // Handle messages received from the web worker
    worker.addEventListener("message", (event) => {
      const { intersectionValue } = event.data;
      setIntersectionValue(intersectionValue);
      onIntersectionValueChange(intersectionValue, uniqueId);
    });

    return () => {
      // Terminate the web worker when the component unmounts
      worker.terminate();
    };
  }, [uniqueId, onIntersectionValueChange]);

  useEffect(() => {
    // Send the necessary data to the web worker for processing
    workerRef.current.postMessage({ limitValue, colValue, sheetNumber });
  }, [limitValue, colValue, sheetNumber]);

  return (
    <AnimatedNumbers
      includeComma
      animateToNumber={intersectionValue}
      fontStyle={{ fontSize: 20 }}
      locale="en-US"
    ></AnimatedNumbers>
  );
}

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
