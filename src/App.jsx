import "./App.css";
import SelectComponent from "./components/SelectComponent";
import {
  inPatient,
  outPatient,
  Dental,
  Maternity,
  Optical,
  Members,
} from "./xlsx/data";

function App() {
  return (
    <div className="App md:my-6 mx-auto sm:mt-1  sm:px-6 lg:px-8 bg-white dark:bg-slate-800 rounded-lg px-6 py-6 ring-1 ring-slate-900/5 shadow-2xl">
      <div className="flex justify-center  bg-white rounded-lg">
        <img
          src="Madison-Insurance-Company-Kenya.png"
          alt="Company Logo"
          className="w-40 h-45"
        />
      </div>
      <SelectComponent
        inPatient={inPatient}
        outPatient={outPatient}
        dental={Dental}
        optical={Optical}
        maternity={Maternity}
        Members={Members}
      />
    </div>
  );
}

export default App;
