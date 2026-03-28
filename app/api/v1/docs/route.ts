// Sirve la spec OpenAPI generada por swagger-jsdoc como JSON.
// El Route Handler de la UI la consume desde /api/v1/docs.

import { NextResponse } from 'next/server';
import { swaggerSpec } from '@/lib/swagger';

export function GET() {
  return NextResponse.json(swaggerSpec);
}