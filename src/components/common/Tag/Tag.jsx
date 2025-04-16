import { TagContainer } from './Style';
const Tag = ({ text, disabled=false }) => {
    return (
        <TagContainer disabled={disabled}>
            {text} 
        </TagContainer>
    );
};

export default Tag;