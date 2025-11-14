"use client";
import Matter, { Engine, World, Bodies, Body, Composite, Runner } from 'matter-js';

export interface PhysicsHandle {
  engine: Engine;
  runner: Runner;
  add: (body: Matter.Body) => void;
  remove: (body: Matter.Body) => void;
  world: World;
  cleanup: () => void;
}

export function createEngine(width: number, height: number): PhysicsHandle {
  const engine = Engine.create({ enableSleeping: true });
  const world = engine.world;

  const walls = [
    Bodies.rectangle(width / 2, -25, width, 50, { isStatic: true }),
    Bodies.rectangle(width / 2, height + 25, width, 50, { isStatic: true }),
    Bodies.rectangle(-25, height / 2, 50, height, { isStatic: true }),
    Bodies.rectangle(width + 25, height / 2, 50, height, { isStatic: true })
  ];
  World.add(world, walls);

  const runner = Runner.create();
  Runner.run(runner, engine);

  return {
    engine,
    runner,
    world,
    add: (b) => World.add(world, b),
    remove: (b) => World.remove(world, b),
    cleanup: () => {
      Runner.stop(runner);
      Composite.clear(world, false, true);
      Engine.clear(engine);
    }
  };
}

export function createWanderingCircle(x: number, y: number, r: number, emoji: string): Matter.Body {
  const body = Bodies.circle(x, y, r, {
    restitution: 0.9,
    friction: 0.001,
    frictionAir: 0.02
  });
  // store emoji on body for rendering usage
  (body as any).emoji = emoji;
  // initial random velocity
  Body.setVelocity(body, { x: (Math.random() - 0.5) * 6, y: (Math.random() - 0.5) * 6 });
  return body;
}
