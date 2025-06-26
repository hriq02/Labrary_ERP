import "./Book_modal.css"
import { useState } from "react";

function AddBookModal({ onClose }) {
    
    const [BookData, setBookData] = useState({
        id: "",
        name: "",
        author: "",
        publisher: "",
        price: "",
        category: "",
        quantity: ""
    });

    return (
        <div className="modal-overlay">
            <div className="modal-window">
                <div className="modal-header">
                    <div></div>
                    <button onClick={onClose} className="modal-close-button">×</button>
                </div>
                <div className="modal-body">
                    <BookInfo BookData={BookData} setBookData={setBookData} />
                    <ActionButtons onCancel={onClose} />
                </div>
            </div>
        </div>
    );
}

export function EditBookModal({ onClose, BookData }){
    const [bookData, setBookData] = useState({
        id: BookData?.id || "",
        name: BookData?.name || "",
        author: BookData?.author || "",
        publisher: BookData?.publisher || "",
        price: BookData?.price || "",
        category: BookData?.category || "",
        quantity: BookData?.quantity || ""
    });
    if (!BookData) return <div></div>;

    return (
        <div className="modal-overlay">
            <div className="modal-window">
                <div className="modal-header">
                    <div></div>
                    <button onClick={onClose} className="modal-close-button">×</button>
                </div>
                <div className="modal-body">
                    <BookInfo BookData={bookData} setBookData={setBookData}/>
                    <ActionButtons onCancel={onClose} />
                </div>
            </div>
        </div>
    )
}

export function ArchiveBookModal({ onClose, BookData }){
    const [bookData, setBookData] = useState({
        id: BookData?.id || "",
        name: BookData?.name || "",
        author: BookData?.author || "",
        publisher: BookData?.publisher || "",
        price: BookData?.price || "",
        category: BookData?.category || "",
        quantity: BookData?.quantity || ""
    });
    
    if (!BookData) return <div></div>;

    return (
        <div className="modal-overlay">
            <div className="modal-window">
                <div className="modal-header">
                    <div></div>
                    <button onClick={onClose} className="modal-close-button">×</button>
                </div>
                <div className="modal-body">
                    <BookInfo BookData={bookData} readOnly={true} />
                    <ActionButtons onCancel={onClose} />
                </div>
            </div>
        </div>
    )
}


function BookInfo({BookData, setBookData, readOnly = false}){
    const handleChange = (field, value) => {
        if (!readOnly && setBookData) {
            setBookData(prev => ({
                ...prev,
                [field]: value
            }));
        }
    };
    return(
        <div className="book-info-container">
            <FieldInfo 
                name="name" 
                data={BookData?.name || ""} 
                onChange={(value) => handleChange('name', value)}
                readOnly={readOnly}
            />
            <FieldInfo 
                name="author" 
                data={BookData?.author || ""} 
                onChange={(value) => handleChange('author', value)}
                readOnly={readOnly}
            />
            <FieldInfo 
                name="publisher" 
                data={BookData?.publisher || ""} 
                onChange={(value) => handleChange('publisher', value)}
                readOnly={readOnly}
            />
            <FieldInfo 
                name="price" 
                data={BookData?.price || ""} 
                onChange={(value) => handleChange('price', value)}
                readOnly={readOnly}
            />
            <FieldInfo 
                name="category" 
                data={BookData?.category || ""} 
                onChange={(value) => handleChange('category', value)}
                readOnly={readOnly}
            />
            <FieldInfo 
                name="quantity" 
                data={BookData?.quantity || ""} 
                onChange={(value) => handleChange('quantity', value)}
                readOnly={readOnly}
            />
        </div>
    )
}

function FieldInfo({name, data, onChange, readOnly = false}){
    const handleInputChange = (e) => {
        if (onChange && !readOnly) {
            onChange(e.target.value);
        }
    };
    return(
        <div className="field-container">
            {name}
            <input 
                className="field-input"
                value={data} 
                onChange={handleInputChange}
                readOnly={readOnly}
                placeholder={readOnly ? "" : `Enter ${name}`}
            />
        </div>
    )
}

function ActionButtons({onCancel}){
    const onSubbmit = () =>{
        onCancel();
    }

    return (
        <div className="action-button-container">
            <button className="action-button" onClick={onSubbmit}> Subbmit</button>
            <button className="action-button" onClick={onCancel}>cancel</button>
        </div>
    )
}

export default AddBookModal
