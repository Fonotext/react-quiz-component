# Navigation Button Layout Changes

## What Changed

The navigation buttons (Previous/Next) now appear in a **sidebar column** to the right of the question content, floating vertically in the middle.

## Visual Layout

### Before:
```
┌─────────────────────────────────────┐
│  Question 1 / 5:                    │
│                                     │
│  What is TypeScript?                │
│                                     │
│  ○ A superset of JavaScript         │
│  ○ A framework                      │
│  ○ A library                        │
│                                     │
│  [Previous]          [Next]         │
└─────────────────────────────────────┘
```

### After:
```
┌──────────────────────────────┬──────────┐
│  Question 1 / 5:             │          │
│                              │          │
│  What is TypeScript?         │ [Previous]│
│                              │          │
│  ○ A superset of JavaScript  │  [Next]  │
│  ○ A framework               │          │
│  ○ A library                 │          │
│                              │          │
└──────────────────────────────┴──────────┘
```

## Changes Made

### 1. **Core.tsx** (Lines 415-491)
- Wrapped question content in `<div className="questionContentColumn">`
- Moved `questionBtnContainer` outside the content column
- Made it a sibling to the content (side-by-side layout)
- Added condition to only show when `isRunning` is true

### 2. **styles.css** (Lines 174-220)
Added new CSS rules:

#### Desktop Layout:
- `.questionWrapperBody` - Flexbox container with 2rem gap
- `.questionContentColumn` - Main content area (flex: 1)
- `.questionBtnContainer` - Sidebar with:
  - `position: sticky` - Stays visible while scrolling
  - `top: 50%` + `transform: translateY(-50%)` - Vertically centered
  - `flex-direction: column` - Buttons stacked vertically
  - `gap: 1rem` - Space between buttons
  - `min-width: 150px` - Consistent button width

#### Mobile Layout (< 768px):
- Reverts to original horizontal layout at bottom
- Buttons side-by-side instead of stacked
- No sticky positioning

## Features

✅ **Sticky positioning** - Buttons stay visible when scrolling long questions
✅ **Vertically centered** - Buttons float in the middle of the viewport
✅ **Responsive** - Automatically switches to bottom layout on mobile
✅ **Flexible** - Adapts to different question lengths
✅ **Accessible** - Maintains keyboard navigation and focus

## Customization Options

You can adjust the sidebar appearance by modifying these CSS properties:

```css
/* Change sidebar width */
.react-quiz-container .questionBtnContainer {
  min-width: 200px; /* Default: 150px */
}

/* Change gap between content and buttons */
.react-quiz-container .questionWrapperBody {
  gap: 3rem; /* Default: 2rem */
}

/* Change vertical position */
.react-quiz-container .questionBtnContainer {
  top: 40%; /* Default: 50% (middle) */
}

/* Change button spacing */
.react-quiz-container .questionBtnContainer {
  gap: 1.5rem; /* Default: 1rem */
}

/* Adjust mobile breakpoint */
@media (max-width: 992px) { /* Default: 768px */
  /* ... mobile styles ... */
}
```

## Browser Compatibility

- ✅ Chrome/Edge (modern)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers
- ⚠️ IE11 (requires flexbox polyfill)

## Testing

To test the new layout:

1. Build the project: `npm run build`
2. Link locally: `npm link`
3. In your test project: `npm link react-quiz-component`
4. Create a quiz with long questions to see sticky behavior
5. Resize browser window to test responsive breakpoint

## Rollback

If you need to revert to the original layout:

```bash
git checkout HEAD~2 -- src/lib/Core.tsx src/lib/styles.css
npm run build
```
