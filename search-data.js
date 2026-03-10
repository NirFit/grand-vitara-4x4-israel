/**
 * מאגר חיפוש מלא - כל הקישורים והפריטים באתר
 * משמש את חיפוש ה-AI
 */
const SEARCH_DATA = [
    { href: 'https://notebooklm.google.com/notebook/9696a696-65f0-4db1-91de-d671880ca7b4', text: 'חוברת מכונאים אינטראקטיבית', icon: '📖', keywords: 'חוברת,מדריך,מכונאים,מידע,כללי,תחזוקה,חלפים' },
    { href: 'pages/maintenance.html', text: 'לוח טיפולים ותחזוקה', icon: '🧰', keywords: 'טיפולים,תחזוקה,שמן,מערכת,בלמים,מסנן,דיפרנציאל,מתלים' },
    { href: 'pages/oils.html', text: 'טבלת שמנים', icon: '🛢️', keywords: 'שמן,שמנים,מנוע,תיבת הילוכים,רדיאטור,קירור,בלמים' },
    { href: 'pages/drawings.html', text: 'שרטוטים', icon: '📊', keywords: 'שרטוט,שרטוטים,דיאגרמה,מבנה' },
    { href: 'pages/parts-numbers.html', text: 'מקטים', icon: '🔢', keywords: 'מקט,מקטים,מספר חלק,חלף' },
    { href: 'pages/bulbs.html', text: 'נורות לרכב', icon: '💡', keywords: 'נורה,נורות,תאורה,פנס' },
    { href: 'pages/radio-frequencies.html', text: 'טבלת תדרים למכשיר קשר', icon: '📡', keywords: 'קשר,מכשיר קשר,תדרים,רדיו' },
    { href: 'pages/diy.html', text: 'עשה זאת בעצמך - DIY', icon: '📺', keywords: 'DIY,עשה בעצמך,מדריך,התקנה' },
    { href: 'pages/parts-sites.html', text: 'רשימת אתרים לחלפים', icon: '🛠️', keywords: 'חלפים,אתרים,קנייה,רכש' },
    { href: 'pages/imports-approval.html', text: 'אישורי חלפים מחו"ל', icon: '🔧', keywords: 'אישור,חו"ל,יבוא,מכס' },
    { href: 'pages/recommended-purchase.html', text: 'רכש מומלץ של חלפים', icon: '📦', keywords: 'חלפים,רכש,קנייה,מומלץ' },
    { href: 'pages/recommended-businesses.html', text: 'בעלי עסקים מומלצים', icon: '⭐', keywords: 'עסק,מומלץ,מכונאי,טכנאי,שירות' },
    { href: 'pages/club-businesses.html', text: 'עסקים של חברי המועדון', icon: '💼', keywords: 'עסק,חברי מועדון,קהילה' },
    { href: 'pages/coupons.html', text: 'קודי קופון', icon: '🏷️', keywords: 'קופון,הנחה,מבצע' },
    { href: 'pages/regulations.html', text: 'תקנון המועדון', icon: '📖', keywords: 'תקנון,חוקים,מועדון,כללים' },
    { href: 'pages/trips.html', text: 'טיולים', icon: '🗺️', keywords: 'טיול,טיולים,מסלול,שטח' },
    { href: 'pages/transfer-case.html', text: 'בורר טרנספר דור 3', icon: '⚙️', keywords: 'טרנספר,בורר,דיפרנציאל,4x4' },
    { href: 'pages/tires.html', text: 'צמיגים', icon: '🛞', keywords: 'צמיג,צמיגים,גלגל' },
    { href: 'pages/extra.html', text: 'עמוד נוסף', icon: '📄', keywords: 'עמוד,מידע' },
    { href: 'https://www.youtube.com/watch?v=03iLQhNhn50', text: 'סרטון מכלולי הרכב - טל צופי', icon: '▶️', keywords: 'סרטון,מכלול,מכונאי,טל צופי' },
    { href: 'https://www.youtube.com/watch?v=joLBAsEqpy0', text: 'נעילה אחורית - גרנד ויטרה', icon: '▶️', keywords: 'נעילה,דיפרנציאל,לוקר' },
    { href: 'https://www.youtube.com/watch?v=Vhzzl7kUwaA', text: 'Traction Control', icon: '▶️', keywords: 'traction,control,בקרת' },
    { href: 'https://www.youtube.com/watch?v=eZbcYH9nM7c', text: 'טיול מועדון חוצה דרום', icon: '▶️', keywords: 'טיול,דרום,מעלה יאיר' },
    { href: 'https://www.youtube.com/watch?v=NKs2jLZXcLE', text: 'מפגש מועדון 2023 יער בן שמן', icon: '▶️', keywords: 'מפגש,מועדון,יער בן שמן' }
];
