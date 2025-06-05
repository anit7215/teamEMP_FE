import { TagContainer, DeleteButton } from './Style';
import DeleteIcon from '../../../assets/icons/Cancel.svg';

const Tag = ({ text, disabled=false, onDelete }) => {
    return (
        <TagContainer disabled={disabled}>
            {text} 
            {onDelete && <DeleteButton src={DeleteIcon} onClick={onDelete} />}
        </TagContainer>
    );
};

export default Tag;