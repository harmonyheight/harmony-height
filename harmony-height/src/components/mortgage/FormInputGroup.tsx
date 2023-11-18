import React from "react";

interface FormInputGroupProps {
    text: any;
    icon?: any;
    placeholder: any;
    value: any;
    onInput?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    readOnly?: boolean;
    required?: boolean
}

function FormInputGroup({
    text,
    icon,
    placeholder,
    value,
    onInput,
    onKeyUp,
    readOnly = false,
    required = false
}: FormInputGroupProps) {
    return (
        <div className="flex justify-center items-center my-2">
            <div className="form-control w-full max-w-xs indicator">
                <label className="label">
                    <span className="label-text">{text}</span>
                </label>
                <input type="number"
                    value={value}
                    placeholder={placeholder}
                    onInput={onInput}
                    onKeyUp={onKeyUp}
                    readOnly={readOnly}
                    className="input input-bordered"
                    required={required}
                />

            </div>
        </div>
    );
}

export default FormInputGroup;
