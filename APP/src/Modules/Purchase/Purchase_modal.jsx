import { useState } from "react";
import "./purchase_modal.css";

function EditOrderModal({ onClose, OrderData }){
    if (!OrderData) return <div></div>;

    const [orderData, setBookData] = useState({
        id: OrderData?.id || "",
        bookId: OrderData?.BookId || "",
        trackingCode: OrderData?.trackingCode || "",
        status: OrderData?.status || ""
    });

    return (
        <div className="modal-overlay">
            <div className="modal-window">
                <div className="modal-header">
                    <div></div>
                    <button onClick={onClose} className={"modal-close-button"}>×</button>
                </div>
                <div className="modal-body">
                    <FieldInfo name="id" data={orderData.id} readOnly={true} />
                    <FieldInfo name="bookId" data={orderData.bookId} readOnly={true} />
                    <FieldInfo name="trackingCode" data={orderData.trackingCode} />
                    <FieldInfo name="status" data={orderData.status} />
                    <ActionButtons onCancel={onClose} />
                </div>
            </div>
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


export default EditOrderModal