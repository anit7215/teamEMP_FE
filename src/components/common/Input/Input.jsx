import { InputContainer } from './Style';
const Input = ({placeholder, type='text', name, value, onChange}) => {
    return (
        <InputContainer 
        placeholder={placeholder} 
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        />
    );
};
export default Input;