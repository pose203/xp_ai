# 机器学习

- notebook
  你不知道的javascript 深入学习
  AI 博客



- modelscope

- python notebook
  ipynb 后缀
  nlp 机器学习

- python
  nlp 第一语言
  js 也挺好


- 引入了pipeline 模块
  model 中国第一大模型社区
  from modelscope.pipeline import pipeline
  from modelscope.utils.constant import Tasks
  semantic_cls = pipeline(Tasks.text_classification,'damo/nlp_structbert_sentiment-classification_chinese-base')
  打分 label
  result = semantic_cls('胡总吉他弹得真帅')