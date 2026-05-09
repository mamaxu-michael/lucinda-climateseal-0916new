'use client';

import { useState } from 'react';
import ClimateSealLogo from '../../components/ClimateSealLogo';

export default function ClaudeTestPage() {
  const [message, setMessage] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('你是一个有用的AI助手，请用中文回答问题。');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResponse('');

    try {
      const res = await fetch('/api/claude', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          systemPrompt,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || '请求失败');
      }

      setResponse(data.response);
    } catch (err) {
      setError(err instanceof Error ? err.message : '未知错误');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* 头部 */}
        <div className="text-center mb-8">
          <ClimateSealLogo />
          <h1 className="text-3xl font-bold text-gray-800 mt-4">Claude API 测试页面</h1>
          <p className="text-gray-600 mt-2">测试您的Claude API集成是否正常工作</p>
        </div>

        {/* 表单 */}
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="mb-4">
              <label htmlFor="systemPrompt" className="block text-sm font-medium text-gray-700 mb-2">
                系统提示词
              </label>
              <textarea
                id="systemPrompt"
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="设置AI助手的角色和行为..."
              />
            </div>

            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                您的消息
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                placeholder="输入您想要询问的问题..."
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading || !message.trim()}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? '正在处理...' : '发送消息'}
            </button>
          </form>

          {/* 错误显示 */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">错误</h3>
                  <div className="mt-2 text-sm text-red-700">{error}</div>
                </div>
              </div>
            </div>
          )}

          {/* 响应显示 */}
          {response && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">AI 响应</h3>
              <div className="bg-gray-50 rounded-md p-4">
                <div className="whitespace-pre-wrap text-gray-700">{response}</div>
              </div>
            </div>
          )}
        </div>

        {/* 使用说明 */}
        <div className="max-w-4xl mx-auto mt-8">
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
            <h3 className="text-lg font-medium text-blue-800 mb-2">使用说明</h3>
            <ul className="text-blue-700 space-y-1 text-sm">
              <li>• 确保您已经在配置文件中设置了正确的Claude API密钥</li>
              <li>• 系统提示词用于设置AI助手的角色和行为</li>
              <li>• 在消息框中输入您想要询问的问题</li>
              <li>• 点击&quot;发送消息&quot;按钮来测试API连接</li>
              <li>• 如果出现错误，请检查API密钥配置和网络连接</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
