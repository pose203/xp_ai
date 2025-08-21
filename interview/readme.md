# 秋招面试


## js
- Object.assign()
- 深拷贝和浅拷贝
- 拷贝(简单数据类型 复印一份) 和引用式赋值

- 响应式底层
   - Object.defineProperty
   - proxy
   - 

## Git
开发中的如何使用git的

- 安装开发环境
    - node
    - git 环境 开源的分布式版本管理软件
    - 公司会发放一个git账户，私有项目

- git config --global user.name ""
      git config --global user.email ""
- 入职 git clone 公司代码
      - 主分支 main/master
           所有人都在用的，线上分支
      - 新开一个分支
      在自己的工作任务分支
      git checkout -b xxx
      git branch
      git checkout main
- 常用命令
      git pull origin main 每天上班前的动作
      git status 当前git 状态
      git log --oneline 查看提交记录
      git add . 提交到暂存区
      git commit -m ''提交到仓库
      git push origin main 提交到远程仓库
- 场景
   - 回退
    git restore --staged algorithm/readme.md

