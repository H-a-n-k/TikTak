import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass, faPenToSquare, faDeleteLeft } from "@fortawesome/free-solid-svg-icons";

library.add(faMagnifyingGlass);
library.add(faPenToSquare);
library.add(faDeleteLeft);

const SearchIcon = () => <FontAwesomeIcon icon={faMagnifyingGlass} />
const EditIcon = () => <FontAwesomeIcon icon={faPenToSquare} />
const DeleteIcon = () => <FontAwesomeIcon icon={faDeleteLeft} />

export {
    SearchIcon, EditIcon, DeleteIcon
}