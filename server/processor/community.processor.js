/* eslint-disable node/no-unsupported-features/es-syntax */
const RuleController = require("../controller/rule.controller");

async function communityProcessor(communities) {
  return await Promise.all(
    communities.map(async (community) => {
      const { _id: communityId, ...communityData } = community.toObject();
      const rules = await RuleController.GetRuleByID(communityId);
      return { ...communityData, Rule: rules };
    }),
  );
}

module.exports = communityProcessor;
