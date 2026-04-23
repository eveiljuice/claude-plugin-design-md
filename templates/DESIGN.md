---
name: My Design System
description: Replace this with a one-line statement of the brand personality.
colors:
  primary: "#1A1C1E"
  on-primary: "#FFFFFF"
  primary-container: "#E4E2DF"
  on-primary-container: "#1A1C1E"
  secondary: "#6C7278"
  on-secondary: "#FFFFFF"
  tertiary: "#B8422E"
  on-tertiary: "#FFFFFF"
  surface: "#F7F5F2"
  on-surface: "#1A1C1E"
  surface-container: "#EFEDE9"
  surface-container-high: "#E4E2DF"
  outline: "#D3D0CB"
  outline-variant: "#E4E2DF"
  error: "#B3261E"
  on-error: "#FFFFFF"
  background: "#F7F5F2"
  on-background: "#1A1C1E"
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: "700"
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: "600"
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: "600"
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: "400"
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: "400"
    lineHeight: 24px
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: "600"
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 4px
  DEFAULT: 8px
  md: 12px
  lg: 16px
  xl: 24px
  full: 9999px
spacing:
  unit: 8px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.md}"
    padding: "{spacing.md}"
    height: 40px
  button-primary-hover:
    backgroundColor: "{colors.primary-container}"
    textColor: "{colors.on-primary-container}"
  button-ghost:
    backgroundColor: transparent
    textColor: "{colors.on-surface}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.md}"
    padding: "{spacing.md}"
  card:
    backgroundColor: "{colors.surface-container}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
  input-field:
    backgroundColor: "{colors.surface-container-high}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.DEFAULT}"
    padding: "{spacing.sm}"
    height: 40px
---

## Overview

Describe the brand voice and visual personality in two to four sentences. What
feeling should the interface evoke? Who is the audience? Reference analogous
products or aesthetic movements if they help an agent anchor the style.

## Colors

Explain the palette strategy. What role does each family play (primary,
secondary, tertiary, neutral, semantic)? What contrast levels and emotional
responses are intended?

- **Primary:** Where and why it is used.
- **Secondary:** Supporting role for less-critical interaction.
- **Tertiary:** Accent or signal role.
- **Surface / On-surface:** Default backgrounds and foregrounds.
- **Semantic (error, success, warning):** Rules for when and how to apply.

## Typography

State the typefaces and why they were chosen. Describe the hierarchy, any
weight/tracking conventions, and intended reading rhythm. Call out pairings
and whether shadows, underlines, or text effects are ever allowed.

## Layout

Describe the grid, spacing rhythm, breakpoints, and container strategy. What
does "generous" or "dense" mean for this brand? Where is negative space
load-bearing? How does the layout respond across mobile, tablet, and desktop?

## Elevation & Depth

Describe how the system expresses hierarchy — shadow, blur, tint, borders,
or physical metaphors. Specify the shadow scale (levels, opacity, colour tint)
and when each level is used.

## Shapes

Describe the corner-radius language and any iconography conventions. Which
scale is used for which element? Are shapes organic, geometric, or editorial?
Are icons line-based or filled, with rounded or squared caps?

## Components

Describe the anchor components and how tokens compose them. For each key
component, state:

- Its role in the UI.
- Which token slots it consumes.
- Interaction states (hover, active, focused, disabled) and how they shift.

## Do's and Don'ts

- **Do** pair `display-lg` only with surface backgrounds to keep large type
  legible.
- **Do** use `tertiary` sparingly — it is an accent, not a palette workhorse.
- **Don't** place body text directly on `primary` without switching to
  `on-primary`.
- **Don't** introduce new colours outside the token set without first adding
  them to this document.
