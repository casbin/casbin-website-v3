'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Zap, Code, ExternalLink } from 'lucide-react';

function AnimatedText({ words, interval = 3000 }: { words: string[]; interval?: number }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayWidth, setDisplayWidth] = useState(0);
  const [underlineWidth, setUnderlineWidth] = useState(0);
  const measureRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (words.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words.length, interval]);

  useEffect(() => {
    if (words.length === 0) return;
    const measurer = document.createElement('span');
    measurer.style.visibility = 'hidden';
    measurer.style.position = 'absolute';
    measurer.style.whiteSpace = 'nowrap';
    measurer.style.fontSize = 'clamp(2.2rem, 6vw, 4.2rem)';
    measurer.style.fontWeight = '700';
    measurer.style.fontFamily = 'inherit';
    document.body.appendChild(measurer);

    let maxWidth = 0;
    words.forEach((word) => {
      measurer.textContent = word;
      const width = measurer.offsetWidth;
      if (width > maxWidth) maxWidth = width;
    });

    document.body.removeChild(measurer);
    setDisplayWidth(Math.max(1, maxWidth - 50));
    setUnderlineWidth(Math.max(1, maxWidth - 50));
  }, [words]);

  if (words.length === 0) return null;

  return (
    <span
      className="relative inline-block"
      style={{
        width: displayWidth > 0 ? `${displayWidth}px` : 'auto',
        display: 'inline-block',
      }}
    >
      <span 
        key={currentIndex} 
        ref={measureRef} 
        className="inline-block animate-fade-in-up bg-gradient-to-r from-purple-300 via-pink-300 to-orange-300 bg-clip-text text-transparent font-bold"
      >
        {words[currentIndex]}
      </span>
      <svg
        className="absolute left-1/2 transform -translate-x-1/2 pointer-events-none"
        viewBox="0 0 200 10"
        preserveAspectRatio="none"
        style={{ height: '12px', width: `${underlineWidth}px`, bottom: '-16px' }}
      >
        <defs>
          <linearGradient id="wavy-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="50%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
        </defs>
        <path 
          d="M0,5 Q10,0 20,5 T40,5 T60,5 T80,5 T100,5 T120,5 T140,5 T160,5 T180,5 T200,5" 
          stroke="url(#wavy-gradient)" 
          strokeWidth="3" 
          fill="none" 
        />
      </svg>
    </span>
  );
}

function HeroHeader() {
  const [latestVersion, setLatestVersion] = useState('v3.4.1');
  const headerRef = useRef<HTMLElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('https://api.github.com/repos/casbin/casbin/releases/latest')
      .then((res) => res.json())
      .then((data) => setLatestVersion(data.tag_name || 'v3.4.1'))
      .catch(() => setLatestVersion('v3.4.1'));
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const headerEl = headerRef.current;
    const haloEl = haloRef.current;
    if (!headerEl || !haloEl) return;

    let rafId: number | null = null;

    const onMove = (e: MouseEvent) => {
      const rect = headerEl.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const size = 250;
        haloEl.style.transform = `translate3d(${x - size / 2}px, ${y - size / 2}px, 0)`;
        haloEl.style.opacity = '0.25';
      });
    };

    const onLeave = () => {
      if (rafId) cancelAnimationFrame(rafId);
      haloEl.style.opacity = '0';
    };

    headerEl.addEventListener('mousemove', onMove);
    headerEl.addEventListener('mouseleave', onLeave);

    return () => {
      headerEl.removeEventListener('mousemove', onMove);
      headerEl.removeEventListener('mouseleave', onLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="relative overflow-hidden py-20 px-4"
      style={{
        backgroundImage: 'linear-gradient(135deg, rgba(68, 61, 128, 0.75) 0%, rgba(100, 80, 160, 0.7) 100%), url(/images/background.png)',
        backgroundSize: 'cover, cover',
        backgroundPosition: 'center, center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-purple-900/40 to-blue-900/30" />

      {/* Cursor halo - 250px size */}
      <div
        ref={haloRef}
        className="pointer-events-none absolute h-64 w-64 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle at center, rgb(255 255 255 / 50%) 0%, rgb(255 255 255 / 22%) 25%, rgb(255 255 255 / 6%) 50%, rgb(255 255 255 / 0%) 100%)',
          mixBlendMode: 'screen',
          zIndex: 1,
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl">
        {/* News pill */}
        <div className="mb-8 flex justify-center">
          <a
            href={`https://github.com/casbin/casbin/releases/tag/${latestVersion}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur transition-all hover:bg-white/20"
            style={{
              overflow: 'hidden',
            }}
          >
            {/* Animated border gradient */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                padding: '1px',
                background: 'linear-gradient(90deg, #7c3aed, #a855f7, #ec4899, #f97316, #7c3aed)',
                backgroundSize: '200% 100%',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
                opacity: 0,
                transition: 'opacity 0.3s ease',
                clipPath: 'inset(50% 50% 50% 50%)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.clipPath = 'inset(0% 0% 0% 0%)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '0';
                e.currentTarget.style.clipPath = 'inset(50% 50% 50% 50%)';
              }}
            />
            <span className="text-xs font-bold text-white border border-white/50 rounded px-1.5 py-0.5 relative z-10">NEWS</span>
            <span className="text-sm text-gray-200">{latestVersion} Released</span>
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </a>
        </div>

        {/* Main heading */}
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
            <span className="bg-gradient-to-r from-white via-indigo-200 to-white bg-clip-text text-transparent animate-shimmer" style={{backgroundSize: '200% 200%'}}>
              Casbin
            </span>
            <br />
            <div className="mt-4 text-3xl md:text-5xl">
              <span className="text-gray-200">Open-source authorization for</span>
              <br />
              <span className="inline-block">
                <AnimatedText
                  words={['applications', 'clouds', 'web apps', 'AI gateway', 'MCP']}
                  interval={3000}
                />
              </span>
            </div>
          </h1>

          <p className="mt-8 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            A powerful and efficient open-source access control library that supports multiple authorization models
          </p>
        </div>

        {/* Action buttons */}
        <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/docs"
            className="group inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-white text-white font-semibold px-8 py-3 transition-all hover:shadow-lg hover:-translate-y-0.5 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #fff 0%, #f0eeff 100%)',
              color: '#443D80',
              border: '2px solid #fff',
            }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-60 transition-opacity" style={{animation: 'shimmer 0.6s ease forwards'}} />
            <Zap size={20} className="relative z-10" />
            <span className="relative z-10">Get Started</span>
          </Link>
          <a
            href="https://editor.casbin.org"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white text-white font-semibold px-8 py-3 transition-all hover:bg-white/10 hover:shadow-lg hover:-translate-y-0.5"
          >
            <Code size={20} />
            <span>Try Online Editor</span>
          </a>
        </div>

        {/* Logo carousel in hero */}
        <div className="mt-16">
          <LogoCarousel />
        </div>
      </div>
    </header>
  );
}

function LogoCarousel() {
  const [items, setItems] = useState<Array<any>>([]);
  const [position, setPosition] = useState(0);
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  useEffect(() => {
    let mounted = true;
    fetch('/data/users.json')
      .then((res) => res.json())
      .then((data) => {
        if (!mounted) return;
        const list = Array.isArray(data) ? data.filter(Boolean) : [];
        setItems(list);
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!trackRef.current || items.length === 0) return;
    const totalWidth = Math.max(1, Math.floor(trackRef.current.scrollWidth / 2));

    const tick = (t: number) => {
      if (paused) {
        lastTimeRef.current = t;
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      if (lastTimeRef.current === null) lastTimeRef.current = t;
      const delta = (t - lastTimeRef.current) / 1000;
      lastTimeRef.current = t;

      setPosition((prev) => {
        const next = prev + delta * 30;
        if (next >= totalWidth) return next - totalWidth;
        return next;
      });
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTimeRef.current = null;
    };
  }, [items, paused]);

  const display = items.length > 0 ? [...items, ...items] : [];

  return (
    <div
      ref={viewportRef}
      className="relative overflow-hidden rounded-lg py-2"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        maskImage: 'linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)',
      }}
    >
      {/* Decorative gradient border */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none z-20"
        style={{
          background: 'linear-gradient(90deg, #7c3aed, #a855f7, #ec4899, #f97316, #7c3aed)',
          backgroundSize: '200% 100%',
          boxShadow: '0 -2px 20px rgb(255 255 255 / 6%) inset, 0 6px 18px rgb(168 85 247 / 4%), 0 10px 28px rgb(168 85 247 / 6%)',
          maskImage: 'linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%)',
        }}
      />

      {/* Highlight above border */}
      <div
        className="absolute bottom-0 left-0 right-0 h-7 pointer-events-none z-10"
        style={{
          background: 'radial-gradient(ellipse at center, rgb(255 255 255 / 28%) 0%, rgb(255 255 255 / 18%) 24%, rgb(255 255 255 / 8%) 48%, rgb(168 85 247 / 2%) 72%, rgb(168 85 247 / 0%) 100%)',
          filter: 'blur(8px)',
          opacity: 0.68,
          mixBlendMode: 'soft-light',
          maskImage: 'linear-gradient(to top, transparent 0, black 1px, rgb(0 0 0 / 90%) 18%, rgb(0 0 0 / 60%) 38%, rgb(0 0 0 / 0%) 100%)',
          WebkitMaskImage: 'linear-gradient(to top, transparent 0, black 1px, rgb(0 0 0 / 90%) 18%, rgb(0 0 0 / 60%) 38%, rgb(0 0 0 / 0%) 100%)',
        }}
      />

      <div className="flex gap-8 items-center" style={{ transform: `translateX(${-position}px)` }} ref={trackRef}>
        {display.map((item, idx) => (
          <a
            key={idx}
            href={item.infolink || item.link || '#'}
            target="_blank"
            rel="noopener noreferrer"
            title={item.caption}
            className="flex-shrink-0 flex items-center justify-center h-14 transition-all duration-360 ease-cubic hover:opacity-100 hover:transform hover:-translate-y-1"
            style={{
              opacity: paused ? 1 : 0.98,
              filter: 'grayscale(100%) contrast(0.95) brightness(0.95)',
            }}
          >
            <img 
              src={`/images/${item.image}`} 
              alt={item.caption} 
              className="h-9 object-contain"
              style={{
                maxWidth: '260px',
                transition: 'opacity 480ms cubic-bezier(0.2, 0, 0.1, 1), transform 480ms cubic-bezier(0.2, 0, 0.1, 1)',
              }}
            />
          </a>
        ))}
      </div>
    </div>
  );
}

function FeatureCard({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image?: string;
}) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
      {image && <img src={image} alt={title} className="mb-4 h-32 object-contain" />}
      <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-50">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
}

function Features() {
  const features = [
    {
      title: 'Hybrid Access Control Models',
      description:
        'Casbin uses CONF files to define access control models based on the PERM metamodel (Policy, Effect, Request, Matchers). You can change or upgrade your authorization mechanism by modifying the configuration file.',
      image: '/images/model.png',
    },
    {
      title: 'Flexible Policy Storage',
      description:
        'Casbin policies can be stored in memory, files, or databases. We support dozens of storage backends including MySQL, Postgres, Oracle, MongoDB, Redis, Cassandra, and AWS S3. See the full list of adapters.',
      image: '/images/storage.png',
    },
    {
      title: 'Cross-languages & Cross-platforms',
      description:
        'Casbin is implemented in multiple languages including Golang, Java, PHP, Node.js, Python, .NET, Rust, and more. All implementations share the same API and behavior.',
      image: '/images/language.png',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900/50">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-50 mb-4">
            Key Features
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <FeatureCard key={idx} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

function LanguageIntegration() {
  const languages = [
    { name: 'Golang', icon: 'https://cdn.casbin.org/language/go-logo-1.svg', url: 'https://github.com/casbin/casbin' },
    { name: 'Java', icon: 'https://cdn.casbin.org/language/jee-3.svg', url: 'https://github.com/casbin/jcasbin' },
    { name: 'C/C++', icon: 'https://cdn.casbin.org/language/c.svg', url: 'https://github.com/casbin/casbin-cpp' },
    { name: 'Node.js', icon: 'https://cdn.casbin.org/language/nodejs-1.svg', url: 'https://github.com/casbin/node-casbin' },
    { name: 'Front-end JavaScript', icon: 'https://cdn.casbin.org/language/logo-javascript.svg', url: 'https://github.com/casbin/casbin.js' },
    { name: 'PHP', icon: 'https://cdn.casbin.org/language/PHP-logo.svg', url: 'https://github.com/php-casbin/php-casbin' },
    { name: 'Laravel', icon: 'https://cdn.casbin.org/language/laravel-2.svg', url: 'https://github.com/php-casbin/laravel-authz' },
    { name: 'Python', icon: 'https://cdn.casbin.org/language/python-5.svg', url: 'https://github.com/casbin/pycasbin' },
    { name: '.NET (C#)', icon: 'https://cdn.casbin.org/language/dotnet-logo.svg', url: 'https://github.com/casbin/Casbin.NET' },
    { name: 'Delphi', icon: 'https://cdn.casbin.org/language/delphi-2.svg', url: 'https://github.com/casbin4d/Casbin4D' },
    { name: 'Rust', icon: 'https://cdn.casbin.org/language/rust.svg', url: 'https://github.com/casbin/casbin-rs' },
    { name: 'Ruby', icon: 'https://cdn.casbin.org/language/ruby.svg', url: 'https://github.com/CasbinRuby/casbin-ruby' },
    { name: 'Swift (Objective-C)', icon: 'https://cdn.casbin.org/language/swift-15.svg', url: 'https://github.com/casbin/SwiftCasbin' },
    { name: 'Lua (OpenResty, Kong, APISIX)', icon: 'https://cdn.casbin.org/language/lua-5.svg', url: 'https://github.com/casbin/lua-casbin' },
    { name: 'Dart (Flutter)', icon: 'https://cdn.casbin.org/language/dart.svg', url: 'https://github.com/casbin/dart-casbin' },
    { name: 'Elixir', icon: 'https://cdn.casbin.org/language/elixir-lang-icon.svg', url: 'https://github.com/casbin/casbin-ex' },
    { name: 'Cloud Native', icon: 'https://cdn.casbin.org/language/kubernets.svg', url: '/docs/cloud-native', fullName: 'Cloud Native (Kubernetes, Istio, Envoy, KubeSphere)' },
  ];

  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === languages.length - 1 ? -1 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused, languages.length]);

  const displayName = currentIndex >= 0 ? (languages[currentIndex].fullName || languages[currentIndex].name) : 'Multiple Languages';

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-12 min-h-24 flex items-center justify-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 whitespace-nowrap">
            <span className="text-gray-600 dark:text-gray-400">Use Casbin with </span>
            <span className="animate-fade-in-up" style={{color: '#443D80'}}>{displayName}</span>
          </h2>
        </div>

        <div
          className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto px-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {languages.map((lang, idx) => (
            <a
              key={lang.name}
              href={lang.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex justify-center items-center p-3 rounded-xl transition-all duration-300 ${
                currentIndex === idx ? 'scale-110 -translate-y-1' : 'hover:-translate-y-1'
              }`}
              style={{
                border: currentIndex === idx ? '2px solid #443D80' : '2px solid transparent',
                backgroundColor: currentIndex === idx ? 'rgba(68, 61, 128, 0.05)' : 'transparent',
              }}
              onMouseEnter={() => setCurrentIndex(idx)}
              title={lang.name}
            >
              <img src={lang.icon} alt={lang.name} className="h-12 object-contain" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function PolicyPersistence() {
  return (
    <section className="py-16 md:py-24" style={{
      background: 'linear-gradient(to right, rgba(68, 61, 128, 0.05) 0%, rgba(68, 61, 128, 0.02) 100%)',
    }}>
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-4">Policy Persistence</h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Casbin stores policies through adapters. To keep the library lightweight, adapter code is separated from the main library. We support third-party adapter contributions.{' '}
              <Link href="/docs/Adapters" className="font-semibold" style={{color: '#443D80'}}>
                See the full list of adapters
              </Link>{' '}
              for more information.
            </p>
          </div>
          <div className="text-center">
            <img src="/images/store.png" alt="Policy Persistence" className="max-w-full h-auto" />
          </div>
        </div>
      </div>
    </section>
  );
}

function PolicyEnforcement() {
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-center order-2 md:order-1">
            <img src="/images/scale.png" alt="Policy Enforcement at Scale" className="max-w-full h-auto" />
          </div>
          <div className="order-1 md:order-2">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-4">Policy Enforcement at Scale</h3>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Some adapters support filtered policy loading. This means Casbin can load only a subset of policies from storage based on specified filters. This feature is useful for large-scale, multi-tenant applications where loading all policies at once would be inefficient.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function RoleManager() {
  return (
    <section className="py-16 md:py-24" style={{
      background: 'linear-gradient(to right, rgba(68, 61, 128, 0.05) 0%, rgba(68, 61, 128, 0.02) 100%)',
    }}>
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-4">Role Manager</h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              The role manager handles RBAC role hierarchy (user-role mappings) in Casbin. It can load role data from Casbin policy rules or from external sources like LDAP, Okta, Auth0, Azure AD, etc. To keep the library lightweight, role manager code is separated from the main library.{' '}
              <Link href="/docs/RoleManagers" className="font-semibold" style={{color: '#443D80'}}>
                See all available role managers
              </Link>
              .
            </p>
          </div>
          <div className="text-center">
            <img src="/images/role.png" alt="Role Manager" className="max-w-full h-auto" />
          </div>
        </div>
      </div>
    </section>
  );
}

function EditorPreview() {
  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900/50">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-50 mb-4">
            Try the Casbin Online Editor
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Write and test your Casbin model and policy in real-time with the interactive online editor. Try different access control models and see results instantly.
          </p>
        </div>

        <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <iframe
            src="https://editor.casbin.org"
            className="w-full h-96 md:h-[600px]"
            title="Casbin Online Editor"
          />
        </div>

        <div className="text-center mt-8">
          <a
            href="https://editor.casbin.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg text-white font-semibold px-8 py-3 transition-all"
            style={{
              backgroundColor: '#443D80',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#5a4fa0';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#443D80';
            }}
          >
            Open Full Editor
            <ExternalLink size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}

function Showcase() {
  const [users, setUsers] = useState<Array<any>>([]);

  useEffect(() => {
    fetch('/data/users.json')
      .then((res) => res.json())
      .then((data) => setUsers(Array.isArray(data) ? data.filter(Boolean) : []))
      .catch(() => {});
  }, []);

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-50 mb-4">
            Who's using Casbin?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Hundreds of projects use Casbin, from Fortune 500 companies to new startups. Check out{' '}
            <Link href="/docs/users" className="font-semibold" style={{color: '#443D80'}}>
              these apps
            </Link>
            !
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 items-center">
          {users.map((user) => (
            <a
              key={user.caption}
              href={user.infolink || user.link || '#'}
              target="_blank"
              rel="noopener noreferrer"
              title={user.caption}
              className="inline-flex justify-center items-center p-4 transition-all hover:opacity-100"
              style={{
                opacity: 0.7,
              }}
            >
              <img src={`/images/${user.image}`} alt={user.caption} className="h-12 object-contain" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-300 dark:text-gray-400 py-12 md:py-16 border-t border-gray-800">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Docs Section */}
          <div>
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wide">Docs</h3>
            <ul className="space-y-2">
              <li><Link href="/docs/GetStarted" className="transition text-sm" style={{color: '#999', }} onMouseEnter={(e) => e.currentTarget.style.color = '#443D80'} onMouseLeave={(e) => e.currentTarget.style.color = '#999'}>Getting Started</Link></li>
              <li><Link href="/docs/ManagementAPI" className="transition text-sm" style={{color: '#999',}} onMouseEnter={(e) => e.currentTarget.style.color = '#443D80'} onMouseLeave={(e) => e.currentTarget.style.color = '#999'}>Management API</Link></li>
              <li><Link href="/docs/RBACAPI" className="transition text-sm" style={{color: '#999',}} onMouseEnter={(e) => e.currentTarget.style.color = '#443D80'} onMouseLeave={(e) => e.currentTarget.style.color = '#999'}>RBAC API</Link></li>
              <li><Link href="/docs/Middlewares" className="transition text-sm" style={{color: '#999',}} onMouseEnter={(e) => e.currentTarget.style.color = '#443D80'} onMouseLeave={(e) => e.currentTarget.style.color = '#999'}>Middlewares</Link></li>
            </ul>
          </div>

          {/* Community Section */}
          <div>
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wide flex items-center gap-2">
              <span>Community</span>
              <img src="/images/casbin_min.svg" alt="Casbin" className="h-4 w-4 object-contain opacity-60" />
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="https://discord.gg/S5UjpzGZjN" target="_blank" rel="noopener noreferrer" className="transition text-sm inline-flex items-center gap-2" style={{color: '#999'}} onMouseEnter={(e) => e.currentTarget.style.color = '#443D80'} onMouseLeave={(e) => e.currentTarget.style.color = '#999'}>
                  <span>Discord</span>
                </a>
              </li>
              <li>
                <a href="https://stackoverflow.com/search?q=casbin" target="_blank" rel="noopener noreferrer" className="transition text-sm inline-flex items-center gap-2" style={{color: '#999'}} onMouseEnter={(e) => e.currentTarget.style.color = '#443D80'} onMouseLeave={(e) => e.currentTarget.style.color = '#999'}>
                  <span>Stack Overflow</span>
                </a>
              </li>
              <li>
                <a href="https://groups.google.com/g/casbin" target="_blank" rel="noopener noreferrer" className="transition text-sm inline-flex items-center gap-2" style={{color: '#999'}} onMouseEnter={(e) => e.currentTarget.style.color = '#443D80'} onMouseLeave={(e) => e.currentTarget.style.color = '#999'}>
                  <span>Google Groups</span>
                </a>
              </li>
            </ul>
          </div>

          {/* More Section */}
          <div>
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wide">More</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://github.com/casbin/casbin" target="_blank" rel="noopener noreferrer" className="transition" style={{color: '#999'}} onMouseEnter={(e) => e.currentTarget.style.color = '#443D80'} onMouseLeave={(e) => e.currentTarget.style.color = '#999'}>
                  GitHub Stars
                </a>
              </li>
              <li>
                <a href="https://twitter.com/casbinHQ" target="_blank" rel="noopener noreferrer" className="transition" style={{color: '#999'}} onMouseEnter={(e) => e.currentTarget.style.color = '#443D80'} onMouseLeave={(e) => e.currentTarget.style.color = '#999'}>
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/@casbinhq" target="_blank" rel="noopener noreferrer" className="transition" style={{color: '#999'}} onMouseEnter={(e) => e.currentTarget.style.color = '#443D80'} onMouseLeave={(e) => e.currentTarget.style.color = '#999'}>
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-400">
            © {new Date().getFullYear()} Casbin Organization
          </div>
          <div className="flex gap-6">
            <a href="https://github.com/casbin" target="_blank" rel="noopener noreferrer" className="transition text-sm" style={{color: '#999'}} onMouseEnter={(e) => e.currentTarget.style.color = '#443D80'} onMouseLeave={(e) => e.currentTarget.style.color = '#999'}>
              GitHub
            </a>
            <a href="https://twitter.com/casbinHQ" target="_blank" rel="noopener noreferrer" className="transition text-sm" style={{color: '#999'}} onMouseEnter={(e) => e.currentTarget.style.color = '#443D80'} onMouseLeave={(e) => e.currentTarget.style.color = '#999'}>
              Twitter
            </a>
            <a href="https://discord.gg/S5UjpzGZjN" target="_blank" rel="noopener noreferrer" className="transition text-sm" style={{color: '#999'}} onMouseEnter={(e) => e.currentTarget.style.color = '#443D80'} onMouseLeave={(e) => e.currentTarget.style.color = '#999'}>
              Discord
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function HomePage() {
  return (
    <main className="flex flex-col">
      <style>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes border-gradient-shift {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: 200% 0%;
          }
        }

        @keyframes shimmer {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes border-gradient-animate {
          0% {
            clip-path: inset(0 50% 0 50%);
          }
          100% {
            clip-path: inset(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-in-out;
        }
      `}</style>
      <HeroHeader />
      <LanguageIntegration />
      <Features />
      <EditorPreview />
      <PolicyPersistence />
      <PolicyEnforcement />
      <RoleManager />
      <Showcase />
      <Footer />
    </main>
  );
}
