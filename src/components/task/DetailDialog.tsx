import TaskDTO from "../../dto/TaskDTO"
import DialogWrapper from "../shared/DialogWrapper"

interface Props { 
    object?: TaskDTO,
    closeDialog: () => void
}

const DetailDialog = ({ object, closeDialog }: Props) => { 
    if(!object) return <div></div>

    return <DialogWrapper closeDialog={closeDialog}>
        <h2>detail of {object?.name}</h2>
    </DialogWrapper>
}

export default DetailDialog