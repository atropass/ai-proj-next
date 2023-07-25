import BotInterface from "../components/botInterface/BotInterface";
import NavBar from "app/components/home/navbar";

async function getData() {
    const res = await fetch('https://fastapi-emvg.onrender.com/auth/json');
    const data = await res.json();
    return data;
}

export default async function Home() {
    const data = await getData();
    return (
        <>
            <NavBar />
            <BotInterface classData={data}/>
        </>
    );
}
