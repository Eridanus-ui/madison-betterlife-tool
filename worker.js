// worker.js

importScripts(
  "https://unpkg.com/xlsx/dist/xlsx.full.min.js",
  "https://unpkg.com/xlsx/dist/cpexcel.js"
);

self.addEventListener("message", async (event) => {
  const { limitValue, colValue, sheetNumber } = event.data;

  try {
    // Fetch the Excel file
    const response = await fetch("/MADISON-BETTERLIFE-SME-RATE-CARD.xlsx");

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
      Object.values(row).some((value) => value !== undefined && value !== "")
    );

    // Function to get the value at the intersection of limitValue and colValue
    const getValueAtIntersection = (limitValue, colValue) => {
      if (!Array.isArray(filteredData)) return null;

      // Find the row object that matches the limitValue
      const rowObject = filteredData.find((row) => row.Limit === limitValue);
      if (!rowObject) return null;

      // Get the value at the colValue for the found row
      const numberOfMembersValue = rowObject[colValue];
      if (numberOfMembersValue === undefined || numberOfMembersValue === null)
        return null;

      return numberOfMembersValue;
    };

    // Get the intersection value for the current limitValue and colValue
    const intersectionValue = Math.round(
      getValueAtIntersection(limitValue, colValue)
    );

    // Send the intersection value back to the main thread
    self.postMessage({ intersectionValue });
  } catch (error) {
    console.error("Error loading Excel file:", error.message);

    // Send null in case of an error
    self.postMessage({ intersectionValue: null });
  }
});
