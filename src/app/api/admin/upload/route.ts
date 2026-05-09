import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/admin-auth';
import {
  getMaxUploadSizeBytes,
  isAllowedUploadType,
  sanitizeFilename,
  writeUploadedFile,
} from '@/lib/admin-assets';
import { getRequestId } from '@/lib/api';
import { saveUploadedAsset } from '@/lib/admin-store';

export async function POST(request: NextRequest) {
  const requestId = getRequestId();
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized', requestId }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get('file');

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'No file uploaded', requestId }, { status: 400 });
  }

  if (!isAllowedUploadType(file.type)) {
    return NextResponse.json({ error: 'Unsupported file type', requestId }, { status: 400 });
  }

  if (file.size > getMaxUploadSizeBytes()) {
    return NextResponse.json({ error: 'File exceeds 10MB limit', requestId }, { status: 400 });
  }

  const timestamp = Date.now();
  const filename = `${timestamp}-${sanitizeFilename(file.name)}`;
  const bytes = new Uint8Array(await file.arrayBuffer());
  const url = await writeUploadedFile(filename, bytes);

  await saveUploadedAsset({
    id: crypto.randomUUID(),
    uploadedAt: new Date().toISOString(),
    filename,
    originalFilename: file.name,
    url,
    contentType: file.type,
    size: file.size,
  });

  return NextResponse.json({ success: true, filename, url }, { status: 200 });
}
