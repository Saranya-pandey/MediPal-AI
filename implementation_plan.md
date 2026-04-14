# Family Profile Switcher Implementation Plan

The goal is to introduce a "Netflix-style" global state switcher. When you select a family member, the entire application (Locker, Dashboard, etc.) filters down to that specific person's medical data.

## Proposed Changes

### 1. Global State Management (`src/lib/FamilyContext.tsx`)
To ensure the entire app syncs instantly when a profile is changed, I will build a React Context provider.
- **Default State**: Array featuring ONLY `Self`. No placeholder parents/kids.
- **Active State**: Tracks `activeMemberId` (e.g. `self`, `all`, or a dynamically generated `mother-id`).
- **Provider**: Mounted inside `layout.tsx` so all pages have access to it.

### 2. Global Right Panel Switcher (`src/components/GlobalRightPanel.tsx`)
- Read from `FamilyContext` to render the list: `All Family`, `Self`, and any newly added members.
- Display circular avatars and their relationship.
- Highlight the active profile distinctively (bold font, primary color tint).
- Transform the "Add Member" block into a `Modal` embedded here instead of navigating away to `/family`. The modal will accept Name, Relation, DOB, Gender, and Photo.

### 3. Migrating Page States
- **Home/Dashboard**: Update to filter the local arrays based on the `FamilyContext`'s `activeMemberId`.
- **Health Locker**: Update the search/filter logic to constrain results automatically to the `activeMemberId`.

## Open Questions

> [!WARNING]
> **UI Contradiction on Top-Right Corner**
> In the previous prompt, you requested: *"remove the profile button from right top corner"*.
> In this prompt, you requested: *"The selected member’s avatar should be shown in the top-right corner of the app."*

**How should we proceed?**
1. **Option A**: Reintroduce ONLY a non-clickable mini-avatar/label into the top-right corner just to show *who* is currently active, while keeping the global Right Panel trigger mapped to the thumb-friendly Bottom Navigation "Profile" tab.
2. **Option B**: Put the clickable Profile button back in the top-right corner, letting it both display the active member AND act as the trigger to open the Right Panel switcher.

Let me know which option you prefer and I'll execute the switcher!
