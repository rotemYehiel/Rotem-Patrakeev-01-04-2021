import React, { useEffect, useState } from 'react';
import { InputGroup, FormControl } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
const SearchInput = (props) => {
    const { inputVal, setInputVal, onSearch } = props;
    const debouncedSearchTerm = useDebounce(inputVal, 500);

    useEffect(() => {
        if (debouncedSearchTerm) {
            onSearch(debouncedSearchTerm);
        }
    }, [debouncedSearchTerm])

    return (
        <div>
            <InputGroup>
                <InputGroup.Prepend >
                    <InputGroup.Text id="basic-addon1"><FontAwesomeIcon icon={faSearch} /></InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    id='input-city-filed'
                    placeholder="search for city..."
                    value={inputVal}
                    onChange={(ev) => setInputVal(ev.target.value)}
                    aria-label="tel-aviv"
                    aria-describedby="basic-addon1"
                />
            </InputGroup>
        </div>
    )
}
export default SearchInput;

const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(
        () => {
            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);

            return () => {
                clearTimeout(handler);
            };
        },
        [value, delay]
    );
    return debouncedValue;
}