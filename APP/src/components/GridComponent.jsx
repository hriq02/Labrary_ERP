import { useState } from "react";
import "./GridComponent.css";

function GridComponent({GridHeader, CellsData, _onRowSelected, onHeaderSort, max_rows}) {
  const [rowSelected, setRowSelected] = useState(1); // usa state agora

  const OnRowSelected = (rowNumber) => {
    setRowSelected(rowNumber);
    if(_onRowSelected) _onRowSelected(rowNumber);
  }
  return (
    <div className="grid-container">
      <div className="grid-header">
        {GridHeader.map((rownName) => {
          return (
            <GridHeaderCell text={rownName} onClick={onHeaderSort} key={rownName}/>
          )
        })}
      </div>

      {CellsData.map( (rowData, index)=>{
        if(index >= max_rows) return null;
        return (
          <GridRow
            CellsData={rowData}
            rowNumber={index + 1}
            rowSelected={rowSelected}
            onRowSelected={OnRowSelected}
          />
        );

      })}
    </div>
  );
}

function GridHeaderCell({ text, onHeaderSort }) {
  return (
    <div className="grid-header-cell">
      <div>{text}</div>
      <button className="grid-header-sort" onClick={onHeaderSort}>
        <div className="fa fa-sort"></div>
      </button>
    </div>
  );
}

function GridRow({ CellsData, rowNumber, rowSelected, onRowSelected }) {
  const classNm = rowNumber === rowSelected ? "grid-row-selected" : "grid-row";
  const onSelected = () => {
    if (onRowSelected) onRowSelected(rowNumber);
  }
  return (
    <div className={classNm} onClick={onSelected} style={{ cursor: "pointer" }}>
      {CellsData.map((cellData) => {
        return(
            <div className="grid-row-cell">{cellData}</div>
        )
      })}
    </div>
  );
}

export default GridComponent;
