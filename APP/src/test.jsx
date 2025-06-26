import { useState } from 'react'
import BooksModule from './Books_Module'
// Test.jsx
function SideBar({ module_list }) {
  return (
    <>
      {module_list.map(module => (
        <button className='side-bar-button' key={module.module_name}>
            {/* <img className='side-bar-icon' src={module.icon_url} /> */}
            <div className={module.icon}></div>
            <div>{module.module_name}</div>
        </button>
      ))}
    </>
  )
}

function Test() {
  const modules_test = [
    new Module("Books", "fa fa-book",BooksModule),
    new Module("Purchase Orders", "fa fa-truck"),
    new Module("Stock", "fa-solid fa-box"),
    new Module("Employee", "fa fa-user"),
  ]
  let current_module = modules_test[0]
  return (
    <div className="root-container">
      <div className="main-container">
        <div className="side-bar">
          <div className="side-bar-header">Labrary</div>
          <SideBar module_list={modules_test} />
        </div>
        <div className="main-frame">
          <current_module.module_function />
        </div>
      </div>
    </div>
  )
}


export class Module {
    constructor(module_name, icon, module_function ) {
        this.module_name = module_name
        this.icon = icon
        this.module_function = module_function

    }
}


export default Test