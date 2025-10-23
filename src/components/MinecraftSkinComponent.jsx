import { useState, useEffect } from 'react';

export default function MinecraftSkinComponent({ username }) {
  const [skinURL, setSkinURL] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadSkin();
  }, [username]);

  const loadSkin = async () => {
    try {
      setLoading(true);
      setError('');

      // Intentar obtener UUID desde la API de Mojang
      const uuidResponse = await fetch(`https://api.mojang.com/users/profiles/minecraft/${encodeURIComponent(username)}`);
      
      if (uuidResponse.ok) {
        const data = await uuidResponse.json();
        const uuid = data.id;
        
        // Usar Crafatar para obtener la skin
        const skinUrl = `https://crafatar.com/renders/body/${uuid}?overlay`;
        setSkinURL(skinUrl);
      } else {
        // Si no se encuentra en Mojang, usar Minotar como fallback
        const fallbackUrl = `https://minotar.net/armor/body/${encodeURIComponent(username)}/100.png`;
        setSkinURL(fallbackUrl);
      }
    } catch (err) {
      console.warn(`Error obteniendo skin para ${username}:`, err.message);
      // Fallback a Minotar
      const fallbackUrl = `https://minotar.net/armor/body/${encodeURIComponent(username)}/100.png`;
      setSkinURL(fallbackUrl);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center">
        <div className="w-32 h-64 bg-gray-700 rounded-lg flex items-center justify-center">
          <div className="text-gray-400 text-sm">Cargando...</div>
        </div>
        <p className="text-white mt-2">{username}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center">
        <div className="w-32 h-64 bg-gray-700 rounded-lg flex items-center justify-center">
          <div className="text-red-400 text-sm">Error</div>
        </div>
        <p className="text-white mt-2">{username}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <img 
        src={skinURL} 
        alt={`${username}'s skin`} 
        className="w-32 h-64 object-cover rounded-lg"
        onError={(e) => {
          // Si falla la imagen, usar fallback
          e.target.src = `https://minotar.net/armor/body/${encodeURIComponent(username)}/100.png`;
        }}
      />
      <p className="text-white mt-2 font-medium">{username}</p>
    </div>
  );
}
