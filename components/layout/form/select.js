import {toPascalCase} from "../../../lib/helper";

export function Select(props) {
    let name = Object.keys(props.data[0]).filter(function (element) {
        return !element.match("id")
    });
    const title = (props.title.match(/[a-zA-Z0-9]+/g) || []).map(w => `${w.charAt(0).toUpperCase()}${w.slice(1)}`).join(' ')
    return (
        <div className={"py-1"}>
            <label htmlFor="select"
                   className="block uppercase tracking-wide text-gray-700 text-xs font-bold block mb-2 dark:text-gray-400">
                {title}
            </label>
            <select id="select" value={props.inputFields[props.title + "_id"]}
                    className="px-3 py-3 my-1 placeholder-blueGray-300 text-blueGray-600 bg-white bg-white rounded text-sm border
                    border-blueGray-300 outline-none focus:outline-none focus:ring w-full"
                    onChange={(e) => {
                        if (e.target.value !== "00000000-0000-0000-0000-000000000000") {
                            props.setInputFields({
                                ...props.inputFields,
                                [props.title + "_id"]: e.target.value
                            })
                        } else {
                            props.setInputFields({
                                ...props.inputFields,
                                [props.title + "_id"]: null
                            })
                        }
                    }}>
                <option value="00000000-0000-0000-0000-000000000000"
                        defaultValue="00000000-0000-0000-0000-000000000000">Choose {toPascalCase(title)}</option>
                {props.data.map((item, index) => {
                    return (
                        <option key={index} value={item.id}>{item[name]}</option>
                    )
                })}
            </select>
        </div>
    )
}