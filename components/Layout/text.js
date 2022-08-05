export const Label = (props) => {
    return (
        <label htmlFor="first-name"
               className={`py-2 block text-sm font-medium text-xl text-gray-700 ${props.classname}`}>{props.label}</label>
    )
}

export default Label

export const H2 = (props) => {
    return (
        <h2 className="text-2xl uppercase font-semibold leading-tight pb-4">{props.label}</h2>
    )
}