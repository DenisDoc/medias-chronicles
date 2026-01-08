# Animation Testing Checklist

## Development Server
**URL:** http://localhost:3001

---

## 1. Smooth Scrolling (Lenis)

### Test Steps:
- [ ] Scroll with mouse wheel - should feel smooth and have momentum
- [ ] Scroll with trackpad - should have natural easing
- [ ] Try fast scrolling - should smoothly decelerate
- [ ] Scroll to bottom and back to top - no jank or stuttering

### Expected Behavior:
- Smooth, momentum-based scrolling
- Natural easing curve (not linear)
- No jarring stops or starts

---

## 2. Odometer Effect (Year Numbers)

### Test Steps:
- [ ] Scroll from year 1146 → 1147 (only last digit should flip)
- [ ] Scroll from year 1159 → 1160 (last two digits should flip)
- [ ] Scroll from year 1199 → 1200 (last three digits should flip)
- [ ] Scroll from year 1146 → 1283 (all changing digits should flip)
- [ ] Watch the flip animation - should be smooth vertical slide

### Expected Behavior:
- Only digits that change should animate
- Smooth vertical flip (old slides up, new slides in from bottom)
- Duration: 0.6s with power2.inOut easing
- Background year should change when section is centered in viewport

### Key Transitions to Test:
- 1146 → 1147 (1 digit changes)
- 1161 → 1162 (1 digit changes)
- 1267 → 1283 (2 digits change)
- 1289 → 1320 (3 digits change)

---

## 3. Sidebar Animations

### Active Link Morphing:
- [ ] Scroll through timeline sections
- [ ] Watch active link grow in size (1.25rem → 2.25rem)
- [ ] Watch active link change color (rgba(255,255,255,0.2) → #D5C5AB gold)
- [ ] Watch font weight increase (300 → 400)
- [ ] Inactive links should shrink and fade simultaneously

### Expected Behavior:
- Smooth GSAP animation (0.6s, power2.out)
- Only one link should be large/gold at a time
- Transition should happen when section reaches viewport center

### Hover Effect:
- [ ] Hover over sidebar links
- [ ] Should scale up slightly (1 → 1.05)
- [ ] Smooth transition (0.3s)

---

## 4. Century Divider Highlighting

### Test Steps:
- [ ] Scroll through different centuries (XII → XIII → XIV)
- [ ] Active century divider should glow and scale up
- [ ] Inactive centuries should fade to 40% opacity
- [ ] Lines within active divider should have golden glow
- [ ] Label text should have subtle text-shadow glow

### Expected Behavior:
- Active divider: opacity 1, scale 1.1
- Inactive dividers: opacity 0.4, scale 1
- Lines: `box-shadow: 0 0 20px rgba(198, 168, 124, 0.6)`, `filter: brightness(1.3)`
- Label: `text-shadow: 0 0 10px rgba(198, 168, 124, 0.4)`
- Transition duration: 0.5s, power2.out

### Centuries to Test:
- XII (1146-1199)
- XIII (1200-1289)
- XIV (1320-1370)

---

## 5. Progressive Content Reveal

### Test Steps:
- [ ] Scroll to a new section slowly
- [ ] Watch the sequence of animations when section enters viewport at 70%

### Expected Sequence:
1. **Title decoration line** (0s): Scales from 0 to 1 horizontally (0.8s)
2. **Title text** (0.15s delay): Fades in + slides up from y:20 (0.8s)
3. **Info paragraph** (0.3s delay): Fades in + slides up from y:30 (1s)
4. **Background year** (0.2s delay): Fades in + scales up from 0.9 + slides up from y:50 (1.2s)

### Expected Behavior:
- Staggered cascade effect
- All animations use power2.out or power3.out easing
- Animations should reverse when scrolling back up (toggleActions: 'play none none reverse')

---

## 6. Background Century Parallax

### Test Steps:
- [ ] Focus on the century number in top-right corner
- [ ] Scroll through a section
- [ ] Century should move vertically slower than scroll speed

### Expected Behavior:
- Parallax movement (y: 0 → 100)
- Scrubbed to scroll position (scrub: 1.5)
- Creates depth perception

---

## 7. Reduced Motion Support

### Test Steps:
- [ ] Enable "Reduce Motion" in system preferences
  - **macOS:** System Preferences → Accessibility → Display → Reduce motion
  - **Windows:** Settings → Ease of Access → Display → Show animations
- [ ] Reload the page
- [ ] Scroll through timeline

### Expected Behavior:
- Lenis smooth scrolling should be disabled (wheelMultiplier/touchMultiplier still apply)
- GSAP animations should be skipped
- Sidebar should use simple class toggles instead of GSAP
- Odometer digits should instantly swap without animation
- Content should still be fully visible and functional

---

## 8. Performance Testing

### Test Steps:
- [ ] Open DevTools → Performance tab
- [ ] Record while scrolling
- [ ] Check for 60fps consistency
- [ ] Look for long tasks or jank

### Expected Behavior:
- Steady 60fps during scroll
- No frame drops
- No console errors
- CPU usage should be reasonable

### Chrome DevTools:
- [ ] Open Layers panel (More tools → Layers)
- [ ] Verify composited layers are used efficiently
- [ ] Check paint flashing (Rendering → Paint flashing)

---

## 9. Responsive Testing

### Breakpoints:
- [ ] **Mobile:** 320px - 767px
- [ ] **Tablet:** 768px - 1023px
- [ ] **Desktop:** 1024px+

### Test at Each Breakpoint:
- [ ] Sidebar visibility/layout
- [ ] Timeline section spacing
- [ ] Font sizes scale appropriately
- [ ] Animations still work smoothly
- [ ] No horizontal overflow

---

## 10. Browser Compatibility

### Test in:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Expected Behavior:
- All animations work consistently
- Smooth scrolling works in all browsers
- No visual glitches or layout issues

---

## 11. Accessibility Testing

### Keyboard Navigation:
- [ ] Tab through sidebar links
- [ ] Press Enter to navigate to section
- [ ] Focus-visible styles should appear
- [ ] No keyboard traps

### Screen Reader:
- [ ] Turn on VoiceOver (macOS: Cmd+F5) or NVDA (Windows)
- [ ] Navigate through timeline sections
- [ ] Section titles and content should be announced
- [ ] Sidebar navigation should be clear

---

## 12. Known Issues to Verify Fixed

### Potential Issues to Check:
- [ ] ScrollTrigger conflicts with Lenis (should be synced correctly)
- [ ] IntersectionObserver targeting correct scroll container
- [ ] Odometer animation triggers at correct viewport position
- [ ] Multiple GSAP instances don't conflict
- [ ] Memory leaks from ScrollTrigger instances (should clean up on unmount)
- [ ] Century highlighting synchronizes with sidebar active state

---

## 13. Visual Polish Checks

### Typography:
- [ ] All fonts loaded (Oswald, Cormorant Garamond, Lato)
- [ ] No FOUT (Flash of Unstyled Text)
- [ ] Font weights render correctly

### Colors:
- [ ] Gold accent color (#D5C5AB) appears correctly
- [ ] Gradient overlays blend smoothly
- [ ] Background opacity (0.03) on year numbers is subtle

### Spacing:
- [ ] Consistent padding/margins
- [ ] Content doesn't touch edges
- [ ] Comfortable reading width

---

## Success Criteria

✅ **Must Pass All:**
1. Smooth scrolling feels premium and natural
2. Odometer effect only animates changing digits
3. Sidebar morphs smoothly between active states
4. Century dividers glow when active
5. Content reveals in staggered sequence
6. No console errors
7. 60fps during scroll
8. Reduced motion is respected
9. Keyboard accessible
10. Works in all major browsers

---

## Debugging Tips

### If animations don't work:
```javascript
// Open browser console and check:
console.log(gsap.version); // Should show 3.x
console.log(ScrollTrigger.isTouch); // Check touch detection
ScrollTrigger.getAll(); // See all active triggers
```

### If smooth scrolling doesn't work:
```javascript
// Check if Lenis initialized:
console.log(window.lenis); // Should be undefined (it's in component scope)
// Look for Lenis errors in console
```

### If odometer doesn't animate:
- Check if data-year attributes are present on sections
- Verify OdometerNumber is receiving value changes
- Check browser console for React errors

### Common console commands:
```javascript
// Kill all ScrollTriggers
ScrollTrigger.getAll().forEach(t => t.kill());

// Refresh ScrollTrigger
ScrollTrigger.refresh();

// Check GSAP animations
gsap.globalTimeline.getChildren();
```

---

## Notes

- Development server auto-refreshes on file changes
- Use Chrome DevTools for best debugging experience
- Test with throttled CPU (DevTools → Performance → CPU throttling) to simulate slower devices
- Use `prefers-reduced-motion: reduce` media query emulation in DevTools for accessibility testing
