import React, { useMemo } from "react";
import AnimatedNumbers from "react-animated-numbers";

const TotalValueComponent = React.memo(({ calculatedTotal }) => {
  return (
    <div>
      <AnimatedNumbers
        className="border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        includeComma
        animateToNumber={calculatedTotal}
        fontStyle={{ fontSize: 20 }}
        locale="en-US"
      ></AnimatedNumbers>
    </div>
  );
});

export default TotalValueComponent;
