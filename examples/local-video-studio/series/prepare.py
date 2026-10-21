"""Build resumable episode projects from authored Vietnamese scripts, without using GPU."""
import json,re,shutil
from pathlib import Path

import os
_bundle_override=os.environ.get('LOCAL_VIDEO_STUDIO')
_bundle=Path(_bundle_override).resolve() if _bundle_override else next(p for p in Path(__file__).resolve().parents if (p/'studio_config.py').is_file())
import sys
sys.path.insert(0,str(_bundle))
from studio_config import settings

ROOT=Path(__file__).parent
SERIES=json.loads((ROOT/'series.json').read_text(encoding='utf-8'))
VISUALS={
'01-ocean':['Blue ocean waves and a small fishing boat returning toward shore','Sunlight moving over deep blue ocean water','Clear layered blue water and a gently moving sea surface','An ocean research buoy bobbing in gentle waves','Tropical ocean under a bright summer sky','A school of small fish swimming through a reef','Healthy colorful coral and fish in clear shallow water','Pale coral surrounded by living reef fish','Ocean surface waves beneath drifting clouds','Small seashells resting in clear water with rippling sunlight','A school of fish feeding near a reef','Waves rolling toward a low lying sandy coast','A coastal town beside a river mouth and tidal water','A small fishing harbor with boats slowly moving','Mangrove roots in moving coastal water','A coastline with a wetland, a village and a protective seawall','A research vessel on calm blue ocean','Warm sunrise over a broad ocean horizon'],
'02-carbon':['A young tree with leaves moving in morning breeze','Green leaves and a distant industrial landscape','A broad forest beside farmland and a flowing river','Sunlight filtering through green leaves','Fallen leaves and moss covering a forest floor','Dark forest soil beside roots and new seedlings','An old forest with tall mature trees and younger plants','A dry forest edge with charred fallen branches and fresh regrowth','Open ocean waves and distant seabirds','A coral reef and fish moving through clear water','Layered rock cliffs above a river','A coal power station beside transport infrastructure','A busy city road and a distant power plant','A forest research plot with distant researchers walking','A restored woodland beside a mature forest','A modern electric train moving through green countryside','A forest monitoring station with instruments','Sunlight over a connected landscape of forest, farmland and ocean'],
'03-forests':['A vast natural forest canopy with drifting mist','Sunlight on green leaves and growing saplings','Tree roots, moss and fallen wood on a forest floor','An old tree beside young forest regeneration','A forest stream flowing between trees','Dappled shade along a forest footpath','Birds moving between branches in a diverse forest','A forest landscape divided by a narrow road','A forest edge with charred wood and natural regrowth','Dry woodland with sparse leaves moving in warm wind','Young trees regenerating beside mature woodland','A mixed woodland restoration site with growing saplings','A small village at the edge of a forest','Distant researchers measuring trees in a woodland','Forest beside an industrial area far on the horizon','Morning sunlight over a healthy diverse forest'],
'04-ice':['A large glacier above a cold blue sea','Sea ice floating near a distant glacier','Snowy mountains with clouds moving above them','A glacier valley with snow at higher elevations','A glacier slowly meeting the ocean with floating ice','Sunlight reflecting on snow beside dark rock','Glacial meltwater flowing toward the sea','A low coastal settlement beside an estuary','Waves washing near a coastal path','A mountain stream flowing through a valley below snow peaks','A distant seabird colony beside cold coastal water','An icy field research camp with instruments','A broad glacier landscape under moving clouds','A calm cold ocean with distant icebergs','A coastal wetland beside a small town','Sunrise over snowy mountains and a river'],
'05-extremes':['Heavy rain falling on an urban street','Clouds moving above a broad rural landscape','A sunlit city with visible heat haze','A shaded park beside a hot sunlit road','Dry farmland beside a distant rain shower','A river flowing through fields after heavy rain','A stormy sea with waves crashing on rocks','A coastal town beside a swollen river','A city neighborhood with roads, trees and water channels','A weather station under fast moving clouds','Rain falling on an empty village road','Distant workers checking a river monitoring station','A bridge and drainage channels beneath passing clouds','A wetland receiving water beside open fields','A repaired rural road beside a river','Clouds clearing above a town and green countryside'],
'06-cities':['A shaded tree lined street beside a sunlit paved road','Sunlight on city rooftops and asphalt streets','A dense city at dusk with moving traffic','A city park surrounded by modern buildings','A modest residential neighborhood with shaded and unshaded houses','A shaded pedestrian route and a bus stop','Urban trees growing beside a sidewalk','Modern buildings with external shading and reflective roofs','An apartment building with rooftop solar and shaded windows','An electric bus moving along a tree lined road','An urban rain garden with a small flowing water channel','A city observation station above rooftops','A small park with distant residents walking','A modern neighborhood with connected shaded paths','A public square with shade trees and a covered walkway','Evening light over a green walkable neighborhood'],
'07-food':['A field of rice moving in morning breeze','Young crops growing in dark moist soil','A farmer looking across a field under passing clouds','A dry field beside a small irrigation canal','A farm road after rain with water flowing in a channel','A mix of rice fields, orchard trees and vegetable plots','A cattle farm with animals grazing calmly','A small fishing harbor and a coastal fish farm','An orchard with flowering trees and small insects','A farmer tending a diverse vegetable plot','A grain storage building beside harvested fields','Food crates moving through a local produce market','A small irrigation reservoir beside farmland','A shaded rural market with people walking in the distance','An agricultural weather monitoring station','Sunset over a diverse agricultural landscape'],
'08-energy':['City lights turning on at dusk','A coal power station and distant transmission lines','A wind farm with turbines rotating steadily','Rows of solar panels under passing clouds','A hydroelectric reservoir and surrounding hills','Power lines linking a town to the countryside','Battery storage containers beside a solar farm','Modern buildings with rooftop solar and exterior shading','An electric train moving through a landscape','Workers small in the distance maintaining electricity infrastructure','A recycling and materials sorting facility','A rural village with rooftop solar','A modern substation beside green fields','An industrial site with efficient modern equipment','A city with buses, trains and mixed buildings','Sunset over wind turbines and solar panels'],
'09-biodiversity':['A forest, river and wetland forming one connected landscape','Birds moving between branches in a forest','Flowering plants with small pollinating insects','A river flowing through a healthy riparian forest','Coral and fish moving in clear ocean water','A forest edge beside cultivated fields','Mountain vegetation under passing clouds','A wetland with wading birds and gently moving reeds','A mixed woodland with young and mature trees','A coastal mangrove with tidal water','A natural landscape crossed by a narrow road','A restored stream beside diverse vegetation','Distant field researchers observing wildlife','A forest near a small community','A landscape of connected conservation areas','Morning light over a living green valley'],
'10-future':['A city, river and forest in one broad landscape','Rooftop solar and public transport in a modern neighborhood','A river beside fields and a village','An urban park with shade and a rain garden','A low coastline with wetland and a small settlement','A diverse farm with irrigation channels','A power network connecting renewables and a town','Researchers checking outdoor environmental instruments','A community gathering seen from a distance in a shaded square','A restored forest beside farmland','A bridge and water infrastructure beside a river','A coastal path beside a wetland','An electric train moving past wind turbines','A rural landscape with healthy trees and flowing water','Distant people walking through a shaded public park','Sunrise over the Earth horizon with clouds']}

def chapters(path):
    text=path.read_text(encoding='utf-8')
    parts=re.split(r'^##\s+',text,flags=re.M)[1:]
    return [(p.split('\n',1)[0].strip(),p.split('\n',1)[1].strip()) for p in parts]

def sentence_chunks(text):
    chunks=[]
    for sentence in re.split(r'(?<=[.!?])\s+',text.replace('\n',' ')):
        if len(sentence.split())<=40:chunks.append(sentence);continue
        pieces=re.split(r'(?<=[,;:])\s+',sentence);current=''
        for piece in pieces:
            if current and len((current+' '+piece).split())>35:chunks.append(current);current=piece
            else:current=(current+' '+piece).strip()
        if current:chunks.append(current)
    return chunks

def materialize(project):
    for name in ['produce.py','compose.py']:
        shutil.copy2(_bundle/'runtime'/name,project/name)


def prepare(ep):
    path=ROOT/'scripts'/ep['script']
    if not path.exists():return False
    ch=chapters(path);word_count=sum(len(t.split()) for _,t in ch)
    if word_count<2200:raise RuntimeError(f'{ep["id"]}: only {word_count} spoken whitespace words; expand the authored script')
    project=ROOT/'episodes'/ep['id']
    for folder in ['audio','shots','output','segments']: (project/folder).mkdir(parents=True,exist_ok=True)
    scenes=[]
    for i,(title,text) in enumerate(ch):
        scenes.append(dict(id=f'chapter-{i+1:02}',chapter=f'{i+1:02} / {title.upper()}',title=title,source='NASA / NOAA / FAO / IPCC · Sources.md',source_urls=ep['sources'],visual=VISUALS[ep['id']][i%len(VISUALS[ep['id']])],sentences=sentence_chunks(text)))
    (project/'scenes.json').write_text(json.dumps(scenes,ensure_ascii=False,indent=2),encoding='utf-8')
    (project/'episode.json').write_text(json.dumps(dict(**ep,script_words=word_count,minimum_duration_seconds=601),ensure_ascii=False,indent=2),encoding='utf-8')
    shutil.copy2(path,project/'SCRIPT.md')
    (project/'SOURCES.md').write_text('# Nguồn và ghi công\n\n'+ep['title']+'\n\n'+'\n'.join('- '+u for u in ep['sources'])+'\n\nNội dung thuyết minh nguyên bản tiếng Việt. Toàn bộ cảnh là minh họa AI Wan2.2-TI2V-5B, không phải tư liệu quan sát hay sự kiện thật. Giọng Ngọc Linh, VieNeu v3 Turbo của Phạm Nguyễn Ngọc Bảo. Hình gốc 832 × 480 được nâng lên Full HD.\n',encoding='utf-8')
    materialize(project)
    print(ep['id'],len(ch),'chapters',word_count,'words')
    return True

if __name__=='__main__':
    ready=[e['id'] for e in SERIES['episodes'] if prepare(e)]
    (ROOT/'prepared.json').write_text(json.dumps(dict(ready=ready,total=10),indent=2),encoding='utf-8')
