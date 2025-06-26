import "./Books.css"
import { useState } from "react";
import { createPortal } from "react-dom";
import AddBookModal, { ArchiveBookModal, EditBookModal } from "./Book_Modal.jsx";


function BooksModule(){
    const grid_max_rows = 12;
    const [gridPage, setGridPage] = useState(1);  // usa state agora
    const max_page = 10;
    const [isModalAddOpen, setIsModalAddOpen] = useState(false);
    const [isModalArchiveOpen, setIsModalArchiveOpen] = useState(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);

    const [rowSelected, setRowSelected] = useState(1);  // usa state agora


    const handleOpenAddModal = () => setIsModalAddOpen(true);
    const handleOpenArchiveModal = () => setIsModalArchiveOpen(true);
    const handleOpenEditModal = () => setIsModalEditOpen(true);

    const handleCloseModal = () =>{
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

    const books =[
        new BookInfo(1,"Book1","Author1","Publisher1",100,"Category1",10),
        new BookInfo(2,"Book2","Author2","Publisher2",200,"Category2",20),
        new BookInfo(3,"Book3","Author3","Publisher3",300,"Category3",30),
        new BookInfo(4,"Book4","Author4","Publisher4",400,"Category4",40),
        new BookInfo(5,"Book5","Author5","Publisher5",500,"Category5",50),
        new BookInfo(6,"Book6","Author6","Publisher6",600,"Category6",60),
        new BookInfo(7,"Book7","Author7","Publisher7",700,"Category7",70),
        new BookInfo(8,"Book8","Author8","Publisher8",800,"Category8",80),
        new BookInfo(9,"Book9","Author9","Publisher9",900,"Category9",90),
        new BookInfo(10,"Book10","Author10","Publisher10",1000,"Category10",100),
        new BookInfo(11,"Book11","Author11","Publisher11",1100,"Category11",110),
        new BookInfo(12,"Book12","Author12","Publisher12",1200,"Category12",120),
    ]

    return (
        <>
        {isModalAddOpen && !isModalArchiveOpen && !isModalEditOpen &&  createPortal(
            <AddBookModal onClose={handleCloseModal} />,
            document.body
        )}
        {isModalArchiveOpen && !isModalAddOpen && !isModalEditOpen && createPortal(
            <ArchiveBookModal onClose={handleCloseModal} BookData={books[rowSelected-1]} />,
            document.body
        )}
        {isModalEditOpen && !isModalAddOpen && !isModalArchiveOpen && createPortal(
            <EditBookModal onClose={handleCloseModal} BookData={books[rowSelected-1]} />,
            document.body
        )}

        <div className="books-module-container">
            <div className="books-module-header">

                <div className="books-module-buttons">
                    
                    <ButtonAction text={"Add Book"} classNm={"books-module-button-gen"} icon={"fa fa-plus"} onClick={handleOpenAddModal} />
                    <ButtonAction text={"Archive Book"} classNm={"books-module-button-gen"} icon={"fa fa-archive"} onClick={handleOpenArchiveModal}/>
                    <ButtonAction text={"Edit Book"} classNm={"books-module-button-gen"} icon={"fa fa-edit"} onClick={handleOpenEditModal}/>

                </div>
                
                <SearchBar />

            </div>

            <div className="books-module-rows-container">

                <div className="books-module-grid-header">
                    <GridHeaderCell text="id" />
                    <GridHeaderCell text="name" />
                    <GridHeaderCell text="author" />
                    <GridHeaderCell text="publisher" />
                    <GridHeaderCell text="price" />
                    <GridHeaderCell text="category" />
                    <GridHeaderCell text="in stock" />                    
                </div>

                {books.map((book, index) => {
                    if(index >= grid_max_rows) return null;
                    return(
                        <Book 
                            bookInfo={book} 
                            rowNumber={index} 
                            rowSelected={rowSelected} 
                            onRowSelect={onRowSelect}
                            key={index}
                        />
                    )
                })}

            </div>

            <PagNav current_page={gridPage} max_page={max_page} onPageChange={onPageChange}/>

        </div>
        </>
    )
}


function PagNav({ current_page, max_page, onPageChange, onClick }) {
    let input_page = 0;
    const onInputChange = (event) => {
        const value = event.target.value;
        if (value === "") return;
        const page = parseInt(value, 10);

        if (isNaN(page) || page < 1 ) event.target.value = "";
        else{
            event.target.value = page;
            input_page = page;
        }
        
    }

    const onConfirm = () =>{
        if(input_page < 1 || input_page > max_page) return;
        onPageChange(input_page);
    }

    return (
        <div className="books-module-pag-nav">
            <button className="books-module-pag-nav-button" onClick={() => onPageChange(current_page - 1)}>
                <div className="fa fa-angle-left"></div>
            </button>

            {current_page > 1 && <div className="fa fa-ellipsis-h"></div>}

            <div className="books-module-pag-nav-current">{current_page}</div>
            
            <input className="books-module-pag-search" onChange={onInputChange}></input>

            <button className="books-module-pag-nav-search" onClick={onConfirm}>
                <div className="fa fa-search"></div>
            </button>

            {current_page < max_page && <div className="fa fa-ellipsis-h"></div>}

            <button className="books-module-pag-nav-button" onClick={() => onPageChange(current_page + 1)}>
                <div className="fa fa-angle-right"></div>
            </button>
        </div>
    );
}

function SearchBar(){
    return(
        <div className="books-module-search">
            <div className="fa fa-search"></div>
            <input className="books-module-search-bar" type="text" placeholder="Search" />
        </div>
    )
}


function ButtonAction({text,classNm, icon, onClick}){
    return(
        <button className={classNm} onClick={onClick}>
            <div className={icon}></div>
            <div>{text}</div>
        </button>
    )
}

function GridHeaderCell({text}){
    return(
        <div className="books-module-grid-header-cell">
            <div>{text}</div>
            <button className="books-module-grid-header-sort">
                <div className="fa fa-sort"></div>
            </button>
        </div>
    )
}

function Book({bookInfo, rowNumber, rowSelected, onRowSelect}){
    const isSelected = rowNumber === rowSelected;
    const classNm = isSelected ? "books-module-row-selected" : "books-module-row";
    
    const onClicked = () => {
        if(onRowSelect){
            onRowSelect(rowNumber);
        }
    };
    
    return(
        <div className={classNm} onClick={onClicked} style={{cursor: 'pointer'}}>
            <div className="books-module-row-cell">{bookInfo.id}</div>
            <div className="books-module-row-cell">{bookInfo.name}</div>
            <div className="books-module-row-cell">{bookInfo.author}</div>
            <div className="books-module-row-cell">{bookInfo.publisher}</div>
            <div className="books-module-row-cell">{bookInfo.price}</div>
            <div className="books-module-row-cell">{bookInfo.category}</div>
            <div className="books-module-row-cell">{bookInfo.quantity}</div>
        </div>
    )
}
export default BooksModule

class BookInfo {
    constructor(id,name,author,publisher,price,category,quantity) {
        this.id = id
        this.name = name
        this.author = author
        this.publisher = publisher
        this.price = price
        this.category = category
        this.quantity = quantity
    }
}