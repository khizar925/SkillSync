import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'SkillSync — AI-Powered Recruitment Platform';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #f0fdf4 0%, #ffffff 50%, #f0fdfa 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 20px',
            borderRadius: '999px',
            border: '1px solid #bbf7d0',
            background: '#f0fdf4',
            marginBottom: '32px',
          }}
        >
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }} />
          <span style={{ color: '#059669', fontSize: 14, fontWeight: 600, letterSpacing: '0.1em' }}>
            AI-POWERED RECRUITMENT — NOW IN BETA
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: '#111827',
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            textAlign: 'center',
            marginBottom: '24px',
            maxWidth: 900,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <span>Sync Skills with&nbsp;</span>
          <span style={{ color: '#059669' }}>Opportunities</span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 22,
            color: '#6b7280',
            textAlign: 'center',
            maxWidth: 700,
            lineHeight: 1.5,
            marginBottom: '48px',
          }}
        >
          NLP resume scoring · Real-time tracking · Transparent hiring
        </div>

        {/* Stat pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px 36px',
            borderRadius: '16px',
            border: '1px solid #bbf7d0',
            background: '#f0fdf4',
          }}
        >
          <span style={{ fontSize: 36, fontWeight: 800, color: '#059669' }}>40–60%</span>
          <span style={{ fontSize: 20, color: '#374151', fontWeight: 500 }}>faster hiring</span>
        </div>

        {/* Brand name */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            right: 60,
            fontSize: 20,
            fontWeight: 700,
            color: '#9ca3af',
            letterSpacing: '-0.01em',
          }}
        >
          SkillSync
        </div>
      </div>
    ),
    { ...size }
  );
}
