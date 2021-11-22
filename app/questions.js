(function(exports) {
  'use strict';

  exports.nodes = [
    {
      'text': 'Will your project make direct contact with research participants?',
      'edges': {
        'Yes': ['My project will be making direct contact with participants', 'next'],
        'No':  ['My project will not be making direct contact with participants', 'move 3']
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
        'Yes': ['I will ask for information that might be special category', 'TIER_1_AND_A_HALF'],
        'No':  ['I will not ask for information that might be special category', 'TIER_1']
      }
    },
    {
      'text': 'Are there any licenses or agreements concerning confidentiality for the data that your project intends to use?',
      'edges': {
        'Yes': ['My project will be using personal data held by third parties', 'next'],
        'No':  ['My project will not be using personal data held by third parties', 'TIER_0']
      }
    },
    {
      'text': 'Does the license or agreement require ISO 27001 or DSP Toolkit?',
      'edges': {
        'Yes': ['The agreement requires ISO 27001 or DSP Toolkit', 'TIER_2'],
        'No':  ['The agreement does not require ISO 27001 or DSP Toolkit', 'next']
      }
    },
    {
      'text': 'Will the licenses or agreements cover information relating to people',
      'edges': {
        'Yes': ['The agreement relates to people', 'next'],
        'No':  ['The agreement does not relate to people', 'move 3']
      }
    },
    {
      'text': 'Are the people the data relates to defined by a set of characteristics that might be special category?',
      'edges': {
        'Yes': ['The agreement relates to people', 'TIER_2'],
        'No':  ['The agreement does not relate to people', 'next']
      }
    },
    {
      'text': 'Will the license or agreement cover data that might be special category?',
      'edges': {
        'Yes': ['I will ask for information that might be special category', 'TIER_2'],
        'No':  ['I will not ask for information that might be special category', 'next']
      }
    },
    {
      'text': 'Are there conditions attached to the data that would mean using fixed configurations of network or desktops?',
      'edges': {
        'Yes': ['There are conditions attached to the data that would mean using fixed configurations of network or desktops', 'TIER_2'],
        'No':  ['There are no conditions attached to the data that would mean using fixed configurations of network or desktops', 'TIER_1']
      }
    },
    
  ];

})(this);
