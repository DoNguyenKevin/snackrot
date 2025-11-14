"use client";

import { useState, useEffect } from "react";

interface Building {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  label: string;
}

interface Player {
  x: number;
  y: number;
}

export default function Home() {
  const [player, setPlayer] = useState<Player>({ x: 400, y: 500 });
  const [keys, setKeys] = useState<Set<string>>(new Set());

  const buildings: Building[] = [
    { id: "noobbase", x: 50, y: 100, width: 150, height: 100, color: "#8B4513", label: "Noob's Base" },
    { id: "hazmat", x: 250, y: 80, width: 180, height: 120, color: "#FF0000", label: "Hazmat Station" },
    { id: "weapons", x: 480, y: 100, width: 160, height: 100, color: "#4A4A4A", label: "Weapon Shop" },
    { id: "armor", x: 690, y: 90, width: 140, height: 110, color: "#2F4F4F", label: "Armor Store" },
    { id: "pizzarino", x: 100, y: 400, width: 130, height: 90, color: "#654321", label: "Mootdini Pizzarino" },
    { id: "lollilucius", x: 290, y: 420, width: 120, height: 80, color: "#000000", label: "Lolli Lucius" },
    { id: "foodcourt", x: 470, y: 400, width: 150, height: 100, color: "#8B7355", label: "Food Court" },
    { id: "skibidi", x: 670, y: 410, width: 140, height: 95, color: "#1a1a1a", label: "Skibidi Stands" },
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setKeys((prev) => new Set(prev).add(e.key.toLowerCase()));
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      setKeys((prev) => {
        const newKeys = new Set(prev);
        newKeys.delete(e.key.toLowerCase());
        return newKeys;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const speed = 3;
    const interval = setInterval(() => {
      setPlayer((prev) => {
        let newX = prev.x;
        let newY = prev.y;

        if (keys.has("w") || keys.has("arrowup")) newY -= speed;
        if (keys.has("s") || keys.has("arrowdown")) newY += speed;
        if (keys.has("a") || keys.has("arrowleft")) newX -= speed;
        if (keys.has("d") || keys.has("arrowright")) newX += speed;

        // Keep player within bounds
        newX = Math.max(10, Math.min(newX, 790));
        newY = Math.max(10, Math.min(newY, 590));

        return { x: newX, y: newY };
      });
    }, 16);

    return () => clearInterval(interval);
  }, [keys]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-900 p-8">
      <div className="flex flex-col gap-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">🧠 Steal a Brain Rot - 2D Map</h1>
          <p className="text-zinc-400 text-sm">Use WASD or Arrow Keys to move • Explore shops and collect brain cells!</p>
        </div>
        
        <div className="relative w-[800px] h-[600px] bg-green-600 border-4 border-zinc-700 overflow-hidden shadow-2xl">
          {/* Main Path */}
          <div className="absolute top-0 left-[350px] w-[100px] h-full bg-red-500 opacity-90 border-l-2 border-r-2 border-red-700" />
          
          {/* Cross Path */}
          <div className="absolute top-[250px] left-0 w-full h-[100px] bg-red-500 opacity-90 border-t-2 border-b-2 border-red-700" />
          
          {/* Buildings */}
          {buildings.map((building) => (
            <div
              key={building.id}
              className="absolute border-4 border-zinc-800 shadow-lg flex items-center justify-center"
              style={{
                left: `${building.x}px`,
                top: `${building.y}px`,
                width: `${building.width}px`,
                height: `${building.height}px`,
                backgroundColor: building.color,
              }}
            >
              <div className="text-white font-bold text-xs text-center px-2 drop-shadow-lg">
                {building.label}
              </div>
            </div>
          ))}

          {/* NPCs / Objects */}
          <div className="absolute left-[180px] top-[280px] w-8 h-8 bg-blue-400 rounded-full border-2 border-blue-600" title="Brain Cell">
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold text-white bg-black/70 px-1.5 py-0.5 rounded">
              Brain Cell
            </div>
          </div>
          <div className="absolute left-[580px] top-[270px] w-8 h-8 bg-yellow-400 rounded-full border-2 border-yellow-600" title="Golden Brain">
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold text-white bg-black/70 px-1.5 py-0.5 rounded">
              Golden Brain
            </div>
          </div>
          <div className="absolute left-[350px] top-[500px] w-8 h-8 bg-green-400 rounded-full border-2 border-green-600" title="NPC">
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold text-white bg-black/70 px-1.5 py-0.5 rounded">
              Trader
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute left-[80px] top-[500px] w-12 h-12 bg-emerald-700 rounded-sm border-2 border-emerald-900" title="Tree" />
          <div className="absolute left-[720px] top-[520px] w-12 h-12 bg-emerald-700 rounded-sm border-2 border-emerald-900" title="Tree" />
          <div className="absolute left-[200px] top-[530px] w-10 h-10 bg-amber-800 rounded-sm border-2 border-amber-950" title="Crate" />
          <div className="absolute left-[600px] top-[540px] w-10 h-10 bg-amber-800 rounded-sm border-2 border-amber-950" title="Crate" />
          
          {/* Additional NPCs */}
          <div className="absolute left-[420px] top-[220px] w-6 h-10 bg-cyan-400 border-2 border-cyan-600 rounded-t-full" title="Player NPC" />
          <div className="absolute left-[250px] top-[480px] w-6 h-10 bg-pink-400 border-2 border-pink-600 rounded-t-full" title="Player NPC" />

          {/* Player */}
          <div
            className="absolute w-6 h-6 bg-zinc-900 rounded-full border-2 border-white transition-all duration-75 shadow-lg"
            style={{
              left: `${player.x}px`,
              top: `${player.y}px`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-bold text-white bg-black/50 px-2 py-1 rounded">
              You
            </div>
          </div>

          {/* Sky decoration */}
          <div className="absolute top-4 right-4 w-16 h-16 bg-yellow-300 rounded-full border-4 border-yellow-400 opacity-80" title="Sun" />
          <div className="absolute top-8 left-10 w-20 h-10 bg-white/60 rounded-full blur-sm" title="Cloud" />
          <div className="absolute top-12 left-40 w-24 h-12 bg-white/60 rounded-full blur-sm" title="Cloud" />
        </div>

        <div className="flex gap-8 justify-center text-xs">
          <div className="flex items-center gap-2 text-white bg-zinc-800 px-3 py-2 rounded">
            <div className="w-4 h-4 bg-blue-400 rounded-full border-2 border-blue-600"></div>
            <span>Brain Cells</span>
          </div>
          <div className="flex items-center gap-2 text-white bg-zinc-800 px-3 py-2 rounded">
            <div className="w-4 h-4 bg-yellow-400 rounded-full border-2 border-yellow-600"></div>
            <span>Golden Brain</span>
          </div>
          <div className="flex items-center gap-2 text-white bg-zinc-800 px-3 py-2 rounded">
            <div className="w-4 h-4 bg-green-400 rounded-full border-2 border-green-600"></div>
            <span>Trader NPC</span>
          </div>
        </div>
      </div>
    </div>
  );
}
