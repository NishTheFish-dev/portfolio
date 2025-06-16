import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Container,
  IconButton,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  useTheme,
} from '@mui/material';
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ComposedChart,
  Bar,
} from 'recharts';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const TIMEFRAMES = [
  { label: '1 Minute', interval: '1m', minutes: 1 },
  { label: '5 Minute', interval: '5m', minutes: 5 },
  { label: '30 Minute', interval: '30m', minutes: 30 },
  { label: '1 Hour', interval: '60m', minutes: 60 },
  { label: '4 Hour', interval: '1h', minutes: 240 },
  { label: '1 Day', interval: '1d', minutes: 1440 },
];

// Fallback data in case API fails
const FALLBACK_DATA = [
  { date: '2023-06-12', open: 430.5, high: 433.2, low: 430.1, close: 432.8 },
  { date: '2023-06-13', open: 433.0, high: 437.5, low: 432.8, close: 436.2 },
  { date: '2023-06-14', open: 436.5, high: 439.8, low: 435.0, close: 438.5 },
  { date: '2023-06-15', open: 437.2, high: 440.1, low: 436.8, close: 439.3 },
  { date: '2023-06-16', open: 439.0, high: 441.2, low: 437.5, close: 440.0 },
];

async function fetchSpyData(interval, minutesPerCandle) {
  try {
    // Try direct CORS request first
    const totalMinutes = minutesPerCandle * 60;
    const days = Math.ceil(totalMinutes / 1440) + 1;
    const range = `${days}d`;
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/SPY?range=${range}&interval=${interval}`;
    
    // Try direct fetch first
    let res = await fetch(url);
    
    // If direct fetch fails, try with proxy
    if (!res.ok) {
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
      res = await fetch(proxyUrl);
      
      // If proxy also fails, use fallback data
      if (!res.ok) {
        console.warn('Using fallback data due to API failure');
        return FALLBACK_DATA;
      }
    }
    
    const json = await res.json();
    const result = json.chart?.result?.[0];
    
    if (!result || !result.indicators?.quote?.[0]) {
      console.warn('Invalid API response, using fallback data');
      return FALLBACK_DATA;
    }
    
    const { timestamp, indicators } = result;
    const { open, high, low, close } = indicators.quote[0];
    
    // Ensure we have valid data
    if (!timestamp || !open || !high || !low || !close) {
      console.warn('Missing data in API response, using fallback');
      return FALLBACK_DATA;
    }
    
    const raw = timestamp.map((t, i) => ({
      date: new Date(t * 1000).toISOString().split('T')[0],
      open: open[i],
      high: high[i],
      low: low[i],
      close: close[i],
    }));
    
    const validData = raw.filter((d) => d.open && d.high && d.low && d.close);
    
    // If we don't have enough valid data points, use fallback
    return validData.length > 2 ? validData : FALLBACK_DATA;
    
  } catch (error) {
    console.error('Error fetching SPY data:', error);
    return FALLBACK_DATA;
  }
}

const SpyChartDemo = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [timeframe, setTimeframe] = useState(TIMEFRAMES[0]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [usingFallback, setUsingFallback] = useState(false);

  // Color definitions for dark theme
  const upColor = theme.palette.success.main;
  const downColor = theme.palette.error.main;
  const gridColor = '#4f4f4f';
  const axisColor = '#ccc';

  const loadData = async (tf) => {
    try {
      setLoading(true);
      setError('');
      const data = await fetchSpyData(tf.interval, tf.minutes);
      setData(data);
      setUsingFallback(data === FALLBACK_DATA);
    } catch (err) {
      console.error('Error loading data:', err);
      setError('Failed to load chart data. Using sample data instead.');
      setData(FALLBACK_DATA);
      setUsingFallback(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(timeframe);
  }, [timeframe]);

  // Derived bounds with dynamic padding for wicks
  const high = useMemo(() => {
    if (!data.length) return 0;
    const maxHigh = Math.max(...data.map(d => d.high));
    return timeframe.interval === '1d' ? Math.ceil(maxHigh + 5) : Math.ceil(maxHigh + 2);
  }, [data, timeframe.interval]);
  
  const low = useMemo(() => {
    if (!data.length) return 0;
    const minLow = Math.min(...data.map(d => d.low));
    return timeframe.interval === '1d' ? Math.max(0, Math.floor(minLow - 5)) : Math.max(0, Math.floor(minLow - 2));
  }, [data, timeframe.interval]);


  // Generate price ticks based on selected timeframe
  const ticks = useMemo(() => {
    if (!data.length) return [];
    
    // Define step size based on timeframe
    let step;
    if (['1m', '5m'].includes(timeframe.interval)) {
      step = 0.5;  // 50 cent intervals for 1m and 5m
    } else if (['30m', '60m'].includes(timeframe.interval)) {
      step = 2;     // $2 intervals for 30m and 1h
    } else if (timeframe.interval === '4h') {
      step = 5;     // $5 intervals for 4h
    } else {
      step = 10;    // $10 intervals for 1d
    }
    
    // Calculate start and end points that are multiples of step
    const start = Math.floor(low / step) * step;
    const end = Math.ceil(high / step) * step;
    
    // Generate ticks
    const out = [];
    for (let p = start; p <= end + step; p += step) {
      out.push(Number(p.toFixed(2)));
    }
    return out;
  }, [low, high, timeframe.interval, data]);
  
  // Calculate Y-axis domain with padding for wicks
  const yDomain = useMemo(() => [low, high], [low, high]);

  const candleShape = useCallback(({ x, width, payload }) => {
    if (!payload || high === low) return null;
    const chartHeight = 400; // matches container height minus margins
    const topMargin = 20;
    const scaleY = (v) => topMargin + ((high - v) / (high - low)) * chartHeight;
    const oY = scaleY(payload.open);
    const cY = scaleY(payload.close);
    const hY = scaleY(payload.high);
    const lY = scaleY(payload.low);
    const isUp = payload.close >= payload.open;
    const color = isUp ? upColor : downColor;
    const bodyY = isUp ? cY : oY;
    const bodyHeight = Math.max(1, Math.abs(cY - oY));
    const bodyWidth = width * 0.7; // tighter gap
    return (
      <g>
        <line x1={x + width / 2} x2={x + width / 2} y1={hY} y2={lY} stroke={color} strokeWidth={1} />
        <rect x={x + (width - bodyWidth) / 2} y={bodyY} width={bodyWidth} height={bodyHeight} fill={color} />
      </g>
    );
  }, [high, low, upColor, downColor]);

  const handleChange = (e) => {
    const tf = TIMEFRAMES.find((t) => t.interval === e.target.value);
    if (tf) setTimeframe(tf);
  };

  return (
    <Container component={motion.div} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
      <Box sx={{ mb: 2 }}>
        <IconButton onClick={() => navigate('/demos')} size="large">
          <ArrowBackIcon />
        </IconButton>
      </Box>
      <Typography variant="h3" align="center" gutterBottom sx={{
          fontWeight: 700,
          background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
        $SPY Candlestick Chart
      </Typography>

      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel id="tf-label">Timeframe</InputLabel>
          <Select labelId="tf-label" value={timeframe.interval} label="Timeframe" onChange={handleChange}>
            {TIMEFRAMES.map((t) => (
              <MenuItem key={t.interval} value={t.interval}>
                {t.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          {error && (
            <Typography color="warning" align="center" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          {usingFallback && (
            <Typography color="warning" align="center" sx={{ mb: 2 }}>
              Showing sample data. Real-time data unavailable.
            </Typography>
          )}
          <ResponsiveContainer width="100%" height={420}>
            <ComposedChart data={data} margin={{ top: 20, right: 40, left: 0, bottom: 0 }}>
            <CartesianGrid stroke={gridColor} strokeDasharray="3 3" opacity={0.6} />
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: axisColor }} axisLine={{ stroke: axisColor }} tickLine={{ stroke: axisColor }} />
            <YAxis domain={yDomain} ticks={ticks} tickFormatter={(v) => `$${v.toFixed(2)}`} tick={{ fontSize: 11, fill: axisColor }} axisLine={{ stroke: axisColor }} tickLine={{ stroke: axisColor }} />
            <Tooltip 
              formatter={(v) => `$${parseFloat(v).toFixed(2)}`} 
              labelStyle={{ fontWeight: 600, color: '#ffffff' }} 
              contentStyle={{ 
                backgroundColor: '#1e1e1e', 
                borderColor: axisColor,
                color: '#ffffff'
              }} 
              itemStyle={{ color: '#ffffff' }}
            />
            <Bar dataKey="close" isAnimationActive={false} shape={candleShape} />
            </ComposedChart>
          </ResponsiveContainer>
          <Typography variant="caption" display="block" align="center" sx={{ mt: 1 }}>
            Data sourced from Yahoo Finance{!usingFallback ? ' (via api.allorigins.win proxy)' : ''}
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default SpyChartDemo;
