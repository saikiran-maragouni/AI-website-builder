# Enhanced JSON Content Schema

## Complete Structure with Refinements

```json
{
  "meta": {
    "version": "1.0",
    "businessType": "restaurant"
  },
  "hero": {
    "editable": true,
    "title": "Business Name or Catchy Title",
    "tagline": "Compelling tagline that captures essence",
    "cta": "Call to action text"
  },
  "about": {
    "editable": true,
    "heading": "About Us",
    "content": "2-3 paragraphs about the business story, mission, values"
  },
  "features": {
    "editable": true,
    "heading": "What We Offer",
    "items": [
      {
        "title": "Feature 1",
        "description": "Feature description",
        "icon": "icon-name"
      },
      {
        "title": "Feature 2",
        "description": "Feature description",
        "icon": "icon-name"
      }
    ]
  },
  "sections": [
    {
      "editable": true,
      "heading": "Section heading",
      "content": "Section content paragraph",
      "items": ["Item 1", "Item 2", "Item 3"]
    }
  ],
  "contact": {
    "editable": true,
    "heading": "Get in Touch",
    "content": "Contact message or call to action"
  }
}
```

## Field Descriptions

### meta
- `version`: Schema version for future compatibility (e.g., "1.0")
- `businessType`: Business category for template selection

### editable flags
- Each major section has `editable: true/false`
- Supports future hybrid editor functionality
- Allows locking certain sections from editing

## Database Storage

### New Columns in `generated_sites` table:
- `content_json` (JSONB) - Stores the complete JSON content
- `template_name` (TEXT) - Stores which template was used (e.g., "restaurant", "ecommerce")
- Keep existing: `html`, `css`, `js` - Final rendered output

### Benefits:
- Can regenerate HTML from JSON + template
- Can switch templates without regenerating content
- Supports future editing features
- Version tracking for schema changes
