(function(exports) {
    'use strict';
  
    exports.nodes = [
      {
        'text': 'Will your project make direct contact with research participants?',
        'edges': {
          'Yes': ['My project will be making direct contact with participants', 'move 2'],
          'No':  ['My project will not be making direct contact with participants', 'next']
        }
      },
      {
        'text': 'Are you going to access information relating to people that you could identify if you were suitably determined to?',
        'edges': {
          'Yes': ['My project will handle identifiable information', 'next'],
          'No':  ['My project will not handle identifiable information', 'move 5']
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
        'text': 'Will your project ask people for information that might be special category?',
        'edges': {
          'Yes': ['I will ask for information that might be special category', 'TIER_2'],
          'No':  ['I will not ask for information that might be special category', 'next']
        }
      },
      
      {
        'breadcrumb': 'identifiable',
        'text': 'Are there any licenses or agreements concerning confidentiality for the data that your project intends to use?',
        'edges': {
          'Yes': ['My project will use confidential information held by third parties', 'next'],
          'No':  ['My project will not use confidential information held by third parties', 'TIER_1']
        }
      },
      {
        'breadcrumb': 'identifiable',
        'text': 'Are there conditions attached to the data that would commit you to using fixed configurations of network or desktops?',
        'edges': {
          'Yes': ['There are conditions attached to the data that would mean using fixed configurations of network or desktops', 'TIER_2'],
          'No':  ['There are no conditions attached to the data that would mean using fixed configurations of network or desktops', 'TIER_1']
        }
      },
      {
        'breadcrumb': 'non-identifiable',
        'text': 'Are there any licenses or agreements concerning confidentiality for the data that your project intends to use?',
        'edges': {
          'Yes': ['My project will use confidential information held by third parties', 'next'],
          'No':  ['My project will not use confidential information held by third parties', 'TIER_0']
        }
      },
      {
        'breadcrumb': 'non-identifiable',
        'text': 'Are there conditions attached to the data that would commit you to using fixed configurations of network or desktops?',
        'edges': {
          'Yes': ['There are conditions attached to the data that would mean using fixed configurations of network or desktops', 'TIER_2'],
          'No':  ['There are no conditions attached to the data that would mean using fixed configurations of network or desktops', 'TIER_1']
        }
      }
    ];
  
  })(this);
