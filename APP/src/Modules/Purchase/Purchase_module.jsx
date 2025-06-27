import { useState } from "react";
import GridComponent from "../../components/GridComponent";
import SearchComponent,{PagNav,ButtonAction} from "../../components/SmallComponents";
import "./Purchase_module.css";
import EditOrderModal from "./Purchase_modal.jsx";

function PurchaseModule() {
  
  const grid_max_rows = 12;
  
  const GridHeader = ["id", "BookID", "tracking code", "status"];
  const CellsData = [
    ["1", "32", "1234", "pending"],
    ["2", "32", "1234", "aproved"],
    ["3", "32", "1234", "pending"],
    ["4", "32", "1234", "pending"],
    ["5", "32", "1234", "aproved"],
    ["6", "32", "1234", "denied"],
    ["7", "32", "1234", "aproved"],
    ["9", "32", "1234", "pending"],
    ["10", "32", "1234", "pending"],
  ]

  const [rowNumber, setRowNumber] = useState(1);

  const onRowSelected = (_rowNumber) => {
    setRowNumber(_rowNumber);
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

  const [isModalEditOpen, setIsModalEditOpen] = useState(false);

  const handleOpenEditModal = () => setIsModalEditOpen(true);

  const handleCloseModal = () => {
    setIsModalEditOpen(false);
  };

  const celldataToModal = (cellData) =>{
    return {
      id : cellData[0],
      BookId : cellData[1],
      trackingCode : cellData[2],
      status : cellData[3]
    }
  }
  
  return (
    <>
    {isModalEditOpen && (
      < EditOrderModal onClose={handleCloseModal} OrderData={celldataToModal(CellsData[rowNumber-1])} />
    )}
    <div className="purchase-module-container">
      <div className="purchase-module-header">
        <div className="purchase-module-buttons">
            <ButtonAction 
              text="edit" 
              icon="fa fa-edit" 
              onClick={handleOpenEditModal}
              classNm={"button-gen"}
            />
        </div>
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
    </>
  )
}

export default PurchaseModule;
