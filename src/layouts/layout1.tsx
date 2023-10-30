import SideMenu from "../components/shared/SideMenu"

interface Props { 
    children: React.ReactNode
}

export default function Layout1({children}: Props) { 


    return <div className="layout-1">
        <SideMenu />

        <div className="page-content">
            {children}
        </div>
    </div>
}