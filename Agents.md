---
type: constraints
version: 1.0
scope: all projects
applies-to: [lit-a-tiroirs-hugo, litgigogne-hugo, plantissima-hugo, aromatics-hugo, le-charme-de-la-quietude-hugo, danielmedite-hugo, other-furniture-sites, component-demos]
last-updated: 2025-10-26
enforcement: strict
---

# Litgigogne Project - Development Constraints

These constraints apply to all furniture/lifestyle sites in the litgigogne-project ecosystem.

---

## 1. Standard Development Constraint Policy

These constraints apply when the AI is asked to **implement and execute** specific coding tasks.

### Scope & Focus
**Strict Adherence to Task Scope:** The AI must **strictly adhere** to the specific tasks listed in the current prompt. Do not introduce any work, features, or modifications outside of the explicitly defined objectives. This is to ensure laser-focus on high-priority items, such as the RESTful API development or targeted template updates.

### Design & Styling
**No Unauthorised Aesthetic Changes:** There must be **no changes to CSS, design elements, or front-end aesthetics** unless they are explicitly detailed and approved within the current task list. The focus remains on functional logic and data architecture, not visual presentation.

### Site Integrity
**Preservation of Unrelated Code:** The AI is prohibited from making **any changes to site files, configurations, templates, or logic not directly related to the specified tasks**. This includes core Hugo configuration files, unrelated partials, or general setup files. Site stability across all seven domains is paramount.

### Data Architecture
**Mandatory Data-Driven Approach:** **All templates and logic must remain fully data-driven.** **Hard-coding** of content, values, or configuration parameters is strictly prohibited. Solutions must leverage the existing data structures and content ecosystem, aligning with your Logseq knowledge management principles.

### Localization & Formatting
**French Price Formatting Standard:** **All French price formatting must be handled by the existing partial template cascade.** The AI must not implement new or duplicate inline formatting logic; it must call the designated partial to ensure consistency across the French-facing sites.

### Brand & Content
**No Supplier Attribution:** **Never mention supplier or manufacturer names (e.g., "FROCA", "XXXXX Ltd", etc.) in customer-facing content.** All narrative content, product descriptions, specifications, and FAQ answers must reference only Le Lit Gigogne's own brand, expertise, and "since 1984" heritage. This maintains brand integrity and positions Le Lit Gigogne as the artisan creator, not merely a reseller.

**Examples**:
- ❌ "Découvrez la gamme ALBERTA de FROCA..."
- ✅ "Découvrez la gamme ALBERTA..."
- ❌ "Fabrication européenne FROCA"
- ✅ "Fabrication européenne – savoir-faire textile depuis 1984"
- ❌ "tissage FROCA"
- ✅ "tissage européen" or "notre tissage d'exception"

**Technology Trademark Exception:** Established textile technology trademarks (e.g., "Teflon™ fabric protector", "H2Oh!") are PERMITTED as they represent finishing treatments/technologies applied to fabrics, not manufacturers. These enhance product value communication and consumer trust.

**Examples**:
- ❌ "Découvrez la gamme ALBERTA de FROCA..."
- ✅ "Découvrez la gamme ALBERTA avec traitement anti-tâches Teflon™..."
- ❌ "tissage FROCA"
- ✅ "tissage européen avec protection anti-tâches Teflon™"
- ✅ "Protection H2Oh! hydrofuge"
- ✅ "Traitement anti-tâches Teflon™ pour une protection durable"

### Template Detail
**Full Information Display:** When working on list/archive pages (e.g., those displaying service cards or product cards), the AI must **ensure all necessary product/service information, including prices, is displayed**. The goal is complete and transparent information for the user.

---

## 2. Planning & Review Constraint Policy

These constraints apply when the AI is asked to **analyze, plan, or review** architecture *without* generating final, executable code.

### Execution Hold
**Planning Mode Only:** The AI **MUST NOT generate executable code, final file changes, or complete implementation snippets.** All outputs must be delivered in the form of **pseudocode, architectural diagrams (text-based), detailed rationales, or plain-text explanations**. This ensures you retain final control over the development environment.

### Design & Styling
**Backend Focus:** The AI must **avoid commentary or suggestions related to CSS, design, or user interface aesthetics**. The entire focus is to remain on backend structure, data flow, template logic, and the integrity of the data-driven ecosystem.

### Site Integrity
**Scope of Discussion:** The AI must **limit analysis and suggestions strictly to the scope of the current discussion**. Do not propose changes to unrelated site aspects, configurations, or systems outside the immediate architectural review area.

### Data Architecture
**Data-Driven Principle Upheld:** **All proposed solutions must uphold the principle of being fully data-driven.** If the analysis requires demonstrating a potential structure (like JSON or YAML), use clear, templated placeholders (e.g., `{{ .DataField }}`) rather than any hard-coded values.

### Localization & Formatting
**Standard Formatting Assumption:** The AI must **assume the existing French price formatting partial is the required standard**. Any proposed data structure or template logic must inherently account for and reference the mechanism for calling this existing partial, rather than inventing new formatting rules.

### Reporting & Clarity
**Proactive Risk Flagging:** The AI must **clearly flag any area where a constraint (e.g., hard-coding avoidance, scope creep, or data dependency) might be at risk**, even in the initial planning or suggestion phase. Transparency is essential for our collaborative process.

---

## 3. Constraint Enforcement Examples

### ✅ Good Examples (Following Constraints)

**Example 1: Data-Driven Price Display**
```hugo
{{/* Good - uses data and partial */}}
{{ $price := index .Site.Data.published.products_pricing_faq_index .Params.product_id }}
{{ if $price.pricing.base_price_eur }}
  <span class="price">{{ partial "utils/format-price.html" $price.pricing.base_price_eur }}€</span>
{{ else if eq $price.pricing.price_type "quote" }}
  <span class="price-quote">Sur devis</span>
{{ end }}
```

**Example 2: Scoped Task Execution**
```
User: "Fix the price display on product cards"
AI: "I'll update layouts/partials/product-card.html to handle the
     null price case for quote-based products. I will NOT touch
     CSS, other templates, or config files."
```

**Example 3: Planning Mode**
```
User: "Plan a rating system"
AI: "Here's the architectural approach (pseudocode):

     Data Structure (data/ratings.json):
     {
       "{{ .product_id }}": {
         "average": {{ .rating }},
         "count": {{ .count }}
       }
     }

     Template Logic:
     {{ $rating := index .Site.Data.ratings .Params.product_id }}
     {{ partial "components/star-rating.html" $rating }}

     No executable code provided - awaiting your approval to implement."
```

### ❌ Bad Examples (Violating Constraints)

**Example 1: Hard-Coded Values**
```hugo
{{/* Bad - hard-coded price */}}
<span class="price">1250€</span>

{{/* Bad - hard-coded content */}}
<h2>Nos Lits à Tiroirs</h2>
```

**Example 2: Scope Creep**
```
User: "Fix the price display on product cards"
AI: "I'll fix the price display AND also update the CSS to make
     it look better AND refactor the navigation system AND..."
❌ VIOLATION: Doing work outside specified scope
```

**Example 3: Planning Mode Violation**
```
User: "Plan a rating system"
AI: "Here's the complete implementation:
     [Provides 200 lines of executable Hugo template code]"
❌ VIOLATION: Generated executable code in planning mode
```

**Example 4: Inline Price Formatting**
```hugo
{{/* Bad - inline formatting instead of using partial */}}
<span class="price">{{ printf "%.0f" .price }}€</span>

{{/* Good - uses existing partial */}}
<span class="price">{{ partial "utils/format-price.html" .price }}€</span>
```

---

## 4. Mode Detection Keywords

### Development Mode (Standard Development Constraints Apply)
- "Implement..."
- "Code..."
- "Build..."
- "Create..."
- "Fix..."
- "Update..."
- "Add feature..."
- "Write the template..."

### Planning Mode (Planning & Review Constraints Apply)
- "Plan..."
- "Analyze..."
- "Review..."
- "Suggest..."
- "How would you approach..."
- "What's the architecture for..."
- "Evaluate..."
- "Design the structure..."

### Clarification Required
If the mode is unclear, the AI should ask:
```
"Should I proceed in:
 (A) Development Mode - I'll implement the solution with code
 (B) Planning Mode - I'll provide pseudocode/architecture only"
```

---

## 5. Project-Specific Context

### Sites Covered
1. **lit-a-tiroirs-hugo** - Drawer storage furniture (purple theme, 188 pages)
2. **litgigogne-hugo** - Parent site, trundle beds (warm brown theme, 985 pages)
3. **plantissima-hugo** - Plant-focused lifestyle
4. **aromatics-hugo** - Aromatherapy products
5. **le-charme-de-la-quietude-hugo** - Meditation/wellness
6. **danielmedite-hugo** - Personal meditation practice
7. **[other furniture sites]** - TBD

### Shared Technologies
- **Framework**: Hugo static site generator
- **Data Format**: JSON, YAML
- **Primary Language**: French (fr-FR)
- **Deployment**: AWS S3 + CloudFront
- **Architecture**: Data-driven, content-first

### Shared Principles
- ✅ Mobile-first responsive design
- ✅ Semantic HTML
- ✅ Accessibility (WCAG AA minimum)
- ✅ SEO optimization
- ✅ Performance (Lighthouse 90+ scores)
- ✅ Environmental sustainability (green hosting)

---

## 6. Violation Response Protocol

If the AI detects a potential constraint violation:

1. **Stop immediately**
2. **Flag the issue**: "⚠️ CONSTRAINT VIOLATION DETECTED"
3. **Explain**: Which constraint would be violated and why
4. **Ask for clarification**: "Should I proceed with a different approach?"
5. **Suggest alternative**: Propose a constraint-compliant solution

### Example
```
User: "Update the product card and make the prices green"

AI: "⚠️ CONSTRAINT VIOLATION DETECTED

The request includes a CSS/design change ('make the prices green')
which violates the 'No Unauthorised Aesthetic Changes' constraint.

I can update the product card logic (✅ allowed) but cannot change
price styling (❌ not allowed) without explicit design approval.

Should I:
(A) Update only the product card logic, keeping existing styles
(B) Wait for design approval before proceeding
(C) Suggest a data-driven approach to conditional styling"
```

---

## 7. Documentation Requirements

When implementing changes, the AI must:

1. **Document what changed**: File paths, line numbers
2. **Document why**: Rationale tied to constraints
3. **Document data flow**: What data sources are used
4. **Flag any edge cases**: Potential issues or dependencies
5. **Verify constraint compliance**: Explicitly confirm all constraints followed

### Example Documentation
```markdown
## Changes Made

### File: layouts/partials/product-card.html (lines 84-92)

**Change**: Added null price fallback for quote-based products

**Rationale**:
- Constraint: "Full Information Display" requires all info shown
- Products 358, 444 have `base_price_eur: null` with `price_type: "quote"`
- Previous code showed blank price (incomplete information)

**Data Flow**:
data/published/products_pricing_faq_index.json
  → Template checks .pricing.base_price_eur
  → If null AND price_type == "quote": display "Sur devis"
  → Uses existing partial for formatting (✅ data-driven)

**Constraint Compliance**:
✅ Data-driven (no hard-coding)
✅ Uses existing format-price partial
✅ Scope limited to product-card.html
✅ No CSS changes
✅ No unrelated file modifications

**Edge Cases**:
- If price_type is missing but price is null: Falls through to placeholder
- Consider adding explicit price_type validation in future
```

---

## 8. Layout Constraints

### Product Card Grid System
**Fixed Maximum Width Requirement:**

The product grid system MUST maintain a maximum card width of 350px to ensure:
- Readability on wide screens (cards don't stretch excessively)
- Visual consistency across all product listing pages
- Professional appearance (partial rows align left)
- Consistent UX across litgigogne-hugo and lit-a-tiroirs-hugo

**Mandatory CSS Pattern**:
```css
.products-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 350px));
    justify-content: start;
}
```

**File Location**: `litg-shared-ui/layouts/_default/baseof.html` (line ~1597)

**Applies To**: All furniture sites (litgigogne-hugo, lit-a-tiroirs-hugo, and future sites)

**Violation Protocol**:
If asked to modify product grid CSS or card width:
1. **STOP immediately**
2. **Check** if change affects the `350px` max constraint
3. **Flag** if constraint would be violated: "⚠️ LAYOUT CONSTRAINT VIOLATION"
4. **Ask** user to confirm if 350px max should be changed
5. **Document** why change is needed before proceeding

**Examples**:
```markdown
❌ VIOLATION: "grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));"
   Problem: Removes max constraint, cards expand to full width

❌ VIOLATION: "grid-template-columns: repeat(auto-fill, minmax(300px, 450px));"
   Problem: Changes max from 350px to 450px

✅ COMPLIANT: "grid-template-columns: repeat(auto-fill, minmax(250px, 350px));"
   Maintains constraint

✅ COMPLIANT: "gap: 2rem;" (modifying gap doesn't affect card width)
```

**Historical Context**:
- Implemented: Phase 6 (August 2025)
- Documented: ARCHITECTURE-HISTORY.md lines 206-218
- Business reason: Single products shouldn't expand to screen width (looks unprofessional)

---

## 9. Quality Assurance Checklist

Before submitting any implementation, the AI must verify:

- [ ] **Scope**: Only modified files/logic directly related to task
- [ ] **Data-Driven**: No hard-coded values, uses data sources
- [ ] **French Formatting**: Uses existing `format-price` partial (if applicable)
- [ ] **No CSS Changes**: Zero modifications to styles (unless explicitly approved)
- [ ] **Complete Information**: All necessary data displayed on cards/lists
- [ ] **Documentation**: Changes documented with rationale
- [ ] **Edge Cases**: Potential issues flagged
- [ ] **Constraint Compliance**: All 6 development constraints + planning constraints verified

---

## 10. Version History

**v1.2** (2025-10-19)
- Added Brand & Content constraint
- No supplier attribution rule (never mention "FROCA" or other supplier names)
- Brand integrity: position Le Lit Gigogne as artisan creator, not reseller
- Examples of compliant vs non-compliant supplier references

**v1.1** (2025-10-16)
- Added Section 8: Layout Constraints
- Product card grid system maximum width requirement (350px)
- Violation protocol for grid modifications
- Examples and historical context

**v1.0** (2025-10-06)
- Initial constraint document created
- Applies to all 7+ litgigogne-project sites
- Covers development and planning modes
- Includes examples and violation protocols

---

**End of Constraints Document**
