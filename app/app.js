(function() {
  'use strict';

  var nodes = [
    {
      'text': 'Will the research generate (including by selecting, sorting or combining) any personal data?',
      'edges': {
        'Yes': ['The research will generate personal data', 'move 4'],
        'No':  ['The research will not generate personal data', 'next']
      }
    },
    {
      'text': 'Will any project input be personal data?',
      'edges': {
        'Yes': ['Project inputs include personal data', 'next'],
        'No':  ['No project input will be personal data', 'move 5']
      }
    },
    {
      'text': 'Is that personal data legally accessible by the general public with no restrictions on use?',
      'edges': {
        'Yes': ['The personal data is legally accessible by the general public with no restrictions on use', 'move 4'],
        'No':  ['The personal data is not legally accessible by the general public without restrictions on its use', 'next']
      }
    },
    {
      'text': 'Is that personal data pseudonymised?',
      'edges': {
        'Yes': ['The personal data is pseudonymised', 'move 2'],
        'No':  ['The personal data is not pseudonymised', 'next']
      }
    },
    {
      'text': 'Would disclosure pose a substantial threat to the personal safety, health or security of the data subjects?',
      'edges': {
        'Yes': ['Disclosure would pose a substantial threat to the personal safety, health or security of the data subjects', 'TIER_4'],
        'No':  ['Disclosure would not pose a substantial threat to the personal safety, health or security of the data subjects', 'TIER_3']
      }
    },
    {
      'text': 'Do you have absolute confidence that it is not possible to identify individuals from the data, either at the point of entry or as a result of any analysis that may be carried out?',
      'edges': {
        'Yes': ['I have absolute confidence that it is not possible to identify individuals from the data, either at the point of entry or as a result of any analysis that may be carried out', 'next'],
        'No':  ['I do not have absolute confidence that it is not possible to identify individuals from the data, either at the point of entry or as a result of any analysis that may be carried out', 'move 5']
      }
    },
    {
      'text': 'Will you be working with commercial-in-confidence information or private third party intellectual property, or legally or politically sensitive data?',
      'edges': {
        'Yes': ['I will be working with commercial-in-confidence information or private third party intellectual property, or legally or politically sensitive data', 'move 2'],
        'No':  ['I will not be working with commercial-in-confidence information or private third party intellectual property, or legally or politically sensitive data', 'next']
      }
    },
    {
      'text': 'Will releasing any of the datasets or results impact on the competitive advantage of the research team?',
      'edges': {
        'Yes': ['Releasing any of the datasets or results would impact on the competitive advantage of the research team', 'TIER_1'],
        'No':  ['Releasing any of the datasets or results would not impact on the competitive advantage of the research team', 'TIER_0']
      }
    },
    {
      'text': 'Do you have high confidence that the commercial, legal, reputational or political consequences of unauthorised disclosure of this data would be low?',
      'edges': {
        'Yes': ['I have have high confidence that the commercial, legal, reputational or political consequences of unauthorised disclosure of this data would be low', 'next'],
        'No':  ['I do not have high confidence that the commercial, legal, reputational or political consequences of unauthorised disclosure of this data would be low', 'move 5']
      }
    },
    {
      'text': 'Do you have high confidence that the commercial, legal, reputational or political consequences of unauthorised disclosure of this data would be so low as to be trivial?',
      'edges': {
        'Yes': ['I have have high confidence that the commercial, legal, reputational or political consequences of unauthorised disclosure of this data would be so low as to be trivial', 'TIER_1'],
        'No':  ['I do not have high confidence that the commercial, legal, reputational or political consequences of unauthorised disclosure of this data would be so low as to be trivial', 'TIER_2']
      }
    },
    {
      'text': 'Do you have strong confidence that it is not possible to identify individuals from the data, either at the point of entry or as a result of any analysis that may be carried out?',
      'edges': {
        'Yes': ['I have strong confidence that it is not possible to identify individuals from the data, either at the point of entry or as a result of any analysis that may be carried out', 'next'],
        'No':  ['I do not have strong confidence that it is not possible to identify individuals from the data, either at the point of entry or as a result of any analysis that may be carried out', 'move 3']
      }
    },
    {
      'text': 'Will you also be working with commercial-in-confidence information or private third party intellectual property, or legally or politically sensitive data?',
      'edges': {
        'Yes': ['I will also be working with commercial-in-confidence information or private third party intellectual property, or legally or politically sensitive data', 'next'],
        'No':  ['I will not also be working with commercial-in-confidence information or private third party intellectual property, or legally or politically sensitive data', 'TIER_2']
      }
    },
    {
      'text': 'Do you have high confidence that the commercial, legal, reputational or political consequences of unauthorised disclosure of this data would be low?',
      'edges': {
        'Yes': ['I have have high confidence that the commercial, legal, reputational or political consequences of unauthorised disclosure of this data would be low', 'TIER_2'],
        'No':  ['I do not have high confidence that the commercial, legal, reputational or political consequences of unauthorised disclosure of this data would be low', 'next']
      }
    },
    {
      'text': 'Do likely attackers include sophisticated, well resourced and determined threats, such as highly capable serious organised crime groups and state actors?',
      'edges': {
        'Yes': ['Likely attackers include sophisticated, well resourced and determined threats, such as highly capable serious organised crime groups and state actors', 'TIER_4'],
        'No':  ['Likely attackers do not include sophisticated, well resourced and determined threats, such as highly capable serious organised crime groups and state actors', 'TIER_3']
      }
    },
  ];

  var globalState = {
    currentStep: 0,
    trail: []
  };
  var appContent = document.getElementById('app-content');
  var moveToNextNode = function(evt) {
    var nextNodeId = evt.target.nextNodeId;
    var trailText = evt.target.trailText;
    update(nextNodeId, trailText, true);
  }
  var update = function(nodeId, trailText, updateGlobalState) {
    if (updateGlobalState) {
      globalState.currentNodeId = nodeId;
      if (trailText.length > 0) {
        globalState.trail.push(trailText);
      }
      history.pushState(globalState, null, '?nodeId=' + nodeId);
    }

    // Clear previous content:
    appContent.innerHTML = '';
    if (typeof(nodeId) === 'number') {
      // Get new content:
      var node = nodes[nodeId];

      var p = document.createElement('p');
      p.textContent = node.text;
      appContent.appendChild(p);

      ['Yes', 'No'].forEach(function(answer) {
        var input = document.createElement('input');
        input.type = 'button';
        input.value = answer;
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
      globalState.trail.forEach(function(breadcrumb) {
        var li = document.createElement('li');
        li.textContent = breadcrumb;
        ul.append(li);
      })
      appContent.appendChild(ul);

      var h4 = document.createElement('h4');
      h4.textContent = 'Based on these responses, we believe your work package to be in: ' + nodeId;
      appContent.appendChild(h4);

      function download() {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(globalState.trail));
        element.setAttribute('download', 'path.txt');

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
      }

      var input = document.createElement('input');
      input.type = 'button';
      input.value = 'Download this info';
      input.addEventListener('click', download);
      appContent.appendChild(input);

    }
    console.log(history);
  }

  // Initialise the app:
  window.onload = function() {
    var urlParams = new URLSearchParams(window.location.search);

    // Check if this is a reload, in which case you are already on a slide.
    if (urlParams.has('nodeId')) {
      var nodeId = Number(urlParams.get('nodeId'));
      if (!isNaN(nodeId)) {
        update(nodeId, '', true);
      }
    } else {
      update(0, '', true);
    }
  }

  // Fires when the user goes back or forward in the history.
  window.onpopstate = function(evt) {
    console.log('I am popping state', evt);
    if (evt.state != null) {
      console.log(evt.state.path);
      var previousStep = evt.state.path.pop();
      console.log(evt.state.path);
      update(previousStep, false);
      globalState = evt.state;
    }
  }

})();
