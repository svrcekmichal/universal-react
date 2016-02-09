const LOAD_REPO = 'LOAD_REPO';
const LOAD_REPO_CONTRIBUTORS = 'LOAD_REPO_CONTRIBUTORS';

export const loadRepo = (name) => ({
  type:LOAD_REPO,
  payload:{
    request: {
      url: '/repos/' + name
    }
  }
});

export const loadRepoContributors = (repoName) => ({
  type:LOAD_REPO_CONTRIBUTORS,
  payload:{
    request: {
      url: '/repos/' + repoName + '/contributors'
    }
  }
});

export default function reducer(state = {}, action) {
  return state;
}
