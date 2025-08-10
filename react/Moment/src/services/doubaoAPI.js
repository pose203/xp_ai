/**
 * 豆包可视化模型 API 服务
 * 支持文本聊天和图片分析功能
 */

import { API_CONFIG } from '../constants/api.js';
import { debounce } from '../utils/debounce.js';

const DOUBAO_API_URL = API_CONFIG.AI.DOUBAO_BASE_URL;
const DOUBAO_MODEL = API_CONFIG.AI.DOUBAO_VISION_MODEL;

/**
 * 豆包可视化模型API调用 - 支持多模态（带防抖保护）
 * @param {Array} messages - 消息历史数组
 * @param {string} api_key - API密钥
 * @param {string} model - 模型名称
 * @returns {Object} 响应结果
 */
const _chatWithDoubao = async (
    messages,
    api_key = API_CONFIG.AI.DOUBAO_API_KEY,
    model = DOUBAO_MODEL
) => {
    try {
        const response = await fetch(DOUBAO_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${api_key}`
            },
            body: JSON.stringify({
                model,
                messages,
                stream: false
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return {
            code: 1,
            data: {
                role: 'assistant',
                content: data.choices[0].message.content
            }
        };
    } catch (err) {
        console.error('豆包 API 调用失败:', err);
        return {
            code: 0,
            message: '服务器错误，请稍后重试',
            error: err.message
        };
    }
};

// 导出防抖版本的API调用函数
export const chatWithDoubao = debounce(_chatWithDoubao, 1000);

/**
 * 图片分析功能 - 用户上传图片，AI给出修改或创作建议（带防抖保护）
 * @param {string} imageUrl - 图片URL
 * @param {string} userPrompt - 用户对图片的问题或要求
 * @returns {Object} AI分析结果
 */
const _analyzeImageWithSuggestions = async (imageUrl, userPrompt = "请分析这张图片，并给出一些修改或创作建议") => {
    const systemPrompt = {
        role: 'system',
        content: `你是一个专业的图片分析师和创作顾问，名字叫小深。你在一个图片社交APP中帮助用户分析图片并提供创作建议。

请从以下几个方面分析图片：
1. 画面构图和视觉效果
2. 色彩搭配和光线
3. 主题内容和情感表达
4. 可以优化的地方
5. 创作灵感和建议

请用温暖、专业、有启发性的语气回复，给出具体而实用的建议，让用户感到有收获。回复要结构清晰，建议要具体可行。`
    };
    
    const userMessage = {
        role: 'user',
        content: [
            {
                type: 'image_url',
                image_url: {
                    url: imageUrl
                }
            },
            {
                type: 'text',
                text: userPrompt
            }
        ]
    };
    
    const messages = [systemPrompt, userMessage];
    return await _chatWithDoubao(messages);
};

// 导出防抖版本的图片分析函数
export const analyzeImageWithSuggestions = debounce(_analyzeImageWithSuggestions, 2000);

/**
 * 纯文本聊天功能 - AI好友聊天（带防抖保护）
 * @param {string} userMessage - 用户消息
 * @param {string} friendPersonality - AI好友人格设定
 * @returns {Object} AI回复
 */
const _chatWithAIFriend = async (userMessage, friendPersonality = '温暖友善的聊天伙伴') => {
    const systemPrompt = {
        role: 'system',
        content: `你是一个${friendPersonality}，名字叫小深。你在一个图片交友app中作为AI好友，与用户进行轻松愉快的聊天。

你的特点：
- 温暖、友好、有趣
- 善于倾听和回应
- 能给出有帮助的建议
- 喜欢分享正能量
- 对图片和创作有一定了解

请用自然、亲切的语气回复，让用户感到舒适和开心。回复要简洁有趣，不要太正式。如果用户提到图片相关的话题，可以表现出专业的兴趣。`
    };
    
    const messages = [
        systemPrompt,
        {
            role: 'user',
            content: userMessage
        }
    ];
    
    return await _chatWithDoubao(messages);
};

// 导出防抖版本的AI好友聊天函数
export const chatWithAIFriend = debounce(_chatWithAIFriend, 1000);

/**
 * 批量图片分析 - 分析多张图片（带防抖保护）
 * @param {Array} imageUrls - 图片URL数组
 * @param {string} analysisType - 分析类型（composition、color、theme、improvement）
 * @returns {Object} 批量分析结果
 */
const _analyzeBatchImages = async (imageUrls, analysisType = 'comprehensive') => {
    const analysisPrompts = {
        composition: '请分析这些图片的构图特点，给出构图优化建议',
        color: '请分析这些图片的色彩搭配，给出色彩调整建议', 
        theme: '请分析这些图片的主题内容，给出创作方向建议',
        improvement: '请分析这些图片的整体效果，给出具体的改进建议',
        comprehensive: '请全面分析这些图片，从构图、色彩、主题等多个角度给出创作建议'
    };
    
    const prompt = analysisPrompts[analysisType] || analysisPrompts.comprehensive;
    
    const imageContent = imageUrls.map(url => ({
        type: 'image_url',
        image_url: { url }
    }));
    
    const messages = [
        {
            role: 'system',
            content: '你是一个专业的图片分析师，请详细分析用户提供的图片并给出专业建议。'
        },
        {
            role: 'user',
            content: [
                ...imageContent,
                {
                    type: 'text',
                    text: prompt
                }
            ]
        }
    ];
    
    return await _chatWithDoubao(messages);
};

// 导出防抖版本的批量图片分析函数
export const analyzeBatchImages = debounce(_analyzeBatchImages, 3000);

// 导出所有功能
export default {
    chatWithDoubao,
    analyzeImageWithSuggestions,
    chatWithAIFriend,
    analyzeBatchImages
};