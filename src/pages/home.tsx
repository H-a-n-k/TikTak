import { useGlobalContext } from "../contexts/GlobalContext"
import { ToDMYFormat } from "../utils/datetime";

const HomePage = () => { 
    const { dbo } = useGlobalContext();

    return <>
        <h1>{dbo.config.appName}</h1>
        <h2>{ToDMYFormat(dbo.config.lastUpdate)}</h2>
    </>
}

export default HomePage