import { useState, useEffect } from "react";
import GridComponent from "../../components/GridComponent";
import SearchComponent,{PagNav} from "../../components/SmallComponents";
import "./Stock_module.css";
import "../../components/module_pane.css"

function StockModule() {
  
  const grid_max_rows = 12;
  const [gridPage, setGridPage] = useState(1);
  const max_page = 10;
  const GridHeader = ["id", "BookID", "in Stock","number of orders","storage id","status",];
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:5010/api/stocks?page=${gridPage}`)
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

  
  const onRowSelected = (rowNumber) => {
    console.log(rowNumber);
  };
  const onHeaderSort = () => {
    console.log("onHeaderSort");
  };

  const onPageChange = (page) => {
    if (page >= 1 && page <= max_page) {
      setGridPage(page);
    }
  };

  const onSearch = (content) => {
    console.log(content);
  }
  
  return (
    <div className="module-pane-container">
      <div className="module-pane-header">
        <div></div>
        <SearchComponent placeholder="Search" _onSearch={onSearch}/>
      </div>
      <GridComponent
        GridHeader={GridHeader}
        CellsData={stocks}
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
  )
}

export default StockModule;
