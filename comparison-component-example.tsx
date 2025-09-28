// 更好的对比展示组件示例
import React from 'react';

const ComparisonSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-[rgb(0,52,50)] to-[rgb(0,42,40)]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4 font-lora">
            The Climate Seal Advantage
          </h2>
          <p className="text-xl text-white/80">
            From months to hours, from expensive to affordable
          </p>
        </div>

        {/* 时间线对比 */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* 传统方法 */}
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6">
            <div className="flex items-center mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
              <h3 className="text-xl font-semibold text-white">Traditional Method</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-white/80">Time:</span>
                <span className="text-red-400 font-bold">3-6 months</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/80">Steps:</span>
                <span className="text-red-400 font-bold">12 steps</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/80">Cost:</span>
                <span className="text-red-400 font-bold">$50K-100K</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/80">Team:</span>
                <span className="text-red-400 font-bold">3-5 experts</span>
              </div>
            </div>
          </div>

          {/* Climate Seal */}
          <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6">
            <div className="flex items-center mb-4">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <h3 className="text-xl font-semibold text-white">Climate Seal AI</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-white/80">Time:</span>
                <span className="text-green-400 font-bold">4 hours</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/80">Steps:</span>
                <span className="text-green-400 font-bold">4 steps</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/80">Cost:</span>
                <span className="text-green-400 font-bold">$100</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/80">Team:</span>
                <span className="text-green-400 font-bold">Just you</span>
              </div>
            </div>
          </div>
        </div>

        {/* 步骤对比 */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* 传统方法步骤 */}
          <div className="bg-white/5 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 text-center">
              Traditional Method (12 Steps)
            </h3>
            <div className="space-y-2">
              {[
                'Kick-Off Meeting',
                'Team Training',
                'Data Collection',
                'Data Cleaning',
                'Gap Analysis',
                'Model Building',
                'Factor Matching',
                'Calculation',
                'Draft Report',
                'Review Process',
                'Corrections',
                'Final Certification'
              ].map((step, index) => (
                <div key={index} className="flex items-center text-sm text-white/70">
                  <span className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center text-xs mr-3">
                    {index + 1}
                  </span>
                  {step}
                </div>
              ))}
            </div>
          </div>

          {/* Climate Seal步骤 */}
          <div className="bg-white/5 rounded-xl p-6 border-2 border-green-500/30">
            <h3 className="text-lg font-semibold text-white mb-4 text-center">
              Climate Seal AI (4 Steps)
            </h3>
            <div className="space-y-2">
              {[
                'Upload BOM Data',
                'AI Auto-Processing',
                'Review & Confirm',
                'Get Certified Report'
              ].map((step, index) => (
                <div key={index} className="flex items-center text-sm text-white">
                  <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-xs mr-3">
                    {index + 1}
                  </span>
                  {step}
                </div>
              ))}
            </div>
          </div>

          {/* 节省对比 */}
          <div className="bg-white/5 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 text-center">
              What You Save
            </h3>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">99%</div>
                <div className="text-sm text-white/70">Cost Reduction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">95%</div>
                <div className="text-sm text-white/70">Time Reduction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">0</div>
                <div className="text-sm text-white/70">Expertise Required</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
