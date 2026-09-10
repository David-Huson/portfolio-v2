from pathlib import Path
from html.parser import HTMLParser
import re,json
root=Path(__file__).resolve().parent
failures=[]
class Page(HTMLParser):
 def __init__(self,path):
  super().__init__();self.path=path;self.links=[];self.ids=set();self.feed(path.read_text())
 def handle_starttag(self,tag,attrs):
  for key,value in attrs:
   if key=='id': self.ids.add(value)
   if key in ('href','src') and value: self.links.append(value)
pages={p.resolve():Page(p) for p in root.glob('*.html')}
for p in pages.values():
 for link in p.links:
  if link.startswith(('http:','https:','mailto:','data:')):continue
  filename,_,fragment=link.partition('#');target=(p.path.parent/filename).resolve() if filename else p.path.resolve()
  if not target.exists():failures.append([p.path.name,link,'missing file'])
  elif fragment and target in pages and fragment not in pages[target].ids:failures.append([p.path.name,link,'missing anchor'])
def lum(h):
 c=[int(h[i:i+2],16)/255 for i in (1,3,5)]
 c=[v/12.92 if v<=.04045 else ((v+.055)/1.055)**2.4 for v in c]
 return sum(a*b for a,b in zip(c,[.2126,.7152,.0722]))
def ratio(a,b):
 x,y=sorted([lum(a),lum(b)]);return round((y+.05)/(x+.05),2)
contrasts={}
for key in 'abcd':
 text=(root/f'{key}-home.html').read_text();tokens=dict(re.findall(r'--(bg|surface|ink|muted|accent|line):(#[0-9a-f]{6})',text.split('}')[0]))
 contrasts[key]={f'{fg} on {bg}':ratio(tokens[fg],tokens[bg]) for fg in ['ink','muted','accent'] for bg in ['bg','surface']}
contrasts['d-inverted']={label:ratio(color,'#20281e') for label,color in [('text','#e8e9dd'),('secondary','#c1c8b8'),('accent','#d0dcac')]}
report={'brokenLocalLinks':failures,'textContrast':contrasts,'note':'WCAG relative luminance calculation. Decorative borders excluded. Not a complete WCAG audit.'}
(root/'contrast-and-links.json').write_text(json.dumps(report,indent=2)+'\n')
assert not failures,failures
assert all(v>=4.5 for pair in contrasts.values() for v in pair.values()),contrasts
print(f'{len(pages)} HTML artifacts: links and anchors pass. All text token pairs exceed 4.5:1.')
