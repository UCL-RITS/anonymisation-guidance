(function(exports) {
    'use strict';
  
    exports.nodes = [
      {
        'text': 'Will your project make direct contact with research participants?',
        'flowchart': 'Direct participant contact?',
        'edges': {
          'Yes': ['My project will be making direct contact with participants', 'move 2'],
          'No':  ['My project will not be making direct contact with participants', 'next']
        },
        'guidance': 'By logical inference if you have direct contact with research participants, you will be handling confidential information. An example of direct contact would be emaling to set up appointments with participants. However, even information from face to face interactions would have confidentiality implications.'
      },
      {
        'text': 'Are you going to access information relating to people that you could identify if you were suitably determined to?',
        'flowchart': 'Identifiable data?',
        'edges': {
          'Yes': ['My project will handle identifiable information', 'next'],
          'No':  ['My project will not handle identifiable information', 'move 7']
        },
        'guidance': "You don't need to have direct contact with research participants in all cases to handle information about them. If you or anyone else could use information to identify someone then that information would be personal data under data protection legislation."
      },
      {
        'text': 'Does your research have inclusion criteria of anything that might be special category?',
        'flowchart': 'Special category population?',
        'edges': {
          'Yes': ['My research concerns a particular group of people defined by a set of characteristics that might be special category', 'TIER_2'],
          'No':  ['My research does not concern a particular group of people defined by a set of characteristics that might be special category', 'next']
        },
        'guidance': 'So, any of the following characteristics: racial or ethnic origin, political opinions, religious or philosophical beliefs, trade union membership, genetics, biometrics, health, sex life, or sexual orientation. Inclusion criteria featuring any of these characteristics would render your data Special Category under the UK Data Protection legislation'
      },
      {
        'text': 'Does your project concern or include any information that might imply criminality by the people you are studying or people known to them?',
        'flowchart': 'Implied criminality?',
        'edges': {
          'Yes': ['My project concerns / includes information about potential criminality by the people we are studying or people known to them', 'TIER_2'],
          'No':  ['My project does not concern / include information about potential criminality by the people we are studying or people known to them', 'next']
        },
        'guidance': 'Any informaiton implying criminality contained in your data will be protected by the UK Data Protection legislation.'
      },
      {
        'text': 'Does your project include information about children or vulnerable people?',
        'flowchart': 'Children or vulnerable people?',
        'edges': {
          'Yes': ['My project includes information about children or vulnerable people', 'TIER_2'],
          'No':  ['My project does not include information about children or vulnerable people', 'next']
        },
        'guidance':'Any information relating to children or vulnerable people in your data will be protected by the UK Data Protection legislation.'
      },
      {
        'text': 'Will your project ask people for information that might be special category?',
        'flowchart': 'Special category questions?',
        'edges': {
          'Yes': ['I will ask for information that might be special category', 'TIER_2'],
          'No':  ['I will not ask for information that might be special category', 'next']
        },
        'guidance': 'So, any of the following characteristics: racial or ethnic origin, political opinions, religious or philosophical beliefs, trade union membership, genetics, biometrics, health, sex life, or sexual orientation. Collecting information about any of these characteristics would render those data Special Category under the UK Data Protection legislation'
      },
      {
        'breadcrumb': 'identifiable',
        'text': 'Are there any licenses or agreements concerning confidentiality for the data that your project intends to use?',
        'flowchart': 'Confidentiality agreements?',
        'edges': {
          'Yes': ['My project will use confidential information held by third parties', 'next'],
          'No':  ['My project will not use confidential information held by third parties', 'TIER_1']
        },
        'guidance': 'Any agreement or license to use data places restrictions on how you should use that information therefore rendering it confidential.'
      },
      {
        'breadcrumb': 'identifiable',
        'text': 'Are there conditions attached to the data that would commit you to using fixed configurations of network or desktops?',
        'flowchart': 'Hardware configuration conditions?',
        'edges': {
          'Yes': ['There are conditions attached to the data that would mean using fixed configurations of network or desktops', 'TIER_2'],
          'No':  ['There are no conditions attached to the data that would mean using fixed configurations of network or desktops', 'TIER_1']
        },
        'guidance': 'If your license or agreement restricts the environments in which you can place that data then you must use an appropriate environment to work on your data at all times.'
      },
      {
        'breadcrumb': 'non-identifiable',
        'text': 'Are there any licenses or agreements concerning confidentiality for the data that your project intends to use?',
        'flowchart': 'Confidentiality agreements?',
        'edges': {
          'Yes': ['My project will use confidential information held by third parties', 'next'],
          'No':  ['My project will not use confidential information held by third parties', 'TIER_0']
        },
        'guidance': 'Any agreement or license to use data places restrictions on how you should use that information therefore rendering it confidential.'
      },
      {
        'breadcrumb': 'non-identifiable',
        'text': 'Are there conditions attached to the data that would commit you to using a particular environment?',
        'flowchart': 'Environment conditions?',
        'edges': {
          'Yes': ['There are conditions attached to the data that would mean using fixed configurations of network or desktops', 'TIER_2'],
          'No':  ['There are no conditions attached to the data that would mean using fixed configurations of network or desktops', 'TIER_1']
        },
        'guidance': 'If your license or agreement restricts the environments in which you can place that data then you must use an appropriate environment to work on your data at all times.'
      }
    ];
  
  })(this);
  
