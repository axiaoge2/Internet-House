import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';

// 检查身份验证
function checkAuth(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const authTime = request.headers.get('x-auth-time');

  if (!authHeader || !authTime) {
    return false;
  }

  // 验证 token 格式
  const token = authHeader.replace('Bearer ', '');
  if (token !== 'study-auth-' + authTime) {
    return false;
  }

  // 检查认证时间是否过期（24小时）
  try {
    const authDate = new Date(authTime);
    const now = new Date();
    const hoursDiff = (now.getTime() - authDate.getTime()) / (1000 * 60 * 60);

    if (hoursDiff > 24 || isNaN(hoursDiff)) {
      return false;
    }
  } catch {
    return false;
  }

  return true;
}

// 生成文件名
function generateFileName(title: string): string {
  const date = new Date();
  const dateStr = date.toISOString().split('T')[0]; // YYYY-MM-DD

  // 添加时间戳来避免重复，并处理中文和特殊字符
  const timestamp = date.getTime();
  const titleSlug = title
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fa5\s-]/g, '') // 保留中文、英文、数字、空格和连字符
    .replace(/\s+/g, '-') // 空格替换为连字符
    .trim() || 'untitled'; // 如果处理后为空，使用默认标题

  return `${dateStr}-${titleSlug}-${timestamp}.mdx`;
}

// 生成 front matter
function generateFrontMatter(data: any): string {
  const frontMatter = {
    title: data.title,
    date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
    excerpt: data.excerpt || '',
    category: data.category || '日常记录',
    tags: data.tags || [],
    author: data.author || '小屋主人',
    published: data.published || false,
    ...data
  };

  // 移除 content 字段，因为它是文章正文
  delete frontMatter.content;

  const yamlString = Object.entries(frontMatter)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return `${key}: [${value.map(v => `"${v}"`).join(', ')}]`;
      }
      return `${key}: "${value}"`;
    })
    .join('\n');

  return `---\n${yamlString}\n---`;
}

export async function POST(request: NextRequest) {
  try {
    // 检查身份验证
    if (!checkAuth(request)) {
      return NextResponse.json(
        { error: '未授权访问' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, content, excerpt, category, tags, author, published = false } = body;

    // 验证必需字段
    if (!title || !content) {
      return NextResponse.json(
        { error: '标题和内容不能为空' },
        { status: 400 }
      );
    }

    // 生成文件名和路径
    const fileName = generateFileName(title);
    const postsDir = path.join(process.cwd(), 'content', 'posts');
    const filePath = path.join(postsDir, fileName);

    // 确保目录存在
    try {
      await fs.access(postsDir);
    } catch {
      await fs.mkdir(postsDir, { recursive: true });
    }

    // 检查文件是否已存在
    try {
      await fs.access(filePath);
      return NextResponse.json(
        { error: '同名文章已存在，请修改标题' },
        { status: 409 }
      );
    } catch {
      // 文件不存在，可以继续创建
    }

    // 生成完整的文件内容
    const frontMatter = generateFrontMatter({
      title,
      excerpt,
      category,
      tags,
      author,
      published
    });

    const fullContent = `${frontMatter}\n\n${content}`;

    // 写入文件
    await fs.writeFile(filePath, fullContent, 'utf-8');

    return NextResponse.json({
      success: true,
      message: published ? '文章已发布到书架！' : '草稿已收进抽屉',
      fileName,
      filePath: `/blog/${fileName.replace('.mdx', '')}`
    });

  } catch (error) {
    console.error('保存文章失败:', error);
    return NextResponse.json(
      { error: '保存失败，请重试' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    // 检查身份验证
    if (!checkAuth(request)) {
      return NextResponse.json(
        { error: '未授权访问' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { fileName, title, content, excerpt, category, tags, author, published = false } = body;

    // 验证必需字段
    if (!fileName || !title || !content) {
      return NextResponse.json(
        { error: '文件名、标题和内容不能为空' },
        { status: 400 }
      );
    }

    const postsDir = path.join(process.cwd(), 'content', 'posts');
    const filePath = path.join(postsDir, fileName);

    // 检查文件是否存在
    try {
      await fs.access(filePath);
    } catch {
      return NextResponse.json(
        { error: '文章不存在' },
        { status: 404 }
      );
    }

    // 读取现有文件以保留某些元数据
    const existingContent = await fs.readFile(filePath, 'utf-8');
    const { data: existingData } = matter(existingContent);

    // 生成新的 front matter
    const frontMatter = generateFrontMatter({
      title,
      excerpt,
      category,
      tags,
      author,
      published,
      // 保留一些原有的元数据
      createdAt: existingData.createdAt || new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    });

    const fullContent = `${frontMatter}\n\n${content}`;

    // 写入文件
    await fs.writeFile(filePath, fullContent, 'utf-8');

    return NextResponse.json({
      success: true,
      message: '文章已更新',
      fileName,
      filePath: `/blog/${fileName.replace('.mdx', '')}`
    });

  } catch (error) {
    console.error('更新文章失败:', error);
    return NextResponse.json(
      { error: '更新失败，请重试' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // 检查身份验证
    if (!checkAuth(request)) {
      return NextResponse.json(
        { error: '未授权访问' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const fileName = searchParams.get('fileName');

    if (fileName) {
      // 获取单个文章
      const postsDir = path.join(process.cwd(), 'content', 'posts');
      const filePath = path.join(postsDir, fileName);

      try {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const { data, content } = matter(fileContent);

        return NextResponse.json({
          success: true,
          data: {
            ...data,
            content
          }
        });
      } catch {
        return NextResponse.json(
          { error: '文章不存在' },
          { status: 404 }
        );
      }
    } else {
      // 获取所有文章列表
      const postsDir = path.join(process.cwd(), 'content', 'posts');

      try {
        const files = await fs.readdir(postsDir);
        const mdxFiles = files.filter(file => file.endsWith('.mdx') || file.endsWith('.md'));

        const articles = [];
        for (const file of mdxFiles) {
          try {
            const filePath = path.join(postsDir, file);
            const fileContent = await fs.readFile(filePath, 'utf-8');
            const { data } = matter(fileContent);

            articles.push({
              fileName: file,
              title: data.title || '未命名',
              date: data.date || '',
              category: data.category || '',
              tags: data.tags || [],
              published: data.published || false,
              excerpt: data.excerpt || ''
            });
          } catch (error) {
            console.error(`读取文件 ${file} 失败:`, error);
          }
        }

        // 按日期排序
        articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        return NextResponse.json({
          success: true,
          data: articles
        });
      } catch (error) {
        console.error('读取文章目录失败:', error);
        return NextResponse.json(
          { error: '无法读取文章目录' },
          { status: 500 }
        );
      }
    }

  } catch (error) {
    console.error('获取文章失败:', error);
    return NextResponse.json(
      { error: '获取失败，请重试' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // 检查身份验证
    if (!checkAuth(request)) {
      return NextResponse.json(
        { error: '未授权访问' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const fileName = searchParams.get('fileName');

    if (!fileName) {
      return NextResponse.json(
        { error: '需要提供文件名' },
        { status: 400 }
      );
    }

    const postsDir = path.join(process.cwd(), 'content', 'posts');
    const filePath = path.join(postsDir, fileName);

    // 检查文件是否存在
    try {
      await fs.access(filePath);
    } catch {
      return NextResponse.json(
        { error: '文章不存在' },
        { status: 404 }
      );
    }

    // 删除文件
    await fs.unlink(filePath);

    return NextResponse.json({
      success: true,
      message: '文章已删除'
    });

  } catch (error) {
    console.error('删除文章失败:', error);
    return NextResponse.json(
      { error: '删除失败，请重试' },
      { status: 500 }
    );
  }
}