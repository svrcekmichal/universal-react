import {ENDPOINTS} from 'config/api';

const ACTIONS = {
  LOAD_CATEGORIES:'forum/categories/LOAD',
  LOAD_TOPICS: 'forum/topics/LOAD'
}

export function loadCategories() {
  return {
    type: 'forum/categories/LOAD',
    payload: {
      request:{
        url:ENDPOINTS.FORUM + 'categories'
      }
    },
    meta: {
      jsonApi:true
    }
  }
}

export function loadTopics() {
  return {
    types: [ACTIONS.LOAD_TOPICS, ACTIONS.LOAD_TOPICS + '_SUCCESS', ACTIONS.LOAD_TOPICS + '_FAIL'],
    payload: {
      request: {
        url: ENDPOINTS.FORUM + 'topics'
      }
    },
    meta: {
      jsonApi:{
        category:'forum_topic_category',
        answers:'forum_topic_answer'
      }
    }
  }
}

export default function reducer(state = {}, action) {
  return state;
}
