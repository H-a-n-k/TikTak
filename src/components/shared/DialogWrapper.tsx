

interface Props { 
    children: React.ReactNode,
    closeDialog: () => void
}

type Event = React.MouseEvent<HTMLDivElement, MouseEvent>

export default function DialogWrapper({ children, closeDialog }: Props){ 

    var mouseDown: EventTarget | null = null;

    const onMouseDown = (e: Event) => {
        mouseDown = e.target;
    }
    
    const onMouseUp = (e: Event) => {
        var target = e.target;
        if (mouseDown === e.currentTarget && target === mouseDown) {
            closeDialog();
        } else { 
            mouseDown = null;
        }
    }

    return <>
        <div className="dialog-wrapper" onMouseUp={onMouseUp}  onMouseDown={onMouseDown}>
            <div className="content">
                {children}
            </div>
        </div>
    </>
}