import { useState } from "react";
import GridComponent from "../../components/GridComponent";
import SearchComponent,{PagNav} from "../../components/SmallComponents";
import "./Stock_module.css";

function StockModule() {
  
  const grid_max_rows = 12;
  
  const GridHeader = ["id", "BookID", "in Stock","number of orders","storage id","status",];
  const CellsData = [
    ["23", "32", "320", "100", "ab023", "not archived"],
    ["35", "125", "114", "34", "db343", "not archived"],
    ["61", "15",   "5",   "5", "gh942", "archived"],
    ["13", "78", "12", "10", "ab153", "archived"],
    ["23", "32", "320", "100", "ab023", "not archived"],
    ["35", "125", "114", "34", "db343", "not archived"],
    ["61", "15",   "5",   "5", "gh942", "archived"],
    ["13", "78", "12", "10", "ab153", "archived"],
    ["23", "32", "320", "100", "ab023", "not archived"],
    ["35", "125", "114", "34", "db343", "not archived"],
    ["61", "15",   "5",   "5", "gh942", "archived"],
    ["13", "78", "12", "10", "ab153", "archived"],
  ]

  
  const onRowSelected = (rowNumber) => {
    console.log(rowNumber);
  };
  const onHeaderSort = () => {
    console.log("onHeaderSort");
  };

  const [gridPage, setGridPage] = useState(1); // usa state agora
  const max_page = 10;

  const onPageChange = (page) => {
    if (page >= 1 && page <= max_page) {
      setGridPage(page);
    }
  };

  const onSearch = (content) => {
    console.log(content);
  }
  
  return (
    <div className="purchase-module-container">
      <div className="purchase-module-header">
        <div></div>
        <SearchComponent placeholder="Search" _onSearch={onSearch}/>
      </div>
      <div className="purchase-module-rows-container">
        <GridComponent
          GridHeader={GridHeader}
          CellsData={CellsData}
          _onRowSelected={onRowSelected}
          onHeaderSort={onHeaderSort}
          max_rows={grid_max_rows}
        />
      </div>
      <PagNav
        current_page={gridPage}
        max_page={max_page}
        onPageChange={onPageChange}
      />
    </div>
  )
}

export default StockModule;
