module.exports = [
(()=>{"use strict";return[
"[project]/src/components/layout/CookieConsent.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CookieConsent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const STORAGE_KEY = "maporn-cookie-consent";
function CookieConsent() {
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const [visible, setVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Reads a browser-only external system (localStorage); cannot be resolved during render.
        let hasConsent = false;
        try {
            hasConsent = Boolean(localStorage.getItem(STORAGE_KEY));
        } catch  {
            hasConsent = false;
        }
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setVisible(!hasConsent);
    }, []);
    function accept(value) {
        try {
            localStorage.setItem(STORAGE_KEY, value);
        } catch  {
        // ignore storage errors (private browsing, etc.)
        }
        setVisible(false);
    }
    if (!visible || pathname === "/home-2") return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-x-0 bottom-0 z-[60] lg:pb-0 pb-16",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container-page pb-4",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card-elevated bg-white shadow-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[11px] sm:text-sm text-brand-slate leading-relaxed flex-1",
                        children: [
                            "เว็บไซต์นี้ใช้คุกกี้เพื่อมอบประสบการณ์การใช้งานที่ดียิ่งขึ้น และเพื่อวิเคราะห์การเข้าใช้งานเว็บไซต์ ตาม",
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/pdpa",
                                className: "underline text-brand-navy font-medium",
                                children: "นโยบาย PDPA"
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/CookieConsent.tsx",
                                lineNumber: 43,
                                columnNumber: 13
                            }, this),
                            " ",
                            "และ",
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/privacy-policy",
                                className: "underline text-brand-navy font-medium",
                                children: "นโยบายความเป็นส่วนตัว"
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/CookieConsent.tsx",
                                lineNumber: 47,
                                columnNumber: 13
                            }, this),
                            " ",
                            "ของเรา"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/CookieConsent.tsx",
                        lineNumber: 40,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2 shrink-0 w-full sm:w-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>accept("essential"),
                                className: "btn-outline text-xs flex-1 sm:flex-none",
                                children: "เฉพาะที่จำเป็น"
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/CookieConsent.tsx",
                                lineNumber: 53,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>accept("all"),
                                className: "btn-red text-xs flex-1 sm:flex-none",
                                children: "ยอมรับทั้งหมด"
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/CookieConsent.tsx",
                                lineNumber: 56,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/CookieConsent.tsx",
                        lineNumber: 52,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/CookieConsent.tsx",
                lineNumber: 39,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/layout/CookieConsent.tsx",
            lineNumber: 38,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/layout/CookieConsent.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/layout/Footer.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Footer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$company$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data/company.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$MapornLogo$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/MapornLogo.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
const FOOTER_COLUMNS = [
    {
        title: "รถยนต์",
        links: [
            {
                href: "/cars",
                label: "รถยนต์ทั้งหมด"
            },
            {
                href: "/brands",
                label: "แบรนด์ที่มาพร ออโต้ กรุ๊ป จัดจำหน่าย"
            },
            {
                href: "/promotions",
                label: "โปรโมชั่น"
            },
            {
                href: "/compare",
                label: "เปรียบเทียบรถยนต์"
            }
        ]
    },
    {
        title: "บริการ",
        links: [
            {
                href: "/service",
                label: "ศูนย์บริการ"
            },
            {
                href: "/finance",
                label: "สินเชื่อรถยนต์"
            },
            {
                href: "/test-drive",
                label: "จองทดลองขับ"
            },
            {
                href: "/quotation",
                label: "ขอใบเสนอราคา"
            }
        ]
    },
    {
        title: "เกี่ยวกับ Maporn",
        links: [
            {
                href: "/about",
                label: "ประวัติบริษัท"
            },
            {
                href: "/branches",
                label: "โชว์รูม / สาขา"
            },
            {
                href: "/news",
                label: "ข่าวสาร"
            },
            {
                href: "/photo-credits",
                label: "เครดิตภาพ"
            }
        ]
    }
];
const ICONS = {
    Facebook: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
        d: "M14 8.5h2V5.5h-2c-1.93 0-3.5 1.57-3.5 3.5v1.5H8.5v3h2V22h3v-8.5h2.33l.5-3H13.5V9c0-.28.22-.5.5-.5Z",
        fill: "currentColor"
    }, void 0, false, {
        fileName: "[project]/src/components/layout/Footer.tsx",
        lineNumber: 39,
        columnNumber: 13
    }, ("TURBOPACK compile-time value", void 0)),
    Instagram: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "3",
                y: "3",
                width: "18",
                height: "18",
                rx: "5",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "1.8"
            }, void 0, false, {
                fileName: "[project]/src/components/layout/Footer.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "12",
                cy: "12",
                r: "4",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "1.8"
            }, void 0, false, {
                fileName: "[project]/src/components/layout/Footer.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "17.5",
                cy: "6.5",
                r: "1.1",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/src/components/layout/Footer.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/Footer.tsx",
        lineNumber: 41,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0)),
    YouTube: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "2.5",
                y: "5.5",
                width: "19",
                height: "13",
                rx: "4",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "1.8"
            }, void 0, false, {
                fileName: "[project]/src/components/layout/Footer.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "m10 9.5 5 2.5-5 2.5v-5Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/src/components/layout/Footer.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/Footer.tsx",
        lineNumber: 48,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0)),
    Line: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
        d: "M12 3C6.5 3 2 6.6 2 11c0 3.9 3.5 7.2 8.3 7.9.3.1.8.2.9.5.1.3 0 .7 0 1l-.1 1c0 .3-.2 1.1 1 .6s6.4-3.8 8.8-6.5C22.5 13.7 22 12.4 22 11c0-4.4-4.5-8-10-8Z",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "1.8",
        strokeLinejoin: "round"
    }, void 0, false, {
        fileName: "[project]/src/components/layout/Footer.tsx",
        lineNumber: 53,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0))
};
const SOCIAL_LINKS = [
    {
        href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$company$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["company"].facebook,
        label: "Facebook"
    },
    {
        href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$company$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["company"].instagram,
        label: "Instagram"
    },
    {
        href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$company$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["company"].youtube,
        label: "YouTube"
    },
    {
        href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$company$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["company"].lineUrl,
        label: "Line"
    }
];
function Footer() {
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    // HomePage 2 demo is a strict single-viewport (no-scroll) layout — the
    // real site chrome that adds page height (footer) is intentionally hidden there.
    if (pathname === "/home-2") return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: "relative overflow-hidden bg-brand-navy text-white pb-24 lg:pb-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-red/70 to-transparent"
            }, void 0, false, {
                fileName: "[project]/src/components/layout/Footer.tsx",
                lineNumber: 71,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none absolute -top-40 left-1/2 h-72 w-[720px] -translate-x-1/2 rounded-full bg-brand-red/[0.08] blur-[130px]"
            }, void 0, false, {
                fileName: "[project]/src/components/layout/Footer.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "container-page relative py-16 sm:py-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-12 gap-y-14",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "col-span-2 lg:col-span-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$MapornLogo$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                variant: "white",
                                className: "mb-5 h-auto w-full max-w-[220px]"
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/Footer.tsx",
                                lineNumber: 75,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "max-w-xs text-sm text-[#94A3B8] leading-relaxed",
                                children: "ตัวแทนจำหน่ายรถยนต์อย่างเป็นทางการ 7 แบรนด์ พร้อมบริการครบวงจรทั่วประเทศไทย"
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/Footer.tsx",
                                lineNumber: 76,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/Footer.tsx",
                        lineNumber: 74,
                        columnNumber: 9
                    }, this),
                    FOOTER_COLUMNS.map((col)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-sm font-bold tracking-wide mb-6 text-white",
                                    children: col.title
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Footer.tsx",
                                    lineNumber: 83,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "space-y-3",
                                    children: col.links.map((l)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                href: l.href,
                                                className: "text-sm text-[#94A3B8] hover:text-white transition-colors",
                                                children: l.label
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/Footer.tsx",
                                                lineNumber: 87,
                                                columnNumber: 19
                                            }, this)
                                        }, l.href, false, {
                                            fileName: "[project]/src/components/layout/Footer.tsx",
                                            lineNumber: 86,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Footer.tsx",
                                    lineNumber: 84,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, col.title, true, {
                            fileName: "[project]/src/components/layout/Footer.tsx",
                            lineNumber: 82,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-sm font-bold tracking-wide mb-6 text-white",
                                children: "ติดต่อ"
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/Footer.tsx",
                                lineNumber: 97,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "space-y-3 text-sm text-[#94A3B8] leading-relaxed",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$company$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["company"].hqAddress
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/Footer.tsx",
                                        lineNumber: 99,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: [
                                            "โทร: ",
                                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$company$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["company"].phone
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/layout/Footer.tsx",
                                        lineNumber: 100,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$company$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["company"].email
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/Footer.tsx",
                                        lineNumber: 101,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/layout/Footer.tsx",
                                lineNumber: 98,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-sm font-bold tracking-wide mb-4 mt-10 text-white",
                                children: "Social Media"
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/Footer.tsx",
                                lineNumber: 104,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "flex items-center gap-3",
                                children: SOCIAL_LINKS.map((sl)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: sl.href,
                                            target: "_blank",
                                            rel: "noreferrer",
                                            "aria-label": sl.label,
                                            title: sl.label,
                                            className: "flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-[#94A3B8] transition-all hover:border-white/60 hover:bg-white/10 hover:text-white",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                viewBox: "0 0 24 24",
                                                className: "h-[18px] w-[18px]",
                                                "aria-hidden": "true",
                                                children: ICONS[sl.label]
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/Footer.tsx",
                                                lineNumber: 109,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/Footer.tsx",
                                            lineNumber: 108,
                                            columnNumber: 17
                                        }, this)
                                    }, sl.label, false, {
                                        fileName: "[project]/src/components/layout/Footer.tsx",
                                        lineNumber: 107,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/Footer.tsx",
                                lineNumber: 105,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/Footer.tsx",
                        lineNumber: 96,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/Footer.tsx",
                lineNumber: 73,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-t border-white/10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container-page py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[#94A3B8]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: [
                                "© ",
                                new Date().getFullYear(),
                                " ",
                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$company$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["company"].legalName,
                                " เลขผู้เสียภาษี ",
                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$company$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["company"].taxId,
                                " สงวนลิขสิทธิ์"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/Footer.tsx",
                            lineNumber: 119,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap gap-x-5 gap-y-2 justify-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/privacy-policy",
                                    className: "transition-colors hover:text-white",
                                    children: "นโยบายความเป็นส่วนตัว"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Footer.tsx",
                                    lineNumber: 123,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/terms",
                                    className: "transition-colors hover:text-white",
                                    children: "ข้อกำหนดและเงื่อนไข"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Footer.tsx",
                                    lineNumber: 126,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/pdpa",
                                    className: "transition-colors hover:text-white",
                                    children: "PDPA"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Footer.tsx",
                                    lineNumber: 129,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/Footer.tsx",
                            lineNumber: 122,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/Footer.tsx",
                    lineNumber: 118,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/layout/Footer.tsx",
                lineNumber: 117,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/Footer.tsx",
        lineNumber: 70,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/layout/Header.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Header
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/menu.mjs [app-ssr] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.mjs [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.mjs [app-ssr] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$MapornLogo$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/MapornLogo.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
const NAV_LINKS = [
    {
        href: "/",
        label: "หน้าแรก"
    },
    {
        href: "/brands",
        label: "แบรนด์ที่มาพร ออโต้ กรุ๊ป จัดจำหน่าย"
    },
    {
        href: "/service",
        label: "ศูนย์บริการ/ซ่อมสีและตัวถัง"
    },
    {
        href: "/branches",
        label: "โชว์รูม & สาขา"
    },
    {
        href: "/news",
        label: "บทความ"
    },
    {
        href: "/about",
        label: "เกี่ยวกับเรา"
    },
    {
        href: "/contact",
        label: "ติดต่อเรา"
    }
];
// Brand order per client: OMODA | JAECOO, GWM, Suzuki, Lepas, Wuling, Farizon, Suzy Fix.
// Logos are trimmed copies (public/brand/logos/header/) and `ratio` is each file's width ÷ height, so every
// mark can be drawn at the same visual area (see BrandMark) instead of the same box.
const BRAND_STRIP = [
    {
        key: "omoda-jaecoo",
        name: "OMODA | JAECOO",
        href: "/brands/omoda",
        logo: "/brand/logos/omoda-jaecoo.svg",
        ratio: 18.82,
        wide: true
    },
    {
        key: "gwm",
        name: "GWM",
        href: "/brands/gwm",
        logo: "/brand/logos/header/gwm.png",
        ratio: 4.89
    },
    {
        key: "suzuki",
        name: "Suzuki",
        href: "/brands/suzuki",
        logo: "/brand/logos/header/suzuki.png",
        ratio: 1.49
    },
    {
        key: "lepas",
        name: "Lepas",
        href: "/brands/lepas",
        logo: "/brand/logos/header/lepas.png",
        ratio: 3.3
    },
    {
        key: "wuling",
        name: "Wuling",
        href: "/brands/wuling",
        logo: "/brand/logos/header/wuling-2026.png",
        ratio: 1.47
    },
    {
        key: "farizon",
        name: "Farizon",
        href: "/brands/farizon",
        logo: "/brand/logos/header/farizon-2026.png",
        ratio: 1.08
    },
    {
        key: "suzyfix",
        name: "Suzy Fix",
        href: "/branches/suzy-fix",
        logo: "/brand/logos/header/suzyfix-2026.png",
        ratio: 4.75
    }
];
// Menu brand list (text), client order.
const MENU_BRANDS = [
    {
        name: "OMODA | JAECOO",
        href: "/brands/omoda"
    },
    {
        name: "GWM",
        href: "/brands/gwm"
    },
    {
        name: "Suzuki",
        href: "/brands/suzuki"
    },
    {
        name: "Lepas",
        href: "/brands/lepas"
    },
    {
        name: "Wuling",
        href: "/brands/wuling"
    },
    {
        name: "Farizon",
        href: "/brands/farizon"
    },
    {
        name: "Suzy Fix",
        href: "/branches/suzy-fix"
    }
];
// Equal visual area: width × height is the same for every logo (height capped so square marks don't tower).
// The OMODA | JAECOO wordmark is so long that equal area would make it unreadable, so it gets a fixed width.
const LOGO_AREA = 1400;
const LOGO_MAX_H = 36;
function BrandMark({ b, compact }) {
    let w;
    let h;
    if ("wide" in b && b.wide) {
        w = 150;
        h = w / b.ratio;
    } else {
        const k = compact ? 0.82 : 1;
        h = Math.min(LOGO_MAX_H, Math.sqrt(LOGO_AREA / b.ratio)) * k;
        w = h * b.ratio;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
        src: b.logo,
        alt: b.name,
        width: Math.round(w),
        height: Math.round(h),
        style: {
            width: w,
            height: h
        },
        className: "max-w-full object-contain"
    }, void 0, false, {
        fileName: "[project]/src/components/layout/Header.tsx",
        lineNumber: 60,
        columnNumber: 10
    }, this);
}
// Floating brand logo: no box. Each logo bobs gently on its own soft shadow; on hover it lifts,
// the shadow widens and a red hairline + "ดูรุ่นรถ" caption appear. The current brand keeps the hairline.
function BrandFloat({ b, active, index, compact }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        href: b.href,
        title: b.key === "suzyfix" ? "ศูนย์ซ่อมสีและตัวถัง Suzy Fix" : `ดูรุ่นรถ ${b.name}`,
        "aria-current": active ? "page" : undefined,
        className: `brand-float group relative flex min-w-0 flex-col items-center justify-center ${compact ? "h-14 px-0" : "h-16 shrink px-0"}`,
        style: {
            ["--d"]: `${index * -0.45}s`
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "brand-float-mark flex h-9 max-w-full items-center transition-transform duration-300 ease-out group-hover:-translate-y-1.5",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(BrandMark, {
                    b: b,
                    compact: compact
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/Header.tsx",
                    lineNumber: 75,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/layout/Header.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "brand-float-shadow pointer-events-none mt-1 h-1 w-10 rounded-[50%] bg-black/15 blur-[3px] transition-all duration-300 group-hover:w-12 group-hover:bg-black/10"
            }, void 0, false, {
                fileName: "[project]/src/components/layout/Header.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `pointer-events-none absolute bottom-1 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-brand-red transition-all duration-300 ${active ? "w-6" : "w-0 group-hover:w-6"}`
            }, void 0, false, {
                fileName: "[project]/src/components/layout/Header.tsx",
                lineNumber: 79,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "pointer-events-none absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#101113] px-2.5 py-1 text-[10px] font-bold text-white opacity-0 shadow-lg transition-all duration-200 group-hover:-bottom-6 group-hover:opacity-100",
                children: b.key === "suzyfix" ? "ซ่อมสี/ตัวถัง" : "ดูรุ่นรถ"
            }, void 0, false, {
                fileName: "[project]/src/components/layout/Header.tsx",
                lineNumber: 82,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/Header.tsx",
        lineNumber: 67,
        columnNumber: 5
    }, this);
}
function Header() {
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [brandsOpen, setBrandsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const isActive = (b)=>b.key === "omoda-jaecoo" ? /^\/brands\/(omoda|jaecoo)/.test(pathname) : b.href.startsWith("/brands/") && pathname.startsWith(b.href);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-black/[0.06] shadow-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-4 h-16",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/",
                                className: "flex items-center gap-2.5 shrink-0 lg:mr-2 lg:border-r lg:border-black/10 lg:pr-6 xl:mr-4 xl:pr-8",
                                onClick: ()=>setOpen(false),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$MapornLogo$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    variant: "red",
                                    className: "h-8 w-auto sm:h-9 xl:h-10"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Header.tsx",
                                    lineNumber: 102,
                                    columnNumber: 11
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/Header.tsx",
                                lineNumber: 101,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                "aria-label": "แบรนด์รถยนต์",
                                className: "hidden lg:flex flex-1 min-w-0 items-center justify-evenly gap-3 overflow-x-clip",
                                children: BRAND_STRIP.map((b, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(BrandFloat, {
                                        b: b,
                                        active: isActive(b),
                                        index: i
                                    }, b.key, false, {
                                        fileName: "[project]/src/components/layout/Header.tsx",
                                        lineNumber: 108,
                                        columnNumber: 13
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/Header.tsx",
                                lineNumber: 106,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                                children: `
          @keyframes brandBob {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-2px); }
          }
          @keyframes brandBobShadow {
            0%, 100% { transform: scaleX(1); opacity: 1; }
            50% { transform: scaleX(0.82); opacity: 0.7; }
          }
          .brand-float .brand-float-mark > * { animation: brandBob 3.6s ease-in-out infinite; animation-delay: var(--d, 0s); }
          .brand-float .brand-float-shadow { animation: brandBobShadow 3.6s ease-in-out infinite; animation-delay: var(--d, 0s); }
          .brand-float:hover .brand-float-mark > *, .brand-float:hover .brand-float-shadow { animation-play-state: paused; }
          @media (prefers-reduced-motion: reduce) {
            .brand-float .brand-float-mark > *, .brand-float .brand-float-shadow { animation: none; }
          }
        `
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/Header.tsx",
                                lineNumber: 112,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 ml-auto lg:ml-0",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    "aria-label": open ? "ปิดเมนู" : "เปิดเมนู",
                                    "aria-expanded": open,
                                    onClick: ()=>setOpen((v)=>!v),
                                    className: "inline-flex items-center justify-center h-9 w-9 rounded-lg border border-black/10 bg-black/[0.02] text-brand-navy",
                                    children: open ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/Header.tsx",
                                        lineNumber: 140,
                                        columnNumber: 21
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/Header.tsx",
                                        lineNumber: 140,
                                        columnNumber: 49
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Header.tsx",
                                    lineNumber: 133,
                                    columnNumber: 11
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/Header.tsx",
                                lineNumber: 130,
                                columnNumber: 9
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/Header.tsx",
                        lineNumber: 99,
                        columnNumber: 7
                    }, this),
                    open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border-t border-black/[0.06] bg-white px-6 py-10",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                            className: "flex flex-col space-y-6",
                            children: NAV_LINKS.map((link)=>{
                                const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                                if (link.href === "/brands") {
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                "aria-expanded": brandsOpen,
                                                onClick: ()=>setBrandsOpen((v)=>!v),
                                                className: `flex w-full items-center gap-2 text-2xl font-light transition-all duration-300 hover:text-brand-red ${active || brandsOpen ? "text-brand-red" : "text-brand-navy"}`,
                                                children: [
                                                    link.label,
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                        className: `h-5 w-5 transition-transform duration-300 ${brandsOpen ? "rotate-180" : ""}`
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/layout/Header.tsx",
                                                        lineNumber: 164,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/layout/Header.tsx",
                                                lineNumber: 155,
                                                columnNumber: 21
                                            }, this),
                                            brandsOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-4 ml-1 flex flex-col space-y-3 border-l border-black/10 pl-5",
                                                children: MENU_BRANDS.map((b)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                        href: b.href,
                                                        onClick: ()=>setOpen(false),
                                                        className: "w-fit text-base font-medium text-brand-slate transition-colors hover:text-brand-red",
                                                        children: b.name
                                                    }, b.name, false, {
                                                        fileName: "[project]/src/components/layout/Header.tsx",
                                                        lineNumber: 169,
                                                        columnNumber: 27
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/Header.tsx",
                                                lineNumber: 167,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, link.href, true, {
                                        fileName: "[project]/src/components/layout/Header.tsx",
                                        lineNumber: 154,
                                        columnNumber: 19
                                    }, this);
                                }
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: link.href,
                                    onClick: ()=>setOpen(false),
                                    className: `w-fit text-2xl font-light transition-all duration-300 hover:translate-x-3 hover:text-brand-red ${active ? "text-brand-red" : "text-brand-navy"}`,
                                    children: link.label
                                }, link.href, false, {
                                    fileName: "[project]/src/components/layout/Header.tsx",
                                    lineNumber: 185,
                                    columnNumber: 17
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/Header.tsx",
                            lineNumber: 148,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/Header.tsx",
                        lineNumber: 147,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/Header.tsx",
                lineNumber: 98,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "lg:hidden border-b border-black/[0.06] bg-white",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                    "aria-label": "แบรนด์รถยนต์",
                    className: "grid grid-cols-4 items-center px-1",
                    children: BRAND_STRIP.map((b, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "wide" in b && b.wide ? "col-span-2 flex justify-center" : "flex justify-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(BrandFloat, {
                                b: b,
                                active: isActive(b),
                                index: i,
                                compact: true
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/Header.tsx",
                                lineNumber: 208,
                                columnNumber: 13
                            }, this)
                        }, b.key, false, {
                            fileName: "[project]/src/components/layout/Header.tsx",
                            lineNumber: 207,
                            columnNumber: 11
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/Header.tsx",
                    lineNumber: 205,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/layout/Header.tsx",
                lineNumber: 203,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/Header.tsx",
        lineNumber: 97,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/layout/MobileBottomNav.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MobileBottomNav
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$company$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data/company.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
// Brand glyphs (LINE and Facebook marks), drawn white on each brand's own colour.
function LineIcon({ className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 24 24",
        fill: "currentColor",
        className: className,
        "aria-hidden": "true",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"
        }, void 0, false, {
            fileName: "[project]/src/components/layout/MobileBottomNav.tsx",
            lineNumber: 10,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/layout/MobileBottomNav.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
function FacebookIcon({ className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 24 24",
        fill: "currentColor",
        className: className,
        "aria-hidden": "true",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M14 8.5h2V5.5h-2c-1.93 0-3.5 1.57-3.5 3.5v1.5H8.5v3H10.5V22h3v-8.5H15.83l.5-3H13.5V9c0-.28.22-.5.5-.5Z"
        }, void 0, false, {
            fileName: "[project]/src/components/layout/MobileBottomNav.tsx",
            lineNumber: 18,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/layout/MobileBottomNav.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
// Floating contact buttons on every page: LINE OA Maporn Auto Group and the Maporn Group Facebook page.
const ACTIONS = [
    {
        key: "line",
        href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$company$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["company"].lineUrl,
        label: "LINE Maporn Auto Group",
        icon: LineIcon,
        bg: "#06C755",
        iconClass: "h-7 w-7"
    },
    {
        key: "facebook",
        href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$company$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["company"].facebook,
        label: "Facebook Maporn Group",
        icon: FacebookIcon,
        bg: "#1877F2",
        iconClass: "h-7 w-7"
    }
];
function MobileBottomNav() {
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    if (pathname === "/home-2") return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed right-3 bottom-24 z-40 flex flex-col gap-3 sm:right-4 lg:bottom-6",
        children: ACTIONS.map((a)=>{
            const Icon = a.icon;
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                href: a.href,
                target: "_blank",
                rel: "noreferrer",
                "aria-label": a.label,
                title: a.label,
                className: "flex h-14 w-14 items-center justify-center rounded-full text-white shadow-[0_8px_24px_rgba(0,0,0,0.35)] ring-2 ring-white/90 transition-all hover:scale-110 hover:shadow-[0_12px_30px_rgba(0,0,0,0.45)]",
                style: {
                    backgroundColor: a.bg
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                    className: a.iconClass
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/MobileBottomNav.tsx",
                    lineNumber: 49,
                    columnNumber: 13
                }, this)
            }, a.key, false, {
                fileName: "[project]/src/components/layout/MobileBottomNav.tsx",
                lineNumber: 39,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/src/components/layout/MobileBottomNav.tsx",
        lineNumber: 35,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/ui/MapornLogo.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Company logo, exported from the client's Illustrator master (Set-Logo.ai).
// red = main logo (CI gradient #FF0000 → #AD0000) for light backgrounds; white for dark/photo
// backgrounds; black for single-colour use.
__turbopack_context__.s([
    "default",
    ()=>MapornLogo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
function MapornLogo({ variant = "red", className = "h-8 w-auto" }) {
    return(// eslint-disable-next-line @next/next/no-img-element
    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
        src: `/brand/maporn-logo-${variant}.svg`,
        alt: "Maporn Auto Group",
        width: 999,
        height: 241,
        className: className
    }, void 0, false, {
        fileName: "[project]/src/components/ui/MapornLogo.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this));
}
}),
"[project]/src/lib/data/company.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "company",
    ()=>company,
    "companyTimeline",
    ()=>companyTimeline,
    "companyValues",
    ()=>companyValues,
    "serviceDepartments",
    ()=>serviceDepartments
]);
const company = {
    name: "Maporn Autogroup",
    legalName: "บริษัท มาพรพาณิชย์ จำกัด",
    taxId: "0105531023081",
    domain: "www.mapornautogroup.com",
    hqAddress: "เลขที่ 2 ซอยมาพร ถนนศรีนครินทร์ แขวงหนองบอน เขตประเวศ กรุงเทพมหานคร 10250",
    // Maporn Group central number (Social media bible)
    phone: "099-226-4741",
    salesPhone: "099-226-4741",
    email: "info@mapornautogroup.com",
    line: "@mapornautogroup",
    // LINE OA Maporn Auto Group (add-friend link)
    lineUrl: "https://line.me/R/ti/p/@mapornautogroup",
    // Maporn Group - มาพรกรุ๊ป
    facebook: "https://www.facebook.com/profile.php?id=61569211525303",
    instagram: "https://instagram.com/mapornautogroup",
    youtube: "https://youtube.com/@MapornAutogroup",
    officeHours: "จันทร์ - เสาร์ 08:00 - 17:00 น.",
    branchCount: 8,
    serviceCenterCount: 9,
    foundedYear: "1988",
    motto: "ร่วมใจพัฒนา คิดอย่างสร้างสรรค์ บริการด้วยใจ",
    servicePhilosophy: "บริการคุณภาพ จากเรา… มาพรพาณิชย์"
};
const serviceDepartments = [
    {
        title: "ศูนย์บริการรถยนต์",
        description: "ตรวจเช็กและซ่อมบำรุงตามระยะ โดยช่างเทคนิคที่ผ่านการอบรมมาตรฐานจากแต่ละแบรนด์"
    },
    {
        title: "ศูนย์อะไหล่แท้",
        description: "จำหน่ายอะไหล่แท้ครบทุกแบรนด์ในเครือ พร้อมจัดส่งรวดเร็ว"
    },
    {
        title: "ศูนย์ซ่อมสีและตัวถัง",
        description: "งานซ่อมสีและตัวถังมาตรฐานโรงงาน ภายใต้แบรนด์ Suzy Fix"
    },
    {
        title: "ศูนย์ติดตั้งแก๊สรถยนต์ (LPG)",
        description: "ศูนย์ติดตั้งแก๊สรถยนต์ที่ได้รับใบอนุญาตจากกรมการขนส่งทางบก"
    }
];
const companyTimeline = [
    {
        period: "1988–ปัจจุบัน",
        items: [
            "ก่อตั้งตัวแทนจำหน่าย SUZUKI"
        ]
    },
    {
        period: "2012–2021",
        items: [
            "ขยายสาขา SUZUKI เทพารักษ์"
        ]
    },
    {
        period: "2017–2023",
        items: [
            "ขยายสาขา SUZUKI มีนบุรี"
        ]
    },
    {
        period: "2023–ปัจจุบัน",
        items: [
            "เปิด SUZYFIX",
            "เริ่มธุรกิจรถยนต์ไฟฟ้าเชิงพาณิชย์"
        ]
    },
    {
        period: "2024–ปัจจุบัน",
        items: [
            "ขยายสาขา SUZUKI ระยอง"
        ]
    },
    {
        period: "2024–ปัจจุบัน",
        items: [
            "เปิดตัวรถไฟฟ้าเชิงพาณิชย์ FARIZON"
        ]
    },
    {
        period: "2025–ปัจจุบัน",
        items: [
            "ขยายธุรกิจ OMODA JAECOO ระยอง"
        ]
    },
    {
        period: "2026–ปัจจุบัน",
        items: [
            "ขยายสาขา SUZUKI ศรีราชา",
            "ขยายธุรกิจ GWM กทม",
            "ขยายธุรกิจ WULING, LEPAS ระยอง"
        ]
    }
];
const companyValues = [
    {
        title: "ความน่าเชื่อถือ",
        description: "ตัวแทนจำหน่ายอย่างเป็นทางการ พร้อมบริการหลังการขายมาตรฐานสากล ดำเนินธุรกิจมากว่า 40 ปี"
    },
    {
        title: "ครบทุกแบรนด์",
        description: "รวม 7 แบรนด์ชั้นนำไว้ในที่เดียว ตอบโจทย์ทุกไลฟ์สไตล์การเดินทาง"
    },
    {
        title: "บริการครบวงจร",
        description: "ตั้งแต่การเลือกซื้อ ทดลองขับ ไฟแนนซ์ ไปจนถึงศูนย์บริการหลังการขายภายใต้แบรนด์ Suzy Fix"
    },
    {
        title: "ทีมงานมืออาชีพ",
        description: "ทีมขายและช่างเทคนิคที่ผ่านการอบรมมาตรฐานจากทุกแบรนด์"
    }
];
}),
]})(),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/dynamic-access-async-storage.external.js [external] (next/dist/server/app-render/dynamic-access-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/dynamic-access-async-storage.external.js", () => require("next/dist/server/app-render/dynamic-access-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/runtime-reacts.external.js", () => require("next/dist/server/runtime-reacts.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__04cdi0zwq89-5._.js.map