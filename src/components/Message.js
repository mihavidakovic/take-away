import React from 'react'

export default function Message(props) {

    const type = props.type === 1 ? "message__success" : "message__error";
    const visible = props.visible === 1 ? "visible" :  "";

    return (
        <div className={"message " + type + " " + visible}>
            {props.message}
        </div>
    )
}
