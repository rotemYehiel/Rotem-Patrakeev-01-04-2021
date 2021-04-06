import { ListGroup, Spinner } from 'react-bootstrap'

const CitiesOptionsList = (props) => {
    const { options, onClickOption } = props;
    if (options && options.length > 0) {
        return (
            <div className="cities-options-list">
                <ListGroup className="cities-list">
                    {options.map((option, index) => {
                        return (
                            <ListGroup.Item action variant="secondary" onClick={() => onClickOption(option)} key={index}>{option['LocalizedName']}</ListGroup.Item>
                        )
                    })}
                </ListGroup>
            </div>
        )
    } else {
        return <Spinner animation="border" variant="dark" />
    }

}

export default CitiesOptionsList;