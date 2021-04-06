import { InputGroup, FormControl } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
const SearchInput = (props) => {
    const { inputVal, onSearch } = props;
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
                    onChange={(ev) => onSearch(ev)}
                    aria-label="tel-aviv"
                    aria-describedby="basic-addon1"
                />
            </InputGroup>
        </div>
    )
}
export default SearchInput;