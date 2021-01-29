export default function Button({props, onBtnClickHandler}) {
    const ClassName = props.className;
    return (
        <button
            data-type={props.type}
            data-action={props.action}
            value={props.value}
            onClick={onBtnClickHandler}

        className={ClassName}>
            {props.value}

        </button>)
}