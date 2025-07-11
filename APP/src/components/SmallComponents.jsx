import React from "react";
import "./SmallComponents.css";
import { useState } from "react";

export function SearchComponent({placeholder, onChange, _onSearch}){
    const [content, setContent] = useState("")
    const onSearch = () => {
        if(_onSearch)_onSearch(content);
    }

    const handleChange = (e) => {
        setContent(e.target.value);
        if(onChange) onChange(content);
    };

    return (
        <div className="search-container">
            <button className="pag-nav-search-button" onClick={onSearch}>
                <div className="fa fa-search"></div>
            </button>
        <input
            className="search-bar"
            type="text"
            placeholder={placeholder}
            onChange={handleChange}
        />
        </div>
    )
}

export default SearchComponent


export function ButtonAction({ text, icon, onClick, classNm = "button-gen" }) {
    if(classNm === "") classNm = "button-gen";
    return (
      <button className={classNm} onClick={onClick}>
        <div className={icon}></div>
        <div>{text}</div>
      </button>
    );
}



export function PagNav({ current_page, max_page, onPageChange }) {
    let input_page = 0;
    const onInputChange = (event) => {
        const value = event.target.value;
        if (value === "") return;
        const page = parseInt(value, 10);

        if (isNaN(page) || page < 1) event.target.value = "";
        else {
        event.target.value = page;
        input_page = page;
        }
    };

    const onConfirm = () => {
        if (input_page < 1 || input_page > max_page) return;
        onPageChange(input_page);
    };

    return (
        <div className="pag-nav-container">
            <button
                className="pag-nav-button"
                onClick={() => onPageChange(current_page - 1)}
            >
                <div className="fa fa-angle-left"></div>
            </button>

            {current_page > 1 && <div className="fa fa-ellipsis-h"></div>}

            <div className="pag-nav-current">{current_page}</div>

            <input
                className="pag-nav-search"
                onChange={onInputChange}
            ></input>

            <button className="pag-nav-search-button" onClick={onConfirm}>
                <div className="fa fa-search"></div>
            </button>

            {current_page < max_page && <div className="fa fa-ellipsis-h"></div>}

            <button
                className="pag-nav-button"
                onClick={() => onPageChange(current_page + 1)}
            >
                <div className="fa fa-angle-right"></div>
            </button>
        </div>
    );
}

