// APIレスポンスをディレクトリ構造に変換する関数
// APIレスポンスをディレクトリ構造に変換する関数
export const transformApiResponse = (apiStructure) => {
  // ファイル構造を再帰的に変換する内部関数
  const transform = (item, parentId = null) => {
    const transformedItem = {
      id: item.path,
      name: item.name,
      type: item.type === 'folder' ? 'directory' : 'file',
      content: item.content,
      parentId: parentId
    };

    // ディレクトリの場合、子要素を再帰的に変換
    if (item.type === 'folder' && item.children) {
      transformedItem.children = item.children.map(child => transform(child, item.path));
    }

    return transformedItem;
  };

  // ルート要素を作成
  const root = {
    id: 'root',
    name: 'プロジェクトルート',
    type: 'directory',
    children: apiStructure.map(item => transform(item, 'root'))
  };

  // ルート要素と全てのファイル情報を含む配列を作成
  const flattenedStructure = [root, ...flattenStructure(root)];

  // リンク情報を生成
  const links = generateLinks(flattenedStructure);

  // ノードとリンク情報を返す
  return { nodes: flattenedStructure, links };
};

// ディレクトリ構造をフラットな配列に変換する関数
const flattenStructure = (item) => {
  let result = [];

  if (item.type === 'directory' && item.children) {
    for (const child of item.children) {
      result.push(child);
      if (child.type === 'directory') {
        result = result.concat(flattenStructure(child));
      }
    }
  }

  return result;
};

// リンク情報を生成する関数
const generateLinks = (nodes) => {
  const links = [];

  for (const node of nodes) {
    if (node.parentId) {
      links.push({
        source: node.parentId,
        target: node.id
      });
    }
  }

  return links;
};