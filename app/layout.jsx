import './globals.css';

export const metadata = {
  title: '極茶人 | 茶工房 比留間園 ── 狭山茶の産地から',
  description:
    '極茶人こだわりの狭山茶。農林水産大臣賞7回受賞の茶師・比留間嘉章が作る極上手もみ茶、微発酵煎茶、半発酵茶。茶工房比留間園。',
  keywords: '極茶人,狭山茶,比留間園,手もみ茶,微発酵煎茶,半発酵茶,日本茶,入間市',
  openGraph: {
    title: '極茶人 | 茶工房 比留間園',
    description: '農林水産大臣賞7回受賞の茶師が作る、究極の狭山茶',
    locale: 'ja_JP',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
