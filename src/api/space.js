import wrappedFetch from './wrappedFetch';
import { getToken, getUserID } from './auth';

/**
 * Fetch a space by id.
 * @param {string} spaceId - id for the space to return
 * @returns {Promise} - resolves to a single space
*/
const getSpace = async (spaceId) => {
  const url = new URL(process.env.REACT_APP_API_HOST);
  url.pathname = `/api/v1/spaces/${spaceId}`;
  const result = await wrappedFetch(url.href);
  return result;
};

/**
 * Fetch 5 spaces for autocomplete
 * @param {Object} spaceOpts
 * @param {string} spaceOpts.name - name to fetch
*/
const getSpacesByName = async (spaceOpts) => {
  const url = new URL(process.env.REACT_APP_API_HOST);
  url.pathname = '/api/v1/spaces';
  url.searchParams.append('search', spaceOpts.name);
  url.searchParams.append('page', 1);
  url.searchParams.append('per_page', 5);
  url.searchParams.append('fields', 'id,name');
  const results = await wrappedFetch(url.href);
  let formattedSpaces = [];
  try {
    const { data } = await results;
    formattedSpaces = data.map((space) => ({
      name: space.name,
      value: `${space.id}`,
    }));
  } catch (e) {
    // since this is autocomplete
    // allow users to search by raw text
    formattedSpaces = [];
  }
  return new Promise((resolve) => {
    resolve(formattedSpaces);
  });
};

const postSpace = async () => {
  const url = new URL(process.env.REACT_APP_API_HOST);
  const token = await getToken();
  url.pathname = '/api/v1/spaces';
  const userID = getUserID();
  const data = {
    user_id: userID,
  };

  const results = await wrappedFetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    redirect: 'follow',
    body: JSON.stringify(data),
  });
  return results;
};

export { getSpace, postSpace, getSpacesByName };
