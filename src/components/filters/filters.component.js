import React from 'react';
import Select from 'react-select';

const Filters = ({ sortValue, filterValue, textValue, options, onOrderChange, onFilterChange, onTextChange }) => {
    return (
        <form className="form">
            <div className="form__group form__group--inline">
                <label className="form__label">Filtrar</label>
                <Select className="form__field--inline-select" value={filterValue} clearable={false} options={options} onChange={onFilterChange} />
                <input type="text" value={textValue} className="form__field form__field--inline" onChange={onTextChange} />
            </div>
        </form>
    )
};

export default Filters;