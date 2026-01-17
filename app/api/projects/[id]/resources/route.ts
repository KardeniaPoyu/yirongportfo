import { NextRequest, NextResponse } from 'next/server';
import { 
  addProjectMedia, 
  addProjectCode, 
  addProjectDoc,
  deleteProjectMedia,
  deleteProjectCode,
  deleteProjectDoc,
  getProjectById
} from '@/lib/projects';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();
    const { media, code, docs } = body;

    // 删除现有资源
    const project = await getProjectById(id);
    if (project) {
      project.media?.forEach(m => deleteProjectMedia(m.id));
      project.code?.forEach(c => deleteProjectCode(c.id));
      project.docs?.forEach(d => deleteProjectDoc(d.id));
    }

    // 添加新资源
    if (media && Array.isArray(media)) {
      for (const item of media) {
        if (item.url) {
          await addProjectMedia(id, {
            type: item.type,
            url: item.url,
            thumbnail: item.thumbnail || null,
            order_index: item.order_index || 0,
          });
        }
      }
    }

    if (code && Array.isArray(code)) {
      for (const item of code) {
        if (item.filename && item.content) {
          await addProjectCode(id, {
            filename: item.filename,
            language: item.language || null,
            content: item.content,
            order_index: item.order_index || 0,
          });
        }
      }
    }

    if (docs && Array.isArray(docs)) {
      for (const item of docs) {
        if (item.title && item.content) {
          await addProjectDoc(id, {
            title: item.title,
            content: item.content,
            doc_type: item.doc_type || 'markdown',
            order_index: item.order_index || 0,
          });
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving resources:', error);
    return NextResponse.json({ error: 'Failed to save resources' }, { status: 500 });
  }
}

