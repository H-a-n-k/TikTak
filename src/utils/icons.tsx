import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faMagnifyingGlass, faPenToSquare, faDeleteLeft,
    faAnglesLeft, faAnglesRight, faListCheck, faLayerGroup, faChartSimple,
    faSquareCaretUp, faSquareCaretDown
} from "@fortawesome/free-solid-svg-icons";

library.add(faMagnifyingGlass);
library.add(faPenToSquare);
library.add(faDeleteLeft);

const SearchIcon = () => <FontAwesomeIcon icon={faMagnifyingGlass} />
const EditIcon = () => <FontAwesomeIcon icon={faPenToSquare} />
const DeleteIcon = () => <FontAwesomeIcon icon={faDeleteLeft} />
const CloseSideIcon = () => <FontAwesomeIcon icon={faAnglesLeft} />
const OpenSideIcon = () => <FontAwesomeIcon icon={faAnglesRight} />
const TaskIcon = () => <FontAwesomeIcon icon={faListCheck} />
const CategoryIcon = () => <FontAwesomeIcon icon={faLayerGroup} />
const ChartIcon = () => <FontAwesomeIcon icon={faChartSimple} />
const ArrowUp = () => <FontAwesomeIcon icon={faSquareCaretUp} />
const ArrowDown = () => <FontAwesomeIcon icon={faSquareCaretDown} />

export {
    SearchIcon, EditIcon, DeleteIcon,
    CloseSideIcon, OpenSideIcon, TaskIcon, CategoryIcon, ChartIcon,
    ArrowUp, ArrowDown
}