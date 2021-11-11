(function() {
  'use strict';

  var nodes = [
    {
      'text': 'Are you obtaining personal data directly?',
      'edges': {
        'Yes': ['I am obtaining personal data directly', 'next'],
        'No':  ['I am not obtaining personal data directly', 'move 3']
      }
    },
    {
      'text': 'Does your research concern a particular group of people defined by a set of characteristics that might be special category?',
      'edges': {
        'Yes': ['My research concerns a particular group of people defined by a set of characteristics that might be special category', 'TIER_2'],
        'No':  ['My research does not concern a particular group of people defined by a set of characteristics that might be special category', 'next']
      }
    },
    {
      'text': 'Will you ask for data that might be sensitive such as ethnicity?',
      'edges': {
        'Yes': ['I will ask for data that might be sensitive such as ethnicity', 'TIER_1_AND_A_HALF'],
        'No':  ['I will not ask for data that might be sensitive such as ethnicity', 'TIER_1']
      }
    },
    {
      'text': 'Do any third parties hold personal data which will be used by your project?',
      'edges': {
        'Yes': ['My project will be using personal data held by third parties', 'next'],
        'No':  ['My project will not be using personal data held by third parties', 'TIER_0']
      }
    },
    {
      'text': 'Will you be accessing this personal data? (If not presumably it will be pseudonymised before your project uses it?)',
      'edges': {
        'Yes': ['I will be accessing this personal data', 'next'],
        'No':  ['I will not be accessing this personal data', 'TIER_0']
      }
    },
    {
      'text': 'Are there conditions attached to the data that would mean using fixed configurations of network or desktops or is it special category?',
      'edges': {
        'Yes': ['There are conditions attached to the data that would mean using fixed configurations of network or desktops or it is special category', 'TIER_2'],
        'No':  ['There are no conditions attached to the data that would mean using fixed configurations of network or desktops and it is not special category', 'TIER_1']
      }
    },
  ];

  var appContent = document.getElementById('app-content');
  var moveToNextNode = function(evt) {
    var nextNodeId = evt.target.nextNodeId;
    var trailText = evt.target.trailText;
    updateState(nextNodeId, trailText);
  }
  var updateState = function(nodeId, text) {
    var state = history.state;
    state.trail.push({
      nodeId: nodeId,
      text: text
    });
    history.pushState(state, null, '?nodeId=' + nodeId);
    updateContent(state);
  }
  var updateContent = function(state) {
    var nodeId = 0;
    if (state.trail.length > 0) {
      nodeId = state.trail[state.trail.length - 1].nodeId;
    }

    // Clear previous content:
    appContent.innerHTML = '';
    if (typeof(nodeId) === 'number') {
      // Get new content:
      var node = nodes[nodeId];

      var h4 = document.createElement('h4');
      h4.textContent = node.text;
      appContent.appendChild(h4);

      ['Yes', 'No'].forEach(function(answer) {
        var input = document.createElement('input');
        input.type = 'button';
        input.value = answer;
        input.classList.add('cta');
        input.classList.add('btn');
        input.classList.add('cta-half');
        var trailText = node.edges[answer][0];
        var nextNodeInstruction = node.edges[answer][1];
        if (nextNodeInstruction === 'next') {
          var nextNodeId = nodeId + 1;
        }
        else if (nextNodeInstruction.indexOf('move') >= 0) {
          var moveValue = Number(nextNodeInstruction.replace('move', ''));
          var nextNodeId = nodeId + moveValue;
        }
        else if (nextNodeInstruction.indexOf('TIER') >= 0) {
          var nextNodeId = nextNodeInstruction;
        }
        input.trailText = trailText;
        input.nextNodeId = nextNodeId;
        input.addEventListener('click', moveToNextNode);
        appContent.appendChild(input);
      });
    }
    else {
      var p = document.createElement('p');
      p.textContent = 'I confirm:';
      appContent.appendChild(p);

      var ul = document.createElement('ul');
      state.trail.forEach(function(breadcrumb) {
        var li = document.createElement('li');
        li.textContent = breadcrumb.text;
        ul.append(li);
      });
      appContent.appendChild(ul);

      var tier_lookup = {
        'TIER_0': 'public',
        'TIER_1': 'confidential and can therefore be stored in a Research Data Storage Service repository',
        'TIER_1_AND_A_HALF': 'a mixture of confidential and highly confidential: the more sensitive data must be stored in a secure environment, such as UCL\'s Data Safe Haven, but the rest can be stored in a Research Data Storage Service repository',
        'TIER_2': 'highly confidential and must be stored in a secure environment, such as UCL\'s Data Safe Haven'
      };
      var h4 = document.createElement('h4');
      h4.textContent = 'Based on these responses, we believe your data is ' + tier_lookup[nodeId];
      appContent.appendChild(h4);

      function download() {
        var pars = [
          new docx.Paragraph({
                children: [
                    new docx.TextRun({
                        text: "Declaration of data analysis",
                        bold: true,
                        font: "Calibri",
                        size: 30,
                    }),
                ],
                spacing: {
                    after: 200,
                },
            }),
        ];
        state.trail.forEach(function(breadcrumb) {
            pars.push(new docx.Paragraph({
                children: [
                    new docx.TextRun({
                        text: breadcrumb.text,
                        font: "Calibri",
                    })
                ],
                break: 1,
                bullet: {
                    level: 0
                    }
                }),
            );
        });
        pars.push(
            new docx.Paragraph({
                children: [
                    new docx.TextRun({
                        text: "Signed\t\t\t\t\t\tDate",
                        bold: true,
                        font: "Calibri",
                    }),
                ],
                spacing: {
                    before: 400,
                    after: 200,
                },
            }),
        );
        pars.push(
            new docx.Paragraph({
                children: [
                    new docx.TextRun({
                        text: ".........\t\t\t\t\t\t........",
                        font: "Calibri",
                    }),
                ],
                spacing: {
                    before: 800
                },
            }),
        );

        var doc = new docx.Document({
            sections: [{
                properties: {},
                children: pars,
            }],
        });

        var element = document.createElement('a');
        docx.Packer.toBlob(doc).then(function(blob) {
          element.setAttribute('href', window.URL.createObjectURL(blob));
          element.setAttribute('download', 'path.docx');

          element.style.display = 'none';
          document.body.appendChild(element);

          element.click();

          document.body.removeChild(element);
        })
      }

      var input = document.createElement('input');
      input.type = 'button';
      input.value = 'Download this info';
      input.classList.add('cta');
      input.classList.add('btn');
      input.classList.add('cta-half');
      input.addEventListener('click', download);
      appContent.appendChild(input);

    }
    console.log(history.state.trail);
  }

  // Initialise the app:

  window.onload = function() {
    var urlParams = new URLSearchParams(window.location.search);
    var state = history.state;
    if (!state) {
      state = {trail: []};
      history.pushState(state, '', '?nodeId=0');
    }
    updateContent(state);
  };

  // Fires when the user goes back or forward in the history.
  window.onpopstate = function(evt) {
    if (evt.state != null) {
      updateContent(evt.state);
    }
  }

})();
