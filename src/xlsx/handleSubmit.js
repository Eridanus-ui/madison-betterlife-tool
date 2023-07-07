import { Flip, Zoom, toast } from "react-toastify";

const setTotal = (
  inputtedValue,
  numberOfMembersValue,
  calculatedTotal,
  intersectionInpatientValue,
  intersectionOutpatientValue,
  intersectionDentalValue,
  intersectionOpticalValue,
  intersectionMaternityValue
  // valuesRef
) => {
  const inputValue = parseInt(inputtedValue);

  if (inputValue >= 1 && inputValue <= 15) {
    console.log("Selected Number of Members:", numberOfMembersValue);
    console.log("Inputted Value:", inputValue);
    if (intersectionInpatientValue !== 0) {
      calculatedTotal += inputValue * intersectionInpatientValue;
    } else {
      calculatedTotal -= inputValue * intersectionInpatientValue;
    }

    if (intersectionOutpatientValue !== 0) {
      calculatedTotal += inputValue * intersectionOutpatientValue;
    } else {
      calculatedTotal -= inputValue * Math.abs(intersectionOutpatientValue);
    }

    if (intersectionDentalValue !== 0) {
      calculatedTotal += inputValue * intersectionDentalValue;
    }

    if (intersectionOpticalValue !== 0) {
      calculatedTotal += inputValue * intersectionOpticalValue;
    }

    if (intersectionMaternityValue !== 0) {
      calculatedTotal += inputValue * intersectionMaternityValue;
    }

    console.log(calculatedTotal);
    console.log(intersectionInpatientValue);
    console.log(intersectionOutpatientValue);
    console.log(intersectionDentalValue);

    toast.success(`${numberOfMembersValue} set to ${inputtedValue}`, {
      toastId: inputtedValue,
      position: "bottom-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Flip,
    });
  } else {
    toast.error("Invalid input. Please enter a value between 1 and 15.", {
      toastId: "Invalid input. Please enter a value between 1 and 15.",
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Zoom,
    });
  }

  return calculatedTotal; // Return the calculated total value
};

export default setTotal;
