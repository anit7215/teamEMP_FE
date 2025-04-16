import { InputContainer } from './Style';
const Input = ({placeholder, type='text', name}) => {
    return (
        <InputContainer 
        placeholder={placeholder} 
        type={type}
        name={name}
        />
    );
};
export default Input;