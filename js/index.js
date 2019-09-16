import { createGitgraph, templateExtend } from "@gitgraph/js";
import { metroTemplate } from "@gitgraph/core/lib/template";

var Color = require('color');

const c = {
  master: new Color('#607d8b'),   // blueGrey
  develop: new Color('#2196f3'),  // blue
  feature: new Color('#4caf50'),  // green
  release: new Color('#ffc107'),  // amber
  qa: new Color('#9e9e9e'),       //grey
  bugfix: new Color('#e91e63'),   // pink
  hotfix: new Color('#9c27b0'),   // purple
};

// Get the graph container HTML element.
const graphContainer = document.getElementById("graph-container");

const customTemplate = templateExtend('metro', {
  commit: {
    message: {
      displayAuthor: false,
      displayHash: false,
    },
  },
  colors: [
    c.master.hex(),
    c.develop.hex(),
    c.feature.hex(),
    c.release.hex(),
    c.qa.hex(),
    c.bugfix.hex(),
    c.hotfix.hex()
  ]
});

// Instantiate the graph.
const gg = createGitgraph(graphContainer, {
  template: customTemplate,
  orientation: 'vertical',
  // mode: compact,
  // reverseArrow: false,
  // initCommitOffsetX?: number;
  // initCommitOffsetY?: number;
  author: 'J Smith',
  // branchLabelOnEveryCommit: true,
});


/***************************************************************************
 * MASTER AND DEVELOP BRANCHES
 ***************************************************************************
 * - Init repository with two historical, long-lived branches:
 *    - master
 *    - develop
 * - Create a release v1.0.0 for reference
 **************************************************************************/
const master =  gg.branch('master')
                  .commit('First commit on master');
const develop = gg.branch({name: 'develop', from: master})
                  .commit('First commit on develop')


/***************************************************************************
 * FEATURE BRANCHES
 ***************************************************************************
 * - Create two feature branches, each with one commit:
 *    - feature/feature-a
 *    - feature/feature-b
 * - Merge feature/feature-a into develop
 * - Merge feature/feature-b into develop
 **************************************************************************/
const featureA = gg.branch({ name: 'feature/feature-a', from: develop })
                   .commit('Feature A commit one');

develop.merge(featureA);

/***************************************************************************
 * RELEASE CYCLE: RELEASE AND QA BRANCHES
 ***************************************************************************
 *  - Start a release cycle by creating a release branch from develop:
 *      - release/1.0.0 (with a commit for bumping version numbers)
 *  - Create a QA branch from the release branch
 *      - qa
 **************************************************************************/
const release = gg.branch({ name: 'release/1.0.0', from: develop })
                  .commit('Start release: Bump version numbers');
const qa = gg.branch({ name: 'qa', from: release })
             .commit('Start qa: reference only');

/***************************************************************************
 * RELEASE CYCLE: BUGFIX BRANCHES
 ***************************************************************************
 *  - Create a bugfix branch off release:
 *    - bugfix/bugfix-a
 *  - Merge bugfix/bugfix-a into release
 *  - Create another bugfix branch off release
 *    - bugfix/bugfix-b
 *  - Merge release branch into qa for testing,
 *  - Merge last bugfix into release
 *  - Merge release into qa to reveiew bugfixes
 **************************************************************************/
const bugfixA = gg.branch({ name: 'bugfix/bugfix-a', from: release })
                  .commit('Bugfix A first commit');

release.merge(bugfixA);
qa.merge(release);


/***************************************************************************
 * RELEASE CYCLE: FINISH QA AND RELEASE BRANCHES
 ***************************************************************************
 * - Merge release branch into master with tagged commit
 * - Merge release branch into develop to get bugfixes into develop
 **************************************************************************/
release.commit('Finished with release');
develop.merge(release);
const v2_tagged = master.merge(release).tag("1.0.0");


/***************************************************************************
 * HOTFIX BRANCHES
 ***************************************************************************
 * - Create hotfix branch on master
 * - Merge hotfix branch into master and develop
 **************************************************************************/
const hotfixA = gg.branch({ name: 'hotfix/hotfix-a', from: v2_tagged })
  .commit('Hotfix first commit');
master.merge(hotfixA).tag("1.0.1");
develop.merge(hotfixA);

// Examples:
  // Branch
  /**
    const master = gg.branch({
      name: 'master',
      style: {

      }
    });

  */
  // Commit
  /**
    master.commit({
      subject: 'Initial commit',
      body: "This is the inital commit on master",
      dotText: "❤️",
      tag: "v1.2",
      style: {

      }
    });
  */
  // Merge
  /**
    master.merge({
      branch: develop,
      fastForward: true,
      commitOptions: {
        // Every valid `options` for a commit
      },
    });
  */


