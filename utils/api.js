import axios from 'axios';

const API_KEY = '76dc923a7c5b0e2df2a3c912b00c1ff4efa50cba';
const API_URL = 'https://api.esv.org/v3/passage/text/';

export async function getEsvText(passage) {
  const params = {
    q: passage,
    'include-headings': true,
    'include-footnotes': false,
    'include-verse-numbers': true,
    'include-short-copyright': false,
    'include-passage-references': false,
  };

  const headers = {
    Authorization: `Token ${API_KEY}`,
  };

  try {
    const response = await axios.get(API_URL, { params, headers });
    const passages = response.data.passages;
    return passages[0].trim() || 'Error: Passage not found';
  } catch (error) {
    return 'Error: Failed to fetch passage';
  }
}
