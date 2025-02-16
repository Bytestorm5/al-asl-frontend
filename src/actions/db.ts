"use server";

import Papa from 'papaparse';
import { CourseCategory, CourseList, GetCategoriesResponse } from "./moodleTypes";

export async function getOpenClasses() {
  try {
    const url = `https://moodle.al-asl.com/moodle/webservice/rest/server.php?wstoken=${process.env.MOODLE_TOKEN}&wsfunction=core_course_get_courses&moodlewsrestformat=json`
    
    const response = await fetch(url, { cache: "no-store" });

    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`Failed to fetch. Status code: ${response.status}`);
    }

    // Parse the JSON payload
    let data = await response.json() as CourseList;
    data = data.filter((x) => x.id > 1 && x.format != "site")

    // Return the fetched data
    return data;
  } catch (error) {
    console.error('Error fetching open classes:', error);
    throw new Error('Failed to fetch open classes.');
  }
}

export async function getCourseCategories(): Promise<Record<number, CourseCategory>> {
  try {
    const url = `https://moodle.al-asl.com/moodle/webservice/rest/server.php?wstoken=${process.env.MOODLE_TOKEN}&wsfunction=core_course_get_categories&moodlewsrestformat=json`;
    
    const response = await fetch(url, { cache: "no-store" });

    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`Failed to fetch. Status code: ${response.status}`);
    }

    // Parse the JSON payload
    const data = await response.json() as CourseCategory[];
    // Transform the response into a dictionary of category ID to category object
    const categoryDictionary = data.reduce<Record<number, CourseCategory>>((dict, category) => {
      dict[category.id] = category;
      return dict;
    }, {});

    // Return the transformed dictionary
    return categoryDictionary;
  } catch (error) {
    console.error('Error fetching course categories:', error);
    
    throw new Error('Failed to fetch course categories.');
  }
}


export async function getClassBySlug(slug: string) {
  try {
    const url = `https://moodle.al-asl.com/moodle/webservice/rest/server.php?wstoken=${process.env.MOODLE_TOKEN}&wsfunction=core_course_search_courses&moodlewsrestformat=json&criterianame=search&criteriavalue=${encodeURIComponent(
      slug
    )}&page=0&perpage=0`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch. Status code: ${response.status}`);
    }

    let data = await response.json() as CourseList;
    data = data.filter((x) => x.id > 1 && x.format != "site")
    return data;
  } catch (error) {
    console.error('Error fetching course by slug:', error);
    throw new Error('Failed to fetch course by slug.');
  }
}

export async function fetchPublicSheetAsCSV(sheetId: string, sheetName: string) {
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;

  try {
    const response = await fetch(url);
    const csvData = await response.text(); // CSV string
    console.log('CSV Data:', csvData);
    return Papa.parse(csvData);
  } catch (error) {
    console.error('Error fetching CSV:', error);
    throw error;
  }
}

export type CatalogRow = {
  Name: string,
  Code: string,
  Department: string,
  Prerequisites: string,
  Corequisites: string,
  is_AJ: "TRUE" | "FALSE",
  is_active: "TRUE" | "FALSE",
  Desc_EN: string,
  Desc_UR: string,
}

// https://docs.google.com/spreadsheets/d/1uAGCU23jHja9uBnvpoLl3RebQofEhJrYoiMBhtPgZVE/edit?gid=0#gid=0
export async function getCourseStatic(): Papa.ParseResult<CatalogRow> {
  const url = `https://docs.google.com/spreadsheets/d/1uAGCU23jHja9uBnvpoLl3RebQofEhJrYoiMBhtPgZVE/gviz/tq?tqx=out:csv&sheet=Courses`;

  try {
    const response = await fetch(url);
    const csvData = await response.text(); // CSV string
    console.log('CSV Data:', csvData);
    return Papa.parse<CatalogRow>(csvData, { header: true });
  } catch (error) {
    console.error('Error fetching CSV:', error);
    throw error;
  }
}

