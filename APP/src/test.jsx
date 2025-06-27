import { useState } from "react";
import BooksModule from "./Modules/Books/Books_Module";
import PurchaseModule from "./Modules/Purchase/Purchase_module";
import StockModule from "./Modules/Stock/Stock_module";

// Test.jsx
function SideBar({ module_list, onModuleChange }) {
  return (
    <>
      {module_list.map((module, module_index) => (
        <button
          className="side-bar-button"
          key={module.module_name}
          onClick={() => onModuleChange(module_index)}
        >
          {/* <img className='side-bar-icon' src={module.icon_url} /> */}
          <div className={module.icon}></div>
          <div>{module.module_name}</div>
        </button>
      ))}
    </>
  );
}

function Test() {
  const modules_test = [
    new Module("Books", "fa fa-book", BooksModule),
    new Module("Purchase Orders", "fa fa-truck", PurchaseModule),
    new Module("Stock", "fa-solid fa-box",StockModule),
    new Module("Employee", "fa fa-user"),
  ];
  const [current_module, setCurrentModule] = useState(modules_test[0]);

  const OnModuleChange = (module_index) => {
    setCurrentModule(modules_test[module_index]);
  };
  return (
    <div className="root-container">
      <div className="main-container">
        <div className="side-bar">
          <div className="side-bar-header">Labrary</div>
          <SideBar module_list={modules_test} onModuleChange={OnModuleChange} />
        </div>
        <div className="main-frame">
          {current_module.module_name && <current_module.module_function />}
        </div>
      </div>
    </div>
  );
}

export class Module {
  constructor(module_name, icon, module_function) {
    this.module_name = module_name;
    this.icon = icon;
    this.module_function = module_function;
  }
}

export default Test;
