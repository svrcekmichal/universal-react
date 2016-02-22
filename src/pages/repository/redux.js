const LOAD_REPO = 'LOAD_REPO';
const LOAD_REPO_SUCCESS = 'LOAD_REPO_SUCCESS';
const LOAD_REPO_FAIL = 'LOAD_REPO_FAIL';

const LOAD_REPO_CONTRIBUTORS = 'LOAD_REPO_CONTRIBUTORS';
const LOAD_REPO_CONTRIBUTORS_SUCCESS = 'LOAD_REPO_CONTRIBUTORS_SUCCESS';
const LOAD_REPO_CONTRIBUTORS_FAIL = 'LOAD_REPO_CONTRIBUTORS_FAIL';

const LOAD_REPO_AUTHOR = 'LOAD_REPO_AUTHOR';
const LOAD_REPO_AUTHOR_SUCCESS = 'LOAD_REPO_AUTHOR_SUCCESS';
const LOAD_REPO_AUTHOR_FAIL = 'LOAD_REPO_AUTHOR_FAIL';

export function shouldLoadRepo(state) {
  return state.repo.data === null;
}

export const loadRepo = (name) => ({
  type:LOAD_REPO,
  payload:{
    request: {
      url: '/repos/' + name
    }
  }
});

export function shouldLoadRepoContributors(state) {
  return state.repo.contributors === null;
}

export const loadRepoContributors = (repoName) => ({
  type:LOAD_REPO_CONTRIBUTORS,
  payload:{
    request: {
      url: '/repos/' + repoName + '/contributors'
    }
  }
});

export function shouldLoadRepoAuthor(state) {
  return state.repo.author === null;
}

export const loadRepoAuthor = (authorName) => ({
  type:LOAD_REPO_AUTHOR,
  payload:{
    request: {
      url: '/users/' + authorName
    }
  }
});

export default function reducer(state = {
  data:null,
  author:null,
  contributors:null
}, action) {
  switch(action.type) {
    case LOAD_REPO_SUCCESS:
      return {...state, data: action.payload.response.data};
    case LOAD_REPO_AUTHOR_SUCCESS:
      return {...state, author: action.payload.response.data};
    case LOAD_REPO_CONTRIBUTORS_SUCCESS:
      return {...state, contributors: action.payload.response.data};
  }
  return state;
}
