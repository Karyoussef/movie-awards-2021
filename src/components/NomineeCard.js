import nomineeCardStyle from '../styles/nomineeCardStyle.module.css';
import { updateNomination } from '../services/awards';
import { useDispatch } from 'react-redux';

const NomineeCard = ({ nominee, selectedId, categoryId }) => {
    const dispatch = useDispatch();

    function handleSelectNominee(e) {
        e.preventDefault();
        let isSelected = false;
        if (nominee.id === selectedId) {
            isSelected = true;
        } 
        dispatch(updateNomination(categoryId, nominee.id, isSelected));
    }   

    function setCardStyle() {
        let className  = nomineeCardStyle.nomineeCard;

        if (nominee.id === selectedId) {
            className += ` ${nomineeCardStyle.nomineeCardSelected}`
        } else {
            className += ` ${nomineeCardStyle.nomineeCardDefault}`
        }

        return className;
    }

    function setButtonText() {
        if (nominee.id === selectedId) {
            return "Unselect Nominee";
        }
        return "Select Nominee";
    }

    function setButtonStyle(){

        let isDisabled = isButtonDisabled();
        let className = nomineeCardStyle.selectButtonDefault
        if (!isDisabled) {
        
            className += ` ${nomineeCardStyle.selectButtonAcitve}`;
        
        } else {
        
            className += ` ${nomineeCardStyle.selectButtonDisabled}`;
        
        }
        return className;

    }

    function isButtonDisabled() {
        return selectedId !== null && selectedId !== nominee.id
    }

    return (
        <div className={setCardStyle()}>
            <h3 className={nomineeCardStyle.nomineeName}> {nominee.name} </h3>
            <img className = {nomineeCardStyle.nomineeImage} alt = "" src={nominee.imageUrl} />
            <button 
                className={setButtonStyle()}
                disabled = {isButtonDisabled()}
                onClick={(e) => handleSelectNominee(e)} 
            > 
                {setButtonText()} 
            </button>
        </div>
    )
}

export default NomineeCard;