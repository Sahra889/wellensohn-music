"""Regenerate RSS after adding tracks or an artwork article: python3 tools/build-feed.py."""
from pathlib import Path
from datetime import datetime, timezone
from email.utils import format_datetime
from html.parser import HTMLParser
import json
import xml.etree.ElementTree as ET

ROOT=Path(__file__).resolve().parents[1]
BASE='https://wellensohn-packman.github.io/wellensohn-music/'
ATOM='http://www.w3.org/2005/Atom'
ET.register_namespace('atom',ATOM)
class Article(HTMLParser):
 def __init__(self):super().__init__();self.title='';self.date='';self.desc='';self.in_title=False
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag=='title':self.in_title=True
  if tag=='time' and not self.date:self.date=a.get('datetime','')
  if tag=='meta' and a.get('name')=='description':self.desc=a.get('content','')
 def handle_endtag(self,tag):
  if tag=='title':self.in_title=False
 def handle_data(self,data):
  if self.in_title:self.title+=data
def date(value):return datetime.fromisoformat(value.replace('Z','+00:00')).replace(tzinfo=timezone.utc)
items=[]
for path in sorted((ROOT/'artworks').glob('*.html')):
 a=Article();a.feed(path.read_text());items.append({'title':a.title.split(' · ')[0], 'link':BASE+path.relative_to(ROOT).as_posix(),'description':a.desc,'date':date(a.date),'category':'Artwork'})
tracks=json.loads((ROOT/'tracks.js').read_text().removeprefix('window.WELLENSOHN_TRACKS = ').rstrip(';\n'))
for t in tracks:
 items.append({'title':t['title'],'link':BASE+'index.html#track-'+t['permalink'],'description':t['teaser'],'date':date(t['date']),'category':'Musik'})
items.sort(key=lambda x:x['date'],reverse=True)
root=ET.Element('rss',version='2.0');channel=ET.SubElement(root,'channel')
for key,value in [('title','WellenSohn · Musik & Artworks'),('link',BASE),('description','Neue Musik, Bilder und Gedanken auf der WellenSohn-Website.'),('language','de-de'),('lastBuildDate',format_datetime(max(x['date'] for x in items)))]:ET.SubElement(channel,key).text=value
ET.SubElement(channel,'{'+ATOM+'}link',href=BASE+'feed.xml',rel='self',type='application/rss+xml')
for row in items:
 item=ET.SubElement(channel,'item')
 for key in ('title','link','description','category'):ET.SubElement(item,key).text=row[key]
 ET.SubElement(item,'guid',isPermaLink='true').text=row['link']
 ET.SubElement(item,'pubDate').text=format_datetime(row['date'])
ET.indent(root)
ET.ElementTree(root).write(ROOT/'feed.xml',encoding='utf-8',xml_declaration=True)
print(f'RSS written: {len(items)} entries')
