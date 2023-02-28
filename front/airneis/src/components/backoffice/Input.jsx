const Input = (props) => {

    const {
        label,
        type,
        className
    } = props

    return (
        <div className='flex flex-col text-gray-300 py-2'>
            <label className={className}>{label}</label>
            <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-600 focus:outline-none hover:bg-gray-600' type={type} />
        </div>
    );
}

export default Input;