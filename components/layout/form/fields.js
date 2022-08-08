export function InputText(props) {
    return (
        <input
            type={typeof props.inputFields === "string" ? "text" :
                typeof props.inputFields === "boolean" ? "checkbox" : "number"}
            className={"px-3 py-3 my-1 placeholder-blueGray-300 text-blueGray-600 bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full"}
            name={props.keyInputFields}
            placeholder={(props.keyInputFields.match(/[a-zA-Z0-9]+/g) || []).map(w => `${w.charAt(0).toLowerCase()}${w.slice(1)}`).join(' ')}
            value={props.inputFields}
            onChange={event => props.handleFormChange(props.keyInput, event)}
        />
    )
}