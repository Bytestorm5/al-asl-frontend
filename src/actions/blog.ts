"use server";

import { BlogEntriesResponse, BlogEntry } from "./moodleTypes";

export async function getBlogs(): Promise<BlogEntriesResponse> {
  try {
    const params = new URLSearchParams();
    params.append('filters[0][name]', 'userid');
    params.append('filters[0][value]', '2');
    params.append('page', '0');
    params.append('perpage', '10');

    const response = await fetch(`https://moodle.al-asl.com/moodle/webservice/rest/server.php?wstoken=${process.env.MOODLE_TOKEN}&wsfunction=core_blog_get_entries&moodlewsrestformat=json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data as BlogEntriesResponse;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    throw error; // Re-throw to allow handling by the caller
  }
}

export async function getBlog(slug: string): Promise<BlogEntry> {
  try {
    const params = new URLSearchParams();
    params.append('filters[0][name]', 'entryid');
    params.append('filters[0][value]', slug);
    params.append('page', '0');
    params.append('perpage', '10');

    const response = await fetch(`https://moodle.al-asl.com/moodle/webservice/rest/server.php?wstoken=${process.env.MOODLE_TOKEN}&wsfunction=core_blog_get_entries&moodlewsrestformat=json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json() as BlogEntriesResponse;
    return data.entries[0];
  } catch (error) {
    console.error('Error fetching blogs:', error);
    throw error; // Re-throw to allow handling by the caller
  }
}
