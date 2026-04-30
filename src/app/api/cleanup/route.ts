import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'تم إيقاف هذا الرابط لأسباب أمنية لمنع مسح قاعدة البيانات.' }, { status: 403 });
}
