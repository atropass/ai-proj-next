// import BotInterface from "../components/botInterface/BotInterface";
import NavBar from "app/main/mainnav.jsx";
import dynamic from 'next/dynamic'


async function getData() {
    const res = await fetch('https://fastapi-emvg.onrender.com/auth/json');
    const data = await res.json();
    return data;
}

const ComponentWithNoSSR = dynamic(
    () => import('../components/botInterface/BotInterface'),
    { ssr: false }
)

export default async function Home() {
    const data = await getData();
    return (
        <>
            <NavBar />
            <ComponentWithNoSSR classData={data} />
        </>
    );
}
