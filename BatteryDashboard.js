// src/components/BatteryDashboard.js
import React, { useEffect, useState } from 'react';

const BatteryDashboard = () => {
  const [battery, setBattery] = useState({
    level: 1,
    charging: false,
    chargingTime: 0,
    dischargingTime: 0,
  });

  useEffect(() => {
    let batteryManager;

    const updateBatteryInfo = () => {
      setBattery({
        level: batteryManager.level,
        charging: batteryManager.charging,
        chargingTime: batteryManager.chargingTime,
        dischargingTime: batteryManager.dischargingTime,
      });
    };

    const handleBatteryEvent = () => {
      updateBatteryInfo();
    };

    navigator.getBattery().then((batt) => {
      batteryManager = batt;
      updateBatteryInfo();

      batteryManager.addEventListener('chargingchange', handleBatteryEvent);
      batteryManager.addEventListener('levelchange', handleBatteryEvent);
      batteryManager.addEventListener('chargingtimechange', handleBatteryEvent);
      batteryManager.addEventListener('dischargingtimechange', handleBatteryEvent);
    });

    return () => {
      if (batteryManager) {
        batteryManager.removeEventListener('chargingchange', handleBatteryEvent);
        batteryManager.removeEventListener('levelchange', handleBatteryEvent);
        batteryManager.removeEventListener('chargingtimechange', handleBatteryEvent);
        batteryManager.removeEventListener('dischargingtimechange', handleBatteryEvent);
      }
    };
  }, []);

  const formatTime = (time) => {
    if (time === Infinity || time === 0) {
      return 'N/A';
    }
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="battery-dashboard">
      <h1>Battery Dashboard</h1>
      <div className="battery-level">
        <strong>Battery Level:</strong> {(battery.level * 100).toFixed(0)}%
      </div>
      <div className="battery-charging">
        <strong>Charging:</strong> {battery.charging ? 'Yes' : 'No'}
      </div>
      <div className="battery-charging-time">
        <strong>Charging Time:</strong> {formatTime(battery.chargingTime)}
      </div>
      <div className="battery-discharging-time">
        <strong>Discharging Time:</strong> {formatTime(battery.dischargingTime)}
      </div>
    </div>
  );
};

export default BatteryDashboard;
