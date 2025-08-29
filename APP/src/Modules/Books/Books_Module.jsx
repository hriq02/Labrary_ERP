import "./Books.css";
import { useState, useEffect } from "react";
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
  const [books, setBooks] = useState([]);

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
      setBooks([]);
    }
  };

  const onRowSelect = (rowNumber) => {
    setRowSelected(rowNumber);
  };
  
  const onSearch = (content) => {
    console.log(content);
  }

  useEffect(() => {
    fetch(`http://127.0.0.1:5010/api/books?page=${gridPage}`)
      .then((res) => {
        if (!res.ok) throw new Error("Error fetching\n" + res.status);
        return res.json();
      })
      .then((data) => {
        setBooks(data);
      })
      .catch((err) => {
        console.error("Erro:", err);
      });
  }, [gridPage]);

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


