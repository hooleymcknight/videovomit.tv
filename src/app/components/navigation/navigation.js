"use client";

import { useRef, useState } from "react";
import './osn.css';

/**
 * OverlapStickerNav
 * -----------------
 * Stickers that VISUALLY overlap, while each one's CLICK/TOUCH target is its own
 * silhouette — so they never share a hit region (WCAG 2.5.8 stays satisfied as long
 * as each sticker is >= 24x24px; these are 120px).
 *
 * Two load-bearing tricks:
 *  1. `clip-path` on the <a> itself clips the *hit area*, not just the pixels. A click
 *     on a transparent corner falls through to whatever is behind it.
 *  2. Hovering / focusing a sticker raises its z-index AND KEEPS IT THERE (persistent
 *     bring-to-front) via a counter that only ever increases.
 */

const navItems = [
  { label: "Home",          href: "/homepage",                shape: "home",         c: "#020203", rot: -5, src: "/assets/nav/nav_home.webp" },
  { label: "Content",       href: "/content",                 shape: "content",      c: "#040404", rot: -2, src: "/assets/nav/nav_content.webp" },
  { label: "Podcasts",      href: "/content/podcasts",        shape: "podcasts",     c: "#1b191b", rot: -4, src: "/assets/nav/nav_podcasts.webp" },
  { label: "VOD Archives",  href: "/content/archive",         shape: "archives",     c: "#010101", rot: -4, src: "/assets/nav/nav_vod_archives.webp" },
  { label: "Merch",         href: "/merch",                   shape: "merch",        c: "#74b81f", rot: 1,  src: "/assets/nav/nav_merch2.webp" },
  { label: "Battle Arcade", href: "/community/battle-arcade", shape: "battlearcade", c: "#222222", rot: 4,  src: "/assets/nav/nav_battlearcade.webp" },
];

export default function OverlapStickerNav() {
    // z-index per sticker, kept in state. The ref only ever counts up, so a sticker
    // pulled up to the front stays there after mouseout.
    const [zs, setZs] = useState(() => navItems.map((_, i) => i + 1));
    const topZ = useRef(navItems.length);

    const bringToFront = (i) => {
        topZ.current += 1;
        setZs((prev) => {
        const next = [...prev];
        next[i] = topZ.current;
        return next;
        });
    };

    return (
        <div className="osn-wrap">
            <nav>
                <div className="nav-inner">
                    <div className="osn-nav" aria-label="Primary">
                        {navItems.map((item, i) => (
                        <a
                            key={item.href}
                            href={item.href}
                            aria-label={item.label}
                            className={`osn-sticker osn-${item.shape}`}
                            style={{ "--c": item.c, "--rot": `${item.rot}deg`, zIndex: zs[i] }}
                            onMouseEnter={() => bringToFront(i)}
                            onFocus={() => bringToFront(i)}
                        >
                            <span className="osn-fill">
                            <img src={item.src} alt="" height={100} width={160} className="osn-art" aria-hidden="true" />
                            {/* <span className="osn-label">{item.label}</span> */}
                            </span>
                        </a>
                        ))}
                    </div>
                </div>
            </nav>
        </div>
    );
}