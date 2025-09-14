export interface VideoData {
    videoId: string;
    merge: string;
    categories: string;
    publishedAt: string;
  }
  
  // Parse CSV text into array of objects
  function parseCSV<T>(csvText: string, headers: string[]): T[] {
    const lines = csvText.trim().split('\n');
    const data: T[] = [];
    
    for (let i = 1; i < lines.length; i++) { // Skip header row
      const values = lines[i].split(',');
      if (values.length >= headers.length) {
        const obj = {} as T;
        headers.forEach((header, index) => {
          (obj as any)[header] = values[index].trim();
        });
        data.push(obj);
      }
    }
    
    return data;
  }
  
  // Load videos data
  export async function loadVideosData(): Promise<VideoData[]> {
    try {
      const response = await fetch('/videos.csv');
      const csvText = await response.text();
      return parseCSV<VideoData>(csvText, ['', 'videoId', 'merge', 'categories', 'publishedAt']);
    } catch (error) {
      console.error('Error loading videos data:', error);
      return [];
    }
  }