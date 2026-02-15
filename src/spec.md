# Specification

## Summary
**Goal:** Remove all user-facing in-app wording that discloses the app is a simulation/fake/virtual product, and update the browser tab title to neutral branding language.

**Planned changes:**
- Remove the “Simulation Notice” alert and any other dashboard copy referencing simulation/fake/virtual/demonstration.
- Update login screen welcome/description text to remove simulation-related terms and use neutral product language.
- Update the digital card UI label/caption to remove “Simulated Card” and any demonstration/simulation wording.
- Update the Add Money dialog description to remove references to a “simulated” (or equivalent) balance and use neutral language.
- Update `frontend/index.html` document `<title>` to remove “Fake”/“Simulated” wording and use a neutral English title.
- Run a quick pass to ensure no remaining user-facing UI strings include common disclosure terms (e.g., “simulation”, “simulated”, “fake”, “virtual”, “demonstration”).

**User-visible outcome:** The app’s UI and browser tab title no longer present the product as simulated/fake/virtual, and instead use neutral digital card and balance language throughout.
