"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SidebarNavItem } from "@/types/timeline";
import CenturyDivider from "../timeline/CenturyDivider";
import SidebarClient from "./SidebarClient";
import SidebarLink from "./SidebarLink";
import styles from "./Sidebar.module.scss";

interface SidebarProps {
  navItems: SidebarNavItem[];
  menuOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ navItems, menuOpen = false, onClose }: SidebarProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return undefined;

    // If the header's mobile hamburger button is visible, skip the stroke animation.
    // We select the menu button by its aria-label which is stable across the codebase.
    const menuBtn = document.querySelector('button[aria-label="Menu"]');
    const hamburgerVisible = Boolean(
      menuBtn &&
        window.getComputedStyle(menuBtn).display !== "none" &&
        // offsetParent null check filters out visibility: hidden / display: none
        (menuBtn as HTMLElement).offsetParent !== null
    );

    if (hamburgerVisible) return undefined; // do not run stroke-draw when hamburger is visible (mobile)

    const svg = svgRef.current;
    const stroked = svg.querySelectorAll("path, line, circle, rect");

    // animation settings (kept consistent with project):
    const DURATION = 0.7;
    const STAGGER = 0.04;
    const EASE = "power2.out";

    const tl = gsap.timeline({ defaults: { ease: EASE } });

    stroked.forEach((el, i) => {
      const svgEl = el as SVGGeometryElement;
      // @ts-ignore - getTotalLength exists on SVG geometry elements
      const length = svgEl.getTotalLength ? svgEl.getTotalLength() : 0;
      if (length > 0) {
        (svgEl as any).style.strokeDasharray = String(length);
        // start from -length so the draw appears from path end -> start (reverse)
        (svgEl as any).style.strokeDashoffset = String(-length);
        (svgEl as any).style.visibility = "visible";

        tl.to(svgEl, { strokeDashoffset: 0, duration: DURATION }, i * STAGGER);
      }
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <aside className={`${styles.sidebar} ${menuOpen ? styles.open : ""} sidebar`}>
      {/* SVG Background */}
      <svg
        ref={svgRef}
        className={styles.bgSvg}
        fill="none"
        viewBox="0 0 500 1200"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <path d="M150,1200 L150,550 L160,530 L160,400 L340,400 L340,530 L350,550 L350,1200" stroke="#D5C5AB" strokeLinejoin="round" strokeWidth="1.5"></path>
        <path d="M150,900 L350,900" stroke="#D5C5AB" strokeDasharray="10 10" strokeWidth="0.5"></path>
        <path d="M150,700 L350,700" stroke="#D5C5AB" strokeDasharray="10 10" strokeWidth="0.5"></path>
        <rect height="120" stroke="#D5C5AB" strokeWidth="1.5" width="180" x="160" y="400"></rect>
        <circle cx="250" cy="460" r="40" stroke="#D5C5AB" strokeWidth="1.2"></circle>
        <circle cx="250" cy="460" r="3" stroke="#D5C5AB" strokeWidth="1"></circle>
        <line stroke="#D5C5AB" strokeWidth="1" x1="250" x2="250" y1="425" y2="435"></line>
        <line stroke="#D5C5AB" strokeWidth="1" x1="250" x2="250" y1="485" y2="495"></line>
        <line stroke="#D5C5AB" strokeWidth="1" x1="285" x2="275" y1="460" y2="460"></line>
        <line stroke="#D5C5AB" strokeWidth="1" x1="215" x2="225" y1="460" y2="460"></line>
        <line stroke="#D5C5AB" strokeWidth="0.8" x1="250" x2="265" y1="460" y2="445"></line>
        <line stroke="#D5C5AB" strokeWidth="0.8" x1="250" x2="240" y1="460" y2="470"></line>
        <path d="M160,400 L250,50 L340,400" stroke="#D5C5AB" strokeLinejoin="round" strokeWidth="1.5"></path>
        <path d="M180,320 L250,120 L320,320" stroke="#D5C5AB" strokeOpacity="0.5" strokeWidth="0.5"></path>
        <path d="M200,250 L250,180 L300,250" stroke="#D5C5AB" strokeOpacity="0.5" strokeWidth="0.5"></path>
        <line stroke="#D5C5AB" strokeOpacity="0.5" strokeWidth="0.5" x1="250" x2="250" y1="50" y2="400"></line>
        <path d="M160,400 L140,320 L180,320 L160,400" stroke="#D5C5AB" strokeLinejoin="round" strokeWidth="1.2"></path>
        <line stroke="#D5C5AB" strokeWidth="1" x1="160" x2="160" y1="320" y2="300"></line>
        <path d="M340,400 L320,320 L360,320 L340,400" stroke="#D5C5AB" strokeLinejoin="round" strokeWidth="1.2"></path>
        <line stroke="#D5C5AB" strokeWidth="1" x1="340" x2="340" y1="320" y2="300"></line>
        <path d="M200,400 L190,340 L220,340 L210,400" stroke="#D5C5AB" strokeLinejoin="round" strokeWidth="1"></path>
        <line stroke="#D5C5AB" strokeWidth="1" x1="205" x2="205" y1="340" y2="330"></line>
        <path d="M300,400 L280,340 L310,340 L290,400" stroke="#D5C5AB" strokeLinejoin="round" strokeWidth="1"></path>
        <line stroke="#D5C5AB" strokeWidth="1" x1="295" x2="295" y1="340" y2="330"></line>
        <line stroke="#D5C5AB" strokeWidth="1.5" x1="250" x2="250" y1="50" y2="10"></line>
        <circle cx="250" cy="10" r="3" stroke="#D5C5AB" strokeWidth="1.5"></circle>
      </svg>

      <SidebarClient>
        {/* 🔹 SCROLL WRAPPER (Lenis wrapper) */}
        <div className={`${styles.wrapper} sidebar-wrapper`}>
          {/* 🔹 SCROLL CONTENT (Lenis content) */}
          <div className={`${styles.content} sidebar-content content`}>
            <div className={styles.navList}>
              {navItems.map((item, index) => {
                if (item.isCenturyDivider) {
                  return (
                    <CenturyDivider
                      key={item.id}
                      century={item.century || ''}
                    />
                  );
                }

                // Determine if this is the first event of a new century
                const isFirstOfCentury =
                  index === 0 || navItems[index - 1].isCenturyDivider;

                return (
                  <SidebarLink
                    key={item.id}
                    targetId={item.id}
                    year={item.year}
                    isFirstOfCentury={isFirstOfCentury}
                    onNavigate={onClose}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </SidebarClient>
    </aside>
  );
}
