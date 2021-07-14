#!/bin/sh
node ../../../../handleRepo.js
node ../../../../handleHelmChart.js
helm dep up .deploy/helm
