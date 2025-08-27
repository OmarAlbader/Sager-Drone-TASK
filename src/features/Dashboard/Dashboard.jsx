import React, { useEffect, useRef } from "react";

const DroneMoodBoard = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const drones = [
      { x: 50, y: 50, dx: 0.7, dy: 1, emoji: "🛩️" },
      { x: 200, y: 100, dx: -1, dy: 0.8, emoji: "🚁" },
      { x: 350, y: 150, dx: 1.2, dy: -0.6, emoji: "🛸" },
      { x: 150, y: 200, dx: -0.8, dy: -1, emoji: "🛩️" },
    ];

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drones.forEach((d) => {
        ctx.font = "30px Arial";
        ctx.fillText(d.emoji, d.x, d.y);
        d.x += d.dx;
        d.y += d.dy;
        if (d.x < 0 || d.x > canvas.width - 30) d.dx *= -1;
        if (d.y < 20 || d.y > canvas.height - 10) d.dy *= -1;
      });
      requestAnimationFrame(draw);
    };

    draw();
  }, []);

  return <canvas ref={canvasRef} className="h-full w-full bg-[#111]" />;
};

export default DroneMoodBoard;
