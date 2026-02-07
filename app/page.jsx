"use client";
import { useState, useEffect, useRef } from "react";

/* ════════════════════════════════════════
   IMAGES (Unsplash - Free for commercial use)
   ════════════════════════════════════════ */

const IMG = {
  hero: "https://images.unsplash.com/photo-1556881286-fc6915169721?w=1600&q=80",         // tea field rows
  hero2: "https://images.unsplash.com/photo-1563822249366-3efb23b8e0c9?w=1600&q=80",      // japanese tea garden
  profile: "https://images.unsplash.com/photo-1545048702-79362596cdc9?w=800&q=80",        // tea ceremony
  temomi: "https://images.unsplash.com/photo-1587578932405-7c740a762abd?w=1200&q=80",     // green tea leaves close
  bihakkou: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=1200&q=80",   // tea with flowers
  hanhakkou: "https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?w=1200&q=80",     // oolong tea
  varieties: "https://images.unsplash.com/photo-1582793988951-9aed5509eb97?w=1200&q=80",  // tea plants close up
  brewing: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=1200&q=80",       // japanese teapot pouring
  awards: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80",     // trophy gold
  teaCup: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80",         // tea cup
  teaPot: "https://images.unsplash.com/photo-1563822249548-9a72b6353d08?w=600&q=80",      // japanese teapot
  teaField: "https://images.unsplash.com/photo-1595981234058-a9302fb97229?w=1200&q=80",   // tea field aerial
  driedTea: "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=600&q=80",    // dried tea leaves
  teaSet: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=600&q=80",      // tea set arrangement
  matcha: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=600&q=80",         // matcha bowl
  teaLeaf: "https://images.unsplash.com/photo-1530968033775-2c92736b131e?w=600&q=80",     // fresh tea leaf
  // Current site images
  oldProfile: "http://gokuchanin.com/profile2014.jpg",
  oldTemomi: "http://gokuchanin.com/temomi-p.jpg",
};

/* ════════════════════════════════════════
   DATA
   ════════════════════════════════════════ */

const PAGES = [
  { id: "home", label: "ホーム", hash: "" },
  { id: "profile", label: "茶人紹介", hash: "profile" },
  { id: "temomi", label: "手もみ茶", hash: "temomi" },
  { id: "bihakkou", label: "微発酵煎茶", hash: "bihakkou" },
  { id: "hanhakkou", label: "半発酵茶", hash: "hanhakkou" },
  { id: "varieties", label: "栽培品種", hash: "varieties" },
  { id: "brewing", label: "淹れ方", hash: "brewing" },
  { id: "awards", label: "受賞歴", hash: "awards" },
  { id: "media", label: "掲載雑誌", hash: "media" },
  { id: "essay", label: "ひとりごと", hash: "essay" },
  { id: "contact", label: "お問合せ", hash: "contact" },
];

const TEA_PRODUCTS = [
  { name: "極上手もみ茶", sub: "Gokujo Temomi-cha", desc: "一人の茶師が一日かけて作れるのは、たったの300g。日本全国で年間に数kgしか生産されない究極のお茶。", accent: "#5B7A3A", kanji: "揉", hash: "temomi", img: IMG.temomi },
  { name: "微発酵煎茶", sub: "Bihakkou Sencha", desc: "独自開発の紫外線照射芳香システム【UVT-HIRUMA】により、花香・果実香を纏わせた唯一無二のお茶。", accent: "#8B6914", kanji: "香", hash: "bihakkou", img: IMG.bihakkou },
  { name: "半発酵茶", sub: "Han-hakkou-cha", desc: "台湾で研修を受け習得した本格的な半発酵茶の製法。国産茶葉で作り上げる極茶人ならではの挑戦。", accent: "#A0522D", kanji: "醸", hash: "hanhakkou", img: IMG.hanhakkou },
  { name: "彩の国 品種茶", sub: "Sainokuni Hinshu-cha", desc: "ゆめわかば、ほくめい、ふくみどり、むさしかおり。埼玉県育成品種にこだわった深むし煎茶シリーズ。", accent: "#2E6B4F", kanji: "彩", hash: "varieties", img: IMG.varieties },
];

const PRODUCT_LIST = [
  { name: "てふてふ・かほり彩", category: "微発酵煎茶" },
  { name: "香美人", category: "微発酵煎茶" },
  { name: "茶花花茶", category: "微発酵煎茶" },
  { name: "大賞", category: "深蒸し煎茶" },
  { name: "ふみか", category: "深蒸し煎茶" },
  { name: "清花香", category: "微発酵煎茶" },
  { name: "甘味大臣", category: "深蒸し煎茶" },
  { name: "茶師気質", category: "深蒸し煎茶" },
  { name: "あっ茶り", category: "深蒸し煎茶" },
  { name: "まんま", category: "深蒸し煎茶" },
  { name: "よかんべ", category: "深蒸し煎茶" },
  { name: "つぶっ茶", category: "深蒸し煎茶" },
  { name: "骨っぽい奴", category: "深蒸し煎茶" },
  { name: "甘えん棒", category: "深蒸し煎茶" },
  { name: "こまっこい", category: "深蒸し煎茶" },
  { name: "抹茶入り玄米茶", category: "玄米茶" },
  { name: "パウダー茶", category: "粉末茶" },
];

const BREWING_STEPS = [
  { label: "こってり", temp: "60°C", time: "120秒", amount: "茶葉多め", desc: "旨味と甘みを最大限に引き出す濃厚な一杯", color: "#2E6B4F" },
  { label: "ほんのり", temp: "70°C", time: "90秒", amount: "標準", desc: "バランスの良い味わいで日常のお茶に最適", color: "#5B7A3A" },
  { label: "すっきり", temp: "80°C", time: "60秒", amount: "標準", desc: "爽やかな渋みが心地よい、食事のお供に", color: "#8B6914" },
  { label: "くっきり", temp: "90°C", time: "45秒", amount: "茶葉少なめ", desc: "力強い香りと味、目覚めの一杯に", color: "#A0522D" },
];

const AWARDS = [
  { year: "2006", event: "14th 全国手もみ茶品評会", result: "1等賞 3席" },
  { year: "2005", event: "13th 全国手もみ茶品評会", result: "1等賞 6席" },
  { year: "2004", event: "12th 全国手もみ茶品評会", result: "2等賞 11席" },
  { year: "2003", event: "11th 全国手もみ茶品評会", result: "1等賞 5席" },
  { year: "2002", event: "10th 全国手もみ茶品評会", result: "1等賞 5席" },
  { year: "2001", event: "9th 全国手もみ茶品評会", result: "2等賞 12席" },
  { year: "2000", event: "8th 全国手もみ茶品評会", result: "1等賞 2席 農産園芸局長賞" },
  { year: "2000", event: "54th 全国茶品評会", result: "1等賞 2席 農林水産大臣賞" },
  { year: "1999", event: "7th 全国手もみ茶品評会", result: "1等賞 5席" },
  { year: "1998", event: "6th 全国手もみ茶品評会", result: "3等賞 44席" },
  { year: "1998", event: "45th 狭山茶品評会", result: "1等 1席 農林水産大臣賞" },
  { year: "1995", event: "41st 狭山茶品評会", result: "1等 1席 農林水産大臣賞" },
  { year: "1991", event: "37th 狭山茶品評会", result: "1等 1席 農林水産大臣賞" },
  { year: "1990", event: "36th 狭山茶品評会", result: "1等賞 1席" },
  { year: "1988", event: "34th 狭山茶品評会", result: "1等賞 1席" },
  { year: "1987", event: "33rd 狭山茶品評会", result: "1等賞 4席" },
  { year: "1986", event: "32nd 狭山茶品評会", result: "1等賞 2席" },
  { year: "1985", event: "31st 狭山茶品評会", result: "1等賞 3席" },
  { year: "1984", event: "30th 狭山茶品評会", result: "1等賞 1席" },
  { year: "1983", event: "29th 狭山茶品評会", result: "1等賞 1席" },
  { year: "1981", event: "28th 狭山茶品評会", result: "1等賞 1席" },
  { year: "1992", event: "2nd 埼玉県茶業青年団 茶審査技術競技会", result: "1位" },
];

const MEDIA = [
  { title: "てんとう虫 5月号", publisher: "アダック", date: "2006.5", desc: "お薦めの煎茶コーナーで香美人が紹介される" },
  { title: "ティー＆コーヒー大図鑑", publisher: "講談社", date: "2005.11", desc: "手もみ茶の工程を園主と茶園の写真入で紹介される" },
  { title: "クロワッサン特大号", publisher: "マガジンハウス", date: "2005.11", desc: "本物の味をお取り寄せのコーナーで清花香が紹介される" },
  { title: "サライ増刊", publisher: "小学館", date: "2005.7", desc: "食のプロが選んだ美味取り寄せ帖で清花香が紹介される" },
  { title: "決定版 お茶の大図鑑", publisher: "主婦の友社", date: "2005.5", desc: "産地別お茶リストコーナーで茶師気質が紹介される" },
  { title: "お茶に強くなる 別冊家庭画報", publisher: "世界文化社", date: "2004.7", desc: "注目の日本茶8種のコーナーで清花香が紹介される" },
  { title: "一個人", publisher: "KKベストセラーズ", date: "2003.7", desc: "お茶の里巡り「狭山茶」のコーナーで個性的な製茶方法が紹介される" },
  { title: "家庭画報", publisher: "世界文化社", date: "2003.3", desc: "今年おいしい個性派煎茶8種のコーナーで清花香が紹介される" },
];

const VARIETIES = [
  { name: "やぶきた", reading: "Yabukita", desc: "日本茶の代表品種。深蒸し煎茶の主力として安定した品質のお茶を生み出す。" },
  { name: "ゆめわかば", reading: "Yumewakaba", desc: "埼玉県で育成された品種。爽やかな香りと明るい水色が特徴。" },
  { name: "ほくめい", reading: "Hokumei", desc: "萎凋香との相性が抜群。【香美人】の原料として使用。独特の花香を生む品種。" },
  { name: "ふくみどり", reading: "Fukumidori", desc: "深い緑色と豊かな味わいが特徴の埼玉県育成品種。" },
  { name: "むさしかおり", reading: "Musashikaori", desc: "名前の通り香りに優れた品種。埼玉の風土に合った個性豊かなお茶。" },
  { name: "さやまかおり", reading: "Sayamakaori", desc: "狭山地方で生まれた品種。【清花香】の原料として使用。強い香気が魅力。" },
];

/* ════════════════════════════════════════
   HOOKS
   ════════════════════════════════════════ */

function useHash() {
  const [hash, setHash] = useState("");
  useEffect(() => {
    setHash(window.location.hash.slice(1) || "");
    const onHash = () => setHash(window.location.hash.slice(1) || "");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return hash;
}

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, style: extraStyle = {} }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      ...extraStyle,
    }}>
      {children}
    </div>
  );
}

/* ════════════════════════════════════════
   SUB-COMPONENTS
   ════════════════════════════════════════ */

function PageHeader({ title, subtitle, kanji, img }) {
  return (
    <div style={{ ...s.pageHeader, minHeight: img ? 280 : undefined }}>
      {img && <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${img})`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.25 }} />}
      <div style={s.pageHeaderOverlay} />
      {kanji && <div style={s.pageHeaderKanji}>{kanji}</div>}
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={s.pageHeaderSub}>{subtitle}</div>
        <h1 style={s.pageHeaderTitle}>{title}</h1>
      </div>
    </div>
  );
}

function BackLink({ label = "← ホームに戻る" }) {
  return (
    <a href="#" style={s.backLink}>{label}</a>
  );
}

function SectionDivider() {
  return <div style={s.sectionDivider}><div style={s.sectionDividerLine} /></div>;
}

function ShopCTA() {
  return (
    <div style={s.shopCTA}>
      <a href="http://gokuchaninshop.cart.fc2.com/" target="_blank" rel="noopener noreferrer" style={s.shopCTABtn}>
        商品一覧・ご購入はこちら →
      </a>
    </div>
  );
}

/* ════════════════════════════════════════
   PAGE: HOME
   ════════════════════════════════════════ */

function HomePage() {
  const [scrollY, setScrollY] = useState(0);
  const [activeBrew, setActiveBrew] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── HERO ── */}
      <section style={s.hero}>
        <div style={{ ...s.heroImg, backgroundImage: `url(${IMG.hero})` }} />
        <div style={s.heroOverlay} />
        <div style={{ ...s.heroPattern, transform: `translateY(${scrollY * 0.12}px)` }} />
        <div style={s.heroContent}>
          <div style={s.heroVertLine} />
          <h1 style={s.heroTitleMain}>極茶人</h1>
          <p style={s.heroRuby}>ごくちゃにん</p>
          <div style={s.heroDivider} />
          <p style={s.heroTagline}>茶心が知りたい</p>
          <p style={s.heroSubtext}>茶工房 比留間園 ── 狭山茶の産地から</p>
        </div>
        <div style={{ ...s.fk, fontSize: 200, top: "10%", left: "5%", transform: `translateY(${scrollY * -0.08}px)` }}>茶</div>
        <div style={{ ...s.fk, fontSize: 140, bottom: "15%", right: "8%", transform: `translateY(${scrollY * -0.12}px)` }}>香</div>
        <div style={{ ...s.fk, fontSize: 170, top: "50%", right: "25%", transform: `translateY(${scrollY * -0.06}px)` }}>心</div>
      </section>

      {/* ── INTRO ── */}
      <section style={s.sec}>
        <div style={s.ctr}>
          <FadeIn>
            <p style={{ ...s.bodyLg, textAlign: "center", maxWidth: 760, margin: "0 auto" }}>
              狭山茶の中心産地である入間市、見渡す限りの広大な茶園が広がる金子台地において、
              究極の日本茶を追い求める茶師がいます。
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── ABOUT BRIEF ── */}
      <section style={s.secWarm}>
        <div style={s.ctr}>
          <FadeIn>
            <div style={s.label}>PROFILE</div>
            <h2 style={s.h2}>茶人紹介</h2>
          </FadeIn>
          <div style={s.aboutGrid} data-agrid="">
            <FadeIn delay={0.15}>
              <div style={s.portraitFrame}>
                <img src={IMG.oldProfile} alt="比留間嘉章" style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }} onError={(e) => { e.target.style.display = "none"; }} />
                <span style={{ ...s.portraitKanji, position: "relative" }}>極</span>
                <span style={{ ...s.portraitCaption, position: "relative" }}>比留間 嘉章</span>
                <div style={s.portraitAccent} />
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div>
                <h3 style={s.aboutName}>比留間 嘉章<span style={s.aboutNameEn}>Yoshiaki Hiruma</span></h3>
                <p style={s.aboutNick}>── 極上茶仕掛け人</p>
                <p style={s.body}>
                  TV東京「TVチャンピオン お茶通選手権」出場の際にいただいた「極上茶仕掛け人」というニックネーム。
                  いつしか周りから「極茶人」と呼ばれるようになりました。
                </p>
                <p style={s.body}>
                  1977年、茶の世界に入り深蒸し茶の製造を中心に、手もみ茶・微発酵煎茶の製造にも取り組む。
                  栽培から製茶、販売まで一貫して手がけ、狭山茶の魅力を発信し続けています。
                </p>
                <div style={s.quals}>
                  {[
                    "全国手もみ茶振興会 前会長",
                    "手もみ製茶技術 最高位「十段」「茶聖」「茶匠」",
                    "日本茶インストラクター（01-0213）",
                    "農林水産大臣賞 7回受賞",
                    "世界緑茶協会 O-CHAパイオニア賞",
                  ].map((q) => (
                    <div key={q} style={s.qualItem}><span style={s.qualDot}>◉</span>{q}</div>
                  ))}
                </div>
                <a href="#profile" style={s.moreLink}>詳しく見る →</a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY ── */}
      <section style={s.secDark}>
        <div style={s.darkOverlay} />
        <div style={s.ctr}>
          <FadeIn><div style={{ ...s.label, color: "rgba(255,255,255,.45)" }}>PHILOSOPHY</div><h2 style={{ ...s.h2, color: "#fff" }}>茶の哲学</h2></FadeIn>
          <div style={s.philGrid}>
            {[
              { n: "壱", t: "手もみ茶", d: "煎茶の世界の源泉。連綿と受け継がれてきた技術、すべてはここから始まる。一人の茶師が一日かけて作れるのは、たったの300g。" },
              { n: "弐", t: "萎凋香", d: "蒸し製の煎茶にも烏龍茶のような花香・果実香がほしい。20年の研究の末に生まれた紫外線照射芳香システム【UVT-HIRUMA】。" },
              { n: "参", t: "品種茶", d: "埼玉の風土が育んだ個性豊かな品種たち。地元産にこだわり、彩の国生まれの品種茶シリーズを展開。" },
            ].map((p, i) => (
              <FadeIn key={p.n} delay={i * 0.15}>
                <div style={s.philCard}>
                  <div style={s.philNum}>{p.n}</div>
                  <h3 style={s.philHead}>{p.t}</h3>
                  <p style={s.philText}>{p.d}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.45}>
            <blockquote style={s.bigQuote}>
              <span style={{ color: C.gold }}>「</span>茶心が知りたい<span style={{ color: C.gold }}>」</span>
            </blockquote>
          </FadeIn>
        </div>
      </section>

      {/* ── TEA FIELD PHOTO ── */}
      <div style={{ position: "relative", height: 300, overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${IMG.teaField})`, backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(26,42,21,0.4), rgba(26,42,21,0.6))", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p style={{ fontFamily: F.s, fontSize: "clamp(18px,3vw,28px)", color: "#fff", letterSpacing: 8, textAlign: "center", opacity: 0.9 }}>一碗のお茶に、心をこめて</p>
        </div>
      </div>

      {/* ── PRODUCTS ── */}
      <section style={s.sec}>
        <div style={s.ctr}>
          <FadeIn><div style={s.label}>PRODUCTS</div><h2 style={s.h2}>茶の世界</h2></FadeIn>
          <div style={s.prodGrid}>
            {TEA_PRODUCTS.map((p, i) => (
              <FadeIn key={p.name} delay={i * 0.1}>
                <a href={`#${p.hash}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                  <div style={s.prodCard} className="prod-card">
                    <div style={{ ...s.prodAccent, backgroundColor: p.accent }} />
                    <div style={{ width: "100%", height: 160, overflow: "hidden", borderRadius: "4px 4px 0 0", marginBottom: 16 }}>
                      <img src={p.img} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div style={{ padding: "0 24px 28px" }}>
                      <div style={{ ...s.prodKanji, color: p.accent }}>{p.kanji}</div>
                      <h3 style={s.prodName}>{p.name}</h3>
                      <p style={s.prodSub}>{p.sub}</p>
                      <p style={s.prodDesc}>{p.desc}</p>
                      <div style={{ ...s.prodLine, backgroundColor: p.accent }} />
                      <span style={{ ...s.moreLink, marginTop: 12, display: "inline-block", fontSize: 12 }}>詳しく見る →</span>
                    </div>
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>
          <ShopCTA />
        </div>
      </section>

      {/* ── BREWING ── */}
      <section style={s.secWarm}>
        <div style={s.ctr}>
          <FadeIn><div style={s.label}>HOW TO BREW</div><h2 style={s.h2}>お薦めの淹れ方</h2></FadeIn>
          <FadeIn delay={0.1}>
            <p style={{ ...s.body, textAlign: "center", maxWidth: 560, margin: "0 auto 40px" }}>
              同じ茶葉でも、温度・時間・量で全く違う味わいに。お好みのスタイルをお選びください。
            </p>
            <div style={s.brewTabs}>
              {BREWING_STEPS.map((b, i) => (
                <button key={b.label} onClick={() => setActiveBrew(i)}
                  style={{ ...s.brewTab, ...(activeBrew === i ? { backgroundColor: C.green, color: "#fff", borderColor: C.green } : {}) }}>
                  {b.label}
                </button>
              ))}
            </div>
            <div style={s.brewBox}>
              <div style={s.brewStats}>
                <div style={s.brewStat}><div style={s.brewVal}>{BREWING_STEPS[activeBrew].temp}</div><div style={s.brewLbl}>お湯の温度</div></div>
                <div style={s.brewDivider} />
                <div style={s.brewStat}><div style={s.brewVal}>{BREWING_STEPS[activeBrew].time}</div><div style={s.brewLbl}>抽出時間</div></div>
                <div style={s.brewDivider} />
                <div style={s.brewStat}><div style={s.brewVal}>{BREWING_STEPS[activeBrew].amount}</div><div style={s.brewLbl}>茶葉の量</div></div>
              </div>
              <p style={{ textAlign: "center", fontSize: 15, color: C.tl, letterSpacing: 2, fontFamily: F.s }}>{BREWING_STEPS[activeBrew].desc}</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <a href="#brewing" style={{ ...s.moreLink, display: "block", textAlign: "center", marginTop: 32 }}>全商品の淹れ方を見る →</a>
          </FadeIn>
        </div>
      </section>

      {/* ── AWARDS BRIEF ── */}
      <section style={s.sec}>
        <div style={s.ctr}>
          <FadeIn><div style={s.label}>AWARDS</div><h2 style={s.h2}>受賞歴</h2></FadeIn>
          <div style={s.awardHighlights}>
            {[
              { icon: "🏆", t: "農林水産大臣賞", v: "7回受賞" },
              { icon: "🥇", t: "全国手もみ茶品評会", v: "1等賞 複数回" },
              { icon: "🍵", t: "手もみ茶 最高位", v: "茶聖・十段・茶匠" },
              { icon: "🌍", t: "世界緑茶協会", v: "O-CHAパイオニア賞" },
            ].map((a, i) => (
              <FadeIn key={a.t} delay={i * 0.1}>
                <div style={s.awardHCard}>
                  <div style={{ fontSize: 36, marginBottom: 12 }}>{a.icon}</div>
                  <div style={s.awardHTitle}>{a.t}</div>
                  <div style={s.awardHVal}>{a.v}</div>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.4}><a href="#awards" style={{ ...s.moreLink, display: "block", textAlign: "center", marginTop: 24 }}>全受賞歴を見る →</a></FadeIn>
        </div>
      </section>

      {/* ── TEA CEREMONY PHOTO ── */}
      <div style={{ position: "relative", height: 250, overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${IMG.brewing})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(26,42,21,0.3), rgba(26,42,21,0.5))" }} />
      </div>

      {/* ── MEDIA BRIEF ── */}
      <section style={s.secWarm}>
        <div style={s.ctr}>
          <FadeIn><div style={s.label}>MEDIA</div><h2 style={s.h2}>掲載雑誌</h2></FadeIn>
          <FadeIn delay={0.1}>
            <p style={{ ...s.body, textAlign: "center", maxWidth: 560, margin: "0 auto 40px" }}>
              数々の雑誌・新聞で極茶人のお茶が紹介されています。
            </p>
            <div style={s.mediaGrid}>
              {MEDIA.slice(0, 4).map((m, i) => (
                <div key={m.title} style={s.mediaCard}>
                  <div style={s.mediaDate}>{m.date}</div>
                  <div style={s.mediaTitle}>{m.title}</div>
                  <div style={s.mediaPub}>{m.publisher}</div>
                </div>
              ))}
            </div>
            <a href="#media" style={{ ...s.moreLink, display: "block", textAlign: "center", marginTop: 32 }}>すべての掲載情報を見る →</a>
          </FadeIn>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section style={s.secDark}>
        <div style={s.darkOverlay} />
        <div style={s.ctr}>
          <FadeIn><div style={{ ...s.label, color: "rgba(255,255,255,.45)" }}>CONTACT</div><h2 style={{ ...s.h2, color: "#fff" }}>お問合せ</h2></FadeIn>
          <FadeIn delay={0.15}>
            <div style={s.contactCard}>
              <h3 style={s.contactName}>茶工房 比留間園</h3>
              <p style={s.contactAddr}>〒358-0042 埼玉県入間市上谷ヶ貫616</p>
              <div style={s.contactLinks}>
                <a href="mailto:hirumaen@ictv.ne.jp" style={s.contactLink}>✉ hirumaen@ictv.ne.jp</a>
                <span style={s.contactLink}>☎ 0120-514188（フリーダイヤル）</span>
                <a href="http://gokuchaninshop.cart.fc2.com/" target="_blank" rel="noopener noreferrer" style={s.contactLink}>🛒 オンラインショップ</a>
                <a href="http://blog.goo.ne.jp/gokuchanin" target="_blank" rel="noopener noreferrer" style={s.contactLink}>📝 ブログ</a>
              </div>
              <div style={s.contactHours}>営業時間：10:00 - 18:00（水曜定休）</div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}

/* ════════════════════════════════════════
   PAGE: PROFILE
   ════════════════════════════════════════ */
function ProfilePage() {
  return (
    <>
      <PageHeader title="茶人紹介" subtitle="PROFILE" kanji="極" img={IMG.profile} />
      <section style={s.sec}><div style={s.ctr}>
        <BackLink />
        <FadeIn>
          <h3 style={s.subHead}>比留間 嘉章 <span style={s.subHeadEn}>Yoshiaki Hiruma</span></h3>
          <p style={s.aboutNick}>── 極上茶仕掛け人 ──</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p style={s.body}>
            TV東京「TVチャンピオン お茶通選手権」出場の際にいただいた「極上茶仕掛け人」というニックネーム。
            いつしか周りから「極茶人」と呼ばれるようになり・・・本人も結構気に入っている？？？
          </p>
          <p style={s.body}>ライフワークのテーマ：手もみ茶・萎凋香・埼玉の品種茶</p>
          <p style={s.body}>
            2006年7月15日、OZONE夏の大茶会でのステージイベント〔極上手もみ茶を楽しむ〕にて、
            2005年度日本一に輝く111万円の手もみ茶を自ら作り上げた究極の淹茶法【八重奏】（やえのかなで）にて披露。
          </p>
          <p style={s.body}>
            日本茶インストラクターとしてもセミナー講師・講演会などで活動。
            1977年、茶の世界に入り深蒸し茶の製造を中心に、手もみ茶・微発酵煎茶の製造にも取り組む。
            2003年からは国産半発酵茶にも挑戦。台湾で研修を受け本格的半発酵茶を作る。
            また、オリジナル萎凋機による萎凋香など個性的な香りのお茶で注目されており、雑誌、新聞に掲載される機会も多い。
          </p>
        </FadeIn>
        <SectionDivider />
        <FadeIn delay={0.2}>
          <h4 style={s.h4}>経歴・資格</h4>
          <div style={s.quals}>
            {[
              "1957年生",
              "全国手もみ茶振興会 前会長",
              "埼玉県手揉茶保存会長",
              "狭山火入れ保存会長",
              "全国手もみ茶振興会認定「茶匠」「十段」「茶聖」",
              "日本茶業中央会認定 日本茶インストラクター 01-0213",
              "農林水産大臣賞 7回受賞",
              "世界緑茶協会 O-CHAパイオニア賞 受賞",
            ].map((q) => <div key={q} style={s.qualItem}><span style={s.qualDot}>◉</span>{q}</div>)}
          </div>
        </FadeIn>
      </div></section>
    </>
  );
}

/* ════════════════════════════════════════
   PAGE: TEMOMI
   ════════════════════════════════════════ */
function TemomiPage() {
  return (
    <>
      <PageHeader title="極上手もみ茶" subtitle="TEMOMI-CHA" kanji="揉" img={IMG.temomi} />
      <section style={s.sec}><div style={s.ctr}>
        <BackLink />
        <FadeIn>
          <p style={s.bodyLg}>
            極茶人が【極上手もみ茶】と認めるだけのクォリティーを持つお茶は、日本全国で年間に数kgしか生産されない。
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p style={s.body}>
            その全てが集まるのが「全国手もみ茶品評会」だ。毎年全国から150〜200点の出品があり、
            産地と茶師の名誉をかけて競い合う。この品評会に自ら掲げる最低の目標は20位以内！
          </p>
          <p style={s.body}>
            年によっては産地ごとの条件の良し悪しがあり、良い製品を作ることが難しいということがある。
            それ故どんな状況であっても、この順位にいることは並大抵のことではないし、
            実際に、それが出来ている人は本の一握り・・・片手で足りてしまう・・・
          </p>
          <p style={s.body}>
            一人の茶師が1日かけて出来るお茶は、たったの300g・・・
            1点（450g）出品するのには2日揉まなければならない・・・
            それほどの思いまでして出品茶を揉み続ける理由・・・
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <blockquote style={{ ...s.bigQuote, fontSize: 28, color: C.green }}>
            ・・・茶心が知りたい・・・
          </blockquote>
        </FadeIn>
        <FadeIn delay={0.22}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, margin: "40px 0", borderRadius: 8, overflow: "hidden" }} data-agrid>
            <img src={IMG.driedTea} alt="手もみ茶 茶葉" style={{ width: "100%", height: 200, objectFit: "cover", borderRadius: 8 }} />
            <img src={IMG.teaLeaf} alt="茶葉 手摘み" style={{ width: "100%", height: 200, objectFit: "cover", borderRadius: 8 }} />
          </div>
        </FadeIn>
        <SectionDivider />
        <FadeIn delay={0.25}>
          <p style={s.body}>
            極茶人のライフワークのテーマのひとつ「手もみ茶」──それは煎茶の世界の源泉。
            連綿と受け継がれ、そして機械製茶へと成熟してきた技術も、すべてはここから始まる・・・
          </p>
          <p style={s.body}>
            手もみ茶は、ホイロと呼ばれる和紙張りの作業台の上で、人の手だけを道具として茶を揉み作られるお茶です。
            6時間以上かけ製造されるこのお茶は、一度にたった300g程度しかできません。
          </p>
          <p style={s.body}>
            揉み方にも順番があります──回転揉み、揉み切り、でんぐり揉み、こくり揉み。
            葉の温度と湿度を手で感じながら揉み方を変えていきます。
            手の感触だけでなく、色や匂いや重さを感じながら、丁寧に揉んでいく。
            この感覚が身につかないと、いい手もみ茶はできないのです。
          </p>
        </FadeIn>
        <ShopCTA />
      </div></section>
    </>
  );
}

/* ════════════════════════════════════════
   PAGE: BIHAKKOU
   ════════════════════════════════════════ */
function BihakkouPage() {
  return (
    <>
      <PageHeader title="微発酵煎茶" subtitle="BIHAKKOU SENCHA" kanji="香" img={IMG.bihakkou} />
      <section style={s.sec}><div style={s.ctr}>
        <BackLink />
        <FadeIn>
          <h3 style={s.subHead}>紫外線照射芳香システム【UVT-HIRUMA】</h3>
          <p style={s.bodyLg}>
            極茶人のライフワークのテーマのひとつ、萎凋香。
            蒸し製の煎茶にも烏龍茶のような花香や果実香がほしい！！
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p style={s.body}>
            20年ほど前から研究を続け、1998年から本格的に稼動しているUVT-HIRUMAは
            生葉に紫外線を照射し、お茶の香りを引き出すオリジナルのシステムです。
          </p>
          <p style={s.body}>
            茶に含まれる香気成分の中でも、萎凋香として感じる花香や果実香は糖と結合した安定的な形で存在しているために、
            このままでは揮発しないので我々が香りを感じることはできません。
          </p>
          <p style={s.body}>
            ウーロン茶の製造では生葉を陽に干したり静置して水分蒸散を進めたり、
            傷をつけるといった、さまざまなストレスをたくみに与えることによって酵素を働かせ、
            茶に含まれる花香や果実香に関係するリナロールやゲラニオールといった香気成分が揮発するようにしてから加工します。
          </p>
          <p style={s.body}>
            本来、緑茶では酵素が出来るだけ働かないように、速やかに蒸すことから製茶が始まりますが、
            極茶人は摘んできた生葉を日に干してから製茶していました。しかし天候をはじめ、
            さまざまな条件に左右され安定的に生産することが難しく、
            これを解決するための手段として、赤外線や遠赤外線を使った萎凋機の試験も行いました。
          </p>
          <p style={s.body}>
            それらはことごとく失敗に終わったのですが、太陽光線に含まれる2つの光線を試したことで
            紫外線に辿り着くことができたのです。（アドバイスや応援をしてくれた仲間に感謝！！）
          </p>
          <p style={s.body}>
            紫外線を使った萎凋は天候に左右されることなく高いクォリティーをもったお茶を
            安定的に生産することを可能にしてくれました。極茶人のお茶をもっとも個性的にしてくれるこのシステムを、
            さらにパワーアップするために、日々研究を続けています。
          </p>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div style={{ margin: "40px 0", borderRadius: 8, overflow: "hidden" }}>
            <img src={IMG.teaField} alt="茶畑" style={{ width: "100%", height: 240, objectFit: "cover", borderRadius: 8 }} />
          </div>
        </FadeIn>
        <SectionDivider />
        <FadeIn delay={0.2}>
          <h4 style={s.h4}>萎凋香を活かした商品</h4>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginTop: 24 }}>
            {[
              { name: "香美人", variety: "ほくめい", desc: "花のような華やかな萎凋香" },
              { name: "清花香", variety: "さやまかおり", desc: "清らかで爽やかな香り" },
              { name: "てふてふ・かほり彩", variety: "ブレンド", desc: "蝶のように軽やかな香りの彩り" },
            ].map((p) => (
              <div key={p.name} style={{ padding: 24, background: "#fff", borderRadius: 4, border: `1px solid ${C.bd}` }}>
                <div style={{ fontFamily: F.s, fontSize: 18, fontWeight: 700, letterSpacing: 3, color: C.dk, marginBottom: 4 }}>{p.name}</div>
                <div style={{ fontSize: 12, color: C.gold, letterSpacing: 2, marginBottom: 8 }}>品種：{p.variety}</div>
                <div style={{ fontSize: 13, color: C.tl, lineHeight: 1.8 }}>{p.desc}</div>
              </div>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={0.25}>
          <p style={{ fontSize: 11, color: C.tl, marginTop: 32, lineHeight: 2 }}>
            ＊参考文献：木下朋美 坂田完三「東方美人茶の香りの秘密」『香料』第299号（2006.3）別刷 pp113-120
          </p>
        </FadeIn>
        <ShopCTA />
      </div></section>
    </>
  );
}

/* ════════════════════════════════════════
   PAGE: HANHAKKOU
   ════════════════════════════════════════ */
function HanhakkouPage() {
  return (
    <>
      <PageHeader title="半発酵茶" subtitle="HAN-HAKKOU-CHA" kanji="醸" img={IMG.hanhakkou} />
      <section style={s.sec}><div style={s.ctr}>
        <BackLink />
        <FadeIn>
          <p style={s.bodyLg}>
            2003年からは国産半発酵茶にも挑戦。台湾で研修を受け、本格的な半発酵茶の製法を習得しました。
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p style={s.body}>
            萎凋を丁寧に行って・・・はたして半発酵茶（烏龍茶）は出来るのだろうか？ 
            「日本の品種で半発酵茶は出来ないのでは・・・？」と、2002年、2006年と台湾へ半発酵茶の研修に出かけ、
            先生方からは製茶のことだけでなく品種のことに至るまで色々と教えていただきました。
          </p>
          <p style={s.body}>
            2004年にはティーフェスティバルのコンテストで優秀な成績を収め、
            台湾のような風味を日本の品種と技術で実現できるようになりました。
            国産の品種で作る本格的な半発酵茶の魅力を、一人でも多くの方に味わっていただきたい。
          </p>
          <p style={s.body}>
            ウーロン茶・烏龍茶・包種茶など、とても個性豊かで魅力的なお茶です。
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <h4 style={s.h4}>半発酵茶シリーズ</h4>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginTop: 24 }}>
            {[
              { name: "てふてふ", type: "包種茶タイプ", desc: "2004年 ティーフェスティバルコンテスト受賞" },
              { name: "蜜香紅茶", type: "紅茶タイプ", desc: "UVT-HIRUMAを活かした蜜のような甘い香り" },
              { name: "烏龍番茶", type: "烏龍茶タイプ", desc: "園主のきまぐれで生まれた夏の味" },
            ].map((p) => (
              <div key={p.name} style={{ padding: 24, background: "#fff", borderRadius: 4, border: `1px solid ${C.bd}` }}>
                <div style={{ fontFamily: F.s, fontSize: 18, fontWeight: 700, letterSpacing: 3, color: C.dk, marginBottom: 4 }}>{p.name}</div>
                <div style={{ fontSize: 12, color: "#A0522D", letterSpacing: 2, marginBottom: 8 }}>{p.type}</div>
                <div style={{ fontSize: 13, color: C.tl, lineHeight: 1.8 }}>{p.desc}</div>
              </div>
            ))}
          </div>
        </FadeIn>
        <ShopCTA />
      </div></section>
    </>
  );
}

/* ════════════════════════════════════════
   PAGE: VARIETIES
   ════════════════════════════════════════ */
function VarietiesPage() {
  return (
    <>
      <PageHeader title="栽培品種" subtitle="VARIETIES" kanji="彩" img={IMG.varieties} />
      <section style={s.sec}><div style={s.ctr}>
        <BackLink />
        <FadeIn>
          <p style={s.bodyLg}>
            地元産にこだわり、埼玉県で育成された品種を中心に栽培。
            「彩の国生まれの品種茶」シリーズとして、それぞれの品種の個性を活かしたお茶を作っています。
          </p>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24, marginTop: 40 }}>
          {VARIETIES.map((v, i) => (
            <FadeIn key={v.name} delay={i * 0.08}>
              <div style={{ padding: 32, background: "#fff", borderRadius: 4, border: `1px solid ${C.bd}`, borderLeft: `3px solid ${C.green}` }}>
                <div style={{ fontFamily: F.s, fontSize: 22, fontWeight: 700, letterSpacing: 4, color: C.dk }}>{v.name}</div>
                <div style={{ fontSize: 11, color: C.tl, letterSpacing: 3, marginBottom: 12 }}>{v.reading}</div>
                <p style={{ fontSize: 14, color: C.tl, lineHeight: 2 }}>{v.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        <ShopCTA />
      </div></section>
    </>
  );
}

/* ════════════════════════════════════════
   PAGE: BREWING
   ════════════════════════════════════════ */
function BrewingPage() {
  const [active, setActive] = useState(0);
  return (
    <>
      <PageHeader title="お薦めの淹れ方" subtitle="HOW TO BREW" kanji="淹" img={IMG.brewing} />
      <section style={s.sec}><div style={s.ctr}>
        <BackLink />
        <FadeIn>
          <p style={s.bodyLg}>同じ茶葉でも、温度・時間・量で全く違う味わいに。4つのスタイルからお好みをお選びください。</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div style={s.brewTabs}>
            {BREWING_STEPS.map((b, i) => (
              <button key={b.label} onClick={() => setActive(i)}
                style={{ ...s.brewTab, ...(active === i ? { backgroundColor: b.color, color: "#fff", borderColor: b.color } : {}) }}>
                {b.label}
              </button>
            ))}
          </div>
          <div style={s.brewBox}>
            <div style={s.brewStats}>
              <div style={s.brewStat}><div style={{ ...s.brewVal, color: BREWING_STEPS[active].color }}>{BREWING_STEPS[active].temp}</div><div style={s.brewLbl}>お湯の温度</div></div>
              <div style={s.brewDivider} />
              <div style={s.brewStat}><div style={{ ...s.brewVal, color: BREWING_STEPS[active].color }}>{BREWING_STEPS[active].time}</div><div style={s.brewLbl}>抽出時間</div></div>
              <div style={s.brewDivider} />
              <div style={s.brewStat}><div style={{ ...s.brewVal, color: BREWING_STEPS[active].color }}>{BREWING_STEPS[active].amount}</div><div style={s.brewLbl}>茶葉の量</div></div>
            </div>
            <p style={{ textAlign: "center", fontSize: 16, color: C.tl, letterSpacing: 2, fontFamily: F.s }}>{BREWING_STEPS[active].desc}</p>
          </div>
        </FadeIn>
        <SectionDivider />
        <FadeIn delay={0.2}>
          <h4 style={s.h4}>商品一覧</h4>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12, marginTop: 24 }}>
            {PRODUCT_LIST.map((p) => (
              <div key={p.name} style={{ padding: "16px 20px", background: "#fff", borderRadius: 4, border: `1px solid ${C.bd}` }}>
                <div style={{ fontFamily: F.s, fontSize: 15, fontWeight: 600, letterSpacing: 2, color: C.dk }}>{p.name}</div>
                <div style={{ fontSize: 11, color: C.tl, letterSpacing: 1 }}>{p.category}</div>
              </div>
            ))}
          </div>
        </FadeIn>
        <ShopCTA />
      </div></section>
    </>
  );
}

/* ════════════════════════════════════════
   PAGE: AWARDS
   ════════════════════════════════════════ */
function AwardsPage() {
  return (
    <>
      <PageHeader title="受賞歴" subtitle="AWARDS" kanji="賞" img={IMG.awards} />
      <section style={s.sec}><div style={s.ctr}>
        <BackLink />
        <FadeIn>
          <p style={s.bodyLg}>1981年から続く、数々の受賞の記録。</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div style={{ marginTop: 32 }}>
            {AWARDS.map((a, i) => (
              <div key={`${a.year}-${a.event}`} style={{
                display: "grid", gridTemplateColumns: "80px 1fr auto",
                gap: 16, padding: "16px 0", borderBottom: `1px solid ${C.bd}`,
                alignItems: "center",
              }}>
                <div style={{ fontFamily: F.s, fontSize: 15, fontWeight: 700, color: C.green }}>{a.year}</div>
                <div style={{ fontSize: 14, color: C.dk, letterSpacing: 1 }}>{a.event}</div>
                <div style={{
                  fontSize: 13, color: a.result.includes("大臣賞") ? "#B8860B" : C.tl,
                  fontWeight: a.result.includes("大臣賞") ? 700 : 400,
                  letterSpacing: 1, textAlign: "right",
                }}>{a.result}</div>
              </div>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p style={{ fontSize: 12, color: C.tl, marginTop: 32, textAlign: "center", letterSpacing: 2 }}>
            1992年 2nd 埼玉県茶業青年団 茶審査技術競技会 1位 ／ 9th 全国茶生産青年団 茶審査技術競技会 6位
          </p>
        </FadeIn>
      </div></section>
    </>
  );
}

/* ════════════════════════════════════════
   PAGE: MEDIA
   ════════════════════════════════════════ */
function MediaPage() {
  return (
    <>
      <PageHeader title="掲載雑誌" subtitle="MEDIA" kanji="誌" img={IMG.teaSet} />
      <section style={s.sec}><div style={s.ctr}>
        <BackLink />
        <FadeIn><p style={s.bodyLg}>極茶人のお茶は、数々の雑誌・新聞で紹介されています。</p></FadeIn>
        <div style={{ marginTop: 32 }}>
          {MEDIA.map((m, i) => (
            <FadeIn key={m.title} delay={i * 0.06}>
              <div style={{
                display: "grid", gridTemplateColumns: "100px 1fr",
                gap: 24, padding: "24px 0", borderBottom: `1px solid ${C.bd}`,
              }}>
                <div>
                  <div style={{ fontFamily: F.s, fontSize: 14, fontWeight: 700, color: C.green, letterSpacing: 1 }}>{m.date}</div>
                  <div style={{ fontSize: 11, color: C.tl }}>{m.publisher}</div>
                </div>
                <div>
                  <div style={{ fontFamily: F.s, fontSize: 16, fontWeight: 600, letterSpacing: 2, color: C.dk, marginBottom: 4 }}>{m.title}</div>
                  <div style={{ fontSize: 13, color: C.tl, lineHeight: 1.8 }}>{m.desc}</div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div></section>
    </>
  );
}

/* ════════════════════════════════════════
   PAGE: ESSAY
   ════════════════════════════════════════ */
function EssayPage() {
  return (
    <>
      <PageHeader title="ひとりごと" subtitle="ESSAY" kanji="語" img={IMG.teaField} />
      <section style={s.sec}><div style={s.ctr}>
        <BackLink />
        <FadeIn>
          <p style={s.bodyLg}>極茶人が綴る、お茶への想い。</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div style={{ marginTop: 32 }}>
            {[
              { num: "十一煎目", title: "微発酵というジャンル", desc: "蒸し製の煎茶に萎凋香を纏わせるという試みの軌跡と、そこから生まれた新たなジャンルについて。" },
              { num: "十煎目", title: "手もみ茶への想い", desc: "なぜ手もみ茶を揉み続けるのか。茶心が知りたいという永遠のテーマ。" },
              { num: "九煎目", title: "品種の魅力", desc: "それぞれの品種が持つ個性と可能性。埼玉の風土が育む味わい。" },
              { num: "八煎目", title: "狭山茶のこれから", desc: "伝統を大切にしながらも、斬新さを求めて。狭山茶の未来を考える。" },
            ].map((e, i) => (
              <div key={e.num} style={{
                padding: 32, marginBottom: 16,
                background: i % 2 === 0 ? "#fff" : C.warm,
                borderRadius: 4, border: `1px solid ${C.bd}`,
              }}>
                <div style={{ fontSize: 12, color: C.gold, letterSpacing: 4, marginBottom: 4, fontFamily: F.s }}>{e.num}</div>
                <div style={{ fontFamily: F.s, fontSize: 20, fontWeight: 700, letterSpacing: 3, color: C.dk, marginBottom: 8 }}>{e.title}</div>
                <p style={{ fontSize: 14, color: C.tl, lineHeight: 2 }}>{e.desc}</p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12, color: C.tl, marginTop: 24, textAlign: "center", letterSpacing: 2 }}>
            ※ 旧サイトのエッセイをリニューアル中です。順次公開予定。
          </p>
        </FadeIn>
      </div></section>
    </>
  );
}

/* ════════════════════════════════════════
   PAGE: CONTACT
   ════════════════════════════════════════ */
function ContactPage() {
  return (
    <>
      <PageHeader title="お問合せ" subtitle="CONTACT" kanji="縁" img={IMG.teaCup} />
      <section style={s.sec}><div style={s.ctr}>
        <BackLink />
        <FadeIn>
          <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
            <h3 style={{ fontFamily: F.s, fontSize: 28, fontWeight: 700, letterSpacing: 6, color: C.dk, marginBottom: 8 }}>茶工房 比留間園</h3>
            <p style={{ fontSize: 14, color: C.tl, letterSpacing: 2, marginBottom: 8 }}>代表：比留間 嘉章</p>
            <p style={{ fontSize: 14, color: C.tl, letterSpacing: 2, marginBottom: 32 }}>〒358-0042 埼玉県入間市上谷ヶ貫616</p>

            <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center", marginBottom: 32 }}>
              <div style={{ padding: "20px 32px", background: C.warm, borderRadius: 4, width: "100%", maxWidth: 400 }}>
                <div style={{ fontSize: 12, color: C.tl, letterSpacing: 2, marginBottom: 4 }}>フリーダイヤル</div>
                <div style={{ fontFamily: F.s, fontSize: 24, fontWeight: 700, color: C.green, letterSpacing: 3 }}>0120-514188</div>
              </div>
              <div style={{ padding: "20px 32px", background: C.warm, borderRadius: 4, width: "100%", maxWidth: 400 }}>
                <div style={{ fontSize: 12, color: C.tl, letterSpacing: 2, marginBottom: 4 }}>メール</div>
                <a href="mailto:hirumaen@ictv.ne.jp" style={{ fontFamily: F.s, fontSize: 16, color: C.green, textDecoration: "none", letterSpacing: 2 }}>
                  hirumaen@ictv.ne.jp
                </a>
              </div>
            </div>

            <div style={{ padding: 24, border: `1px solid ${C.bd}`, borderRadius: 4, marginBottom: 32 }}>
              <div style={{ fontSize: 13, color: C.dk, letterSpacing: 2, marginBottom: 8 }}>営業時間</div>
              <div style={{ fontSize: 15, color: C.tl, letterSpacing: 2 }}>10:00 〜 18:00</div>
              <div style={{ fontSize: 12, color: C.tl, marginTop: 4 }}>水曜定休（臨時休業の場合あり）</div>
              <div style={{ fontSize: 12, color: C.tl, marginTop: 4 }}>メールでのご注文は24時間受付</div>
            </div>

            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="http://gokuchaninshop.cart.fc2.com/" target="_blank" rel="noopener noreferrer" style={s.shopCTABtn}>🛒 オンラインショップ</a>
              <a href="http://blog.goo.ne.jp/gokuchanin" target="_blank" rel="noopener noreferrer"
                style={{ ...s.shopCTABtn, backgroundColor: C.gold }}>📝 ブログ</a>
            </div>
          </div>
        </FadeIn>
      </div></section>
    </>
  );
}

/* ════════════════════════════════════════
   MAIN APP
   ════════════════════════════════════════ */

export default function App() {
  const hash = useHash();
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerSolid, setHeaderSolid] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMenuOpen(false);
  }, [hash]);

  useEffect(() => {
    const onScroll = () => setHeaderSolid(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = !hash || hash === "";
  const showSolidHeader = headerSolid || !isHome;

  let Page;
  switch (hash) {
    case "profile": Page = ProfilePage; break;
    case "temomi": Page = TemomiPage; break;
    case "bihakkou": Page = BihakkouPage; break;
    case "hanhakkou": Page = HanhakkouPage; break;
    case "varieties": Page = VarietiesPage; break;
    case "brewing": Page = BrewingPage; break;
    case "awards": Page = AwardsPage; break;
    case "media": Page = MediaPage; break;
    case "essay": Page = EssayPage; break;
    case "contact": Page = ContactPage; break;
    default: Page = HomePage;
  }

  return (
    <div style={s.root}>
      {/* HEADER */}
      <header style={{ ...s.header, ...(showSolidHeader ? s.headerSolid : {}) }}>
        <div style={s.headerInner}>
          <a href="#" style={s.logo}>
            <span style={{ ...s.logoK, color: showSolidHeader ? C.green : "#fff" }}>極茶人</span>
            <span style={{ ...s.logoS, color: showSolidHeader ? C.tl : "rgba(255,255,255,.5)" }}>GOKUCHANIN</span>
          </a>
          <nav style={s.dNav} data-dnav="">
            {PAGES.slice(1, 8).map(({ label, hash: h }) => (
              <a key={h} href={`#${h}`} style={{ ...s.navA, color: showSolidHeader ? C.tl : "rgba(255,255,255,.7)" }}>{label}</a>
            ))}
            <a href="http://gokuchaninshop.cart.fc2.com/" target="_blank" rel="noopener noreferrer" style={s.navShop}>ご購入</a>
          </nav>
          <button style={s.ham} data-ham="" onClick={() => setMenuOpen(!menuOpen)} aria-label="メニュー">
            {[0, 1, 2].map((i) => (
              <span key={i} style={{
                ...s.hamL,
                backgroundColor: showSolidHeader ? C.dk : "#fff",
                ...(menuOpen && i === 0 ? { transform: "rotate(45deg) translate(5px,5px)" } : {}),
                ...(menuOpen && i === 1 ? { opacity: 0 } : {}),
                ...(menuOpen && i === 2 ? { transform: "rotate(-45deg) translate(5px,-5px)" } : {}),
              }} />
            ))}
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div style={s.mobileMenu}>
          {PAGES.map(({ label, hash: h }) => (
            <a key={h} href={`#${h}`} onClick={() => setMenuOpen(false)} style={s.mNavA}>{label}</a>
          ))}
          <a href="http://gokuchaninshop.cart.fc2.com/" target="_blank" rel="noopener noreferrer" style={{ ...s.mNavA, color: C.green, marginTop: 8 }}>
            オンラインショップ →
          </a>
        </div>
      )}

      {/* PAGE */}
      <Page />

      {/* FOOTER */}
      <footer style={s.footer}>
        <div style={s.footerLogo}>極茶人</div>
        <div style={s.footerSub}>茶工房 比留間園 ── 農林水産大臣賞 受賞茶師</div>
        <div style={s.footerNav}>
          {PAGES.slice(1).map(({ label, hash: h }) => (
            <a key={h} href={`#${h}`} style={s.footerLink}>{label}</a>
          ))}
        </div>
        <div style={s.footerCopy}>© {new Date().getFullYear()} 茶工房 比留間園 All Rights Reserved.</div>
      </footer>
    </div>
  );
}

/* ════════════════════════════════════════
   DESIGN TOKENS + STYLES
   ════════════════════════════════════════ */
const C = { bg: "#FAF8F5", dk: "#1A1A18", green: "#3A5A28", gl: "#5B7A3A", gold: "#8B7A3A", warm: "#F5F0E8", cream: "#FFFDF8", tx: "#2C2C28", tl: "#6B6B60", bd: "#E5E0D5" };
const F = { s: "'Zen Old Mincho','Noto Serif JP',serif", b: "'Noto Serif JP',serif" };

const s = {
  root: { fontFamily: F.b, color: C.tx, backgroundColor: C.bg, WebkitFontSmoothing: "antialiased", lineHeight: 1.8 },

  /* Header */
  header: { position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 20px", transition: "all .35s ease", background: "transparent" },
  headerSolid: { background: "rgba(250,248,245,.96)", backdropFilter: "blur(12px)", boxShadow: "0 1px 0 rgba(0,0,0,.05)" },
  headerInner: { maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 },
  logo: { textDecoration: "none", display: "flex", flexDirection: "column" },
  logoK: { fontFamily: F.s, fontSize: 20, fontWeight: 900, letterSpacing: 6, lineHeight: 1.2, transition: "color .35s" },
  logoS: { fontSize: 7, letterSpacing: 4, fontWeight: 400, transition: "color .35s" },
  dNav: { display: "flex", alignItems: "center", gap: 22 },
  navA: { textDecoration: "none", fontSize: 12, letterSpacing: 2, transition: "color .3s", padding: "4px 0" },
  navShop: { display: "inline-block", padding: "6px 16px", fontSize: 11, letterSpacing: 2, color: "#fff", backgroundColor: C.green, borderRadius: 2, textDecoration: "none" },
  ham: { display: "flex", flexDirection: "column", gap: 5, background: "none", border: "none", cursor: "pointer", padding: 8 },
  hamL: { width: 22, height: 1.5, transition: "all .3s", display: "block" },

  /* Mobile */
  mobileMenu: { position: "fixed", inset: 0, zIndex: 99, background: "rgba(250,248,245,.98)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20 },
  mNavA: { textDecoration: "none", fontFamily: F.s, fontSize: 18, letterSpacing: 6, color: C.tx, padding: "6px 12px" },

  /* Hero */
  hero: { position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: "linear-gradient(160deg,#1A2A15,#2A3A20 30%,#1E2E18 60%,#162210)" },
  heroImg: { position: "absolute", inset: 0, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.35 },
  heroOverlay: { position: "absolute", inset: 0, background: "radial-gradient(ellipse at 30% 40%,rgba(90,120,50,.18),transparent 60%),radial-gradient(ellipse at 70% 70%,rgba(60,80,40,.12),transparent 50%)" },
  heroPattern: { position: "absolute", inset: 0, opacity: .03, backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 60px,rgba(255,255,255,.5) 60px,rgba(255,255,255,.5) 61px),repeating-linear-gradient(90deg,transparent,transparent 60px,rgba(255,255,255,.5) 60px,rgba(255,255,255,.5) 61px)" },
  heroContent: { position: "relative", textAlign: "center", animation: "heroReveal 1.1s ease forwards", padding: "0 24px" },
  heroVertLine: { width: 1, height: 56, backgroundColor: "rgba(255,255,255,.18)", margin: "0 auto 28px" },
  heroTitleMain: { fontFamily: F.s, fontSize: "clamp(48px,10vw,92px)", fontWeight: 900, color: "#fff", letterSpacing: ".15em", textShadow: "0 0 80px rgba(90,120,50,.25)", marginBottom: 4 },
  heroRuby: { fontSize: 13, letterSpacing: 10, color: "rgba(255,255,255,.35)", marginBottom: 20, fontWeight: 300 },
  heroDivider: { width: 56, height: 1, backgroundColor: C.gold, margin: "0 auto 20px" },
  heroTagline: { fontFamily: F.s, fontSize: "clamp(16px,3vw,22px)", color: "rgba(255,255,255,.75)", letterSpacing: 8, marginBottom: 10, fontWeight: 300 },
  heroSubtext: { fontSize: 12, color: "rgba(255,255,255,.3)", letterSpacing: 4 },
  fk: { position: "absolute", fontFamily: F.s, fontWeight: 900, color: "rgba(255,255,255,.02)", pointerEvents: "none", userSelect: "none" },

  /* Sections */
  sec: { padding: "88px 20px" },
  secWarm: { padding: "88px 20px", backgroundColor: C.warm },
  secDark: { position: "relative", padding: "88px 20px", background: "linear-gradient(160deg,#1E2E18,#2A3A20 50%,#1A2A15)" },
  darkOverlay: { position: "absolute", inset: 0, opacity: .04, backgroundImage: "repeating-linear-gradient(45deg,transparent,transparent 40px,rgba(255,255,255,.3) 40px,rgba(255,255,255,.3) 41px)" },
  ctr: { maxWidth: 1060, margin: "0 auto", position: "relative", zIndex: 1 },
  label: { fontSize: 10, letterSpacing: 6, color: C.tl, marginBottom: 6, textAlign: "center", fontWeight: 400 },
  h2: { fontFamily: F.s, fontSize: "clamp(26px,5vw,38px)", fontWeight: 700, textAlign: "center", letterSpacing: 8, marginBottom: 48, color: C.dk },
  h4: { fontFamily: F.s, fontSize: 20, fontWeight: 700, letterSpacing: 4, color: C.dk, marginBottom: 8 },
  subHead: { fontFamily: F.s, fontSize: 26, fontWeight: 700, letterSpacing: 4, color: C.dk, marginBottom: 8 },
  subHeadEn: { display: "block", fontSize: 12, fontWeight: 300, letterSpacing: 3, color: C.tl, marginTop: 4, fontFamily: F.b },
  body: { fontSize: 14, lineHeight: 2, color: C.tl, marginBottom: 14 },
  bodyLg: { fontSize: 16, lineHeight: 2, color: C.tl, marginBottom: 20, fontFamily: F.s },

  /* Page Header */
  pageHeader: { position: "relative", paddingTop: 120, paddingBottom: 60, textAlign: "center", background: "linear-gradient(160deg,#1E2E18,#2A3A20)", overflow: "hidden" },
  pageHeaderOverlay: { position: "absolute", inset: 0, opacity: .04, backgroundImage: "repeating-linear-gradient(45deg,transparent,transparent 40px,rgba(255,255,255,.3) 40px,rgba(255,255,255,.3) 41px)" },
  pageHeaderKanji: { position: "absolute", fontFamily: F.s, fontSize: 200, fontWeight: 900, color: "rgba(255,255,255,.03)", top: "50%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none" },
  pageHeaderSub: { fontSize: 10, letterSpacing: 6, color: "rgba(255,255,255,.4)", marginBottom: 6 },
  pageHeaderTitle: { fontFamily: F.s, fontSize: "clamp(28px,6vw,44px)", fontWeight: 700, color: "#fff", letterSpacing: 8 },

  /* About */
  aboutGrid: { display: "grid", gridTemplateColumns: "minmax(240px,1fr) 1.3fr", gap: 56, alignItems: "start" },
  portraitFrame: { position: "relative", aspectRatio: "3/4", background: `linear-gradient(135deg,${C.warm},#E8E2D5)`, borderRadius: 4, overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" },
  portraitKanji: { fontFamily: F.s, fontSize: 100, fontWeight: 900, color: "rgba(58,90,40,.07)", lineHeight: 1 },
  portraitCaption: { fontSize: 13, letterSpacing: 6, color: C.tl, marginTop: 12 },
  portraitAccent: { position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${C.green},${C.gold})` },
  aboutName: { fontFamily: F.s, fontSize: 26, fontWeight: 700, letterSpacing: 4, color: C.dk, marginBottom: 4 },
  aboutNameEn: { display: "block", fontSize: 12, fontWeight: 300, letterSpacing: 3, color: C.tl, marginTop: 4, fontFamily: F.b },
  aboutNick: { fontFamily: F.s, fontSize: 14, color: C.gold, letterSpacing: 4, marginBottom: 20 },
  quals: { display: "flex", flexDirection: "column", gap: 8, marginTop: 16 },
  qualItem: { fontSize: 13, color: C.tx, display: "flex", alignItems: "center", gap: 10, letterSpacing: 1 },
  qualDot: { color: C.green, fontSize: 8 },

  /* Philosophy */
  philGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 28, marginBottom: 48 },
  philCard: { background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 4, padding: "36px 28px", backdropFilter: "blur(8px)" },
  philNum: { fontFamily: F.s, fontSize: 32, fontWeight: 900, color: "rgba(255,255,255,.07)", marginBottom: 12, lineHeight: 1 },
  philHead: { fontFamily: F.s, fontSize: 20, fontWeight: 700, color: "#fff", letterSpacing: 4, marginBottom: 12 },
  philText: { fontSize: 13, lineHeight: 2, color: "rgba(255,255,255,.55)" },
  bigQuote: { fontFamily: F.s, fontSize: "clamp(22px,5vw,38px)", fontWeight: 300, color: "rgba(255,255,255,.65)", textAlign: "center", letterSpacing: 10, lineHeight: 1.8 },

  /* Products */
  prodGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 20 },
  prodCard: { position: "relative", backgroundColor: "#fff", borderRadius: 4, padding: "36px 24px 28px", transition: "transform .4s ease,box-shadow .4s ease", boxShadow: "0 2px 16px rgba(0,0,0,.03)", overflow: "hidden", cursor: "pointer" },
  prodAccent: { position: "absolute", top: 0, left: 0, right: 0, height: 3 },
  prodKanji: { fontFamily: F.s, fontSize: 56, fontWeight: 900, opacity: .05, position: "absolute", top: 10, right: 14, lineHeight: 1 },
  prodName: { fontFamily: F.s, fontSize: 17, fontWeight: 700, letterSpacing: 3, marginBottom: 2, color: C.dk },
  prodSub: { fontSize: 10, letterSpacing: 2, color: C.tl, marginBottom: 12 },
  prodDesc: { fontSize: 13, lineHeight: 1.9, color: C.tl },
  prodLine: { width: 28, height: 1, marginTop: 16 },

  /* Brewing */
  brewTabs: { display: "flex", justifyContent: "center", gap: 10, marginBottom: 32, flexWrap: "wrap" },
  brewTab: { fontFamily: F.s, fontSize: 15, letterSpacing: 4, padding: "10px 24px", background: "none", border: `1px solid ${C.bd}`, borderRadius: 2, cursor: "pointer", color: C.tl, transition: "all .3s" },
  brewBox: { maxWidth: 640, margin: "0 auto", backgroundColor: "#fff", borderRadius: 4, padding: "40px 36px", boxShadow: "0 4px 24px rgba(0,0,0,.03)" },
  brewStats: { display: "flex", justifyContent: "center", alignItems: "center", gap: 28, marginBottom: 20, flexWrap: "wrap" },
  brewStat: { textAlign: "center" },
  brewVal: { fontFamily: F.s, fontSize: 26, fontWeight: 700, color: C.green, letterSpacing: 2 },
  brewLbl: { fontSize: 10, color: C.tl, letterSpacing: 2, marginTop: 4 },
  brewDivider: { width: 1, height: 36, backgroundColor: C.bd },

  /* Awards */
  awardHighlights: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 20 },
  awardHCard: { textAlign: "center", padding: "36px 20px", backgroundColor: "#fff", borderRadius: 4, boxShadow: "0 2px 16px rgba(0,0,0,.03)", border: `1px solid ${C.bd}` },
  awardHTitle: { fontFamily: F.s, fontSize: 14, fontWeight: 600, letterSpacing: 2, color: C.dk, marginBottom: 6 },
  awardHVal: { fontSize: 13, color: C.gold, letterSpacing: 2, fontWeight: 500 },

  /* Media */
  mediaGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16 },
  mediaCard: { padding: "24px 20px", background: "#fff", borderRadius: 4, border: `1px solid ${C.bd}` },
  mediaDate: { fontSize: 12, color: C.green, fontWeight: 600, letterSpacing: 2, marginBottom: 4 },
  mediaTitle: { fontFamily: F.s, fontSize: 15, fontWeight: 600, letterSpacing: 2, color: C.dk, marginBottom: 2 },
  mediaPub: { fontSize: 11, color: C.tl },

  /* Contact */
  contactCard: { maxWidth: 560, margin: "0 auto", textAlign: "center", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 4, padding: "48px 36px" },
  contactName: { fontFamily: F.s, fontSize: 22, fontWeight: 700, color: "#fff", letterSpacing: 6, marginBottom: 6 },
  contactAddr: { fontSize: 13, color: "rgba(255,255,255,.45)", letterSpacing: 2, marginBottom: 28 },
  contactLinks: { display: "flex", flexDirection: "column", gap: 14, alignItems: "center", marginBottom: 28 },
  contactLink: { color: "rgba(255,255,255,.65)", textDecoration: "none", fontSize: 14, letterSpacing: 2 },
  contactHours: { fontSize: 12, color: "rgba(255,255,255,.3)", letterSpacing: 2 },

  /* Shop CTA */
  shopCTA: { textAlign: "center", marginTop: 40 },
  shopCTABtn: { display: "inline-block", fontFamily: F.b, fontSize: 13, letterSpacing: 3, color: "#fff", backgroundColor: C.green, padding: "14px 36px", borderRadius: 2, textDecoration: "none" },

  /* Links */
  moreLink: { fontSize: 13, color: C.green, textDecoration: "none", letterSpacing: 2, fontWeight: 500 },
  backLink: { display: "inline-block", fontSize: 13, color: C.green, textDecoration: "none", letterSpacing: 2, marginBottom: 32 },

  /* Divider */
  sectionDivider: { padding: "32px 0", textAlign: "center" },
  sectionDividerLine: { width: 48, height: 1, backgroundColor: C.bd, margin: "0 auto" },

  /* Footer */
  footer: { padding: "48px 20px 32px", backgroundColor: C.dk, textAlign: "center" },
  footerLogo: { fontFamily: F.s, fontSize: 18, fontWeight: 900, color: "rgba(255,255,255,.25)", letterSpacing: 8, marginBottom: 6 },
  footerSub: { fontSize: 11, color: "rgba(255,255,255,.15)", letterSpacing: 3, marginBottom: 20 },
  footerNav: { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 16, marginBottom: 20 },
  footerLink: { fontSize: 11, color: "rgba(255,255,255,.25)", textDecoration: "none", letterSpacing: 2 },
  footerCopy: { fontSize: 10, color: "rgba(255,255,255,.08)", letterSpacing: 2 },
};
