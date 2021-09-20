(function() {
  'use strict';

  var branches = [
    {
      'branchIdx': 0,
      'text': 'Does your data include direct identifiers?',
      'answers': [
        {
          'text': 'Yes',
          'goToBranchIdx': 1
        },
        {
          'text': 'No',
          'goToBranchIdx': 2
        }
      ]
    },
    {
      'branchIdx': 1,
      'text': 'First step is to remove them. Click move on when you have a copy of the data with them removed.',
      'answers': [
        {
          'text': 'Move on',
          'goToBranchIdx': 2
        }
      ]
    },
    {
      'branchIdx': 2,
      'text': 'Have you identified which of your variables are likely to pose the greatest risk of indirect identification?',
      'answers': [
        {
          'text': 'Yes',
          'goToBranchIdx': 4
        },
        {
          'text': 'No',
          'goToBranchIdx': 3
        }
      ]
    },
    {
      'branchIdx': 3,
      'text': 'Next step is to consider this carefully. Have you considered X and also Y? Once you have done a reasonable risk assessment, taking into account the context in which the data will be accessed, click move on',
      'answers': [
        {
          'text': 'Move on',
          'goToBranchIdx': 4
        }
      ]
    },
    {
      'branchIdx': 4,
      'text': 'Which of the following approaches are you using to mitigate the risk of subject identification?',
      'answers': [
        {
          'text': 'Micro-aggregation',
          'goToBranchIdx': 5
        },
        {
          'text': 'Shuffling',
          'goToBranchIdx': 5
        },
        {
          'text': 'Local suppression',
          'goToBranchIdx': 5
        },
        {
          'text': 'Adding noise',
          'goToBranchIdx': 5
        }
      ]
    },
  ];

  var globalState = {
    currentStep: 0,
    path: []
  };
  var appContent = document.getElementById('app-content');
  var moveToNextBranch = function(evt) {
    var goToBranchIdx = evt.target.goToBranchIdx;
    update(goToBranchIdx);
  }
  var update = function(branchIdx) {
    // Keep track of state:
    globalState.currentStep = branchIdx;
    globalState.path.push(branchIdx);
    console.log(globalState);

    history.pushState(globalState, null, '?branchIdx=' + branchIdx);
    console.log(history);

    // Clear previous content:
    appContent.innerHTML = '';

    if (branchIdx < branches.length - 1) {
      // Get new content:
      var branch = branches[branchIdx];

      var p = document.createElement('p');
      p.textContent = branch.text;
      appContent.appendChild(p);

      branch.answers.forEach(function(answer) {
        var input = document.createElement('input');
        input.type = 'button';
        input.value = answer.text;
        input.goToBranchIdx = answer.goToBranchIdx;
        input.addEventListener('click', moveToNextBranch);
        appContent.appendChild(input);
      });
    }
    else {
      var p = document.createElement('p');
      p.textContent = 'This is your result: ' + globalState.path;
      appContent.appendChild(p);

      function download() {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(globalState.path));
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
    if (urlParams.has('branchIdx')) {
      var branchIdx = Number(urlParams.get('branchIdx'));
      if (!isNaN(branchIdx)) {
        update(branchIdx);
      }
    } else {
      update(0);
    }
  }

  // Fires when the user goes back or forward in the history.
  window.onpopstate = function(evt) {
    console.log(evt.state);
    if (evt.state != null) {
      update(evt.state.currentStep);
      globalState = evt.state;
    }
  }

})();
