import React, { useState } from 'react';
import './Calculator.css';
const Calculator = () => {
  const [principal, setPrincipal] = useState('');
  const [annualRate, setAnnualRate] = useState('');
  const [tenure, setTenure] = useState('');
  const [processingFee, setProcessingFee] = useState('');
  const [emi, setEmi] = useState(null);
  const [history, setHistory] = useState([]);

  const calculateEMI = () => {
    const p = parseFloat(principal);
    const r = parseFloat(annualRate) / 12 / 100;
    const n = parseFloat(tenure) * 12;
    const fee = p * (parseFloat(processingFee) / 100) || 0;

    const emi = ((p + fee) * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    setEmi(emi.toFixed(2));

    const newHistory = {
      principal: p,
      rate: annualRate,
      tenure: tenure,
      fee: processingFee,
      emi: emi.toFixed(2),
    };
    setHistory([...history, newHistory]);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="calculator-container">
    
      <div className="calculator-content">
        <h1>EMI Calculator</h1>
        <div className="input-group">
          <label>Principal Amount (P):</label>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Annual Interest Rate (R):</label>
          <input
            type="number"
            value={annualRate}
            onChange={(e) => setAnnualRate(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Tenure (in years):</label>
          <input
            type="number"
            value={tenure}
            onChange={(e) => setTenure(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Processing Fee (%) (Optional):</label>
          <input
            type="number"
            value={processingFee}
            onChange={(e) => setProcessingFee(e.target.value)}
          />
        </div>
        <button className="calculate-btn" onClick={calculateEMI}>
          Calculate EMI
        </button>
        <button className="clear-btn" onClick={clearHistory}>
          Clear History
        </button>
        {emi && (
          <div className="result">
            <h2>Your EMI is: ₹{emi}</h2>
          </div>
        )}
      </div>
      <div className="history-container">
        <h2>Calculation History</h2>
        {history.length > 0 ? (
          <ul>
            {history.map((entry, index) => (
              <li key={index}>
                Principal: ₹{entry.principal}, Rate: {entry.rate}%, Tenure: {entry.tenure} years,
                Fee: {entry.fee}%, EMI: ₹{entry.emi}
              </li>
            ))}
          </ul>
        ) : (
          <p>No history available.</p>
        )}
      </div>
    </div>
  );
};

export default Calculator;
