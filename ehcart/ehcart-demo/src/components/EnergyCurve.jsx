import React from 'react';
import ReactECharts from 'echarts-for-react';

const EnergyCurve = () => {
  // 生成24小时的能量数据
  const generateEnergyData = () => {
    const data = [];
    for (let i = 0; i <= 24; i++) {
      // 创建一个更平滑的波浪形曲线，在9:40左右达到峰值
      let energy;
      if (i <= 6) {
        energy = 30 + Math.sin((i / 6) * Math.PI) * 15;
      } else if (i <= 12) {
        energy = 45 + Math.sin(((i - 6) / 6) * Math.PI) * 35;
      } else if (i <= 18) {
        energy = 50 + Math.sin(((i - 12) / 6) * Math.PI) * 25;
      } else {
        energy = 35 + Math.sin(((i - 18) / 6) * Math.PI) * 20;
      }
      
      // 在9.67小时（9:40）附近创建峰值
      if (i >= 9 && i <= 10) {
        const peakFactor = 1 - Math.abs(i - 9.67) * 3;
        energy = Math.max(energy, 70 + peakFactor * 15);
      }
      
      data.push([i, Math.max(20, Math.min(90, energy))]);
    }
    return data;
  };

  const energyData = generateEnergyData();
  const currentTime = 9.67; // 9:40
  
  const option = {
    title: {
      text: "Today's Energy Curve",
      left: 'left',
      top: 20,
      textStyle: {
        fontSize: 20,
        fontWeight: '400',
        color: '#999'
      }
    },
    grid: {
      left: '8%',
      right: '8%',
      bottom: '15%',
      top: '20%'
    },
    xAxis: {
      type: 'value',
      min: 0,
      max: 24,
      interval: 6,
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        formatter: function(value) {
          if (value === 0) return '00 : 00';
          if (value === 24) return '24 : 00';
          if (value === 12) return '12 : 00';
          return '';
        },
        color: '#ccc',
        fontSize: 16
      },
      splitLine: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      show: false,
      min: 0,
      max: 100
    },
    series: [
      {
        name: 'Energy',
        type: 'line',
        data: energyData,
        smooth: true,
        symbol: 'none',
        lineStyle: {
          color: '#6366F1',
          width: 3
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(139, 92, 246, 0.3)'
              },
              {
                offset: 1,
                color: 'rgba(139, 92, 246, 0.05)'
              }
            ]
          }
        }
      },
      // 当前时间标记点
      {
        name: 'Current Time',
        type: 'scatter',
        data: [[currentTime, energyData.find(([time]) => Math.abs(time - currentTime) < 0.5)?.[1] || 80]],
        symbol: 'circle',
        symbolSize: 12,
        itemStyle: {
          color: '#6366F1',
          borderColor: '#fff',
          borderWidth: 3
        },
        z: 10
      },
      // 当前时间垂直线
      {
        name: 'Current Time Line',
        type: 'line',
        markLine: {
          silent: true,
          symbol: 'none',
          lineStyle: {
            color: '#6366F1',
            width: 2,
            type: 'solid'
          },
          data: [
            {
              xAxis: currentTime
            }
          ],
          label: {
            show: true,
            position: 'end',
            formatter: '9 : 40',
            color: '#6366F1',
            fontSize: 16,
            fontWeight: 'bold'
          }
        }
      }
    ]
  };

  return (
    <div className="energy-curve">
      <ReactECharts 
        option={option} 
        style={{ height: '300px', width: '100%' }}
        opts={{ renderer: 'svg' }}
      />
    </div>
  );
};

export default EnergyCurve;