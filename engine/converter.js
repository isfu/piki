// usage: converting wiki links into markdown links
// not meant to be edited by the wiki admin, see README.md

import MarkdownIt from 'markdown-it';

import config from './configurator.js';

const md = new MarkdownIt();

export default text => {
  // converts wiki links to markdown links

  let linked = text.replace(/\[\[(.+?)\]\]/g, i => {
    const e = i.replace(/\[\[/g, '').replace(/\]\]/, '');

    return `[${e.replace(/_/g, ' ')}](/${config.options.prefix}/${e.replace(
      / /g,
      '_'
    )})`;
  });

  // returns html version

  return md.render(linked);
};
