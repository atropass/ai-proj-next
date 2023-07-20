import BotInterface from "../components/botInterface/BotInterface";
import NavBar from "app/components/home/navbar";

export default async function Home() {
    return (
        <>
            <NavBar />
            <BotInterface />
        </>
    );
}
