import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const all = searchParams.get('all') === 'true';

    const postsDir = path.join(process.cwd(), 'content', 'posts');

    try {
      await fs.access(postsDir);
    } catch {
      return NextResponse.json({
        success: true,
        data: [],
        total: 0
      });
    }

    const files = await fs.readdir(postsDir);
    const mdxFiles = files.filter(file => file.endsWith('.mdx') || file.endsWith('.md'));

    const articles = [];
    for (const file of mdxFiles) {
      try {
        const filePath = path.join(postsDir, file);
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const { data } = matter(fileContent);

        // 只显示已发布的文章
        if (data.published === true || data.published === 'true') {
          articles.push({
            fileName: file,
            title: data.title || '未命名',
            date: data.date || '',
            category: data.category || '',
            tags: data.tags || [],
            excerpt: data.excerpt || '',
            author: data.author || '小屋主人'
          });
        }
      } catch (error) {
        console.error(`读取文件 ${file} 失败:`, error);
      }
    }

    // 按日期排序，最新的在前面
    // 如果日期相同，则按文件名中的时间戳排序
    articles.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();

      if (dateA !== dateB) {
        return dateB - dateA;
      }

      // 日期相同，按文件名中的时间戳排序
      // 从文件名中提取时间戳 (格式: 2025-11-03-title-timestamp.mdx)
      const timestampA = a.fileName.match(/(\d{13})\.mdx?$/);
      const timestampB = b.fileName.match(/(\d{13})\.mdx?$/);

      if (timestampA && timestampB) {
        return parseInt(timestampB[1]) - parseInt(timestampA[1]);
      }

      // 如果没有时间戳，按文件名排序
      return b.fileName.localeCompare(a.fileName);
    });

    let responseData = articles;
    if (!all) {
      // 只返回最新的5篇文章用于首页显示
      responseData = articles.slice(0, 5);
    }

    return NextResponse.json({
      success: true,
      data: responseData,
      total: articles.length
    });

  } catch (error) {
    console.error('获取文章失败:', error);
    return NextResponse.json(
      { error: '获取失败，请重试' },
      { status: 500 }
    );
  }
}