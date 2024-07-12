
const fetchThumbnail = async (url) => {
  try {
    const response = await fetch(`https://api.microlink.io?url=${encodeURIComponent(url)}`);
    const data = await response.json();
    return data.data.image.url;
  } catch (error) {
    console.error('サムネイル取得エラー:', error);
    return null;
  }
};

export default fetchThumbnail;
