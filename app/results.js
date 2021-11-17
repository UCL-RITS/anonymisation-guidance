(function(exports) {
  'use strict';

  exports.tier_lookup = {
    'TIER_0': "public",
    'TIER_1': "confidential and can therefore be stored in a Research Data Storage Service repository",
    'TIER_1_AND_A_HALF': "a mixture of confidential and highly confidential: the more sensitive data must be stored in a secure environment, such as UCL's Data Safe Haven, but the rest can be stored in a Research Data Storage Service repository",
    'TIER_2': "highly confidential and must be stored in a secure environment, such as UCL's Data Safe Haven"
  };

})(this);
