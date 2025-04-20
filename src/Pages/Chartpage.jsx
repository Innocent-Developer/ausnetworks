import React, { useEffect, useRef } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";

const BigWigCandleChart = () => {
  const chartContainerRef = useRef();
  const candleSeriesRef = useRef();
  const candlesDataRef = useRef([]);
  const chartRef = useRef();

  useEffect(() => {
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 600,
      layout: {
        background: { color: "#0f172a" },
        textColor: "#e2e8f0",
      },
      grid: {
        vertLines: { color: "#475569" },
        horzLines: { color: "#475569" },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      timeScale: {
        borderColor: "#e2e8f0",
        timeVisible: true,
        secondsVisible: true,
      },
      priceScale: {
        borderColor: "#e2e8f0",
        scaleMargins: {
          top: 0.1,
          bottom: 0.1,
        },
        formatPrice: (price) => price.toFixed(6),
        ticksVisible: true,
        minimumPriceMovement: 0.00001,
        autoScale: true,
      },
    });

    chartRef.current = chart;

    const candleSeries = chart.addCandlestickSeries({
      upColor: "#4ade80",
      downColor: "#f87171",
      borderVisible: false,
      wickUpColor: "#4ade80",
      wickDownColor: "#f87171",
    });

    candleSeriesRef.current = candleSeries;

    const generateBigWigCandles = () => {
      const startTime = Math.floor(Date.now() / 1000 / 60) * 60 - 60 * 5; // Start 5 minutes ago
      const initialPrice = 0.00;
      const priceMovements = [0.08, 0.03, 0.05, -0.02, 0.06];
      const candles = [];
      let currentPrice = initialPrice;

      priceMovements.forEach((move, index) => {
        const time = startTime + 60 * (index + 1);
        const open = currentPrice;
        currentPrice = parseFloat((currentPrice + move).toFixed(6));
        const close = currentPrice;
        const high = Math.max(open, close) + Math.random() * 0.02; // Add some wick
        const low = Math.min(open, close) - Math.random() * 0.01;  // Add some wick

        candles.push({ time, open, high, low, close });
      });
      return candles;
    };

    const initialCandles = generateBigWigCandles();
    candlesDataRef.current = initialCandles;
    candleSeries.setData(candlesDataRef.current);

    const interval = setInterval(() => {
      const nowTime = Math.floor(Date.now() / 1000 / 60) * 60;
      const lastCandle = candlesDataRef.current[candlesDataRef.current.length - 1];
      if (!lastCandle || nowTime > lastCandle.time) {
        const lastClose = lastCandle ? lastCandle.close : 0.00;
        const randomMove = (Math.random() - 0.5) * 0.04; // Larger random moves
        const newClose = parseFloat((lastClose + randomMove).toFixed(6));
        const newOpen = lastClose;
        const newHigh = Math.max(newOpen, newClose) + Math.random() * 0.015;
        const newLow = Math.min(newOpen, newClose) - Math.random() * 0.008;
        const newTime = lastCandle ? lastCandle.time + 60 : nowTime;

        const newCandle = { time: newTime, open: newOpen, high: newHigh, low: newLow, close: newClose };
        candlesDataRef.current.push(newCandle);
        candleSeries.update(newCandle); // Use update for the latest candle
      } else {
        // Update the current last candle (if still in the same minute)
        const currentPrice = parseFloat((lastCandle.close + (Math.random() - 0.5) * 0.005).toFixed(6));
        lastCandle.close = currentPrice;
        lastCandle.high = Math.max(lastCandle.high, currentPrice + Math.random() * 0.002);
        lastCandle.low = Math.min(lastCandle.low, currentPrice - Math.random() * 0.001);
        candleSeries.update(lastCandle);
      }
    }, 1000);

    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
      chartRef.current?.remove();
    };
  }, []);

  return (
    <div className="bg-slate-900 text-white min-h-screen p-4">
      <h2 className="text-2xl mb-4"> Candle Chart</h2>
      <div
        ref={chartContainerRef}
        className="w-full h-[600px] rounded-lg border border-slate-700"
      />
    </div>
  );
};

export default BigWigCandleChart;