import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/lib/db';
import bcrypt from 'bcryptjs';
const emailRegex = /^.+@.+\..+$/;//RegExp
const passwordRegex = /^(?!^\d+$)^[a-zA-Z0-9!@#$%^&*]{6,18}$/
// resutful
// 匹配规则，符号数学
// .什么都匹配，匹配一个
// + 一次或多次
// @ email 必须要有的字符
// .+@ 在@之前至少有一个字符
// \. 一定要有一个. 
export async function POST(request: NextRequest) {
    // 容错处理 稳定为主
    try{
        const { email, password } = await request.json();

        if (!email || !emailRegex.test(email)) {
            NextResponse.json({ error: '邮箱格式不正确' }, { status: 400 });
        }

        if (!password || !passwordRegex.test(password)) {
            return Response.json(
                { error: '密码需6-18位,且不能全为数字' },
                { status: 400 }
            )
        }
        // 检测用户是否已存在
        const existingUser = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (existingUser) {
            return NextResponse.json({ error: '用户已存在' }, { status: 409});
        }

        // 密码单向加密
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword
            }
        })
        
        return NextResponse.json({ message: '注册成功' }, { status: 201});
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: '注册失败' }, { status: 500 });
    }
}

