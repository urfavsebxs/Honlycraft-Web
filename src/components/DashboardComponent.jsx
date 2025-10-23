import { useState, useEffect } from 'react';
import MinecraftSkinComponent from './MinecraftSkinComponent.jsx';

export default function DashboardComponent() {
  const [playerData, setPlayerData] = useState(null);
  const [playerStats, setPlayerStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Obtener datos del usuario autenticado
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      if (!userData.username) {
        setError('No hay usuario autenticado');
        setLoading(false);
        return;
      }

      const baseURL = import.meta.env.DEV
        ? "https://honlycraft-web.onrender.com" // tu URL real en Render
        : "http://localhost:4321"; 

      // Obtener stats de todos los jugadores
      const resStats = await fetch(`${baseURL}/api/stats`);
      const stats = await resStats.json();

      // Obtener datos del jugador específico
      const resPlayer = await fetch(`${baseURL}/api/player`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: userData.username })
      });

      if (!resPlayer.ok) {
        throw new Error(`Error ${resPlayer.status}: ${resPlayer.statusText}`);
      }

      const playerInfo = await resPlayer.json();
      
      // Buscar stats del jugador
      const userStats = stats.find(s => s.player === userData.username);

      setPlayerData(playerInfo);
      setPlayerStats(userStats || { kills: 0, deaths: 0, wins: 0 });
      setLoading(false);

    } catch (err) {
      console.error('[Dashboard] Error cargando datos:', err);
      setError('Error al cargar los datos del dashboard');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-white text-lg">Cargando dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-red-400 text-lg">{error}</div>
      </div>
    );
  }

  if (!playerData) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-gray-400 text-lg">No se encontraron datos del jugador</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Dashboard de Jugador
        </h1>
        
        <div className="flex flex-wrap gap-6 justify-center">
          <div className="text-center bg-gray-800/80 backdrop-blur-md text-white p-6 rounded-2xl shadow-xl border border-gray-700/50 w-80">
            <div className="mb-4">
              <MinecraftSkinComponent username={playerData.username} />
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-4">{playerData.username}</h2>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Kills:</span>
                <span className="text-green-400 font-bold text-lg">{playerStats.kills}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Deaths:</span>
                <span className="text-red-400 font-bold text-lg">{playerStats.deaths}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Wins:</span>
                <span className="text-blue-400 font-bold text-lg">{playerStats.wins}</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-700">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Estado:</span>
                <span className={`font-bold ${playerData.premium ? 'text-yellow-400' : 'text-gray-400'}`}>
                  {playerData.premium ? 'Premium' : 'No Premium'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
