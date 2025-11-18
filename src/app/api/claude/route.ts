import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { getAnthropicApiKey, validateAnthropicApiKey, getAnthropicBaseURL } from '../../../config/api-keys';

export async function POST(request: NextRequest) {
  try {
    // 验证API密钥
    if (!validateAnthropicApiKey()) {
      return NextResponse.json(
        { error: 'Anthropic API密钥未配置' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { message, systemPrompt } = body;

    // 验证必需字段
    if (!message) {
      return NextResponse.json(
        { error: '消息内容是必需的' },
        { status: 400 }
      );
    }

    // 初始化Anthropic客户端
    const anthropic = new Anthropic({
      apiKey: getAnthropicApiKey(),
      baseURL: getAnthropicBaseURL(),
    });

    // 调用Anthropic API
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1000,
      messages: [
        {
          role: 'user',
          content: message,
        },
      ],
      system: systemPrompt || '你是一个有用的AI助手，请用中文回答问题。',
    });

    // 处理响应内容
    const firstContent = response.content[0];
    const responseText = firstContent.type === 'text' ? firstContent.text : 'No text response available';

    return NextResponse.json({
      success: true,
      response: responseText,
      usage: response.usage,
    });

  } catch (error) {
    console.error('Claude API调用失败:', error);
    
    // 返回友好的错误信息
    return NextResponse.json(
      { 
        error: 'AI服务暂时不可用，请稍后再试',
        details: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : String(error)) : undefined
      },
      { status: 500 }
    );
  }
}
