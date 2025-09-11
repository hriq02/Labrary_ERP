import { useState,useEffect } from "react";
import GridComponent from "../../components/GridComponent";
import SearchComponent,{PagNav,ButtonAction} from "../../components/SmallComponents";
import EditOrderModal from "./Purchase_modal.jsx";
import "../../components/module_pane.css"

function PurchaseModule() {
  
  const grid_max_rows = 12;
  const [orders, setOrders] = useState([]);
  const [gridPage, setGridPage] = useState(1); 
  const max_page = 10;
  const GridHeader = ["id", "BookID", "tracking code", "status"];
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);

  useEffect(() => {
    fetch(`http://127.0.0.1:5010/api/orders?page=${gridPage}`)
      .then((res) => {
        if (!res.ok) throw new Error("Error fetching\n" + res.statusText);
        return res.json();
      })
      .then((data) => {
        setOrders(data);
      })
      .catch((err) => {
        console.error("Erro:", err);
      });
  }, [gridPage]);

  const [rowNumber, setRowNumber] = useState(1);

  const onRowSelected = (_rowNumber) => {
    setRowNumber(_rowNumber);
  };
  const onHeaderSort = () => {
    console.log("onHeaderSort");
  };

  const onPageChange = (page) => {
    if (page >= 1 && page <= max_page) {
      setGridPage(page);
      setOrders([]);
    }
  };

  const onSearch = (content) => {
    console.log(content);
  }

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
    <div className="module-pane-container">
      <div className="module-pane-header">
        <div className="module-pane-header-buttons">
            <ButtonAction 
              text="edit" 
              icon="fa fa-edit" 
              onClick={handleOpenEditModal}
              classNm={"button-gen"}
            />
        </div>
        <SearchComponent placeholder="Search" _onSearch={onSearch}/>
      </div>
      <GridComponent
        GridHeader={GridHeader}
        CellsData={orders}
        _onRowSelected={onRowSelected}
        onHeaderSort={onHeaderSort}
        max_rows={grid_max_rows}
      />
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
