import React from 'react';
import ReactECharts from 'echarts-for-react';

const CircularProgress = ({ 
  value = 97, title = "Today's Overall", 
  subtitle = "Horoscope Index" }) => {
  const option = {
    series: [
      // 背景圆环
      {
        type: 'gauge',
        startAngle: 90,
        endAngle: -270,
        radius: '85%',
        min: 0,
        max: 100,
        splitNumber: 0,
        axisLine: {
          lineStyle: {
            width: 3,
            color: [[1, '#E8E8E8']]
          }
        },
        pointer: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        data: [{ value: value }],
        detail: { show: false }
      },
      // 绿色虚线圆环 - 简化版
      {
        type: 'gauge',
        startAngle: 90,
        endAngle: -270,
        radius: '100%',
        min: 0,
        max: 100,
        splitNumber: 12, // 减少到12个刻度，更简洁
        axisLine: {
          lineStyle: {
            width: 0,
            color: [[1, 'transparent']]
          }
        },
        axisTick: {
          show: true,
          length: 4, // 减少长度
          distance: -4,
          lineStyle: {
            color: '#4CAF50',
            width: 1.5 // 减少宽度
          }
        },
        splitLine: { show: false },
        axisLabel: { show: false },
        pointer: { show: false },
        data: [{ value: value }],
        detail: { show: false }
      },
      // 主进度条
      {
        type: 'gauge',
        startAngle: 90,
        endAngle: -270,
        radius: '85%',
        min: 0,
        max: 100,
        splitNumber: 0,
        axisLine: {
          lineStyle: {
            width: 8,
            color: [[value / 100, '#2196F3'], [1, 'transparent']]
          }
        },
        pointer: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        data: [{ value: value }],
        detail: { show: false }
      }
    ]
  };

  return (
    <div className="circular-progress">
      <ReactECharts option={option} style={{ height: '220px', width: '220px' }} />
      <div className="progress-text">
        <div className="progress-value">{value}</div>
        <div className="progress-title">{title}</div>
        <div className="progress-subtitle">{subtitle}</div>
      </div>
    </div>
  );
};

export default CircularProgress;