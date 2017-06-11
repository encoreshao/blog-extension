function DOMtoString(documentRoot) {
  var html = '',
  node = documentRoot.firstChild;

  while (node) {
    switch (node.nodeType) {
    case Node.ELEMENT_NODE:
      html += node.outerHTML;
      break;
    case Node.TEXT_NODE:
      html += node.nodeValue;
      break;
    case Node.CDATA_SECTION_NODE:
      html += '<![CDATA[' + node.nodeValue + ']]>';
      break;
    case Node.COMMENT_NODE:
      html += '<!--' + node.nodeValue + '-->';
      break;
    case Node.DOCUMENT_TYPE_NODE:
      // (X)HTML documents are identified by public identifiers
      html += "<!DOCTYPE " + node.name + (node.publicId ? ' PUBLIC "' + node.publicId + '"' : '') + (!node.publicId && node.systemId ? ' SYSTEM' : '') + (node.systemId ? ' "' + node.systemId + '"' : '') + '>\n';
      break;
    }
    node = node.nextSibling;
  }
  return html;
}

function DOMHeaderSection(documentRoot) {
  var title = null,
      keywords = null,
      description = null;

  var titleTag = documentRoot.getElementsByClassName('post-title')[0];
  if (titleTag != undefined) { title = titleTag.innerHTML; }

  var keywordsTag = documentRoot.getElementsByClassName('post-meta')[0];
  if (keywordsTag != undefined) { keywords = keywordsTag.innerHTML; }

  var descriptionTag = documentRoot.getElementsByClassName('post-content')[0];
  if (descriptionTag != undefined) { description = descriptionTag.innerHTML; }

  return {
    title: documentRoot.title,
    keywords: keywords,
    description: description
  };
}

chrome.runtime.sendMessage({
  action: "getSource",
  source: DOMHeaderSection(document)
});
