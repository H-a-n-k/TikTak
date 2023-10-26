import DialogWrapper from "./DialogWrapper";

interface Props { 
    onConfirm: () => boolean,
    closeDialog: () => void,
    message: string
}

export default function ConfirmDialog({ onConfirm, closeDialog, message }: Props) { 

    const onClickConfirm = () => { 
        if (onConfirm()) {
            closeDialog();
        } else { 
            alert('failed')
        }
    }

    return <DialogWrapper closeDialog={closeDialog}>
        <div>
            {message}
        </div>
        <div>
            <button onClick={onClickConfirm}>Confirm</button>
            <button onClick={closeDialog}>Cancel</button>
        </div>
    </DialogWrapper>
}