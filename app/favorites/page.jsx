"use client"
import { useEffect, useState } from 'react';

function Favorites() {
    const { data: session, status } = useSession();
    const loading = status === 'loading';
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        // Проверка сессии пользователя и получение списка избранного
        if (session) {
            fetch('/api/favorites', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'User-Id': session.user.id,
                },
            })
                .then((res) => res.json())
                .then((data) => setFavorites(data.favorites))
                .catch((error) => console.log("Error loading favorites:", error));
        }
    }, [session]);

    // Если сессия загружается или нет текущей сессии, отображаем сообщение о загрузке
    if (loading || !session) return <p>Loading...</p>

    return (
        <div>
            <h1>Your Favorites</h1>
            {favorites.length > 0 ? (
                favorites.map((favorite, index) => (
                    <div key={index}>
                        <p>{favorite.task.text}</p>
                    </div>
                ))
            ) : (
                <p>No favorites yet</p>
            )}
        </div>
    );
}

export default Favorites;




