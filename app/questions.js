(function(exports) {
  'use strict';

  exports.nodes = [
    {
      'text': 'Are you obtaining personal data directly? (See below for guidance on meaning of "personal data")',
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

})(this);
