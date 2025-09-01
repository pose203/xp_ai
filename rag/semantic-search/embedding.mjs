// 负责 posts.json的模块化
// 支持了fs的promise版本
import fs from "fs/promises";
// readFile() 异步 callback
// readFileSync 同步读取文件
// fs 推出了promise版本
import { client } from "./llm.mjs";

const inputFilePath = "./data/posts.json";
const outputFilePath = "./data/posts_with_embedding.json";
// 最流行写法
const data = await fs.readFile(inputFilePath, "utf-8");
console.log(data);
// 向量化
const posts = JSON.parse(data);

const postsWithEmbedding = [];

for (const {title,category} of posts) {
   // console.log(title,category,'///////');
   const response = await client.embeddings.create({
    model: "text-embedding-ada-002",
    input: `标题：${title} 分类：${category}`,

   })
   postsWithEmbedding.push({
    title,
    category,
    embedding: response.data[0].embedding
   })
}

await fs.writeFile(outputFilePath, JSON.stringify(postsWithEmbedding, null, 2));