import { useState } from "react";
import { CategoryIcon, ChartIcon, CloseSideIcon, OpenSideIcon, TaskIcon } from "../../utils/icons"
import { Link } from "react-router-dom";

interface MenuItemProps {
    icon: React.ReactElement,
    url: string,
    display: string,
    onClick?: () => void
}

const MenuItem = ({ icon, url, display, onClick }: MenuItemProps) => {
    
    return <Link to={url} className={`row item ${onClick ? 'header' : ''}`} >
        <div className='icon' onClick={onClick} title={display}>
            {icon}
        </div>

        <div className="label">
            {display}
        </div>
    </Link>
}

export default function SideMenu() { 

    const [openSideBar, setOpenSideBar] = useState(true);

    return <div className={`side-menu ${openSideBar ? '' : 'close'}`}>
        <MenuItem
            icon={openSideBar ? <CloseSideIcon /> : <OpenSideIcon />}
            url="#" display="Menu"
            onClick={() => setOpenSideBar(x => !x)}
        />

        <MenuItem icon={<TaskIcon />} url="/task" display="Task" />
        <MenuItem icon={<CategoryIcon />} url="/cate" display="Category" />
        <MenuItem icon={<ChartIcon />} url="/chart" display="Chart" />
    </div>
}