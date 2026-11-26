#!/bin/bash
S=/tmp/claude-0/-home-user-ai-collections/b52dd93b-206a-5a07-81bb-9e25946ecad0/scratchpad
cap() { page=$1; shift; timeout 7000 $S/pc/bin/python $S/pcscripts/capture.py $S/pcassets "$@" --page "$page" --size 1080p --out $S/film/shots 2>&1 | grep -E "frames at|error|Error" ; }
cap "berlin/index.html?state=closed" "V_berlin:video=6,25"
cap "map/index.html?map=city" "V_map:video=6,25"
cap "press/index.html" "V_press:video=6,25"
echo CLIPS_DONE
