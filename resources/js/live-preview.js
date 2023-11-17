import { ContentfulLivePreview } from '@contentful/live-preview';
import { createClient } from 'contentful';

// Configuration object
const CONFIG = {
  locale: 'en-US',
  entryId: entryId,
  fields: ['title', 'slug', 'content'],
  subscriptions: [],
  debugMode: true,
};

document.addEventListener('DOMContentLoaded', initialize);

function initialize() {
  console.log('Initializing Contentful Live Preview...');
  console.log(accessToken);
  const client = createClient({
    space: spaceId,
    accessToken: accessToken,
    host: 'preview.contentful.com',
  });

  ContentfulLivePreview.init({ locale: CONFIG.locale });

  client
    .getEntry(CONFIG.entryId)
    .then((entry) => {
      CONFIG.fields.forEach((fieldId) => {
        displayFieldData(entry, client, fieldId);
        setupLivePreview(entry, fieldId);
      });
    })
    .catch((err) => console.error(err));

  console.log(client);
}

function findElementByDataAttributes(entryId, fieldId) {
  return document.querySelector(
    `[data-contentful-entry-id="${entryId}"][data-contentful-field-id="${fieldId}"]`
  );
}

function displayFieldData(entry, client, fieldId) {
  const domElement = findElementByDataAttributes(CONFIG.entryId, fieldId);

  if (!domElement) {
    console.error(
      `DOM element with entry ID "${CONFIG.entryId}" and field ID "${fieldId}" not found.`
    );
    return;
  }

  domElement.textContent = entry.fields[fieldId];
}

function setupLivePreview(entry, fieldId) {
  const callback = (updatedData) => {
    const domElement = findElementByDataAttributes(CONFIG.entryId, fieldId);
    if (domElement && updatedData.fields && updatedData.fields[fieldId]) {
      // Check if the content is text
      if (typeof updatedData.fields[fieldId] === 'string') {
        domElement.textContent = updatedData.fields[fieldId];
      }
    }
  };

  const unsubscribe = ContentfulLivePreview.subscribe({
    data: entry,
    locale: CONFIG.locale,
    callback,
  });

  CONFIG.subscriptions.push(unsubscribe);
}