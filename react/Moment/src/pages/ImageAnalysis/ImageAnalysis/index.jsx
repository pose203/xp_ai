import React, { useRef, useState } from 'react'
import { Button, Card, Toast, Loading, Dialog, Space, Tag } from 'react-vant'
import { PhotoO, Edit, StarO, EyeO } from '@react-vant/icons'
import useTitle from '@/hooks/useTitle'
import styles from './imageAnalysis.module.css'

const ImageAnalysis = ({ onClose }) => {
    // 设置页面标题
    useTitle('AI图片分析');

    const uploadUrl = 'https://api.coze.cn/v1/files/upload'
    const workflowUrl = 'https://api.coze.cn/v1/workflow/run'
    const patToken = import.meta.env.VITE_PAT_TOKEN
    const workflow_id = '7534980776279654427' // 图片文案生成工作流ID
    
    const uploadImageRef = useRef(null)
    const [imgPreview, setImgPreview] = useState('')

    const [status, setStatus] = useState('')
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [analysisResult, setAnalysisResult] = useState(null)



    const updateImageData = () => {
        const input = uploadImageRef.current
        if (!input.files || input.files.length === 0) { return }
        const file = input.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (e) => { 
            setImgPreview(e.target?.result)
            setAnalysisResult(null) // 重置分析结果
        }
    }

    const uploadFile = async () => {
        try {
            // 详细的PAT Token检查
            
            if (!patToken) {
                const errorMsg = '❌ PAT Token未配置，请检查.env文件中的VITE_PAT_TOKEN'
                setStatus(errorMsg)
                return
            }

            if (patToken === 'your_pat_token_here') {
                const errorMsg = '❌ 请将.env文件中的PAT Token替换为真实Token'
                setStatus(errorMsg)
                return
            }

            const formData = new FormData()
            const input = uploadImageRef.current
            if (!input.files || input.files.length <= 0) return
            
            const file = input.files[0]
            formData.append('file', file)

            const res = await fetch(uploadUrl, { 
                method: 'POST',
                headers: { 'Authorization': `Bearer ${patToken}` }, 
                body: formData, 
            })

            if (!res.ok) {
                let errorMsg = `上传失败 (${res.status}): `
                
                switch (res.status) {
                    case 401:
                        errorMsg += 'PAT Token无效或已过期，请检查Token是否正确'
                        break
                    case 403:
                        errorMsg += 'Token权限不足，请确保Token有文件上传权限'
                        break
                    case 404:
                        errorMsg += 'API接口不存在，请检查API地址'
                        break
                    case 429:
                        errorMsg += 'API调用频率过高，请稍后重试'
                        break
                    default:
                        errorMsg += '服务器错误，请稍后重试'
                }
                
                setStatus(errorMsg)
                return
            }

            let ret
            try {
                ret = await res.json()
            } catch {
                setStatus('返回内容不是JSON格式')
                return
            }

            if (ret.code !== 0) { 
                setStatus(ret.msg) 
                return 
            }

            return ret.data.id
        } catch {
            setStatus('上传失败，请检查网络或API配置')
        }
    }

    const analyzeImage = async () => {
        if (!imgPreview) {
            setStatus('❌ 请先上传图片')
            return
        }

        setStatus("图片上传中...")
        setIsAnalyzing(true)
        
        const file_id = await uploadFile()
        if (!file_id) {
            setIsAnalyzing(false)
            return
        }

        setStatus("图片上传成功，AI正在分析...")
        
        // 图片分析工作流的参数（只需要图片）
        const parameters = { 
            user_image: JSON.stringify({ file_id })
        }
        
        try {
            const res = await fetch(workflowUrl, {
                method: 'POST',
                headers: { 
                    Authorization: `Bearer ${patToken}`, 
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify({ workflow_id, parameters }),
            })
            
            const ret = await res.json()
            if (ret.code !== 0) { 
                setStatus(ret.msg)
                setIsAnalyzing(false)
                return 
            }
            
            // 解析工作流结果
            const data = JSON.parse(ret.data)
            
            // 临时调试：检查数据结构
            
            
            // 处理不同的API返回格式
            if (data.output && !data.CaptionGenerator) {
                // 如果API返回的是output格式，转换为CaptionGenerator格式
                const originalText = cleanCaption(data.output)
      
                
                // 生成不同长度的文案版本
                const sentences = originalText.split(/[。！？]/).filter(s => s.trim().length > 0)
                
                data.CaptionGenerator = {
                    // 短文案：取前1-2句
                    short: sentences.slice(0, Math.min(2, sentences.length)).join('。') + (sentences.length > 0 ? '。' : ''),
                    // 中文案：取前半部分
                    medium: sentences.slice(0, Math.ceil(sentences.length / 2)).join('。') + (sentences.length > 0 ? '。' : ''),
                    // 长文案：完整内容
                    long: originalText
                }
            } else if (data.CaptionGenerator) {
                // 原有的CaptionGenerator格式处理
                const cleanedGenerator = { ...data.CaptionGenerator }
                if (cleanedGenerator.short) {
                    cleanedGenerator.short = cleanCaption(cleanedGenerator.short)
                }
                if (cleanedGenerator.medium) {
                    cleanedGenerator.medium = cleanCaption(cleanedGenerator.medium)
                }
                if (cleanedGenerator.long) {
                    cleanedGenerator.long = cleanCaption(cleanedGenerator.long)
                }
                data.CaptionGenerator = cleanedGenerator
            }
            
    
            
            setAnalysisResult(data)
            setStatus('✨ AI分析完成！')
            setIsAnalyzing(false)
            
        } catch {
            setStatus('分析失败，请检查网络或API配置')
            setIsAnalyzing(false)
        }
    }

    // 清理文案中的格式化字符，只保留文字和标点
    const cleanCaption = (text) => {
        if (!text) return text
        
        return text
            // 移除所有转义的换行符
            .replace(/\\n/g, ' ')
            // 移除所有实际的换行符  
            .replace(/\n/g, ' ')
            // 移除多余的空格
            .replace(/\s{2,}/g, ' ')
            // 移除开头和结尾的空白
            .trim()
            // 移除可能的引号包围
            .replace(/^["']|["']$/g, '')
            // 移除其他特殊格式字符
            .replace(/[\r\t]/g, ' ')
    }

    // 格式化文案，让长文案更易读
    const formatCaption = (text) => {
        if (!text) return text
        
        // 先清理文本
        const cleaned = cleanCaption(text)
        
        // 按标点符号分段，保持自然的语言流畅性
        return cleaned
            // 按句号、问号、感叹号分段
            .replace(/([。！？])/g, '$1\n\n')
            // 按分号、冒号适当分段  
            .replace(/([；：])/g, '$1\n')
            // 移除多余的换行
            .replace(/\n{3,}/g, '\n\n')
            // 移除开头和结尾的空白
            .trim()
    }

    // 渲染格式化后的文案
    const renderFormattedCaption = (text) => {
        const formatted = formatCaption(text)
        return formatted.split('\n').map((line, index) => (
            <React.Fragment key={index}>
                {line}
                {index < formatted.split('\n').length - 1 && <br />}
            </React.Fragment>
        ))
    }

    const renderAnalysisResult = () => {
        if (!analysisResult) {
            return null
        }

        const { ContentAnalyzer, FilterRecommendation, CaptionGenerator } = analysisResult

        return (
            <div className={styles.resultContainer}>
                {/* 基础分析 */}
                {ContentAnalyzer && (
                    <Card className={styles.resultCard}>
                        <div className={styles.cardHeader}>
                            <EyeO className={styles.cardIcon} />
                            <h3>图片分析</h3>
                        </div>
                        <div className={styles.analysisInfo}>
                            <div className={styles.infoItem}>
                                <span className={styles.label}>场景:</span>
                                <span>{ContentAnalyzer.scene}</span>
                            </div>
                            <div className={styles.infoItem}>
                                <span className={styles.label}>风格:</span>
                                <span>{ContentAnalyzer.style}</span>
                            </div>
                            <div className={styles.infoItem}>
                                <span className={styles.label}>意图:</span>
                                <Tag color="#1989fa">{ContentAnalyzer.intent}</Tag>
                            </div>
                            <div className={styles.infoItem}>
                                <span className={styles.label}>主要对象:</span>
                                <div className={styles.objectTags}>
                                    {ContentAnalyzer.objects?.map((obj, index) => (
                                        <Tag key={index} color="#52c41a">{obj}</Tag>
                                    ))}
                                </div>
                            </div>
                            {ContentAnalyzer.technical && (
                                <div className={styles.technicalScore}>
                                    <span className={styles.label}>技术评分:</span>
                                    <div className={styles.scores}>
                                        <span>构图: {ContentAnalyzer.technical.composition}/10</span>
                                        <span>光线: {ContentAnalyzer.technical.lighting}/10</span>
                                        <span>色彩: {ContentAnalyzer.technical.color}/10</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Card>
                )}

                {/* 滤镜推荐 */}
                {FilterRecommendation && (
                    <Card className={styles.resultCard}>
                        <div className={styles.cardHeader}>
                            <StarO className={styles.cardIcon} />
                            <h3>滤镜推荐</h3>
                        </div>
                        <div className={styles.filterContent}>
                            {FilterRecommendation.filters?.map((filter, index) => (
                                <div key={index} className={styles.filterItem}>
                                    <div className={styles.filterName}>{filter.name}</div>
                                    <div className={styles.filterReason}>{filter.reason}</div>
                                    <div className={styles.filterStrength}>强度: {filter.strength}/10</div>
                                </div>
                            ))}
                        </div>
                    </Card>
                )}

                {/* 文案推荐 */}
                <Card className={styles.resultCard}>
                    <div className={styles.cardHeader}>
                        <Edit className={styles.cardIcon} />
                        <h3>文案推荐</h3>
                    </div>
                    {CaptionGenerator && (CaptionGenerator.short || CaptionGenerator.medium || CaptionGenerator.long) ? (
                        <div className={styles.captionContent}>
                            {CaptionGenerator.short && (
                                <div className={styles.captionItem}>
                                    <div className={styles.captionLabel}>短文案 (朋友圈)</div>
                                    <div className={styles.captionText}>
                                        {renderFormattedCaption(CaptionGenerator.short)}
                                    </div>
                                    <Button 
                                        size="small" 
                                        type="primary" 
                                        className={styles.copyBtn}
                                        onClick={() => navigator.clipboard.writeText(CaptionGenerator.short)}>
                                        📋 复制
                                    </Button>
                                </div>
                            )}
                            {CaptionGenerator.medium && (
                                <div className={styles.captionItem}>
                                    <div className={styles.captionLabel}>中文案 (微博)</div>
                                    <div className={styles.captionText}>
                                        {renderFormattedCaption(CaptionGenerator.medium)}
                                    </div>
                                    <Button 
                                        size="small" 
                                        type="primary" 
                                        className={styles.copyBtn}
                                        onClick={() => navigator.clipboard.writeText(CaptionGenerator.medium)}>
                                        📋 复制
                                    </Button>
                                </div>
                            )}
                            {CaptionGenerator.long && (
                                <div className={styles.captionItem}>
                                    <div className={styles.captionLabel}>长文案 (小红书)</div>
                                    <div className={styles.captionText}>
                                        {renderFormattedCaption(CaptionGenerator.long)}
                                    </div>
                                    <Button 
                                        size="small" 
                                        type="primary" 
                                        className={styles.copyBtn}
                                        onClick={() => navigator.clipboard.writeText(CaptionGenerator.long)}>
                                        📋 复制
                                    </Button>
                                </div>
                            )}
                            {CaptionGenerator.hashtags && (
                                <div className={styles.hashtagsContainer}>
                                    <div className={styles.captionLabel}>推荐标签</div>
                                    <div className={styles.hashtags}>
                                        {CaptionGenerator.hashtags.map((tag, index) => (
                                            <Tag key={index} color="#f50" 
                                                 onClick={() => navigator.clipboard.writeText(tag)}>
                                                {tag}
                                            </Tag>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div style={{ padding: '20px', textAlign: 'center', color: '#999' }}>
                            ✨ AI正在为您生成个性化文案...
                            <br />
                            <small>文案将根据图片内容智能生成</small>
                        </div>
                    )}
                </Card>


            </div>
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>AI图片文案生成</h2>
                <Button size="small" className={styles.closeBtn} onClick={onClose}>
                    ✕ 关闭
                </Button>
            </div>

            {/* 配置检查提示 */}
            {!patToken && (
                <div className={styles.configWarning}>
                    <h3>⚠️ 配置提醒</h3>
                    <p>请先配置PAT Token：</p>
                    <ol>
                        <li>在项目根目录创建 <code>.env</code> 文件</li>
                        <li>添加：<code>VITE_PAT_TOKEN=your_token_here</code></li>
                        <li>从 <a href="https://www.coze.cn" target="_blank">Coze控制台</a> 获取Token</li>
                        <li>重启开发服务器</li>
                    </ol>
                </div>
            )}

            {patToken === 'your_pat_token_here' && (
                <div className={styles.configWarning}>
                    <h3>⚠️ Token未设置</h3>
                    <p>请将 <code>.env</code> 文件中的Token替换为真实值</p>
                </div>
            )}



            <div className={styles.uploadSection}>
                <div className={styles.fileInput}>
                    <input 
                        ref={uploadImageRef}
                        type="file" 
                        id="image" 
                        name="image" 
                        accept="image/*" 
                        required
                        onChange={updateImageData}
                        className={styles.hiddenInput}
                    />
                    <label htmlFor="image" className={styles.uploadLabel}>
                        <PhotoO className={styles.uploadIcon} />
                        <span>点击选择图片</span>
                    </label>
                </div>

                {imgPreview && (
                    <div className={styles.previewSection}>
                        <img 
                            src={imgPreview} 
                            alt="preview" 
                            className={styles.preview}
                        />
                        <Button 
                            type="primary" 
                            size="large"
                            loading={isAnalyzing}
                            onClick={analyzeImage}
                            className={styles.analyzeBtn}
                        >
                            {isAnalyzing ? 'AI分析中...' : '开始AI分析'}
                        </Button>
                    </div>
                )}
            </div>

            {status && (
                <div className={styles.status}>
                    <Loading size="16px" /> {status}
                </div>
            )}

            {renderAnalysisResult()}
        </div>
    )
}

export default ImageAnalysis