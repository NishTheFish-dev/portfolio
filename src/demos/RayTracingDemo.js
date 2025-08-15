import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Container, Box, Typography, IconButton, Button, useTheme } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useNavigate } from 'react-router-dom';

// 2D Ray Casting demo: mouse acts as a light source; walls cast shadows.

const CANVAS_HEIGHT = 520; // CSS pixels; responsive width
const WALL_MARGIN = 24;
const OCCLUDER_THICKNESS = 10; // px – used for shadow width and wall drawing

function dist(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.hypot(dx, dy);
}

function cross(ax, ay, bx, by) {
  return ax * by - ay * bx;
}

// Compute intersection of ray p -> p + r (r is a vector) with segment a-b
function raySegmentIntersection(p, r, a, b) {
  const s = { x: b.x - a.x, y: b.y - a.y };
  const rxs = cross(r.x, r.y, s.x, s.y);
  const q_p = { x: a.x - p.x, y: a.y - p.y };
  const qpxr = cross(q_p.x, q_p.y, r.x, r.y);

  if (Math.abs(rxs) < 1e-9) {
    // Parallel or collinear: ignore for now
    return null;
  }
  const t = cross(q_p.x, q_p.y, s.x, s.y) / rxs; // along ray
  const u = qpxr / rxs; // along segment
  if (t >= 0 && u >= 0 && u <= 1) {
    return { x: p.x + t * r.x, y: p.y + t * r.y, t };
  }
  return null;
}

// Compute intersection point between two finite segments a-b and c-d
function segmentSegmentIntersection(a, b, c, d) {
  const r = { x: b.x - a.x, y: b.y - a.y };
  const s = { x: d.x - c.x, y: d.y - c.y };
  const rxs = cross(r.x, r.y, s.x, s.y);
  const q_p = { x: c.x - a.x, y: c.y - a.y };
  if (Math.abs(rxs) < 1e-9) return null; // parallel or collinear
  const t = cross(q_p.x, q_p.y, s.x, s.y) / rxs;
  const u = cross(q_p.x, q_p.y, r.x, r.y) / rxs;
  if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
    return { x: a.x + t * r.x, y: a.y + t * r.y };
  }
  return null;
}

function generateDefaultWalls(w, h) {
  const walls = [];

  // a few interior walls
  const cx = w * 0.5; const cy = h * 0.5;
  walls.push([{ x: cx - 140, y: cy - 100 }, { x: cx + 80, y: cy - 80 }]);
  walls.push([{ x: cx - 40, y: cy - 10 }, { x: cx - 40, y: cy + 120 }]);
  walls.push([{ x: cx + 120, y: cy + 20 }, { x: cx + 180, y: cy + 120 }]);
  walls.push([{ x: cx - 180, y: cy + 80 }, { x: cx - 80, y: cy + 150 }]);
  return walls;
}

function generateRandomWalls(w, h, count = 6) {
  const rnd = [];
  const minLen = 40;
  const maxLen = 200;

  for (let i = 0; i < count; i++) {
    const x = WALL_MARGIN + Math.random() * (w - WALL_MARGIN * 2);
    const y = WALL_MARGIN + Math.random() * (h - WALL_MARGIN * 2);
    const ang = Math.random() * Math.PI * 2;
    const len = minLen + Math.random() * (maxLen - minLen);
    const x2 = Math.min(w - WALL_MARGIN, Math.max(WALL_MARGIN, x + Math.cos(ang) * len));
    const y2 = Math.min(h - WALL_MARGIN, Math.max(WALL_MARGIN, y + Math.sin(ang) * len));
    rnd.push([{ x, y }, { x: x2, y: y2 }]);
  }
  return rnd;
}

function RayTracingDemo() {
  const theme = useTheme();
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const parentRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [walls, setWalls] = useState([]);
  const [size, setSize] = useState({ w: 800, h: CANVAS_HEIGHT });

  // Resize canvas to parent width and handle DPR
  const resizeCanvas = useCallback(() => {
    const parent = parentRef.current;
    if (!parent) return;
    const rect = parent.getBoundingClientRect();
    const w = Math.max(300, rect.width);
    const h = CANVAS_HEIGHT;
    setSize({ w, h });
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      const ctx = canvas.getContext('2d');
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
  }, []);

  // Initialize walls on mount and on resize
  useEffect(() => {
    resizeCanvas();
  }, [resizeCanvas]);

  useEffect(() => {
    setWalls(generateDefaultWalls(size.w, size.h));
  }, [size.w, size.h]);

  useEffect(() => {
    const onResize = () => resizeCanvas();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [resizeCanvas]);

  // Track mouse within canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const handleMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const handleLeave = () => {
      // put light off-screen so you see a dark box when mouse leaves
      mouseRef.current = { x: -9999, y: -9999 };
    };
    canvas.addEventListener('mousemove', handleMove);
    canvas.addEventListener('mouseleave', handleLeave);
    return () => {
      canvas.removeEventListener('mousemove', handleMove);
      canvas.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  const computeVisibility = useCallback((light, wallSegments) => {
    const { w, h } = size;
    const maxDist = Math.hypot(w, h);
    const points = [];

    // Expand each wall segment into a rectangle (finite thickness occluder)
    const occluderSegments = [];
    const ht = OCCLUDER_THICKNESS / 2;
    for (const [a, b] of wallSegments) {
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const len = Math.hypot(dx, dy);
      if (len < 1e-6) continue;
      const ux = dx / len;
      const uy = dy / len;
      const nx = -uy; // left normal
      const ny = ux;
      const p0 = { x: a.x - nx * ht, y: a.y - ny * ht };
      const p1 = { x: b.x - nx * ht, y: b.y - ny * ht };
      const p2 = { x: b.x + nx * ht, y: b.y + ny * ht };
      const p3 = { x: a.x + nx * ht, y: a.y + ny * ht };
      occluderSegments.push([p0, p1], [p1, p2], [p2, p3], [p3, p0]);
    }

    // Add invisible canvas boundary as termination segments (not drawn)
    const rectSegments = [
      [{ x: 0, y: 0 }, { x: w, y: 0 }],
      [{ x: w, y: 0 }, { x: w, y: h }],
      [{ x: w, y: h }, { x: 0, y: h }],
      [{ x: 0, y: h }, { x: 0, y: 0 }],
    ];
    const allSegments = occluderSegments.concat(rectSegments);

    // Gather unique vertices from endpoints and intersections (including with canvas edges)
    const rawVertices = [];
    for (const [a, b] of allSegments) {
      rawVertices.push(a, b);
    }
    for (let i = 0; i < allSegments.length; i++) {
      const [a1, b1] = allSegments[i];
      for (let j = i + 1; j < allSegments.length; j++) {
        const [a2, b2] = allSegments[j];
        const inter = segmentSegmentIntersection(a1, b1, a2, b2);
        if (inter) rawVertices.push(inter);
      }
    }
    // Dedupe vertices with a small tolerance to avoid duplicates
    const vmap = new Map();
    const keyOf = (p) => `${Math.round(p.x * 1000)}:${Math.round(p.y * 1000)}`; // ~0.001 px tolerance
    for (const v of rawVertices) {
      const k = keyOf(v);
      if (!vmap.has(k)) vmap.set(k, v);
    }
    const vertices = Array.from(vmap.values());

    const EPS = 0.0001; // angle jitter for edge sampling
    const angles = [];
    for (const v of vertices) {
      const ang = Math.atan2(v.y - light.y, v.x - light.x);
      angles.push(ang - EPS, ang, ang + EPS);
    }

    for (const ang of angles) {
      const dir = { x: Math.cos(ang), y: Math.sin(ang) };
      const ray = { x: dir.x * maxDist, y: dir.y * maxDist };
      let closest = null;

      for (const [a, b] of allSegments) {
        const hit = raySegmentIntersection(light, ray, a, b);
        if (hit) {
          if (!closest || hit.t < closest.t) {
            closest = hit;
          }
        }
      }

      if (closest) {
        points.push({ x: closest.x, y: closest.y, angle: ang });
      } else {
        // should rarely happen due to bounding walls, but fallback
        points.push({ x: light.x + ray.x, y: light.y + ray.y, angle: ang });
      }
    }

    // Sort by angle to make a proper visibility polygon
    points.sort((p1, p2) => p1.angle - p2.angle);
    return points;
  }, [size]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { w, h } = size;

    // Clear
    ctx.clearRect(0, 0, w, h);

    // Background and container styling
    ctx.fillStyle = theme.palette.background.default;
    ctx.fillRect(0, 0, w, h);

    // Subtle backdrop inside the box
    ctx.fillStyle = theme.palette.mode === 'dark' ? '#0e0e12' : '#f5f7fb';
    ctx.fillRect(WALL_MARGIN, WALL_MARGIN, w - WALL_MARGIN * 2, h - WALL_MARGIN * 2);

    // Compute visibility polygon
    const light = mouseRef.current;
    const poly = computeVisibility(light, walls);

    // Darken entire scene first
    ctx.save();
    ctx.fillStyle = theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.65)' : 'rgba(0,0,0,0.35)';
    ctx.fillRect(0, 0, w, h);

    // Carve out lit area using a gradient fill
    if (poly.length > 2 && light.x > -1000) {
      const maxR = Math.max(160, Math.min(420, Math.hypot(w, h) * 0.35));
      const grad = ctx.createRadialGradient(light.x, light.y, 0, light.x, light.y, maxR);
      grad.addColorStop(0, 'rgba(255, 245, 157, 0.95)'); // warm bright center
      grad.addColorStop(0.4, 'rgba(255, 213, 79, 0.45)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      // Carve only the visibility polygon from the dark overlay
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.moveTo(poly[0].x, poly[0].y);
      for (let i = 1; i < poly.length; i++) ctx.lineTo(poly[i].x, poly[i].y);
      ctx.closePath();
      ctx.fill();

      // Paint the light gradient, clipped to the polygon, on top of the background
      ctx.globalCompositeOperation = 'source-over';
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(poly[0].x, poly[0].y);
      for (let i = 1; i < poly.length; i++) ctx.lineTo(poly[i].x, poly[i].y);
      ctx.closePath();
      ctx.clip();

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(light.x, light.y, maxR, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Glow
      ctx.globalCompositeOperation = 'lighter';
      ctx.fillStyle = 'rgba(255, 241, 118, 0.18)';
      ctx.beginPath();
      ctx.arc(light.x, light.y, 24, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // Draw walls with the same thickness used for occlusion so the visual width matches the shadow width
    ctx.strokeStyle = theme.palette.mode === 'dark' ? '#cfd8dc' : '#263238';
    ctx.lineWidth = OCCLUDER_THICKNESS;
    ctx.lineCap = 'butt';
    ctx.lineJoin = 'miter';
    walls.forEach(([a, b]) => {
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    });

    // Light source
    if (light.x > -1000) {
      ctx.fillStyle = '#ffd54f';
      ctx.strokeStyle = '#ffa000';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(light.x, light.y, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
  }, [walls, size, computeVisibility, theme.palette.background.default, theme.palette.mode]);

  // Animation loop
  useEffect(() => {
    let rafId;
    const loop = () => {
      draw();
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [draw]);

  const randomize = () => {
    setWalls(generateRandomWalls(size.w, size.h, 6 + Math.floor(Math.random() * 5)));
  };

  return (
    <Container component={motion.div} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
      <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <IconButton onClick={() => navigate('/demos')} size="large" aria-label="Back to demos">
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          2D Ray Casting — Light & Shadows
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Button onClick={randomize} startIcon={<RefreshIcon />} variant="outlined" size="small">
          Randomize Walls
        </Button>
      </Box>

      <Box ref={parentRef} sx={{ width: '100%', borderRadius: 2, overflow: 'hidden', boxShadow: 3, bgcolor: 'background.paper' }}>
        <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: CANVAS_HEIGHT }} />
      </Box>

      <Typography variant="body2" align="center" sx={{ mt: 2, color: 'text.secondary' }}>
        Move your mouse inside the box!
      </Typography>
    </Container>
  );
}

export default RayTracingDemo;
