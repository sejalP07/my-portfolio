import VideoIntro from '@/components/VideoIntro';

export const metadata = {
  title: 'Alexander Nova — Portfolio',
  description: 'Full-Stack Developer & Creative Engineer',
};

export default function HomePage() {
  return (
    <main>
      <VideoIntro videoSrc="/hero-video.mp4" />

      {/* Your portfolio sections go below */}
      <section style={{ minHeight: '100vh', background: '#050508', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', color: 'rgba(255,255,255,0.2)', fontSize: '1.1rem' }}>
          Selected work coming soon…
        </p>
      </section>
    </main>
  );
}
