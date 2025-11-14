Snackrot is a colorful emoji tycoon built on Next.js App Router. Catch physics-driven brainrots, equip them to earn money, spin wheels for ingredients, fuse special brainrots, and clear a boss minigame for rare loot. Enter a secret code to unlock the admin panel and trigger events.

## Quick Start

```powershell
npm install
npm run dev
```

Open http://localhost:3000.

## Features

- Emoji + Colorful UI: Vibrant gradients and emoji sprites throughout.
- Roaming Brainrots: Physics-driven emoji float around; click to catch and auto-equip.
- Earnings: Equipped brainrots generate money over time; secret category includes >1B/s.
- Spins: Three wheels — normal, epic, secret — grant random ingredients.
- Fusion: Combine ingredients into special/secret brainrots.
- Minigame House: Buy a ticket, enter Boss Room, shoot the giant brainrot; win special rewards.
- Admin Code: Enter `tqkhoi12345678910` to unlock the admin panel.
- Events:
	- Taco Rain 🌮: Brainrots spawned during event earn +10%.
	- Geometry Dash 🧩: Spawns OG set — Spike, Cube, Ball, Robot, Spider.

## Routes

- `/` Main game (HUD + physics scene)
- `/spins` Spin wheels (normal/epic/secret)
- `/fusion` Fusion lab
- `/minigames/house` Ticket purchase and entry
- `/minigames/boss` Boss shooter
- `/admin` Admin tools (unlocked by code)

## Tech

- Next.js 16, React 19, TypeScript 5
- Tailwind v4, Zustand stores, Matter.js physics
