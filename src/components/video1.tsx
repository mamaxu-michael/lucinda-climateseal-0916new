'use client';

import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { Battery, Zap, CheckCircle, Search, Database, Award, FileCheck } from 'lucide-react';

export default function LCAModelV1EnhancedFinal() {
  const [phase, setPhase] = useState(1);
  const [typedText, setTypedText] = useState('');
  const [showButton, setShowButton] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressLines, setProgressLines] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [pulseConfidence, setPulseConfidence] = useState(false);
  const [showButtonClick, setShowButtonClick] = useState(false);
  const [showCompliance, setShowCompliance] = useState(false);
  const [showMetrics, setShowMetrics] = useState(false);
  const [confidenceValue, setConfidenceValue] = useState(0);
  const [coverageValue, setCoverageValue] = useState(0);
  const fullText = 'Battery cells, 340k units produced 2024, sold to Europe';
  const statusLines = [
    {
      text: 'Parsing product information and specifications…',
      icon: Search,
      type: 'process'
    },
    {
      text: 'Matching applicable calculation standards…',
      icon: Database,
      type: 'process'
    },
    {
      text: 'EU Battery Regulation detected • Building compliance framework',
      icon: CheckCircle,
      type: 'result'
    },
    {
      text: 'Constructing base LCA model structure…',
      icon: Zap,
      type: 'process'
    },
    {
      text: 'Model architecture complete • Ready for data integration',
      icon: CheckCircle,
      type: 'result'
    }
  ];

  const complianceBadges = [
    { name: 'EU Battery Reg', icon: FileCheck, color: '#22C55E' },
    { name: 'ISO 14067', icon: Award, color: '#6B7280' },
    { name: 'GHG Protocol', icon: Database, color: '#6B7280' }
  ];

  useEffect(() => {
    // Phase 1: Input (0.0 - 1.2s)
    if (phase === 1) {
      const typeInterval = setInterval(() => {
        setTypedText(prev => {
          if (prev.length < fullText.length) {
            return fullText.slice(0, prev.length + 1);
          } else {
            clearInterval(typeInterval);
            setTimeout(() => {
              setPhase(2);
              setShowButton(true);
            }, 200);
            return prev;
          }
        });
      }, 45);
      return () => clearInterval(typeInterval);
    }
    // Phase 2: Click (1.2 - 1.8s)
    if (phase === 2) {
      setTimeout(() => {
        setShowButtonClick(true);
        setTimeout(() => {
          setButtonClicked(true);
          setShowButtonClick(false);
          setTimeout(() => {
            setShowButton(false);
            setShowProgress(true);
            setPhase(3);
          }, 300);
        }, 300);
      }, 300);
    }
    // Phase 3: Progress & Analysis (1.8 - 7.0s)
    if (phase === 3) {
      // Progress animation over 5 seconds
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev < 100) {
            return prev + 0.4; // 100% over 5 seconds
          } else {
            clearInterval(progressInterval);
            return prev;
          }
        });
      }, 20);
      // Status lines with varied timing
      statusLines.forEach((line, index) => {
        setTimeout(() => {
          setProgressLines(prev => [...prev, line.text]);
        }, index * 1000 + (index > 2 ? 200 : 0));
      });
      setTimeout(() => {
        setPhase(4);
        setShowResult(true);
      }, 5200);
      return () => clearInterval(progressInterval);
    }
    // Phase 4: Result & Compliance (7.0 - 11.0s)
    if (phase === 4) {
      setTimeout(() => {
        // Animate confidence value
        const confidenceInterval = setInterval(() => {
          setConfidenceValue(prev => {
            if (prev < 99) {
              return prev + 2;
            } else {
              clearInterval(confidenceInterval);
              return 99;
            }
          });
        }, 30);

        // Animate coverage value
        const coverageInterval = setInterval(() => {
          setCoverageValue(prev => {
            if (prev < 94) {
              return prev + 2;
            } else {
              clearInterval(coverageInterval);
              return 94;
            }
          });
        }, 35);

        setTimeout(() => {
          setShowCompliance(true);
          setTimeout(() => {
            setShowMetrics(true);
            setPulseConfidence(true);
            setTimeout(() => setPulseConfidence(false), 600);
          }, 800);
        }, 400);
      }, 300);
      // Hold for 4s then restart
      setTimeout(() => {
        setPhase(1);
        setTypedText('');
        setShowButton(false);
        setButtonClicked(false);
        setShowProgress(false);
        setProgress(0);
        setProgressLines([]);
        setShowResult(false);
        setPulseConfidence(false);
        setShowButtonClick(false);
        setShowCompliance(false);
        setShowMetrics(false);
        setConfidenceValue(0);
        setCoverageValue(0);
      }, 4000);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  return (
    <div
      className="w-full h-full flex items-center justify-center relative overflow-hidden"
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'rgb(0, 52, 50)',
        fontFamily: 'JetBrains Mono, monospace'
      }}
    >
      {/* Main Card */}
      <motion.div
        className="relative"
        style={{
          width: '90%',
          height: '90%',
          backgroundColor: '#1E1F22',
          borderRadius: '16px',
          border: '1px solid #2A2D32',
          padding: '24px'
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Input Phase */}
        <AnimatePresence>
          {(phase === 1 || phase === 2) && (
            <motion.div
              className="absolute inset-0 p-6 flex flex-col justify-center"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Header */}
              <motion.div
                className="mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 style={{
                  fontSize: '16px',
                  color: '#E8ECEF',
                  fontWeight: '600',
                  marginBottom: '4px'
                }}>
                  AI-Powered LCA Model Builder
                </h2>
                <p style={{
                  fontSize: '12px',
                  color: '#9CA3AF'
                }}>
                  Intelligent product analysis and compliance detection
                </p>
              </motion.div>

              {/* Input Box */}
              <div
                className="w-full border border-gray-600 rounded-xl px-4 py-3 bg-gray-800/50 mb-4"
                style={{
                  fontSize: '14px',
                  color: '#E8ECEF',
                  lineHeight: '20px',
                  minHeight: '60px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <span>
                  {typedText}
                  {phase === 1 && (
                    <motion.span
                      className="inline-block w-1 h-4 bg-white ml-1"
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    />
                  )}
                </span>
                {!typedText && (
                  <span style={{ color: '#6B7280' }}>| Describe your product for instant LCA modeling...</span>
                )}
              </div>

              {/* Build Button */}
              <div className="flex justify-center">
                <AnimatePresence>
                  {showButton && (
                    <motion.button
                      className="transition-all duration-200 relative"
                      style={{
                        width: '200px',
                        height: '40px',
                        backgroundColor: '#000',
                        color: 'white',
                        fontSize: '14px',
                        borderRadius: '8px',
                        border: '1px solid #2A2D32',
                        opacity: buttonClicked ? 0.7 : 1,
                        transform: buttonClicked ? 'scale(0.95)' : 'scale(1)'
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: buttonClicked ? 0.7 : 1,
                        y: 0,
                        scale: buttonClicked ? 0.95 : 1
                      }}
                      whileHover={{ scale: 1.04 }}
                      transition={{ duration: 0.2 }}
                    >
                      Build LCA Model
                      {/* Click Animation Circle */}
                      <AnimatePresence>
                        {showButtonClick && (
                          <motion.div
                            className="absolute rounded-full border-2 border-white pointer-events-none"
                            style={{
                              width: '40px',
                              height: '40px',
                              left: '50%',
                              top: '50%',
                              transform: 'translate(-50%, -50%)'
                            }}
                            initial={{ scale: 0, opacity: 1 }}
                            animate={{ scale: 1.5, opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.6 }}
                          />
                        )}
                      </AnimatePresence>
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress Phase */}
        <AnimatePresence>
          {showProgress && !showResult && (
            <motion.div
              className="absolute inset-0 p-6 flex flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Header */}
              <div className="mb-4">
                <motion.div
                  style={{ fontSize: '16px', color: '#E8ECEF', fontWeight: '600', marginBottom: '2px' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  AI Model Construction
                </motion.div>
                <motion.div
                  style={{ fontSize: '12px', color: '#9CA3AF' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Intelligent analysis • Compliance detection • Model generation
                </motion.div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span style={{ fontSize: '12px', color: '#9CA3AF' }}>
                    Processing
                  </span>
                  <span style={{ fontSize: '12px', color: '#32FF80', fontWeight: '600' }}>
                    {Math.round(progress)}%
                  </span>
                </div>
                <div
                  className="rounded-full overflow-hidden"
                  style={{
                    width: '100%',
                    height: '6px',
                    backgroundColor: '#383C40',
                    borderRadius: '3px'
                  }}
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: '#32FF80' }}
                    initial={{ width: '0%' }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1, ease: 'linear' }}
                  />
                </div>
              </div>

              {/* Status Lines */}
              <div className="flex-1 flex flex-col justify-start">
                <div className="space-y-3">
                  {progressLines.map((line, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start space-x-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      {/* Icon */}
                      <div className="flex-shrink-0 mt-0.5">
                        {React.createElement(statusLines[index]?.icon || Database, {
                          size: 12,
                          style: {
                            color: statusLines[index]?.type === 'result' ? '#32FF80' : '#6B7280'
                          }
                        })}
                      </div>
                      {/* Text Content */}
                      <div className="flex-1">
                        <div
                          style={{
                            fontSize: statusLines[index]?.type === 'result' ? '12px' : '11px',
                            color: statusLines[index]?.type === 'result' ? '#32FF80' : '#9CA3AF',
                            lineHeight: '16px',
                            fontWeight: statusLines[index]?.type === 'result' ? '600' : '400'
                          }}
                        >
                          {line}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result Phase */}
        <AnimatePresence>
          {showResult && (
            <motion.div
              className="absolute inset-0 p-6 flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Header */}
              <div className="mb-4">
                <motion.div
                  style={{ fontSize: '16px', color: '#E8ECEF', fontWeight: '600', marginBottom: '2px' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  Model Construction Complete
                </motion.div>
                <motion.div
                  style={{ fontSize: '12px', color: '#9CA3AF' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Ready for data integration and calculation
                </motion.div>
              </div>

              {/* Main Result Card */}
              <motion.div
                className="flex-1 bg-gray-800/30 rounded-xl border border-gray-600/50 p-4 mb-4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <div className="flex items-center justify-between h-full">
                  {/* Left: Product Icon */}
                  <motion.div
                    className="flex items-center space-x-3"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                  >
                    <div
                      className="flex items-center justify-center rounded-lg"
                      style={{
                        width: '48px',
                        height: '48px',
                        backgroundColor: '#32FF8020',
                        border: '1px solid #32FF80'
                      }}
                    >
                      <Battery size={24} style={{ color: '#32FF80' }} />
                    </div>
                    <div>
                      <div style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#E8ECEF',
                        marginBottom: '2px'
                      }}>
                        Battery Cell Model
                      </div>
                      <div style={{
                        fontSize: '11px',
                        color: '#9CA3AF'
                      }}>
                        340k units • EU market
                      </div>
                    </div>
                  </motion.div>
                  {/* Right: Metrics */}
                  <AnimatePresence>
                    {showMetrics && (
                      <motion.div
                        className="text-right space-y-2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.8 }}
                      >
                        <div>
                          <div style={{
                            fontSize: '18px',
                            color: '#32FF80',
                            fontWeight: '600',
                            transform: pulseConfidence ? 'scale(1.05)' : 'scale(1)',
                            transition: 'transform 0.2s'
                          }}>
                            {confidenceValue}%
                          </div>
                          <div style={{ fontSize: '10px', color: '#9CA3AF' }}>
                            Model Confidence
                          </div>
                        </div>
                        <div>
                          <div style={{
                            fontSize: '14px',
                            color: '#E8ECEF',
                            fontWeight: '600'
                          }}>
                            {coverageValue}%
                          </div>
                          <div style={{ fontSize: '10px', color: '#9CA3AF' }}>
                            Data Coverage
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Compliance Badges */}
              <AnimatePresence>
                {showCompliance && (
                  <motion.div
                    className="flex justify-center space-x-2 mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    {complianceBadges.map((badge, index) => (
                      <motion.div
                        key={badge.name}
                        className="flex items-center space-x-1 px-2 py-1 rounded-lg border"
                        style={{
                          backgroundColor: `${badge.color}20`,
                          borderColor: badge.color,
                          fontSize: '10px',
                          color: badge.color
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                      >
                        {React.createElement(badge.icon, { size: 10 })}
                        <span>{badge.name}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Next Button */}
              <div className="flex justify-center">
                <motion.button
                  className="transition-transform duration-200"
                  style={{
                    width: '140px',
                    height: '36px',
                    backgroundColor: '#000',
                    color: 'white',
                    fontSize: '12px',
                    borderRadius: '8px',
                    border: '1px solid #2A2D32'
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 1.2 }}
                  whileHover={{ scale: 1.04 }}
                >
                  Continue →
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}