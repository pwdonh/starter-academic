---
authors:
- admin
categories:
- Demo
date: "2020-04-01T00:00:00Z"
draft: true
featured: false
_build:
  render: true
  list: never
  publishResources: true
image:
  caption: 'Image credit: [**Unsplash**](https://unsplash.com/photos/CpkOjOcXdUY)'
  focal_point: ""
  placement: 2
  preview_only: true
lastmod: "2020-04-01T00:00:00Z"
projects: []
subtitle: ''
summary: Web-demo for the phonetic language model in our recent paper.
tags:
- Academic
title: 'Speech recording'
---

<script src='https://cdn.plot.ly/plotly-latest.min.js'></script>
<script src="//code.jquery.com/jquery-1.12.4.min.js" integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ=" crossorigin="anonymous"></script>
<script src="js/WebAudioRecorder.js"></script>

Start recording your voice by pressing on the buttons below:
Alternatively, upload an audio file:
The audio will be processed and outputs displayed on top of the spectrogram:
You can listen to the recording:

<button id='start-recording' disabled>Start</button>
<button id='stop-recording' disabled>Stop</button>

<div id="plotdiv"></div>

<div id="page-audio-container"><audio id="page-audio" src="example.wav" controls></audio></div>

<input type="file" id="file-input" />

<script type="text/javascript" src="main.js"></script>
