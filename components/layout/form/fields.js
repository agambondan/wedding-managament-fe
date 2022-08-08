export function InputText(props) {
    return (
        <input
            type={"text"}
            className={"px-3 py-3 my-1 placeholder-blueGray-300 text-blueGray-600 bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full"}
            name={props.keyInput}
            placeholder={(props.keyInput.match(/[a-zA-Z0-9]+/g) || []).map(w => `${w.charAt(0).toLowerCase()}${w.slice(1)}`).join(' ')}
            value={props.inputFields}
            onChange={event => props.handleChangeText(props.keyInput, event)}
        />
    )
}

export function InputNumber(props) {
    return (
        <input
            // onKeyPress={event => event.preventDefault()} // disabled input from keyboard
            type={"number"}
            min={0}
            max={100}
            className={"px-3 py-3 my-1 placeholder-blueGray-300 text-blueGray-600 bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full"}
            name={props.keyInput}
            placeholder={(props.keyInput.match(/[a-zA-Z0-9]+/g) || []).map(w => `${w.charAt(0).toLowerCase()}${w.slice(1)}`).join(' ')}
            value={props.inputFields}
            onInput={event => props.handleInputNumber(props.keyInput, event)}
            onChange={event => props.handleChangeNumber(props.keyInput, event)}
        />
    )
}