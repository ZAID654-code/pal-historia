#!/bin/sh
# usage: ./sheet.sh day3  -> build/sheet.jpg with one frame near the end of every line
EP=$1 node render.js sheet $(python3 -c "
import json,sys
L=json.load(open('build/$1/timeline.json'))['lines']
print(' '.join(f\"{l['end']+0.15:.2f}\" for l in L[::${2:-1}]))")
