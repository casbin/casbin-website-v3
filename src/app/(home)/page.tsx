"use client";

import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import Link from "next/link";
import {
  Zap,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Database,
  Scale,
  Users,
  Sparkles,
  Shield,
  Globe,
  MessageSquare,
  Users2,
  HelpCircle,
  Github,
  Twitter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

  useLayoutEffect(() => {
    if (words.length === 0) return;
    const measurer = document.createElement("span");
    measurer.style.visibility = "hidden";
    measurer.style.position = "absolute";
    measurer.style.whiteSpace = "nowrap";
    measurer.style.fontSize = "clamp(2.2rem, 6vw, 4.2rem)";
    measurer.style.fontWeight = "700";
    measurer.style.fontFamily = "inherit";
    document.body.appendChild(measurer);

    let maxWidth = 0;
    words.forEach((word) => {
      measurer.textContent = word;
      const width = measurer.offsetWidth;
      if (width > maxWidth) maxWidth = width;
    });

    document.body.removeChild(measurer);
    /* eslint-disable react-hooks/set-state-in-effect */
    setDisplayWidth(Math.max(1, maxWidth - 50));
    setUnderlineWidth(Math.max(1, maxWidth - 50));
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [words]);

  if (words.length === 0) return null;

  return (
    <span
      className="relative inline-block"
      style={{
        width: displayWidth > 0 ? `${displayWidth}px` : "auto",
        display: "inline-block",
      }}
    >
      <span
        key={currentIndex}
        ref={measureRef}
        className="inline-block animate-in fade-in-0 duration-500 text-white"
      >
        {words[currentIndex]}
      </span>
      <svg
        className="absolute left-1/2 transform -translate-x-1/2 pointer-events-none"
        viewBox="0 0 200 10"
        preserveAspectRatio="none"
        style={{ height: "12px", width: `${underlineWidth}px`, bottom: "-16px" }}
      >
        <defs>
          <linearGradient id="wavy-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="50%" stopColor="#a855f7" />
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
  const [latestVersion, setLatestVersion] = useState("v3.4.1");
  const headerRef = useRef<HTMLElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("https://api.github.com/repos/casbin/casbin/releases/latest")
      .then((res) => res.json())
      .then((data) => setLatestVersion(data.tag_name || "v3.4.1"))
      .catch(() => setLatestVersion("v3.4.1"));
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
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
        // Use actual halo element size so centering is exact
        const w = haloEl.offsetWidth || 250;
        const h = haloEl.offsetHeight || 250;
        haloEl.style.left = `${Math.round(x - w / 2)}px`;
        haloEl.style.top = `${Math.round(y - h / 2)}px`;
        haloEl.style.transform = "none";
        haloEl.style.opacity = "0.25";
      });
    };

    const onLeave = () => {
      if (rafId) cancelAnimationFrame(rafId);
      haloEl.style.opacity = "0";
    };

    headerEl.addEventListener("mousemove", onMove);
    headerEl.addEventListener("mouseleave", onLeave);

    return () => {
      headerEl.removeEventListener("mousemove", onMove);
      headerEl.removeEventListener("mouseleave", onLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="relative overflow-hidden py-24 md:py-32 px-4 bg-gradient-to-br from-purple-900/75 to-blue-900/30 bg-cover bg-center"
      style={{
        backgroundImage: "url(/images/background.png)",
      }}
    >
      {/* Background video (lazy, fades in when ready) */}
      <VideoBackground />

      {/* Enhanced overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/50 via-blue-900/40 to-indigo-900/30 z-10" />

      {/* Cursor halo */}
      <div
        ref={haloRef}
        className="pointer-events-none absolute h-64 w-64 rounded-full blur-3xl opacity-0 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(circle at center, rgb(255 255 255 / 50%) 0%, rgb(255 255 255 / 22%) 25%, rgb(255 255 255 / 6%) 50%, rgb(255 255 255 / 0%) 100%)",
          mixBlendMode: "screen",
          zIndex: 20,
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-30 mx-auto max-w-5xl">
        {/* News pill */}
        <div className="mb-10 flex justify-center">
          <a
            href={`https://github.com/casbin/casbin/releases/tag/${latestVersion}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group hover:animate-none transform hover:scale-105 transition-all duration-300"
          >
            <Badge
              variant="outline"
              className="gap-2 px-4 py-2 text-sm bg-gradient-to-r from-yellow-400/20 to-orange-400/20 backdrop-blur-sm border-yellow-300/30 hover:border-yellow-300/50 hover:from-yellow-400/30 hover:to-orange-400/30 transition-all duration-300 font-inter shadow-lg hover:shadow-xl hover:shadow-yellow-300/20"
            >
              <Sparkles size={16} className="text-yellow-300" />
              <span className="font-bold text-white drop-shadow-sm">NEWS</span>
              <span className="text-white/90 drop-shadow-sm">{latestVersion} Released</span>
              <span className="transition-transform group-hover:translate-x-1 group-hover:scale-110 text-white drop-shadow-sm">
                →
              </span>
            </Badge>
          </a>
        </div>

        {/* Main heading with improved spacing */}
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight font-inter">
            <span
              className="bg-gradient-to-r from-white via-indigo-100 to-purple-200 bg-clip-text text-transparent drop-shadow-2xl"
              style={{ backgroundSize: "200% 200%" }}
            >
              Casbin
            </span>
            <br />
            <div className="mt-6 text-3xl md:text-5xl lg:text-6xl font-inter">
              <span className="text-gray-100 drop-shadow-lg">Open-source authorization for</span>
              <br />
              <span className="inline-block mt-2">
                <AnimatedText
                  words={["applications", "clouds", "web apps", "AI gateway", "MCP"]}
                  interval={3000}
                />
              </span>
            </div>
          </h1>

          <p className="mt-10 text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto font-inter leading-relaxed drop-shadow-md">
            A powerful and efficient open-source access control library that supports multiple
            authorization models
          </p>
        </div>

        {/* Action buttons with improved spacing */}
        <div className="mt-14 flex flex-col sm:flex-row justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="gap-2 text-white text-lg py-6 px-8 button-shimmer hover:shadow-2xl hover:shadow-purple-500/30"
            style={{ backgroundColor: "#443D80" }}
          >
            <Link href="/docs" className="relative z-10">
              <Zap size={20} />
              Get Started
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="gap-2 text-lg py-6 px-8 bg-white text-[#443D80] hover:bg-gray-100 hover:text-[#5a4fa0] border-white group hover:shadow-2xl hover:shadow-white/20"
          >
            <a href="https://editor.casbin.org" target="_blank" rel="noopener noreferrer">
              <div className="flex items-center -space-x-1">
                <ChevronLeft
                  size={20}
                  className="transition-transform duration-300 group-hover:-translate-x-0.5"
                />
                <ChevronRight
                  size={20}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </div>
              Try Online Editor
            </a>
          </Button>
        </div>

        {/* Logo carousel in hero */}
        <div className="mt-20">
          <LogoCarousel />
        </div>
      </div>
    </header>
  );
}

function VideoBackground() {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    // Attempt to autoplay; browsers may block but it's muted so usually okay
    v.play().catch(() => {});
  }, []);

  return (
    <video
      ref={ref}
      src="https://cdn.casbin.org/video/background.mp4"
      preload="auto"
      poster="/images/background.png"
      muted
      loop
      playsInline
      onLoadedData={() => setLoaded(true)}
      onCanPlayThrough={() => setLoaded(true)}
      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
      style={{ zIndex: 0 }}
      crossOrigin="anonymous"
      aria-hidden="true"
    />
  );
}

function LogoCarousel() {
  const [items, setItems] = useState<Array<any>>([]);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mounted = true;
    fetch("/data/users.json")
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

  const display = items.length > 0 ? [...items, ...items] : [];

  // duration scales with number of items to keep speed consistent
  const duration = Math.max(12, Math.floor((items.length || 6) * 2.5));

  // measure marquee distance (half of scrollWidth) and set CSS variable for smooth loop
  useEffect(() => {
    const container = trackRef.current;
    if (!container) return;

    const updateDistance = () => {
      const marqueeEl = container.querySelector(".marquee") as HTMLElement | null;
      if (!marqueeEl) return;
      const full = marqueeEl.scrollWidth;
      const half = Math.floor(full / 2);
      container.style.setProperty("--marquee-distance", `${half}px`);
    };

    updateDistance();

    // observe resize and image loads inside marquee
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => updateDistance());
      ro.observe(container);
    }

    const imgs = Array.from(container.querySelectorAll("img")) as HTMLImageElement[];
    const onImgLoad = () => updateDistance();
    imgs.forEach((img) => img.addEventListener("load", onImgLoad));

    return () => {
      imgs.forEach((img) => img.removeEventListener("load", onImgLoad));
      if (ro && container) ro.unobserve(container);
    };
  }, [items]);

  return (
    <div
      ref={trackRef}
      className="carousel relative overflow-hidden rounded-lg py-2"
      style={{
        maskImage: "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
    >
      {/* Decorative gradient border */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none z-20"
        style={{
          background: "linear-gradient(90deg, #7c3aed, #a855f7, #ec4899, #f97316, #7c3aed)",
          backgroundSize: "200% 100%",
          boxShadow:
            "0 -2px 20px rgb(255 255 255 / 6%) inset, 0 6px 18px rgb(168 85 247 / 4%), 0 10px 28px rgb(168 85 247 / 6%)",
          maskImage:
            "linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%)",
        }}
      />

      {/* Highlight above border */}
      <div
        className="absolute bottom-0 left-0 right-0 h-7 pointer-events-none z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, rgb(255 255 255 / 28%) 0%, rgb(255 255 255 / 18%) 24%, rgb(255 255 255 / 8%) 48%, rgb(168 85 247 / 2%) 72%, rgb(168 85 247 / 0%) 100%)",
          filter: "blur(8px)",
          opacity: 0.68,
          mixBlendMode: "soft-light",
          maskImage:
            "linear-gradient(to top, transparent 0, black 1px, rgb(0 0 0 / 90%) 18%, rgb(0 0 0 / 60%) 38%, rgb(0 0 0 / 0%) 100%)",
          WebkitMaskImage:
            "linear-gradient(to top, transparent 0, black 1px, rgb(0 0 0 / 90%) 18%, rgb(0 0 0 / 60%) 38%, rgb(0 0 0 / 0%) 100%)",
        }}
      />

      <div
        className="flex gap-8 items-center marquee"
        style={{
          width: "max-content",
          ["--marquee-duration" as any]: `${duration}s`,
        }}
      >
        {display.map((item, idx) => (
          <a
            key={idx}
            href={item.infolink || item.link || "#"}
            target="_blank"
            rel="noopener noreferrer"
            title={item.caption}
            className="flex-shrink-0 flex items-center justify-center h-14 transition-all duration-360 ease-cubic hover:opacity-100 hover:transform hover:-translate-y-1"
            style={{
              opacity: 0.98,
              filter: "grayscale(100%) contrast(0.95) brightness(0.95)",
            }}
          >
            <img
              src={`/images/${item.image}`}
              alt={item.caption}
              className="h-9 object-contain"
              style={{
                maxWidth: "260px",
                transition:
                  "opacity 480ms cubic-bezier(0.2, 0, 0.1, 1), transform 480ms cubic-bezier(0.2, 0, 0.1, 1)",
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
  icon,
}: {
  title: string;
  description: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <Card className="transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-2 hover:border-[#443D80]/30 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 group">
      <CardContent className="p-8 text-center">
        {icon && (
          <div className="mb-6 flex justify-center transition-transform duration-300 group-hover:scale-110">
            {icon}
          </div>
        )}
        <CardHeader className="p-0">
          <CardTitle className="text-xl font-inter mb-3">{title}</CardTitle>
        </CardHeader>
        <p className="text-gray-600 dark:text-gray-400 font-inter leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}

function StatsSection() {
  const [stars, setStars] = useState("18.5k+");
  // Note: Downloads metric is currently static, could be fetched from npm/GitHub releases in the future
  const downloads = "1M+";

  useEffect(() => {
    fetch("https://api.github.com/repos/casbin/casbin")
      .then((res) => res.json())
      .then((data) => {
        const starCount = data.stargazers_count || 18500;
        setStars(starCount >= 1000 ? `${(starCount / 1000).toFixed(1)}k+` : `${starCount}+`);
      })
      .catch((err) => {
        console.error("Failed to fetch GitHub stats:", err);
        // Keep default values on error
      });
  }, []);

  const stats = [
    { label: "GitHub Stars", value: stars, icon: "⭐" },
    { label: "Downloads", value: downloads, icon: "📥" },
    { label: "Languages", value: "17+", icon: "🌐" },
    { label: "Companies", value: "500+", icon: "🏢" },
  ];

  return (
    <section className="py-12 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900/50">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="text-center p-6 rounded-lg bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-[#443D80] dark:text-purple-400 font-inter mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-inter">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyCasbinSection() {
  const useCases = [
    {
      title: "API Authorization",
      description: "Secure your REST and GraphQL APIs with fine-grained access control policies.",
      icon: "🔐",
    },
    {
      title: "Multi-Tenant SaaS",
      description: "Manage complex permission hierarchies across multiple organizations and teams.",
      icon: "🏗️",
    },
    {
      title: "Cloud Native Apps",
      description: "Integrate seamlessly with Kubernetes, Istio, and other cloud-native platforms.",
      icon: "☁️",
    },
    {
      title: "AI Gateway",
      description: "Control access to AI models and LLM endpoints with dynamic policy enforcement.",
      icon: "🤖",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-950 relative overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-5 dark:opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23443D80' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <div className="mx-auto max-w-6xl px-4 relative">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-50 mb-4 font-inter">
            Why Choose Casbin?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-inter">
            The most flexible and powerful authorization library for modern applications
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {useCases.map((useCase, idx) => (
            <Card
              key={idx}
              className="transition-all hover:shadow-xl hover:-translate-y-1 border-2 hover:border-[#443D80]/20"
            >
              <CardContent className="p-8">
                <div className="text-5xl mb-4">{useCase.icon}</div>
                <CardHeader className="p-0 mb-3">
                  <CardTitle className="text-2xl font-inter">{useCase.title}</CardTitle>
                </CardHeader>
                <p className="text-gray-600 dark:text-gray-400 font-inter leading-relaxed">
                  {useCase.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    {
      title: "Flexible Access Models",
      description:
        "Define authorization models using CONF files with PERM metamodel. Easily modify or upgrade access control logic by updating configuration.",
      icon: <Shield size={48} className="text-[#443D80]" />,
    },
    {
      title: "Multi-Storage Support",
      description: (
        <>
          Store policies in memory, files, or databases. Supports 20+ backends including MySQL,
          PostgreSQL, Redis, and cloud storage.{" "}
          <Link href="/docs/Adapters" className="text-[#443D80] hover:underline">
            See full list of adapters
          </Link>
          .
        </>
      ),
      icon: <Database size={48} className="text-[#443D80]" />,
    },
    {
      title: "Cross-Platform Libraries",
      description:
        "Available in Golang, Java, Node.js, Python, .NET, Rust, and more. Consistent API across all implementations.",
      icon: <Globe size={48} className="text-[#443D80]" />,
    },
    {
      title: "Policy Persistence",
      description:
        "Lightweight core library with pluggable adapters for policy storage. Supports third-party adapter contributions.",
      icon: <Database size={48} className="text-[#443D80]" />,
    },
    {
      title: "Scalable Enforcement",
      description:
        "Filtered policy loading for large-scale applications. Load only relevant policies to optimize performance in multi-tenant environments.",
      icon: <Scale size={48} className="text-[#443D80]" />,
    },
    {
      title: "Role Management",
      description: (
        <>
          Handle RBAC hierarchies and user-role mappings. Load from Casbin policies or external
          sources like LDAP, Okta, and Azure AD.{" "}
          <Link href="/docs/RoleManagers" className="text-[#443D80] hover:underline">
            See all available role managers
          </Link>
          .
        </>
      ),
      icon: <Users size={48} className="text-[#443D80]" />,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900/50 relative overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm20 2.5a17.5 17.5 0 1 0 0 35 17.5 17.5 0 0 0 0-35z' fill='%23443D80' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="mx-auto max-w-6xl px-4 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-50 mb-6 font-inter">
            Key Features
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-inter">
            Everything you need to implement robust authorization in your applications
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
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
    {
      name: "Golang",
      icon: "https://cdn.casbin.org/language/go-logo-1.svg",
      url: "https://github.com/casbin/casbin",
    },
    {
      name: "Java",
      icon: "https://cdn.casbin.org/language/jee-3.svg",
      url: "https://github.com/casbin/jcasbin",
    },
    {
      name: "C/C++",
      icon: "https://cdn.casbin.org/language/c.svg",
      url: "https://github.com/casbin/casbin-cpp",
    },
    {
      name: "Node.js",
      icon: "https://cdn.casbin.org/language/nodejs-1.svg",
      url: "https://github.com/casbin/node-casbin",
    },
    {
      name: "Front-end JavaScript",
      icon: "https://cdn.casbin.org/language/logo-javascript.svg",
      url: "https://github.com/casbin/casbin.js",
    },
    {
      name: "PHP",
      icon: "https://cdn.casbin.org/language/PHP-logo.svg",
      url: "https://github.com/php-casbin/php-casbin",
    },
    {
      name: "Laravel",
      icon: "https://cdn.casbin.org/language/laravel-2.svg",
      url: "https://github.com/php-casbin/laravel-authz",
    },
    {
      name: "Python",
      icon: "https://cdn.casbin.org/language/python-5.svg",
      url: "https://github.com/casbin/pycasbin",
    },
    {
      name: ".NET (C#)",
      icon: "https://cdn.casbin.org/language/dotnet-logo.svg",
      url: "https://github.com/casbin/Casbin.NET",
    },
    {
      name: "Delphi",
      icon: "https://cdn.casbin.org/language/delphi-2.svg",
      url: "https://github.com/casbin4d/Casbin4D",
    },
    {
      name: "Rust",
      icon: "https://cdn.casbin.org/language/rust.svg",
      url: "https://github.com/casbin/casbin-rs",
    },
    {
      name: "Ruby",
      icon: "https://cdn.casbin.org/language/ruby.svg",
      url: "https://github.com/CasbinRuby/casbin-ruby",
    },
    {
      name: "Swift (Objective-C)",
      icon: "https://cdn.casbin.org/language/swift-15.svg",
      url: "https://github.com/casbin/SwiftCasbin",
    },
    {
      name: "Lua (OpenResty, Kong, APISIX)",
      icon: "https://cdn.casbin.org/language/lua-5.svg",
      url: "https://github.com/casbin/lua-casbin",
    },
    {
      name: "Dart (Flutter)",
      icon: "https://cdn.casbin.org/language/dart.svg",
      url: "https://github.com/casbin/dart-casbin",
    },
    {
      name: "Elixir",
      icon: "https://cdn.casbin.org/language/elixir-lang-icon.svg",
      url: "https://github.com/casbin/casbin-ex",
    },
    {
      name: "Cloud Native (Kubernetes, Istio, Envoy, KubeSphere)",
      icon: "https://cdn.casbin.org/language/kubernets.svg",
      url: "/docs/cloud-native",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === languages.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused, languages.length]);

  const displayName = currentIndex >= 0 ? languages[currentIndex].name : "Multiple Languages";

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-950 relative overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.008]"
        style={{
          backgroundImage: `linear-gradient(to right, #443D80 1px, transparent 1px), linear-gradient(to bottom, #443D80 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
      <div className="mx-auto max-w-6xl px-4 relative">
        <div className="text-center mb-16 min-h-24 flex items-center justify-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 whitespace-nowrap font-inter">
            <span className="text-gray-600 dark:text-gray-400">Use Casbin with </span>
            <span className="animate-fade-in-up" style={{ color: "#443D80" }}>
              {displayName}
            </span>
          </h2>
        </div>

        <div
          className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-5xl mx-auto px-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {languages.map((lang, idx) => (
            <Card
              key={lang.name}
              className={`transition-all duration-300 cursor-pointer hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600 ${
                currentIndex === idx
                  ? "ring-2 ring-[#443D80] bg-[#443D80]/10 shadow-lg shadow-[#443D80]/20"
                  : "hover:bg-gray-50 dark:hover:bg-gray-800/30"
              }`}
              onMouseEnter={() => setCurrentIndex(idx)}
            >
              <CardContent className="p-4 text-center flex flex-col items-center justify-center">
                <a
                  href={lang.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                  title={lang.name}
                >
                  <div className="mb-3 p-3 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 shadow-sm hover:shadow-md transition-shadow">
                    <img
                      src={lang.icon}
                      alt={lang.name}
                      className="h-10 w-10 object-contain mx-auto"
                    />
                  </div>
                  <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 font-inter uppercase tracking-wide">
                    {lang.name}
                  </p>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function EditorPreview() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900/50 dark:to-gray-950">
      <div className="mx-auto max-w-6xl px-4">
        <Card className="w-full shadow-2xl border-2 hover:border-[#443D80]/30 transition-all duration-300">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#443D80] to-purple-600 bg-clip-text text-transparent">
              Try the Casbin Online Editor
            </CardTitle>
            <CardDescription className="text-lg max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
              Write and test your Casbin model and policy in real-time with the interactive online
              editor. Try different access control models and see results instantly.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg">
              <iframe
                src="https://editor.casbin.org"
                className="w-full h-96 md:h-[600px]"
                title="Casbin Online Editor"
              />
            </div>
            <div className="flex justify-center">
              <Button
                asChild
                size="lg"
                className="gap-2 text-lg py-6 px-8 bg-[#443D80] hover:bg-[#5a4fa0] text-white shadow-lg hover:shadow-xl hover:shadow-purple-500/30 transition-all"
              >
                <a href="https://editor.casbin.org" target="_blank" rel="noopener noreferrer">
                  Open Full Editor
                  <ExternalLink size={18} />
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function Showcase() {
  const [users, setUsers] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/users.json")
      .then((res) => res.json())
      .then((data) => {
        setUsers(Array.isArray(data) ? data.filter(Boolean) : []);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-950 relative overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.01]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #443D80 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />
      <div className="mx-auto max-w-6xl px-4 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-50 mb-6 font-inter">
            Who&apos;s using Casbin?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-inter leading-relaxed">
            Hundreds of projects use Casbin, from Fortune 500 companies to new startups. Check out{" "}
            <Link
              href="/user"
              className="font-semibold hover:underline transition-all"
              style={{ color: "#443D80" }}
            >
              these apps
            </Link>
            !
          </p>
        </div>

        {loading ? (
          <div className="flex flex-wrap justify-center gap-8 items-center">
            {Array.from({ length: 12 }).map((_, idx) => (
              <div
                key={idx}
                className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"
              ></div>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-4 items-center mx-auto">
            {users.map((user) => (
              <a
                key={user.caption}
                href={user.infolink || user.link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                title={user.caption}
                className="inline-flex justify-center items-center p-4 transition-all opacity-70 hover:opacity-100 hover:scale-110 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:shadow-lg"
              >
                <img
                  src={`/images/${user.image}`}
                  alt={user.caption}
                  className="object-contain"
                  style={{ maxWidth: "150px", maxHeight: "90px" }}
                />
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-50 dark:bg-slate-800 text-gray-700 dark:text-gray-300 py-8 md:py-12 border-t border-slate-200 dark:border-slate-700">
      <div className="mx-auto max-w-6xl px-4">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-start items-start gap-8 mb-8">
          {/* Brand Section */}
          <div className="w-auto">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="https://cdn.casbin.org/img/casbin_logo_1024x256.png"
                alt="Casbin"
                className="h-8 object-contain"
              />
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Copyright © {new Date().getFullYear()} Casbin Organization. Open source authorization
              library.
            </div>
          </div>

          {/* Links Section */}
          <div className="flex flex-col sm:flex-row gap-16 md:ml-8">
            {/* Docs */}
            <div>
              <h3 className="text-gray-900 dark:text-white font-semibold mb-3 text-sm">Docs</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/docs/get-started"
                    className="text-gray-600 dark:text-gray-400 hover:text-[#443D80] transition text-sm"
                  >
                    Getting Started
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs/management-api"
                    className="text-gray-600 dark:text-gray-400 hover:text-[#443D80] transition text-sm"
                  >
                    Management API
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs/rbac-api"
                    className="text-gray-600 dark:text-gray-400 hover:text-[#443D80] transition text-sm"
                  >
                    RBAC API
                  </Link>
                </li>
              </ul>
            </div>

            {/* Community */}
            <div>
              <h3 className="text-gray-900 dark:text-white font-semibold mb-3 text-sm">
                Community
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://discord.gg/S5UjpzGZjN"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-[#443D80] transition text-sm inline-flex items-center gap-2"
                  >
                    <MessageSquare className="h-4 w-4" />
                    Discord
                  </a>
                </li>
                <li>
                  <a
                    href="https://stackoverflow.com/search?q=casbin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-[#443D80] transition text-sm inline-flex items-center gap-2"
                  >
                    <HelpCircle className="h-4 w-4" />
                    Stack Overflow
                  </a>
                </li>
                <li>
                  <a
                    href="https://groups.google.com/g/casbin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-[#443D80] transition text-sm inline-flex items-center gap-2"
                  >
                    <Users2 className="h-4 w-4" />
                    Google Groups
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/casbin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-[#443D80] transition text-sm inline-flex items-center gap-2"
                  >
                    <Github className="h-4 w-4" />
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/casbinHQ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-[#443D80] transition text-sm inline-flex items-center gap-2"
                  >
                    <Twitter className="h-4 w-4" />
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function HomePage() {
  return (
    <main className="flex flex-col">
      <HeroHeader />
      <StatsSection />
      <WhyCasbinSection />
      <Features />
      <LanguageIntegration />
      <EditorPreview />
      <Showcase />
      <Footer />
    </main>
  );
}
