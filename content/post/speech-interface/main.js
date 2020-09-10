
  let player = document.getElementById('page-audio')

  var samplingRate = 16000

  function get_cursor(current_t) {
    return {
      x: [current_t, current_t],
      y: [0, 1],
      name: 'cursor',
      type: 'scatter',
      mode: 'lines',
      yaxis: 'y2',
      showlegend: false,
      line: {color: 'rgb(255,255,255)', width: 1, opacity: .5}
    }
  }

  function plot_wav(spec, p_langs, p_boundary, t, f){
    var specPlot = document.getElementById('plotdiv'),
      langs = ['German','English','French','No speech']
      data = []
      fontcol = '#888888'
      linecolors = [['rgb(255,255,255)', 'rgb(255,255,255)', 'rgb(255,255,255)', 'rgb(255,255,255)'],
                    ['rgb(76,114,176)', 'rgb(221,132,82)', 'rgb(85,168,104)', 'rgb(255,0,0)']]
      linewidths = [3, 2]
      showscales = [false, true]
      colormap = [['0.0', 'rgb(4,5,27)'], ['0.010101010101010102', 'rgb(8,7,30)'], ['0.020202020202020204', 'rgb(11,9,32)'], ['0.030303030303030304', 'rgb(15,11,35)'], ['0.04040404040404041', 'rgb(18,12,37)'], ['0.05050505050505051', 'rgb(22,14,40)'], ['0.06060606060606061', 'rgb(25,16,42)'], ['0.07070707070707072', 'rgb(30,17,45)'], ['0.08080808080808081', 'rgb(32,18,47)'], ['0.09090909090909091', 'rgb(37,20,50)'], ['0.10101010101010102', 'rgb(40,21,52)'],
                      ['0.11111111111111112', 'rgb(44,22,55)'], ['0.12121212121212122', 'rgb(47,23,57)'], ['0.13131313131313133', 'rgb(51,24,60)'], ['0.14141414141414144', 'rgb(56,25,63)'], ['0.15151515151515152', 'rgb(59,26,65)'], ['0.16161616161616163', 'rgb(64,27,68)'], ['0.17171717171717174', 'rgb(67,27,69)'], ['0.18181818181818182', 'rgb(71,28,72)'], ['0.19191919191919193', 'rgb(74,28,73)'], ['0.20202020202020204', 'rgb(79,29,76)'], ['0.21212121212121213', 'rgb(82,29,77)'],
                      ['0.22222222222222224', 'rgb(87,30,79)'], ['0.23232323232323235', 'rgb(90,30,80)'], ['0.24242424242424243', 'rgb(95,30,82)'], ['0.25252525252525254', 'rgb(98,30,83)'], ['0.26262626262626265', 'rgb(103,30,84)'], ['0.27272727272727276', 'rgb(106,31,85)'], ['0.2828282828282829', 'rgb(111,31,87)'], ['0.29292929292929293', 'rgb(116,30,88)'], ['0.30303030303030304', 'rgb(120,30,88)'], ['0.31313131313131315', 'rgb(125,30,89)'], ['0.32323232323232326', 'rgb(128,30,90)'],
                      ['0.33333333333333337', 'rgb(133,29,90)'], ['0.3434343434343435', 'rgb(137,29,90)'], ['0.3535353535353536', 'rgb(142,28,91)'], ['0.36363636363636365', 'rgb(145,28,91)'], ['0.37373737373737376', 'rgb(150,27,91)'], ['0.38383838383838387', 'rgb(154,26,91)'], ['0.393939393939394', 'rgb(159,26,91)'], ['0.4040404040404041', 'rgb(162,25,90)'], ['0.4141414141414142', 'rgb(167,24,90)'], ['0.42424242424242425', 'rgb(171,23,89)'], ['0.43434343434343436', 'rgb(176,22,88)'],
                      ['0.4444444444444445', 'rgb(181,22,87)'], ['0.4545454545454546', 'rgb(184,22,86)'], ['0.4646464646464647', 'rgb(189,22,84)'], ['0.4747474747474748', 'rgb(192,22,83)'], ['0.48484848484848486', 'rgb(197,23,81)'], ['0.494949494949495', 'rgb(200,25,80)'], ['0.5050505050505051', 'rgb(204,27,78)'], ['0.5151515151515152', 'rgb(207,29,77)'], ['0.5252525252525253', 'rgb(211,33,74)'], ['0.5353535353535354', 'rgb(213,35,73)'], ['0.5454545454545455', 'rgb(217,39,71)'],
                      ['0.5555555555555556', 'rgb(219,42,69)'], ['0.5656565656565657', 'rgb(223,47,67)'], ['0.5757575757575758', 'rgb(226,52,65)'], ['0.5858585858585859', 'rgb(228,55,64)'], ['0.595959595959596', 'rgb(230,60,63)'], ['0.6060606060606061', 'rgb(232,64,62)'], ['0.6161616161616162', 'rgb(234,70,61)'], ['0.6262626262626263', 'rgb(235,74,61)'], ['0.6363636363636365', 'rgb(237,80,62)'], ['0.6464646464646465', 'rgb(238,83,63)'], ['0.6565656565656566', 'rgb(239,89,64)'],
                      ['0.6666666666666667', 'rgb(240,93,66)'], ['0.6767676767676768', 'rgb(241,99,69)'], ['0.686868686868687', 'rgb(241,103,71)'], ['0.696969696969697', 'rgb(242,109,74)'], ['0.7070707070707072', 'rgb(242,112,77)'], ['0.7171717171717172', 'rgb(243,118,81)'], ['0.7272727272727273', 'rgb(243,123,85)'], ['0.7373737373737375', 'rgb(243,127,88)'], ['0.7474747474747475', 'rgb(244,132,92)'], ['0.7575757575757577', 'rgb(244,135,95)'], ['0.7676767676767677', 'rgb(244,141,100)'],
                      ['0.7777777777777778', 'rgb(245,144,103)'], ['0.787878787878788', 'rgb(245,149,108)'], ['0.797979797979798', 'rgb(245,152,111)'], ['0.8080808080808082', 'rgb(245,157,116)'], ['0.8181818181818182', 'rgb(245,161,120)'], ['0.8282828282828284', 'rgb(245,166,125)'], ['0.8383838383838385', 'rgb(245,169,129)'], ['0.8484848484848485', 'rgb(245,174,135)'], ['0.8585858585858587', 'rgb(246,177,139)'], ['0.8686868686868687', 'rgb(246,182,144)'],
                      ['0.8787878787878789', 'rgb(246,186,151)'], ['0.888888888888889', 'rgb(246,189,155)'], ['0.8989898989898991', 'rgb(246,194,161)'], ['0.9090909090909092', 'rgb(246,197,165)'], ['0.9191919191919192', 'rgb(246,202,172)'], ['0.9292929292929294', 'rgb(247,205,176)'], ['0.9393939393939394', 'rgb(247,209,183)'], ['0.9494949494949496', 'rgb(247,212,187)'], ['0.9595959595959597', 'rgb(248,216,194)'], ['0.9696969696969697', 'rgb(248,219,198)'],
                      ['0.9797979797979799', 'rgb(248,224,205)'], ['0.98989898989899', 'rgb(249,227,209)'], ['1.0', 'rgb(249,231,216)']]
      ticks = [0,500,1000,2000,4000,8000]
      ticktext = ['0','.5',' 1',' 2',' 4',' 8']
      tickvals = []
      for (i=0; i<ticks.length; i++) {
        distance = ticks[ticks.length-1]
        for (j=0; j<f.length; j++){
          this_distance = Math.abs(ticks[i]-f[j])
          if (this_distance<distance) {
            distance = this_distance
          } else {
            tickvals[i] = j
            break
          }
        }
      }
      for (j=0; j<2; j++) {
        for (i=0; i<(p_langs.length); i++) {
          data.push({
            x: t,
            y: p_langs[i],
            name: langs[i],
            type: 'scatter',
            mode: 'lines',
            yaxis: 'y2',
            legendgroup: langs[i],
            showlegend: showscales[j],
            visible: 'legendonly',
            line: {color: linecolors[j][i], width: linewidths[j]}
          });
        }
      };
      for (j=0; j<2; j++) {
        for (i=0; i<(p_boundary.length-1); i++) {
          data.push({
            x: t,
            y: p_boundary[i],
            name: 'Boundary '+langs[i],
            type: 'scatter',
            mode: 'lines',
            yaxis: 'y2',
            legendgroup: 'boundary_'+langs[i],
            showlegend: showscales[j],
            // visible: 'legendonly',
            line: {dash: 'dot', color: linecolors[j][i], width: linewidths[j]}
          });
        }
      };
      data.push({
        x: t,
        z: spec,
        type: 'heatmap',
        yaxis: 'y1',
        zmin: -70,
        zmax: 50,
        hoverinfo: 'none',
        showscale: false,
        colorscale: colormap
      });
      current_t = player.currentTime
      cursor1 = {
        xid: 1,
        type: 'line',
        // x-reference is assigned to the x-values
        xref: 'x',
        // y-reference is assigned to the plot paper [0,1]
        yref: 'paper',
        x0: current_t,
        y0: 0,
        x1: current_t,
        y1: 1,
        fillcolor: 'rgb(255,255,255)',
        opacity: 0.5,
      };
      // data.push(get_cursor(current_t));
      layout = {
          shapes: [cursor1],
          xaxis: {showgrid: false},
          yaxis: {ticks: 'outside',
                  tickvals: tickvals,
                  ticktext: ticktext,
                  showgrid: false},
          yaxis2: {range: [0, 1],
                  overlaying: 'y',
                  ticks: 'outside',
                  side: 'right',
                  tickvals: [0,.2,.4,.6,.8,1],
                  ticktext: ['0','.2','.4','.6','.8','1'],
                  showgrid: false},
          legend: {"orientation": "h"},
          paper_bgcolor: 'rgba(0,0,0,0)',
          plot_bgcolor: 'rgba(0,0,0,0)',
          margin: {
            t: 45, //top margin
            l: 20, //left margin
            r: 20, //right margin
            b: 20 //bottom margin
          },
          font: {color: fontcol}
      };
      var config = {
        toImageButtonOptions: {
          format: 'svg', // one of png, svg, jpeg, webp
          filename: 'custom_image',
          height: 500,
          width: 700,
          scale: 1 // Multiply title/legend/axis/canvas sizes by this factor
        }
      };
    Plotly.newPlot('plotdiv', data, layout, config);
    specPlot.on('plotly_click', function(data){
        player.currentTime = data.points[0].x
        // Plotly.restyle('plotdiv', {x: [[data.points[0].x, data.points[0].x]]}, [specPlot.data.length-1])
        var update = {
          'shapes[0].x0': data.points[0].x,
          'shapes[0].x1': data.points[0].x
        };
        Plotly.relayout(specPlot, update);
    })
  }

  const startRecording = document.getElementById('start-recording');
  const stopRecording = document.getElementById('stop-recording');

  // Load file from disk
  function readSingleFile(e) {
    var file = e.target.files[0];
    if (!file) {
      return;
    }
    var reader = new FileReader();
    reader.onload = function(e) {
      var contents = e.target.result;
      processDataURL(contents);
    };
    reader.readAsDataURL(file);
  }

  // // Assign an ontimeupdate event to the <video> element, and execute a function if the current playback position has changed
  // player.ontimeupdate = function() {
  //     // Display the current position of the video in a <p> element with id="demo"
  //     var current_t = player.currentTime
  //     var update = {
  //       'shapes[0].x0': current_t,
  //       'shapes[0].x1': current_t
  //     };
  //     var gd = document.getElementById('plotdiv')
  //     Plotly.relayout(gd, update);
  // }

  // Process audio data URL from uploaded or recorded file
  function processDataURL(base64) {
    // // show part of url content
    // var element = document.getElementById('file-content');
    // element.textContent = base64.slice(0,300);
    var gd = document.getElementById('plotdiv')
    Plotly.restyle('plotdiv', {z: [[]]}, [gd.data.length-1])
    Plotly.restyle('plotdiv', {'line.color': 'rgba(0,0,0,0)'})
    // Playback tools
    showPlaybackTools(base64)
    // Upload to server
    var files = {
        audio: {
            type: base64.split(';')[0].split(':')[1],
            data: base64.split(',')[1]
        }
    };
    $.ajax({
        url: api_url,
        dataType: 'json',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify( files ),
        processData: false,
        success: function( data, textStatus, jQxhr ){
            plot_wav(data.spec, data.p_lang, data.p_boundary, data.t, data.f)
        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }
    });
  }

  document.getElementById('file-input')
    .addEventListener('change', readSingleFile, false);

  var route = '/audio_post'
  // if (document.domain=="peterdonhauser.com") {
  //   prefix = 'https://'
  // } else {
  //   prefix = 'http://'
  // }
  // const api_url = prefix + document.domain + ':' + location.port + route
  const api_url = 'https://' + 'peterdonhauser.com' + route

  $.ajax({
      url: api_url,
      type: 'get',
      success: function( data, textStatus, jQxhr ){
          plot_wav(data.spec, data.p_lang, data.p_boundary, data.t, data.f)
          startRecording.disabled = false;
      },
      error: function( jqXhr, textStatus, errorThrown ){
          console.log( errorThrown );
      }
  });

  function showPlaybackTools(data) {
      // Audio Player
      let playerDiv = document.getElementById('page-audio-container')
      let url;
      if (data instanceof Blob) {
          const blob = new Blob(data, { type: mimeType });
          url = (URL.createObjectURL(blob));
      } else {
          url = data;
      }
      let player = playerDiv.querySelector('#page-audio');
      player.src = url;
      player.style.visibility = "visible";
  }

  // Initialize audio recorder with onComplete function
  let audioRecorder;
  navigator.getUserMedia({
      audio: true
    }, function(stream) {

      var audioCtx = new AudioContext();
      var source = audioCtx.createMediaStreamSource(stream);
      audioRecorder = new WebAudioRecorder(source, {
        workerDir: "js/",     // must end with slash
        numChannels: 1
      });

      audioRecorder.onComplete = function(recorder, blob) {
        // var audioDataURL = URL.createObjectURL(blob);
        // showPlaybackTools(audioDataURL)
        var reader = new window.FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = function() {
            var base64 = reader.result;
            processDataURL(base64)
            // base64 = base64.split(',')[1];
            // resolveReader(base64);
        };
        // const readerPromise = new Promise(function(resolveReader) {
        //     reader.onloadend = function() {
        //         var base64 = reader.result;
        //         displayContents(base64)
        //         base64 = base64.split(',')[1];
        //         resolveReader(base64);
        //     };
        // });
        // readerPromise.then(function(base64) {
            // var files = {
            //     audio: {
            //         type: blob.type,
            //         data: base64
            //     }
            // };
            // $.ajax({
            //     url: api_url,
            //     dataType: 'json',
            //     type: 'post',
            //     contentType: 'application/json',
            //     data: JSON.stringify( files ),
            //     processData: false,
            //     success: function( data, textStatus, jQxhr ){
            //         plot_wav(data.spec, data.p_lang, data.t)
            //     },
            //     error: function( jqXhr, textStatus, errorThrown ){
            //         console.log( errorThrown );
            //     }
            // });
        // });
      };

    },function(error) {
        console.error(JSON.stringify(error));
    }
  )

  startRecording.onclick = function() {
    startRecording.disabled = true;
    stopRecording.disabled = false;
    audioRecorder.startRecording();
  }

  stopRecording.onclick = function() {
    startRecording.disabled = false;
    stopRecording.disabled = true;
    audioRecorder.finishRecording();
  }
