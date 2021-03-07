/**
 * A timeout threshold for "giving up" on cross-process
 * communication through the extension message channel.
 * 
 * @remarks
 * 1000ms is about 100x more than we ever expect this to
 * take, so it's truly an "it must be failing" situation
 * when we eventually give up
 * 
 * @alpha
 */
export const RESPONSE_TIMEOUT_THRESHOLD = 1000; // ms

/**
 * The size of the icon that's generated for the 
 * browser toolbar. 
 * 
 * @remarks
 * Keep in mind that this is only
 * the dimensions of the _graphics context_ -- the browser
 * decides how to scale the icon, and we don't have any
 * control over it
 * 
 * Related: {@link FAVICON_SQUARE_SIZE}
 * 
 * @alpha
 */
export const TOOLBAR_ICON_SQUARE_SIZE = 16;

/**
 * The size of the favicon that's generated for a tab-info
 * "controlled page"
 * 
 * @remarks
 * Keep in mind that this is only the size of the graphics
 * context buffer. Favicons are always 16x16
 * 
 * Related: {@link TOOLBAR_ICON_SQUARE_SIZE}
 * 
 * @alpha
 */
export const FAVICON_SQUARE_SIZE = 16;

/**
 * The tab color to use if we find that a page indicates 
 * that this extension should be _enabled_, but it provides
 * us with no information about tab color
 * 
 * @alpha
 */
export const FALLBACK_TAB_COLOR = '#ff0';

/**
 * A debouncing threshold used to avoid close-proximity
 * events from causing multiple updates to the extension 
 * data, when a user would consider it to be "one event".
 * 
 * Example: a tab can be activated and then immediately updated
 * as soon as it's opened (e.g., a client-side redirect). We want
 * to respond to this as "one thing that happened"
 * 
 * @alpha 
 */
export const UPDATE_EVENT_DEBOUNCE_THRESHOLD = 50; // ms

/**
 * The DOM selector string used to find the element within the
 * popup's HTML, to render content within.
 * 
 * @alpha
 */
export const POPUP_UI_CONTAINER_ELEM = '#app';