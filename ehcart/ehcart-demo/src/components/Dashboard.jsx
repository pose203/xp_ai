import React from 'react';
import CircularProgress from './CircularProgress';
import ScoreBars from './ScoreBars';
import EnergyCurve from './EnergyCurve';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-container">
        {/* Top Section */}
        <div className="dashboard-top">
          {/* Left Side - Circular Progress */}
          <div className="dashboard-left">
            <CircularProgress 
              value={97} 
              title="Today's Overall" 
              subtitle="Horoscope Index" 
            />
          </div>
          
          {/* Right Side - Score Bars */}
          <div className="dashboard-right">
            <ScoreBars />
          </div>
        </div>
        
        {/* Bottom Section - Energy Curve */}
        <div className="dashboard-bottom">
          <EnergyCurve />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
