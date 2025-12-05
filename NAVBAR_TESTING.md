# 🧪 NAVBAR TESTING GUIDE

## ✅ What to Test

### Test 1: User Authentication Display
**Status:** Logged Out
- [ ] Navbar shows "Profile" in profile section
- [ ] Default profile image displays
- [ ] Click profile → Shows Login component

**Status:** Logged In
- [ ] Navbar shows user's full name (e.g., "John Doe")
- [ ] User's profile image displays
- [ ] Click profile → Shows dropdown menu with user options

### Test 2: Profile Dropdown Menu
**Prerequisites:** User must be logged in
- [ ] Click profile to open dropdown
- [ ] Dropdown shows user's full name
- [ ] Dropdown shows user's email
- [ ] Hover over "My Addresses" → background changes to light gray
- [ ] Hover over "Order History" → background changes to light gray
- [ ] Hover over "Edit Profile" → background changes to light gray
- [ ] Hover over "Logout" → background changes to red
- [ ] Click "My Addresses" → navigates to /savedaddress
- [ ] Click "Order History" → navigates to /order-history
- [ ] Click "Edit Profile" → navigates to /addresss
- [ ] Click "Logout" → logs out user, navigates to home, dropdown closes

### Test 3: Cart Counter
- [ ] Add item to cart → "Bag (1)" appears in navbar
- [ ] Add 2nd item → "Bag (2)" appears
- [ ] Add 3rd item → "Bag (3)" appears
- [ ] Remove item → Counter decreases
- [ ] Remove all items → Shows just "Bag" (no counter)
- [ ] Refresh page → Counter persists
- [ ] Logout → Cart items still shown (cart is not user-specific)

### Test 4: Wishlist Counter
- [ ] Add item to wishlist → "Wishlist (1)" appears
- [ ] Add 2nd item → "Wishlist (2)" appears
- [ ] Add 3rd item → "Wishlist (3)" appears
- [ ] Remove item → Counter decreases
- [ ] Remove all items → Shows just "Wishlist" (no counter)
- [ ] Refresh page → Counter persists
- [ ] Logout → Wishlist items still shown (wishlist is not user-specific)

### Test 5: Navigation Links
- [ ] "Bag" link → Navigates to /cart
- [ ] "Wishlist" link → Navigates to /wishlist
- [ ] Profile with dropdown → Navigates per menu selection
- [ ] All category links still work (MEN, WOMEN, KIDS, HOME, BEAUTY)
- [ ] Logo link still works (navigates to home)

### Test 6: Responsive Design
**Desktop View:**
- [ ] All items visible in navbar
- [ ] Profile dropdown appears correctly positioned
- [ ] Counters visible

**Tablet View:**
- [ ] Profile icon still visible
- [ ] Wishlist icon still visible
- [ ] Bag icon still visible
- [ ] Dropdown still appears and is clickable

**Mobile View:**
- [ ] Profile icon still visible (but may be squeezed)
- [ ] Wishlist icon still visible
- [ ] Bag icon still visible

### Test 7: State Management
**Cart State:**
- [ ] Add item → Cart count updates in navbar
- [ ] Navigate to cart page → Items shown
- [ ] Remove from cart → Count updates in navbar
- [ ] Return to home → Count still accurate

**Wishlist State:**
- [ ] Add item → Wishlist count updates in navbar
- [ ] Navigate to wishlist page → Items shown
- [ ] Remove from wishlist → Count updates in navbar
- [ ] Return to home → Count still accurate

**User State:**
- [ ] Login → User name appears in navbar
- [ ] Navigate to different pages → User name persists
- [ ] Logout → Profile goes back to "Profile"
- [ ] Refresh page → User still logged in (from localStorage)

### Test 8: Edge Cases
- [ ] Open navbar dropdown, then hover over MEN → MEN menu should appear, dropdown stays visible
- [ ] Click profile multiple times → Dropdown toggles on/off
- [ ] Logout while dropdown open → Dropdown closes, user logged out
- [ ] Add to cart while profile dropdown open → Dropdown stays open, count updates
- [ ] Very long username → Should fit without breaking layout
- [ ] Very long email → Should be truncated or wrapped nicely in dropdown

## 🔍 Visual Checklist

### Dropdown Styling
- [ ] Dropdown has smooth animation (slides down smoothly)
- [ ] Dropdown shadow looks professional
- [ ] Dropdown border color is subtle (light gray #ddd)
- [ ] Dropdown border-radius is 8px (rounded corners)
- [ ] Dropdown position is below profile icon, aligned to right
- [ ] Menu items have hover effects (arrow animation with color change)

### Color Scheme
- [ ] Profile section uses same color scheme as navbar
- [ ] Dropdown header text is dark (#333)
- [ ] Dropdown email text is light gray (#999)
- [ ] Hover items turn orange (#ff9900)
- [ ] Logout button turns red (#d32f2f)
- [ ] Background on hover is light gray (#f5f5f5)

## 📊 Before & After Comparison

### Before:
```
Navbar: [MEN] [WOMEN] [KIDS] [HOME] [BEAUTY]  [Profile] [Wishlist] [Bag]
```

### After:
```
Navbar: [MEN] [WOMEN] [KIDS] [HOME] [BEAUTY]  [John Doe] [Wishlist (3)] [Bag (5)]
                                                    ↓
                                           ┌──────────────────┐
                                           │ John Doe         │
                                           │ john@email.com   │
                                           ├──────────────────┤
                                           │ 📍 My Addresses  │
                                           │ 📦 Order History │
                                           │ ✏️ Edit Profile  │
                                           │ 🚪 Logout        │
                                           └──────────────────┘
```

## 🐛 Troubleshooting

### Issue: Dropdown not appearing
**Solution:** 
- Check if `isAuthenticated` is true
- Verify AuthContext is properly wrapping app in main.jsx
- Check browser console for errors

### Issue: Cart/Wishlist counters not updating
**Solution:**
- Verify CartContext/WishlistContext are exporting correctly
- Check if items are being added to localStorage
- Open browser DevTools → Application → Storage → LocalStorage

### Issue: User name not showing
**Solution:**
- Verify user object has `fullName` property
- Check localStorage for "user" key
- Verify login response includes user data

### Issue: Profile image not loading
**Solution:**
- Verify user has `profileImage` URL
- Check image URL is valid and CORS-enabled
- Fallback will show default image (OIP3.jpg)

### Issue: Dropdown appearing behind other elements
**Solution:**
- z-index for dropdown is 1000 (should be above most elements)
- Check if parent container has lower z-index
- Verify header z-index is 999999 (fixed positioning)

## 🚀 Test Data Setup

### Test User Login:
```
Email: test@example.com
Username: testuser
Password: Test@123456
```

### Quick Add to Cart:
1. Go to any product page
2. Click "Add to Bag" button
3. Verify "Bag (1)" appears in navbar

### Quick Add to Wishlist:
1. Go to any product card
2. Click heart/wishlist icon
3. Verify "Wishlist (1)" appears in navbar

## ✅ Sign-Off Checklist

After all tests pass:
- [ ] All features working as described
- [ ] No console errors
- [ ] No visual glitches
- [ ] Responsive on all screen sizes
- [ ] Animations smooth (60fps)
- [ ] Navigation works correctly
- [ ] State persists on refresh
- [ ] Ready for production

---

**Test Date:** ___________
**Tester Name:** ___________
**Status:** ✅ PASS / ❌ FAIL
**Notes:** _________________________
