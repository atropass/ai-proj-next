import BotInterface from "../components/botInterface/BotInterface";
import NavBar from "app/main/mainnav.jsx";

async function getData() {
    const res = await fetch('https://fastapi-emvg.onrender.com/auth/json');
    const data = await res.json();
    return data;
}

export default async function Home() {
    const data = await getData();
    return (
        <div>
            <NavBar />
            <BotInterface classData={data} />
        </div>
    );
}
