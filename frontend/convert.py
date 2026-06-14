import os
import re

html_path = r".od-skills\open-design-landing-725b9fa66f\example.html"
css_out = r"src\index.css"
jsx_out = r"src\App.jsx"

with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Extract CSS
style_match = re.search(r"<style>(.*?)</style>", content, re.DOTALL)
css_content = style_match.group(1).strip() if style_match else ""
os.makedirs("src", exist_ok=True)
with open(css_out, 'w', encoding='utf-8') as f:
    f.write(css_content)

# Extract body
body_match = re.search(r"<body>(.*?)<script", content, re.DOTALL)
if not body_match:
    body_match = re.search(r"<body>(.*?)</body>", content, re.DOTALL)

body_content = body_match.group(1).strip() if body_match else ""

# Basic HTML to JSX conversions
jsx_content = body_content.replace('class=', 'className=')
jsx_content = jsx_content.replace('stroke-width=', 'strokeWidth=')
jsx_content = jsx_content.replace('stroke-linejoin=', 'strokeLinejoin=')
jsx_content = jsx_content.replace('stroke-linecap=', 'strokeLinecap=')
jsx_content = jsx_content.replace('fill-rule=', 'fillRule=')
jsx_content = jsx_content.replace('clip-rule=', 'clipRule=')
jsx_content = jsx_content.replace('stroke-dasharray=', 'strokeDasharray=')
jsx_content = jsx_content.replace('style="color:var(--coral);"', 'style={{color: "var(--coral)"}}')
jsx_content = jsx_content.replace("style='color:var(--coral);'", "style={{color: 'var(--coral)'}}")
jsx_content = jsx_content.replace("style='color: var(--ink);'", "style={{color: 'var(--ink)'}}")

# Fix inline styles with variables
jsx_content = re.sub(r"style='(.*?)'", lambda m: f"style={{{{{m.group(1).replace(':', '\"').replace(';', '\"')}}}}}", jsx_content)

# Fix <br> without closure
jsx_content = jsx_content.replace("<br>", "<br/>")

# Remove remaining script tags if any
jsx_content = re.sub(r"<script.*?</script>", "", jsx_content, flags=re.DOTALL)

# Build App.jsx
app_code = f"""import React, {{ useEffect }} from 'react';
import './index.css';

export default function App() {{
  useEffect(() => {{
    // Simple reveal logic for data-reveal elements
    const observer = new IntersectionObserver((entries) => {{
      entries.forEach(entry => {{
        if (entry.isIntersecting) {{
          entry.target.setAttribute('data-revealed', 'true');
        }}
      }});
    }}, {{ threshold: 0.1 }});

    document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }}, []);

  return (
    <>
{jsx_content}
    </>
  );
}}
"""

with open(jsx_out, 'w', encoding='utf-8') as f:
    f.write(app_code)

print("Conversion complete!")
