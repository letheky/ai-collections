#!/bin/bash
# all stills for the film, 2400x1350 (room for slow pans / zooms down to 1920x1080)
S=/tmp/claude-0/-home-user-ai-collections/b52dd93b-206a-5a07-81bb-9e25946ecad0/scratchpad
cap() { page=$1; shift; timeout 2400 $S/pc/bin/python $S/pcscripts/capture.py $S/pcassets "$@" --page "$page" --size 2400x1350 --out $S/film/shots 2>&1 | grep -E "^\s+->|error|Error" ; }
cap "berlin/index.html?state=closed" B_closed_wide:overview B_closed_crowd:look=30,-6,30 B_closed_barrier:look=22.5,-7,22 B_closed_booth:look=13,-12,24 B_closed_officer:look=19.5,-7,16 B_bridge_empty:look=-14,-7,34
cap "berlin/index.html?state=few" B_few_bridge:look=-14,-7,30
cap "berlin/index.html?state=open" B_open_wide:overview B_open_bridge:look=-14,-7,30 B_open_crowd:look=12,-7,28 B_open_barrier:look=22.5,-7,22
cap "berlin/index.html?state=morning&mood=golden" B_morning_wide:overview B_morning_bridge:look=-14,-7,30
cap "map/index.html?map=city" M_city:overview M_city_west:look=-14,-4,46 M_city_bridge:look=-2,-19.6,24 M_city_wall:look=-14,-15,30
cap "map/index.html?map=city&state=demo" M_demo:look=9,-1,30
cap "map/index.html?map=europe" M_europe:overview M_europe_hun:look=3.7,13.5,34 M_europe_cssr:look=-3.7,0.6,34
cap "press/index.html" P_wide:overview P_spk:look=-2,-10,30 P_desk:look=15,6.5,22 P_news:look=-15,6.5,22 P_table:look=0,-8,40
echo SHOTS_DONE
