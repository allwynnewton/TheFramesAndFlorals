import { ImageResponse } from 'next/og';

// iOS home-screen icon (rounded automatically by the OS).
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #17231d 0%, #191919 100%)',
          color: '#C7A76A',
          fontSize: 118,
          fontFamily: 'serif',
        }}
      >
        &
      </div>
    ),
    { ...size },
  );
}
