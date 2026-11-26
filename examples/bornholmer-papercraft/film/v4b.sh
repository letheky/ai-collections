#!/bin/bash
S=/tmp/claude-0/-home-user-ai-collections/b52dd93b-206a-5a07-81bb-9e25946ecad0/scratchpad; cd $S/film
cap() { page=$1; shift; timeout 2400 $S/pc/bin/python $S/pcscripts/capture.py $S/pcassets "$@" --page "$page" --size 2400x1350 --out $S/film/shots 2>&1 | grep -E "^\s+->|rror" ; }
vid() { page=$1; shift; timeout 7000 $S/pc/bin/python $S/pcscripts/capture.py $S/pcassets "$@" --page "$page" --size 1080p --out $S/film/shots 2>&1 | grep -E "frames at|rror" ; }
cap "berlin/index.html?state=closed" B_closed_wide:overview B_closed_crowd:look=31,4.4,30 B_closed_barrier:look=23,-2.2,24 B_closed_booth:look=13,-8,26 B_closed_officer:look=20,-2.4,17 B_bridge_empty:look=-14,-7,34
cap "berlin/index.html?state=few" B_few_bridge:look=-14,-7,30
cap "berlin/index.html?state=open" B_open_wide:overview B_open_bridge:look=-14,-7,30 B_open_crowd:look=12,-4.4,28 B_open_barrier:look=23,-2.2,24
echo STILLS_DONE
rm -rf shots/V_berlin shots/V_press shots/V_flow shots/V_back shots/V_raise
vid "berlin/index.html?state=closed&raise=1&cam=21,-1.2,28" "V_raise:video=7,25,-,3.2"
vid "berlin/index.html?state=open&flow=-1&cam=4,-4,48" "V_flow:video=9,25,-,3.2"
vid "berlin/index.html?state=morning&mood=golden&flow=1&cam=-12,-7,40" "V_back:video=8,25,-,3.2"
vid "berlin/index.html?state=closed" "V_berlin:video=6,25"
vid "press/index.html" "V_press:video=6,25"
echo CLIPS_DONE
$S/vn/bin/python assemble.py > assemble4.log 2>&1; echo ALL_DONE >> assemble4.log
