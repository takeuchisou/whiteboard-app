import React, { useRef, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import './Whiteboard.css';

interface Point {
  x: number;
  y: number;
}

interface DrawingData {
  type: 'draw' | 'erase';
  points: Point[];
  color?: string;
  size?: number;
}

const Whiteboard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentTool, setCurrentTool] = useState<'pen' | 'eraser'>('pen');
  const [currentColor, setCurrentColor] = useState('#000000');
  const [currentSize, setCurrentSize] = useState(5);
  const [roomId, setRoomId] = useState('default-room');
  const [currentPath, setCurrentPath] = useState<Point[]>([]);

  useEffect(() => {
    const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5000';
    const newSocket = io(SERVER_URL);
    setSocket(newSocket);

    newSocket.emit('join-room', roomId);

    newSocket.on('drawing', (data: DrawingData) => {
      drawOnCanvas(data);
    });

    newSocket.on('drawing-history', (history: DrawingData[]) => {
      clearCanvas();
      history.forEach(data => drawOnCanvas(data));
    });

    newSocket.on('clear-canvas', () => {
      clearCanvas();
    });

    return () => {
      newSocket.disconnect();
    };
  }, [roomId]);

  const drawOnCanvas = (data: DrawingData) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (data.type === 'draw') {
      ctx.strokeStyle = data.color || '#000000';
      ctx.lineWidth = data.size || 5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.globalCompositeOperation = 'source-over';
    } else if (data.type === 'erase') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = data.size || 10;
    }

    if (data.points.length > 1) {
      ctx.beginPath();
      ctx.moveTo(data.points[0].x, data.points[0].y);
      for (let i = 1; i < data.points.length; i++) {
        ctx.lineTo(data.points[i].x, data.points[i].y);
      }
      ctx.stroke();
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const getMousePos = (e: React.MouseEvent<HTMLCanvasElement>): Point => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const point = getMousePos(e);
    setCurrentPath([point]);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const point = getMousePos(e);
    const newPath = [...currentPath, point];
    setCurrentPath(newPath);

    const drawingData: DrawingData = {
      type: currentTool === 'pen' ? 'draw' : 'erase',
      points: newPath,
      color: currentColor,
      size: currentSize,
    };

    drawOnCanvas(drawingData);
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);

    if (currentPath.length > 1 && socket) {
      const drawingData: DrawingData = {
        type: currentTool === 'pen' ? 'draw' : 'erase',
        points: currentPath,
        color: currentColor,
        size: currentSize,
      };

      socket.emit('drawing', { roomId, ...drawingData });
    }

    setCurrentPath([]);
  };

  const handleClearCanvas = () => {
    if (socket) {
      socket.emit('clear-canvas', roomId);
    }
    clearCanvas();
  };

  return (
    <div className="whiteboard-container">
      <div className="toolbar">
        <div className="tool-section">
          <button
            className={currentTool === 'pen' ? 'active' : ''}
            onClick={() => setCurrentTool('pen')}
          >
            ペン
          </button>
          <button
            className={currentTool === 'eraser' ? 'active' : ''}
            onClick={() => setCurrentTool('eraser')}
          >
            消しゴム
          </button>
        </div>

        <div className="color-section">
          <label>色:</label>
          <input
            type="color"
            value={currentColor}
            onChange={(e) => setCurrentColor(e.target.value)}
          />
        </div>

        <div className="size-section">
          <label>太さ: {currentSize}px</label>
          <input
            type="range"
            min="1"
            max="50"
            value={currentSize}
            onChange={(e) => setCurrentSize(parseInt(e.target.value))}
          />
        </div>

        <div className="room-section">
          <label>ルームID:</label>
          <input
            type="text"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            placeholder="ルームIDを入力"
          />
        </div>

        <button onClick={handleClearCanvas} className="clear-button">
          全消去
        </button>
      </div>

      <div className="canvas-container">
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        />
      </div>
    </div>
  );
};

export default Whiteboard;