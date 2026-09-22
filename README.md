# Milo & Momo Toon Factory

Automated children's cartoon production studio for an **ORIGINAL preschool YouTube series** called:
**"Milo & Momo's Wonder Garden"**

> **Strict Original IP Invariant:** This is a 100% original intellectual property. It does not copy, reference, or use copyrighted characters, logos, music, artwork, voices, stories, or visual styles from any existing children's show.

---

## 🌟 The Series & Target Audience

- **Series:** Milo & Momo's Wonder Garden
- **Target Audience:** Preschool to early elementary (Ages 4–8)
- **Format:** 2–5 minute daily episodes + 9:16 vertical YouTube Shorts cut
- **Tone:** Funny, warm, educational, imaginative, positive, gentle, safe, sensory-friendly, non-scary, non-violent.
- **Characters:**
  - **Milo:** 7-year-old fox child with vibrant orange fur, soft cream snout/belly, rounded toddler proportions, yellow tee, denim dungarees, and signature teal backpack.
  - **Momo:** Fluffy pillowy floating white cloud creature with glowing rainbow micro-sparkles, gentle giggles, and cheerful emotional reflection.
  - **Barnaby the Beetle:** Emerald garden helper with spectacles and acorn cap hat.

---

## 🚀 Complete Production Pipeline

1. **Idea & Topic:** Generates moral concepts and nature themes.
2. **Story Narrative:** Co-writes bedtime/circle-time narrative.
3. **Children's TV Script:** Dialogue, narrator lines, actions.
4. **Scene Breakdown:** 14 structured storyboard scenes with timings.
5. **Character & Scene Visuals:** `VisualProvider` maintaining model consistency.
6. **Narration & Voices:** `AudioProvider` generating gentle speech.
7. **Animation & Motion:** `AnimationProvider` directing camera pans and motion.
8. **Render Center:** Compiles assets into 16:9 master MP4, 9:16 Shorts, and SRT/VTT subtitles.
9. **Automated QA:** Audits for safety, duration (2-5 min), zero violence, and completeness.
10. **Human Approval Queue:** Strict invariant gate: **No public release without human signoff**.
11. **YouTube Studio:** COPPA Made-For-Kids compliance, automated titles, descriptions, and tags.
12. **Daily Automation:** Scheduled daily cycle without bypassing human review.

---

## 📦 Documentation

- [Architecture & Data Models](ARCHITECTURE.md)
- [Provider Setup Guide](PROVIDER_SETUP.md)
- [YouTube API & OAuth Setup](YOUTUBE_SETUP.md)
- [Deployment Guide](DEPLOYMENT.md)

---

## 🛡️ License

SPDX-License-Identifier: Apache-2.0
