import "./Books.css";
import { useState } from "react";
import { createPortal } from "react-dom";
import GridComponent from "../../components/GridComponent";
import SearchComponent,{PagNav,ButtonAction} from "../../components/SmallComponents";
import AddBookModal, {
  ArchiveBookModal,
  EditBookModal,
} from "./Book_Modal.jsx";
import "../../components/module_pane.css"


function BooksModule() {
  const grid_max_rows = 12;
  const [gridPage, setGridPage] = useState(1); // usa state agora
  const max_page = 10;
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalArchiveOpen, setIsModalArchiveOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);

  const [rowSelected, setRowSelected] = useState(1); // usa state agora

  const handleOpenAddModal = () => setIsModalAddOpen(true);
  const handleOpenArchiveModal = () => setIsModalArchiveOpen(true);
  const handleOpenEditModal = () => setIsModalEditOpen(true);

  const handleCloseModal = () => {
    setIsModalAddOpen(false);
    setIsModalArchiveOpen(false);
    setIsModalEditOpen(false);
  };

  const onPageChange = (page) => {
    if (page >= 1 && page <= max_page) {
      setGridPage(page);
    }
  };

  const onRowSelect = (rowNumber) => {
    setRowSelected(rowNumber);
  };
  
  const onSearch = (content) => {
    console.log(content);
  }

  const books = [
    ["1", "Book1", "Author1", "Publisher1", "100", "Category1", "10"],
    ["2", "Book2", "Author2", "Publisher2", "200", "Category2", "20"],
    ["3", "Book3", "Author3", "Publisher3", "300", "Category3", "30"],
    ["4", "Book4", "Author4", "Publisher4", "400", "Category4", "40"],
    ["5", "Book5", "Author5", "Publisher5", "500", "Category5", "50"],
    ["6", "Book6", "Author6", "Publisher6", "600", "Category6", "60"],
    ["7", "Book7", "Author7", "Publisher7", "700", "Category7", "70"],
    ["8", "Book8", "Author8", "Publisher8", "800", "Category8", "80"],
    ["9", "Book9", "Author9", "Publisher9", "900", "Category9", "90"],
    ["10","Book10","Author10","Publisher10","1000","Category10","100,"],
    ["11","Book11","Author11","Publisher11","1100","Category11","110,"],
    ["12","Book12","Author12","Publisher12","1200","Category12","120,"],
  ];

  const headers = ["id", "name", "author", "publisher", "price", "category", "quantity"];


  const onHeaderSort = () => {
    console.log("onHeaderSort");
  };

  return (
    <>
      {isModalAddOpen &&
        !isModalArchiveOpen &&
        !isModalEditOpen &&
        createPortal(
          <AddBookModal onClose={handleCloseModal} />,
          document.body,
      )}
      {isModalArchiveOpen &&
        !isModalAddOpen &&
        !isModalEditOpen &&
        createPortal(
          <ArchiveBookModal
            onClose={handleCloseModal}
            BookData={books[rowSelected - 1]}
          />,
          document.body,
      )}
      {isModalEditOpen &&
        !isModalAddOpen &&
        !isModalArchiveOpen &&
        createPortal(
          <EditBookModal
            onClose={handleCloseModal}
            BookData={books[rowSelected - 1]}
          />,
          document.body,
      )}

      <div className="module-pane-container">
        <div className="module-pane-header">
          <div className="module-pane-header-buttons">
            <ButtonAction
              text={"Add Book"}
              icon={"fa fa-plus"}
              onClick={handleOpenAddModal}
              classNm={"button-gen"}
            />
            <ButtonAction
              text={"Archive Book"}
              icon={"fa fa-archive"}
              onClick={handleOpenArchiveModal}
              classNm={"button-gen"}
            />
            <ButtonAction
              text={"Edit Book"}
              icon={"fa fa-edit"}
              onClick={handleOpenEditModal}
              classNm={"button-gen"}
            />
          </div>

          <SearchComponent placeholder="Search" _onSearch={onSearch}/>

        </div>
        <GridComponent 
          GridHeader={headers}
          CellsData={books}
          _onRowSelected={onRowSelect}
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
  );
}


export default BooksModule;
