export function InputText(props) {
    return (
        <input
            type={"text"}
            className={"px-3 py-3 my-1 placeholder-blueGray-300 text-blueGray-600 bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full"}
            name={props.keyInput}
            placeholder={props.placeholder !== undefined ? props.placeholder : (props.keyInput.match(/[a-zA-Z0-9]+/g) || []).map(w => `${w.charAt(0).toLowerCase()}${w.slice(1)}`).join(' ')}
            value={props.inputFields}
            onChange={event => props.handleChangeText(props.keyInput, event)}
        />
    )
}

export function InputDate(props) {
    return (
        <input
            onChange={event => props.handleChangeText(props.keyInput, event)}
            id="date"
            type="date"
            name="date"
            placeholder="30/12/2022"
            required="required"
            autoComplete=""
            maxLength="10"
            className="px-3 py-3 my-1 placeholder-blueGray-300 text-blueGray-600 bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full"/>
    )
}

export function InputTime(props) {
    return (
        <input
            onChange={event => props.handleChangeText(props.keyInput, event)}
            id="date"
            type="time"
            name="date"
            placeholder="12:00"
            required="required"
            autoComplete=""
            maxLength="10"
            className="px-3 py-3 my-1 placeholder-blueGray-300 text-blueGray-600 bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full"/>
    )
}

export function InputTextArea(props) {
    return (
        <textarea
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
            max={props.max}
            className={"px-3 py-3 my-1 placeholder-blueGray-300 text-blueGray-600 bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full"}
            name={props.keyInput}
            placeholder={(props.keyInput.match(/[a-zA-Z0-9]+/g) || []).map(w => `${w.charAt(0).toLowerCase()}${w.slice(1)}`).join(' ')}
            value={props.inputFields}
            onInput={event => props.handleInputNumber(props.keyInput, event)}
            onChange={event => props.handleChangeNumber(props.keyInput, event)}
        />
    )
}

export function InputFormatRupiah(props) {
    return (
        <input
            // onKeyPress={event => event.preventDefault()} // disabled input from keyboard
            type={"text"}
            className={"px-3 py-3 my-1 placeholder-blueGray-300 text-blueGray-600 bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full"}
            name={props.keyInput}
            value={props.inputFields.toString()}
            placeholder={(props.keyInput.match(/[a-zA-Z0-9]+/g) || []).map(w => `${w.charAt(0).toLowerCase()}${w.slice(1)}`).join(' ')}
            onInput={event => props.handleFormatRupiah(props.keyInput, event)}
            onChange={event => props.handleFormatRupiah(props.keyInput, event)}
        />
    )
}